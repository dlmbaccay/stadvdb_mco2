import { NextResponse } from "next/server";
import pool from "@/lib/database";
import { uuid } from 'uuidv4';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const querypage = searchParams.get('page');
    const page = querypage ? parseInt(querypage) : 1;
    const pageSize = 10; // Number of records per page
    const offset = (page - 1) * pageSize;

    try {
        const db = await pool.getConnection();
        const query = `SELECT * FROM appointments LIMIT ${pageSize} OFFSET ${offset}`; // Add WHERE conditions
        const [rows] = await db.execute(query);
        db.release();

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
};

export async function POST(request) {
    const body = await request.json();
    const { appointmentData } = body;

    let appointmentID;

    try {
        const db = await pool.getConnection()

         // Keep generating a new unique ID until a unique one is found
         while (!isUniqueID) {
            appointmentID = uuidv4(); // Generate a unique ID
            const checkQuery = 'SELECT COUNT(*) AS count FROM appointments WHERE appointmentID = ? LIMIT 1';
            const [checkRows] = await db.execute(checkQuery, [appointmentID]);

            if (checkRows[0].count === 0) {
                isUniqueID = true; // Unique ID found
            }
        }

        // Format the UUID to match the desired format
        appointmentID = formatUUID(appointmentID);

        // Insert data into the database using the generated unique ID
        const insertQuery = 'INSERT INTO appointments (appointmentID, appointmentStatus, appointmentDate /* Add other columns */) VALUES (?, ?, ? /* Add other placeholders */)';
        const [insertRows] = await db.execute(insertQuery, [appointmentID, appointmentStatus, appointmentDate /* Add other values */]);

        db.release();
        
        return NextResponse.json(insertRows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

function formatUUID(uuid) {
    // Remove hyphens from the UUID and convert it to uppercase
    return uuid.replace(/-/g, '').toUpperCase();
}