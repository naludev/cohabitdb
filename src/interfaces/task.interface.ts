import { Document } from 'mongoose';
import { IGroup } from './group.interface';

export interface ITask extends Document {
    title: string;
    description: string;
    assignedTo?: string;
    groupId: IGroup;
    status: 'pendiente' | 'realizada';
    date?: Date;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
