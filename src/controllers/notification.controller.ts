import notificationModel from "../models/notification.model";
import userModel from "../models/users.model";
import { Request, Response } from 'express';

// Obtener todas las notificaciones
export const getAllNotifications = async (req, res) => {
    try {
        const userId = req.id; // Asegúrate de que el ID del usuario esté disponible en req.user
        const notifications = await notificationModel.find({ userId });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Obtener una notificación por ID
export const getNotificationById = async (req, res) => {
    try {
        const notification = await notificationModel.findById(req.params.id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear una nueva notificación
export const createNotification = async (req: Request, res: Response) => {
    const { userId, type, message } = req.body;

    try {
        const notification = new notificationModel({
            userId,
            type,
            read: false,
            message,
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Marcar una notificación como leída
export const markNotificationAsRead = async (req: Request, res: Response) => {
    try {
        const notification = await notificationModel.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
