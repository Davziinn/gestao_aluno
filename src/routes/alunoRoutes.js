import express from 'express';
import { cadastrarAluno, listarAlunos, buscarAluno, atualizarAluno, excluirAluno } from '../controllers/alunoController.js';

const router = express.Router();

router.post('/alunos', cadastrarAluno);
router.get('/alunos', listarAlunos);
router.get('/alunos/:id', buscarAluno);
router.put('/alunos/:id', atualizarAluno);
router.delete('/alunos/:id', excluirAluno);

export default router;
