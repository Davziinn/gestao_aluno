import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config() // Carrega as variáveis do .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME // O nome do banco de dados
});


export default pool
