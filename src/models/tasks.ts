import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    createdAt: Date,
    updatedAt: Date
})

export const Task = mongoose.model('Task', taskSchema)
