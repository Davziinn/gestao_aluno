import { createAluno, getAlunos, getAlunoById, updateAluno, deleteAluno } from '../models/alunoModel.js';

export const cadastrarAluno = async (req, res) => {
    try {
        const aluno = req.body;
        const result = await createAluno(aluno);
        res.status(201).json({ message: 'Aluno cadastrado com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listarAlunos = async (req, res) => {
    try {
        const alunos = await getAlunos();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const buscarAluno = async (req, res) => {
    try {
        const aluno = await getAlunoById(req.params.id);
        if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const atualizarAluno = async (req, res) => {
    try {
        const result = await updateAluno(req.params.id, req.body);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Aluno não encontrado' });
        res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const excluirAluno = async (req, res) => {
    try {
    const result = await deleteAluno(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    } 
};