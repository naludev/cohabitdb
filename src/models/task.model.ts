import mongoose, { Schema } from 'mongoose';
import { ITask } from '../interfaces/task.interface';

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    status: { type: String, enum: ['pendiente', 'realizada'], default: 'pendiente' },
    date: { type: Date },
    dueDate: { type: Date },
}, { timestamps: true });

const taskModel = mongoose.model<ITask>('Task', taskSchema);
export default taskModel;
