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
        const aluno = req.body;

        // Validar se o ID da turma foi fornecido
        if (!aluno.turmaId) {
            return res.status(400).json({ message: 'ID de turma é obrigatório' });
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
