import pool from '../config/database.js' // Importa a configuração do banco de dados

// Função para criar aluno no banco
export const createAluno = async (aluno) => {
    const [result] = await pool.query(
        'INSERT INTO alunos (nome, email, dataNasc, turmaId) VALUES (?, ?, ?, ?)', 
        [aluno.nome, aluno.email, aluno.dataNasc, aluno.turmaId]
    )
    return result
}

// Funções de CRUD para aluno
export const getAlunos = async () => {
    const [rows] = await pool.query('SELECT * FROM alunos')
    return rows
}

export const getAlunoById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM alunos WHERE id = ?', [id])
    return rows[0]
}

export const updateAluno = async (id, aluno) => {
    const [result] = await pool.query(
        'UPDATE alunos SET nome = ?, email = ?, dataNasc = ?, turmaId = ? WHERE id = ?',
        [aluno.nome, aluno.email, aluno.dataNasc, aluno.turmaId, id]
    )
    return result
}

export const deleteAluno = async (id) => {
    const [result] = await pool.query('DELETE FROM alunos WHERE id = ?', [id])
    return result
}
