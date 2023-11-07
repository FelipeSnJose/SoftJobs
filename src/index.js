require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { jwtSign } = require('../utils/jwt')
const { verifyToken } = require('./middleware/event.middleware')
const { verifyCredentials } = require('./models/Usuarios.dao')
const { findUsuarios, findUsuarioByEmail, createUsuario, updateUsuario, deleteUsuario } = require('./models/Eventos.dao')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
    try {
        const user = await verifyCredentials(req.body.email, req.body.password)

        if (user) {
            res.status(200).json({ token: jwtSign({ email: req.body.email }) })
        } else {
            res.status(400).json({ code: 404, message: 'Resource not found.' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/usuarios/no_existe_aun', verifyToken, async (_, res) => {
    try {
        const events = await findUsuarios()
        res.status(200).json({ events })
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/usuarios', verifyToken, async (req, res) => {
    try {
        const user = await findUsuarioByEmail(req.user.email)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/usuarios', async (req, res) => {
    try {
        const events = await createUsuario(req.body)
        res.status(201).json({ events })
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/usuarios/:id', verifyToken, async (req, res) => {
    try {
        const events = await updateUsuario(req.params.id, req.body)
        res.status(200).json({ events })
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/usuarios/:id', verifyToken, async (req, res) => {
    try {
        const events = await deleteUsuario(req.params.id)
        res.status(200).json({ events })
    } catch (error) {
        res.status(500).json(error)
    }
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Error 404 NOT FOUND' }))

app.listen(PORT, () => console.log(`Servidor ok http://localhost:${PORT}`))
