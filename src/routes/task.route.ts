import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, getUserByAssignedTo, updateTask, updateTaskStatus } from '../controllers/task.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gestión de tareas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea y la asigna a un calendario
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *                 example: "Nueva Tarea"
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea
 *                 example: "Descripción de la nueva tarea"
 *               assignedTo:
 *                 type: string
 *                 description: ID del usuario asignado a la tarea
 *                 example: "64e7b9f9c4d3e00f21f99c82"
 *               groupId:
 *                 type: string
 *                 description: ID del grupo al que pertenece la tarea
 *                 example: "64e7b9f9c4d3e00f21f99c83"
 *               calendarId:
 *                 type: string
 *                 description: ID del calendario al que pertenece la tarea
 *                 example: "64e7b9f9c4d3e00f21f99c84"
 *               status:
 *                 type: string
 *                 enum: [pendiente, realizada]
 *                 description: El estado de la tarea
 *                 example: "pendiente"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación de la tarea
 *                 example: "2024-09-17"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha límite para completar la tarea
 *                 example: "2024-09-25"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente y añadida al calendario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task created and added to calendar"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/tasks', createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/tasks', getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea obtenida por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/tasks/:id', getTaskById);

/**
 * @swagger
 * /tasks/{id}/status:
 *   put:
 *     summary: Cambia el estado de una tarea a "realizada"
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Task status updated to "realizada"'
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error de servidor
 */
router.put('/tasks/:id/status', updateTaskStatus);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Task deleted successfully'
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error de servidor
 */
router.delete('/tasks/:id', deleteTask);



/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Edita una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El nuevo título de la tarea
 *                 example: "Tarea actualizada"
 *               description:
 *                 type: string
 *                 description: La nueva descripción de la tarea
 *                 example: "Descripción actualizada"
 *               assignedTo:
 *                 type: string
 *                 description: ID del nuevo usuario asignado
 *                 example: "64e7b9f9c4d3e00f21f99c82"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de la tarea
 *                 example: "2024-09-18"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha límite para la tarea
 *                 example: "2024-09-28"
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error de servidor
 */
router.put('/tasks/:id', updateTask);



/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user/{assignedTo}:
 *   get:
 *     summary: Get user information by assignedTo ID
 *     tags: [User]
 *     parameters:
 *       - name: assignedTo
 *         in: path
 *         required: true
 *         description: The ID of the user assigned to the task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b2b"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get('/user/:assignedTo', getUserByAssignedTo);

export default router;
