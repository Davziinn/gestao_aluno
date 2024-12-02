import express from 'express';
import dotenv from 'dotenv';
import alunoRoutes from './routes/alunoRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Defina as rotas
app.use('/api', alunoRoutes);

// Pegue a porta do arquivo .env ou use 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicie o servidor
app.listen({port:PORT, host:'0.0.0.0'}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando na porta ${PORT}`);
});
