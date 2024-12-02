import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config() // Carrega as variáveis do .env

const pool = mysql.createPool({
    host: process.env.DB_HOST, // Host do banco de dados (configurado no .env)
    user: process.env.DB_USER, // Usuário do banco de dados (configurado no .env)
    password: process.env.DB_PASSWORD, // Senha do banco de dados (configurado no .env)
    database: process.env.DB_NAME // Nome do banco de dados (configurado no .env)
})

export default pool
