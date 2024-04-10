import { NextResponse } from 'next/server'
import { pool1, pool2, pool3 } from '@/lib/database'

export async function GET(request) {
	try {
		const db = await pool3
			.getConnection()
			.catch(() => pool1.getConnection().catch(() => pool2.getConnection()))

		// Introduce a delay of 1 second (1000 milliseconds)
		await new Promise((resolve) => setTimeout(resolve, 1000))

		const query = `SELECT * FROM appointments` // Add WHERE conditions
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
