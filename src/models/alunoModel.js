import pool from '../config/database.js'
import axios from 'axios'

const fetchTurma = async () => {
  try {
    const response = await axios.get('http://147.79.83.61:3333/turmas')
    const turmas = response.data

    if (!turmas || turmas.length === 0) {
      throw new Error('Nenhuma turma encontrada')
    }

    return turmas[0].id
  } catch (error) {
    console.error(`Erro ao buscar turmas: ${error.message}`)
    throw new Error('Falha ao conectar com o microserviço de turmas')
  }
}

export const createAluno = async (aluno) => {
  try {
    const idTurma = await fetchTurma()

    const [result] = await pool.query(
      'INSERT INTO alunos (nome, email, dataNasc, turmaId) VALUES (?, ?, ?, ?)',
      [aluno.nome, aluno.email, aluno.dataNasc, idTurma]
    )    
    return result
  } catch (error) {
    console.error(`Erro ao criar aluno: ${error.message}`)
    throw error
  }
}

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
