import mongoose, { Schema } from 'mongoose';
import { ICalendar } from '../interfaces/calendar.interface';

const calendarSchema: Schema = new Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const calendarModel = mongoose.model<ICalendar>('Calendar', calendarSchema);
export default calendarModel;
