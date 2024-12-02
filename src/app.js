import express from 'express'
import dotenv from 'dotenv'
import alunoRoutes from './routes/alunoRoutes.js'

dotenv.config() // Carregar as variáveis do arquivo .env

const app = express()

// Middleware para parsing de JSON
app.use(express.json())

// Definir as rotas
app.use('/api', alunoRoutes)

// Porta do servidor
const PORT = process.env.PORT || 3001

// Iniciar o servidor
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor rodando na porta ${PORT}`)
})
