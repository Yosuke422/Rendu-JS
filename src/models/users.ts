import { Document, Schema, model } from 'mongoose'

export interface IAuthentication extends Document {
    email: string
    password: string
}

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export default model<IAuthentication>('user', userSchema);
