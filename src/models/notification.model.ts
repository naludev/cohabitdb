import mongoose, { Schema } from 'mongoose';
import { INotification } from '../interfaces/notification.interface';

const notificationSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    read: { type: Boolean, default: false },
    message: { type: String, required: true }
}, { timestamps: true });

const notificationModel = mongoose.model<INotification>('Notification', notificationSchema);
export default notificationModel;