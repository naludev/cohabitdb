import express from 'express';
import { 
    getAllGroups, 
    getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup,
    addUserToGroup,
    getUsersByIds,
    getGroupsByUserId,
    addUserToGroupByEmail, 
    removeUserFromGroup
} from '../controllers/group.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: Array de IDs de miembros del grupo
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *           description: Array de IDs de tareas del grupo
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Obtiene todos los grupos
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Lista de todos los grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/groups', getAllGroups);

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Obtiene un grupo por ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 *     responses:
 *       200:
 *         description: Grupo obtenido por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Grupo no encontrado
 */
router.get('/groups/:id', getGroupById);

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Crea un nuevo grupo
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */
router.post('/groups', createGroup);

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     summary: Actualiza un grupo existente
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Grupo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Grupo no encontrado
 */
router.put('/groups/:id', updateGroup);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Elimina un grupo existente
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 *     responses:
 *       200:
 *         description: Grupo eliminado exitosamente
 *       404:
 *         description: Grupo no encontrado
 */
router.delete('/groups/:id', deleteGroup);

/**
 * @swagger
 * /groups/{id}/users:
 *   post:
 *     summary: Agrega un usuario al grupo
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario a agregar
 *     responses:
 *       200:
 *         description: Usuario agregado exitosamente
 *       404:
 *         description: Grupo no encontrado
 */
router.post('/groups/:id/users', addUserToGroup);

/**
 * @swagger
 * /groups/users:
 *   post:
 *     summary: Obtiene información de los usuarios por un array de IDs
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array de IDs de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenidos por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del usuario
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                   lastname:
 *                     type: string
 *                     description: Apellido del usuario
 *                   username:
 *                     type: string
 *                     description: Nombre de usuario
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: No se encontraron usuarios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/groups/users', getUsersByIds);

/**
 * @swagger
 * /groups/user/{userId}:
 *   get:
 *     summary: Obtiene todos los grupos de un usuario por ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de grupos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       404:
 *         description: No se encontraron grupos para este usuario
 */
router.get('/groups/user/:userId', getGroupsByUserId);

/**
 * @swagger
 * /groups/{id}/users/email:
 *   post:
 *     summary: Agrega un usuario al grupo por su email
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario a agregar
 *     responses:
 *       200:
 *         description: Usuario agregado exitosamente
 *       404:
 *         description: Grupo o usuario no encontrado
 */
router.post('/groups/:id/users/email', addUserToGroupByEmail);
/**
 * @swagger
 * /groups/{groupId}/users/{userId}:
 *   delete:
 *     summary: Remove a user from a group
 *     description: Removes a user from the specified group by their user ID.
 *     tags:
 *       - Groups
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to remove from the group
 *     responses:
 *       200:
 *         description: User removed from group successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User removed from group successfully
 *                 group:
 *                   $ref: '#/components/schemas/Group'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User is not a member of the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User is not a member of the group
 *       404:
 *         description: Group or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Group not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete('/groups/:groupId/users/:userId', removeUserFromGroup);




export default router;
