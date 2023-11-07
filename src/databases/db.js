require('dotenv').config()
const { Pool } = require('pg')

const config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    allowExitOnIdle: true
}

const pool = new Pool(config)

const db = async (query, values) => {
    try {
        const result = await pool.query(query, values)
        return result.rows
    } catch (error) {
        const customError = {
            status: '[ERROR]',
            code: error.code,
            message: error.message
        }
        throw customError
    }
}

module.exports = db
