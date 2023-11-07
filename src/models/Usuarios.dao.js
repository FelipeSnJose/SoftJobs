const db = require('../databases/db')
const { compareSync } = require('../../utils/bcrypt')

const verifyCredentials = async (email, password) => {
    try {
        const [user] = await db('SELECT * FROM usuarios WHERE email = $1', [email])

        if (!user) {
            return null
        }

        const isPasswordValid = compareSync(password, user.password)

        if (isPasswordValid) {
            return user
        } else {
            return null
        }
    } catch (error) {
        console.error('Error en verifyCredentials:', error)
        throw error
    }
}

module.exports = {
    verifyCredentials
}
