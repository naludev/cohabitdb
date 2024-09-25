import mongoose, { Schema } from 'mongoose';
import { IGroup } from '../interfaces/group.interface';
import userModel from './users.model';
import taskModel from './task.model';

const groupSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.Mixed }], // Usar Mixed para permitir subdocumentos
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    createdAt: { type: Date },
    updatedAt: { type: Date },
}, { timestamps: true });

const groupModel = mongoose.model<IGroup>('Group', groupSchema);
export default groupModel;