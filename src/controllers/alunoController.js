import { createAluno, getAlunos, getAlunoById, updateAluno, deleteAluno, getTurmaById } from '../models/alunoModel.js';

export const cadastrarAluno = async (req, res) => {
    try {
        const aluno = req.body;

        // Obter os detalhes da turma associada ao aluno
        const turma = await getTurmaById(aluno.turmaId);

        // Agora você pode, por exemplo, verificar ou incluir dados da turma no processo de cadastro
        console.log('Turma associada:', turma);

        // Agora, você continua com o cadastro do aluno
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
        const alunoId = req.params.id;
        const aluno = req.body;

        // Obter os detalhes da turma associada ao aluno
        const turma = await getTurmaById(aluno.turmaId);

        // Agora você pode, por exemplo, verificar ou incluir dados da turma no processo de atualização
        console.log('Turma associada:', turma);

        // Atualize os dados do aluno no banco
        const result = await updateAluno(alunoId, aluno);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Aluno não encontrado' });
        
        res.status(200).json({ message: 'Aluno atualizado com sucesso' });
    } catch (error) {
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
