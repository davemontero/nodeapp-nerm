import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt"

const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre("save", async function(next) {
    const user = this
    if (!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        throw new Error("No se pudo generar el hash")
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}


export const User = model('User', userSchema)