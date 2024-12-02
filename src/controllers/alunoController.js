import fetch from 'node-fetch'
import { 
    createAluno, 
    getAlunos, 
    getAlunoById, 
    updateAluno, 
    deleteAluno 
} from '../models/alunoModel.js'

// Função para cadastrar um aluno
export const cadastrarAluno = async (req, res) => {
    try {
        const aluno = req.body

        // Validar se o ID da turma foi fornecido
        if (!aluno.turmaId) {
            return res.status(400).json({ message: 'ID de turma é obrigatório' })
        }

        // Consultar o microserviço de Turma
        const turmaUrl = `${process.env.TURMA_URL}/${aluno.turmaId}`
        let turmaResponse
        try {
            turmaResponse = await fetch(turmaUrl)
        } catch (error) {
            console.error(`Erro ao tentar se conectar ao microserviço de turmas: ${error.message}`)
            return res.status(500).json({ error: `Erro ao conectar com o microserviço de turmas: ${error.message}` })
        }

        if (!turmaResponse.ok) {
            console.error(`Erro ao consultar a turma: ${turmaResponse.statusText}`)
            return res.status(400).json({ message: `Erro ao consultar a Turma: ${turmaResponse.statusText}` })
        }

        const turmaData = await turmaResponse.json()

        // Validar se a turma existe
        if (!turmaData || Object.keys(turmaData).length === 0) {
            console.error('Turma não encontrada')
            return res.status(404).json({ message: 'Turma não encontrada' })
        }

        // Inserir o aluno no banco de dados
        const result = await createAluno(aluno)

        return res.status(201).json({ 
            message: 'Aluno cadastrado com sucesso', 
            id: result.insertId 
        })
    } catch (error) {
        console.error('Erro no cadastro de aluno:', error.message)
        return res.status(500).json({ error: `Erro interno no servidor: ${error.message}` })
    }
}

// Função para listar todos os alunos
export const listarAlunos = async (req, res) => {
    try {
        const alunos = await getAlunos()
        res.json(alunos)
    } catch (error) {
        console.error('Erro ao listar alunos:', error)
        res.status(500).send('Erro ao listar alunos')
    }
}

// Função para buscar um aluno por ID
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

// Função para atualizar um aluno
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

// Função para excluir um aluno
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
