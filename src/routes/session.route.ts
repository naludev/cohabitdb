import * as express from 'express';
import { login, logout, isAuthenticated, checkSessionStatus } from '../controllers/session.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 * 
 *     SessionStatus:
 *       type: object
 *       properties:
 *         loggedIn:
 *           type: boolean
 *           description: Estado de inicio de sesión del usuario
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente
 *       400:
 *         description: Correo o contraseña inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/login', login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cerrar sesión de un usuario
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post('/logout', isAuthenticated, logout);

/**
 * @swagger
 * /session/status:
 *   get:
 *     summary: Verifica si el usuario ha iniciado sesión
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: El usuario ha iniciado sesión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SessionStatus'
 *       401:
 *         description: El usuario no ha iniciado sesión
 */
router.get('/session/status', isAuthenticated, checkSessionStatus);

export default router;
