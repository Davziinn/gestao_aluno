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
        const result = await createAluno(aluno)
        res.status(201).json(result)
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error)
        res.status(500).send('Erro ao cadastrar aluno')
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
