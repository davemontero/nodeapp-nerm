import mongoose from "mongoose"

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Connect to MongoDB')
} catch (error) {
    console.log(`Cannot connect to MongoDB: ${error}`)
}