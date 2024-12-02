import express from 'express'
import dotenv from 'dotenv'
import alunoRoutes from './routes/alunoRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api', alunoRoutes)

const PORT = process.env.PORT || 3001

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor rodando na porta ${PORT}`)
})
