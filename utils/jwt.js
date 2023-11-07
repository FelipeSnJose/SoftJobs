require('dotenv').config()
const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_SECRET_KEY

const jwtVerify = (token) => {
    try {
        return jwt.verify(token, KEY)
    } catch (error) {
        console.log('error',error)
        throw error
    }
}

const jwtSign = (payload) => {
    try {
        return jwt.sign(payload, KEY, { expiresIn: 60 * 5 })
    } catch (error) {
        console.log('error',error)
        throw error
    }
}

module.exports = { jwtVerify, jwtSign }
