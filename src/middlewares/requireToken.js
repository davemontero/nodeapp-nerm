import jwt from "jsonwebtoken"

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization
        if (!token) throw new Error('No existe el token el header no uso Bearer')

        token = token.split(' ')[1]
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        next()
    } catch (error) {
        return res.json({ error: error.message})
    }
}