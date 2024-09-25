import express from 'express';
import {
    getAllNotifications,
    getNotificationById,
    createNotification,
    markNotificationAsRead,
} from '../controllers/notification.controller';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API to manage notifications
 */

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Obtener todas las notificaciones de un usuario
 *     tags: [Notifications]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Una lista de notificaciones del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "607d2c5d9e1d4f1c2d3c4567"
 *                   userId:
 *                     type: string
 *                     example: "607d2c5d9e1d4f1c2d3c4567"
 *                   type:
 *                     type: string
 *                     example: "info"
 *                   message:
 *                     type: string
 *                     example: "Tienes un nuevo mensaje."
 *                   read:
 *                     type: boolean
 *                     example: false
 *       500:
 *         description: Error al obtener las notificaciones.
 */
router.get('/notifications/:id', getAllNotifications);

/**
 * @swagger
 * /notifications/{userId}/{id}:
 *   get:
 *     summary: Obtener una notificación por ID
 *     tags: [Notifications]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la notificación.
 *       404:
 *         description: Notificación no encontrada.
 *       500:
 *         description: Error al obtener la notificación.
 */
router.get('/notifications/:userId/:id', getNotificationById);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Crear una nueva notificación
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "607d2c5d9e1d4f1c2d3c4567"
 *               type:
 *                 type: string
 *                 example: "info"
 *               message:
 *                 type: string
 *                 example: "Tienes un nuevo mensaje."
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente.
 *       500:
 *         description: Error al crear la notificación.
 */
router.post('/notifications', createNotification);

/**
 * @swagger
 * /notifications/{userId}/{id}/read:
 *   put:
 *     summary: Marcar una notificación como leída
 *     tags: [Notifications]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notificación marcada como leída.
 *       404:
 *         description: Notificación no encontrada.
 *       500:
 *         description: Error al marcar la notificación.
 */
router.put('/notifications/:userId/:id/read', markNotificationAsRead);

export default router;
