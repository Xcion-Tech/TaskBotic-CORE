import { createPool } from "mysql2/promise";

export async function connect(db: string) {
    const connection = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: db,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
        connectionLimit: 500,
    });
    return connection;
}

export async function connectDirect() {
    const connection = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
        connectionLimit: 500,

    });
    return connection;
}