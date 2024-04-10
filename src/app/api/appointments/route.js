import { NextResponse } from 'next/server'
import { pool1 } from '@/lib/database'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request) {
	const { searchParams } = new URL(request.url)
	const querypage = searchParams.get('page')
	const page = querypage ? parseInt(querypage) : 1
	const pageSize = 10 // Number of records per page
	const offset = (page - 1) * pageSize

	const action = searchParams.get('action')
	const column = searchParams.get('column')
	const searchValue = searchParams.get('searchValue')

	try {
		const db = await pool1.getConnection()
		let query = `SELECT * FROM appointments LIMIT ${pageSize} OFFSET ${offset}`
		if (action === 'search') {
			query = `SELECT * FROM appointments WHERE ${column} LIKE '%${searchValue}%' LIMIT ${pageSize} OFFSET ${offset}`
		}
		const [rows] = await db.execute(query)
		db.release()

		return NextResponse.json(rows)
	} catch (error) {
		return NextResponse.json(
			{
				error: error,
			},
			{ status: 500 },
		)
	}
}

export async function POST(request) {
	const body = await request.json()
	const {
		appointmentStatus,
		appointmentType,
		timeQueued,
		queueDate,
		startTime,
		endTime,
		virtual,
		hospitalName,
		city,
		province,
		region,
		doctorMainSpecialty,
		doctorAge,
		patientAge,
		patientGender,
	} = body

	try {
		const db = await pool1.getConnection()

		// Start transaction
		await db.beginTransaction()

		// Generate UUID in the desired format
		let apptid = uuidv4().toUpperCase().replace(/-/g, '').substring(0, 32)

		let exists = true

		while (exists) {
			console.log(apptid)
			const checkQuery = 'SELECT COUNT(*) AS count FROM appointments WHERE apptid = ? LIMIT 1'
			const [checkRows] = await db.execute(checkQuery, [apptid])
			exists = checkRows[0].count > 0

			if (exists) {
				apptid = uuidv4().toUpperCase().replace(/-/g, '').substring(0, 32)
			}
		}

		const insertQuery =
			'INSERT INTO appointments (apptid, appt_status, appt_type, time_queued, queue_date, start_time, end_time, appt_virtual, patient_age, patient_gender, doctor_age, doctor_mainspecialty, hospital_name, city, province, region) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
		const [insertRows] = await db.execute(insertQuery, [
			apptid,
			appointmentStatus,
			appointmentType,
			timeQueued,
			queueDate,
			startTime,
			endTime,
			virtual,
			patientAge,
			patientGender,
			doctorAge,
			doctorMainSpecialty,
			hospitalName,
			city,
			province,
			region,
		])

		// Commit transaction
		await db.commit()

		db.release()

		return NextResponse.json(insertRows)
	} catch (error) {
		// Rollback transaction if error occurs
		await db.rollback()
		console.error('Error inserting appointment:', error)
		return NextResponse.json(
			{
				error: error,
			},
			{ status: 500 },
		)
	}
}

export async function PUT(request) {
	const body = await request.json()
	const {
		appointmentId,
		appointmentStatus,
		appointmentType,
		timeQueued,
		queueDate,
		startTime,
		endTime,
		virtual,
		hospitalName,
		city,
		province,
		region,
		doctorMainSpecialty,
		doctorAge,
		patientAge,
		patientGender,
	} = body

	try {
		const db = await pool1.getConnection()

		// Start transaction
		await db.beginTransaction()

		const updateQuery = `UPDATE appointments SET
            appt_status = ?,
            appt_type = ?,
            time_queued = ?,
            queue_date = ?,
            start_time = ?,
            end_time = ?,
            appt_virtual = ?,
            hospital_name = ?,
            city = ?,
            province = ?,
            region = ?,
            doctor_mainspecialty = ?,
            doctor_age = ?,
            patient_age = ?,
            patient_gender = ?
            WHERE apptid = ?`

		const [updateRows] = await db.execute(updateQuery, [
			appointmentStatus,
			appointmentType,
			timeQueued,
			queueDate,
			startTime,
			endTime,
			virtual,
			hospitalName,
			city,
			province,
			region,
			doctorMainSpecialty,
			doctorAge,
			patientAge,
			patientGender,
			appointmentId,
		])

		// Commit transaction
		await db.commit()

		db.release()

		return NextResponse.json(updateRows)
	} catch (error) {
		// Rollback transaction if error occurs
		await db.rollback()
		console.error('Error updating appointment:', error)
		return NextResponse.json(
			{
				error: error,
			},
			{ status: 500 },
		)
	}
}
