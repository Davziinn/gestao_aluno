import { 
    createAluno, 
    getAlunos, 
    getAlunoById, 
    updateAluno, 
    deleteAluno 
} from '../models/alunoModel.js'

import axios from 'axios'

export const cadastrarAluno = async (req, res) => {
    try {
        const aluno = req.body;

        if (!aluno.turmaId) {
            return res.status(400).json({ message: 'ID de turma é obrigatório' });
        }

        const turmaUrl = `${process.env.TURMA_URL}/turmas/${aluno.turmaId}`;

        let turmaResponse;
        try {
            turmaResponse = await axios.get(turmaUrl);
        } catch (error) {
            console.error(`Erro ao tentar se conectar ao microserviço de turmas: ${error.message}`);
            return res.status(500).json({ error: `Erro ao conectar com o microserviço de turmas: ${error.message}` });
        }

        const turmaData = turmaResponse.data;

        if (!turmaData) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        const result = await createAluno(aluno);

        return res.status(201).json({ 
            message: 'Aluno cadastrado com sucesso', 
            id: result.insertId 
        });
    } catch (error) {
        console.error('Erro no cadastro de aluno:', error.message);
        return res.status(500).json({ error: `Erro interno no servidor: ${error.message}` });
    }
};


export const listarAlunos = async (req, res) => {
    try {
        const alunos = await getAlunos()
        res.json(alunos)
    } catch (error) {
        console.error('Erro ao listar alunos:', error)
        res.status(500).send('Erro ao listar alunos')
    }
}

export const buscarAluno = async (req, res) => {
    const { id } = req.params
    try {
        const aluno = await getAlunoById(id)
        if (!aluno) {
            return res.status(404).send('Aluno não encontrado')
        }
        res.json(aluno)
    } catch (error) {
        console.error('Erro ao buscar aluno:', error)
        res.status(500).send('Erro ao buscar aluno')
    }
}


export const atualizarAluno = async (req, res) => {
    const { id } = req.params
    const aluno = req.body
    try {
        const result = await updateAluno(id, aluno)
        res.json(result)
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error)
        res.status(500).send('Erro ao atualizar aluno')
    }
}


export const excluirAluno = async (req, res) => {
    const { id } = req.params
    try {
        const result = await deleteAluno(id)
        res.json(result)
    } catch (error) {
        console.error('Erro ao excluir aluno:', error)
        res.status(500).send('Erro ao excluir aluno')
    }
}
