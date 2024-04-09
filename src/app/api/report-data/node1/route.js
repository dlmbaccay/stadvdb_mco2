import { NextResponse } from 'next/server'
import { pool2 } from '@/lib/database'

export async function GET(request) {
	try {
		const db = await pool2.getConnection()

		// Start transaction
		await db.beginTransaction()

		const query = `SELECT * FROM appointments LIMIT 50` // Add WHERE conditions
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
