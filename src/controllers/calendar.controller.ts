import { Request, Response } from 'express';
import calendarModel from '../models/calendar.model';

export const createCalendar = async (req: Request, res: Response) => {
    try {
        const { groupId, tasks } = req.body;

        // Crear un nuevo calendario asociado al grupo
        const newCalendar = new calendarModel({ groupId, tasks });
        await newCalendar.save();
        res.status(201).json(newCalendar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getCalendarById = async (req: Request, res: Response) => {
    try {
        const calendarId = req.params.id; // El ID del calendario se pasa como parámetro

        // Buscar el calendario por su ID
        const calendar = await calendarModel.findById(calendarId).populate('tasks');

        if (calendar) {
            res.status(200).json(calendar);
        } else {
            res.status(404).json({ message: 'Calendar not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
