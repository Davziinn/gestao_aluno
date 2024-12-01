import { createAluno, getAlunos, getAlunoById, updateAluno, deleteAluno } from '../models/alunoModel.js';
import fetch from 'node-fetch';

export const cadastrarAluno = async (req, res) => {
    try {
        const aluno = req.body;

        // Validar se os IDs foram fornecidos
        if (!aluno.turmaId || !aluno.eventoId) {
            return res.status(400).json({ message: 'ID de turma e evento são obrigatórios' });
        }

        // Consultar o microserviço de Turma
        const turmaResponse = await fetch(`${process.env.TURMA_URL}/${aluno.turmaId}`);
        if (!turmaResponse.ok) {
            return res.status(400).json({ message: `Erro ao consultar a Turma: ${turmaResponse.statusText}` });
        }
        const turmaData = await turmaResponse.json();
        if (!Array.isArray(turmaData) || turmaData.length === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }

        // Consultar o microserviço de Evento
        const eventoResponse = await fetch(`${process.env.EVENTOS_URL}/${aluno.eventoId}`);
        if (!eventoResponse.ok) {
            return res.status(400).json({ message: `Erro ao consultar o Evento: ${eventoResponse.statusText}` });
        }
        const eventoData = await eventoResponse.json();
        if (!Array.isArray(eventoData) || eventoData.length === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Inserir o aluno no banco de dados
        const result = await createAluno(aluno);
        return res.status(201).json({ 
            message: 'Aluno cadastrado com sucesso', 
            id: result.insertId 
        });
    } catch (error) {
        console.error('Erro no cadastro de aluno:', error.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

export const listarAlunos = async (req, res) => {
    try {
        const alunos = await getAlunos();

        // Para cada aluno, buscar os dados da turma e evento
        const alunosComDetalhes = await Promise.all(
            alunos.map(async (aluno) => {
                // Consultar dados da turma
                const turmaResponse = await fetch(`${process.env.TURMA_URL}/${aluno.turmaId}`);
                const turmaData = await turmaResponse.json();

                // Consultar dados do evento
                const eventoResponse = await fetch(`${process.env.EVENTOS_URL}/${aluno.eventoId}`);
                const eventoData = await eventoResponse.json();

                // Retornar os dados do aluno com os detalhes da turma e evento
                return {
                    ...aluno,
                    turma: turmaData,    // Adiciona os dados da turma
                    evento: eventoData   // Adiciona os dados do evento
                };
            })
        );

        res.status(200).json(alunosComDetalhes);
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

