import jwt from 'jsonwebtoken'
import { User } from '../models/Users.js'

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = new User({email, password})
        await user.save()
        return res.json({ok: true})
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({error: 'Ya existe el usuario'})
        }
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        let user = await User.findOne({ email })
        if (!user) 
            return res.json({ error: "El usuario no esta registrado" }) 

        const passwordValidation = await user.comparePassword(password)
        if (!passwordValidation) 
            return res.json({ error: "Usuario o contraseña incorrecto" })

        // Generación de token
        const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET)


        return res.json({ token })
    } catch (error) {
        console.log(error)
    }
}

