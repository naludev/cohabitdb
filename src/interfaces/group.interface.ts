import { Document } from 'mongoose';
import { IUser } from './users.interface';
import { ITask } from './task.interface';
import { ICalendar } from './calendar.interface';

export interface IGroup extends Document {
    name: string;
    description?: string;
    members?: IUser[];
    tasks?: ITask[];
    calendar?: ICalendar,
    createdAt: Date;
    updatedAt: Date;
}
