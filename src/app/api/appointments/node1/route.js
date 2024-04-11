import { NextResponse } from 'next/server'
import { pool1, pool2, pool3 } from '@/lib/database'
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

	let retryCount = 0

	while (retryCount < 3) {
		let db
		try {
			db = await pool1.getConnection().catch((error) => {
				console.log('Failed to connect to pool1:', error)
				return pool2.getConnection().catch((error) => {
					console.log('Failed to connect to pool2:', error)
					return pool3.getConnection().catch((error) => {
						console.log('Failed to connect to pool3:', error)
						throw error
					})
				})
			})

			console.log('Connected to database: PORT ', db.connection.config.port)

			let query = `SELECT * FROM appointments LIMIT ${pageSize} OFFSET ${offset}`
			if (action === 'search') {
				query = `SELECT * FROM appointments WHERE ${column} LIKE '%${searchValue}%' LIMIT ${pageSize} OFFSET ${offset}`
			}
			const [rows] = await db.execute(query)
			db.release()

			console.log('Released connection to database: PORT', db.connection.config.port)

			return NextResponse.json(rows)
		} catch (error) {
			if (db) {
				try {
					db.release()
					console.log('Released connection to database: PORT', db.connection.config.port)
				} catch (error) {
					console.error('Error releasing connection:', error)
				}
			}
			console.error('Error retrieving appointments:', error)
			retryCount++
			if (retryCount >= 3) {
				return NextResponse.json(
					{ error: 'Maximum retries reached. Unable to retrieve appointments.' },
					{ status: 500 },
				)
			}
		}
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

	let retryCount = 0

	while (retryCount < 3) {
		let db

		try {
			db = await pool1.getConnection().catch((error) => {
				console.log('Failed to connect to pool1:', error)
				return pool2.getConnection().catch((error) => {
					console.log('Failed to connect to pool2:', error)
					return pool3.getConnection().catch((error) => {
						console.log('Failed to connect to pool3:', error)
						throw error
					})
				})
			})

			console.log('Connected to database: PORT ', db.connection.config.port)

			// Start transaction
			await db.beginTransaction()

			console.log('BEGIN INSERT TRANSACTION ', db.connection.config.port)

			// Generate UUID in the desired format
			let apptid = uuidv4().toUpperCase().replace(/-/g, '').substring(0, 32)

			let exists = true

			while (exists) {
				console.log(apptid)
				const checkQuery =
					'SELECT COUNT(*) AS count FROM appointments WHERE apptid = ? LIMIT 1'
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

			// // Add a 10s delay
			// await new Promise((resolve) => setTimeout(resolve, 10000))

			// Commit transaction
			await db.commit()

			console.log('COMMIT INSERT TRANSACTION ', db.connection.config.port)

			db.release()

			console.log('Released connection to database: PORT', db.connection.config.port)

			return NextResponse.json(insertRows)
		} catch (error) {
			// Rollback transaction if error occurs
			if (db) {
				try {
					await db.rollback()
					// Release connection
					db.release()
					console.log('Released connection to database: PORT', db.connection.config.port)
				} catch (error) {
					console.error('Error rolling back transaction:', error)
				}
			}
			console.error('Error inserting appointment:', error)
			retryCount++
			if (retryCount >= 3) {
				// Maximum retries reached, return error
				return NextResponse.json(
					{ error: 'Maximum retries reached. Unable to update appointment.' },
					{ status: 500 },
				)
			}
		}
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

	let retryCount = 0

	while (retryCount < 3) {
		let db
		try {
			db = await pool1.getConnection().catch((error) => {
				console.log('Failed to connect to pool1:', error)
				return pool2.getConnection().catch((error) => {
					console.log('Failed to connect to pool2:', error)
					return pool3.getConnection().catch((error) => {
						console.log('Failed to connect to pool3:', error)
						throw error
					})
				})
			})

			console.log('Connected to database: PORT ', db.connection.config.port)

			// Start transaction
			await db.beginTransaction()

			console.log('BEGIN UPDATE TRANSACTION ', db.connection.config.port)

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

			// // Add a 10s delay
			// await new Promise((resolve) => setTimeout(resolve, 10000))

			// Commit transaction
			await db.commit()

			console.log('COMMIT UPDATE TRANSACTION ', db.connection.config.port)

			// Release connection
			db.release()
			console.log('Released connection to database: PORT', db.connection.config.port)

			return NextResponse.json(updateRows)
		} catch (error) {
			// Rollback transaction if error occurs
			if (db) {
				try {
					await db.rollback()
					// Release connection
					db.release()
					console.log('Released connection to database: PORT', db.connection.config.port)
				} catch (error) {
					console.error('Error rolling back transaction:', error)
				}
			}
			console.error('Error updating appointment:', error)
			retryCount++
			if (retryCount >= 3) {
				// Maximum retries reached, return error
				return NextResponse.json(
					{ error: 'Maximum retries reached. Unable to update appointment.' },
					{ status: 500 },
				)
			}
		}
	}
}
