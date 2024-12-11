import { Client } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config("../../.env");



export const getCars = async ({ maker, model, year }) => {
    const client = new Client(process.env.VITE_DATABASE_URL);
    await client.connect();
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (maker) {
        conditions.push(`make = $${paramCount}`);
        values.push(maker);
        paramCount++;
    }

    if (model) {
        conditions.push(`model = $${paramCount}`);
        values.push(model);
        paramCount++;
    }

    if (year) {
        conditions.push(`year = $${paramCount}`);
        values.push(year);
        paramCount++;
    }

    const whereClause = conditions.length > 0
        ? 'WHERE ' + conditions.join(' AND ')
        : '';

    const sql = `SELECT * FROM cars ${whereClause}`;
    const res = await client.query(sql, values);
    return res.rows;
}