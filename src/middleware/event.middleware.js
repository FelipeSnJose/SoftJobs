const { jwtVerify } = require('../../utils/jwt')

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        return res.status(401).json({
            code: 401,
            message: 'Falta token.'
        })
    }

    const [bearer, token] = authorizationHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({
            code: 401,
            message: 'Formato inválido.'
        })
    }

    try {
        const decodedUser = jwtVerify(token);

        if (!decodedUser) {
            return res.status(401).json({
                code: 401,
                message: 'Token inválido.'
            })
        }

        req.user = decodedUser;
        next();
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: 'Error de verificacion: ' + error.message
        })
    }
}

module.exports = {
    verifyToken
}
