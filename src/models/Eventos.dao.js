const db = require('../databases/db')
const { encrypt } = require('../../utils/bcrypt')

const findUsuarios = async () => {
    try {
        const result = await db('SELECT * FROM usuarios;')
        return result
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

const findUsuarioByEmail = async (email) => {
    try {
        const result = await db('SELECT * FROM usuarios WHERE email = $1;', [email])
        return result
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

const createUsuario = async ({ email, password, rol, lenguage }) => {
    try {
        const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *;'
        const values = [email, encrypt(password), rol, lenguage]
        const result = await db(query, values)
        return result
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

const updateUsuario = async (id, { email, password, rol, lenguage }) => {
    try {
        const query = 'UPDATE usuarios SET email = $2, password = $3, rol = $4, lenguage = $5 WHERE id = $1 RETURNING *;'
        const values = [id, email, password, rol, lenguage]
        const result = await db(query, values)
        return result
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

const deleteUsuario = async (id) => {
    try {
        const result = await db('DELETE FROM usuarios WHERE id = $1 RETURNING *;', [id])
        return result
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

module.exports = {
    findUsuarios,
    findUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
}
