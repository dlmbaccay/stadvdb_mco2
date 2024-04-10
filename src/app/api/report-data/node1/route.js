import { NextResponse } from 'next/server'
import { pool1 } from '@/lib/database'

export async function GET(request) {
	try {
		const db = await pool1.getConnection()

		// Start transaction
		await db.beginTransaction()

		const query = `SELECT * FROM appointments` // Add WHERE conditions
		const [rows] = await db.execute(query)
		// Add delay
		await new Promise((resolve) => setTimeout(resolve, 1000))

		// Continue with the rest of the code
		// ...

		// Commit transaction
		await db.commit()

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
