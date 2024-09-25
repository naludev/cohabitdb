import { Document } from 'mongoose';
import { ITask } from './task.interface';
import { IGroup } from './group.interface';

export interface ICalendar extends Document {
    groupId: string;
    tasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
}
