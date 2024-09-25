import express from 'express';
import { getCalendarById } from '../controllers/calendar.controller';

const router = express.Router();

/**
 * @swagger
 * /calendars/{id}:
 *   get:
 *     summary: Obtener el calendario por ID
 *     description: Obtiene un calendario específico usando su ID. Incluye información sobre el grupo y las tareas asociadas.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del calendario que se desea obtener
 *         schema:
 *           type: string
 *           example: 607c191e810c19729de860ea
 *     responses:
 *       200:
 *         description: Calendario obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       404:
 *         description: Calendario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Calendar not found
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.get('/calendars/:id', getCalendarById);

export default router;
