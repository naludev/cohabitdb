import { Document } from 'mongoose';

export interface INotification extends Document {
    userId: string;
    type: string;
    read: boolean;
    message: string;
}
