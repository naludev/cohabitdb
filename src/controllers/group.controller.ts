import groupModel from "../models/group.model";
import { Request, Response } from 'express';
import userModel from "../models/users.model";
import calendarModel from "../models/calendar.model";

export const createGroup = async (req: Request, res: Response) => {
    try {
        // Crear el nuevo grupo
        const newGroup = new groupModel(req.body);
        await newGroup.save();

        // Crear el calendario asociado al grupo
        const newCalendar = new calendarModel({ groupId: newGroup._id });
        await newCalendar.save();

        // Actualizar el grupo con el ID del nuevo calendario
        newGroup.calendar = newCalendar._id;
        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




export const updateGroup = async (req: Request, res: Response) => {
    try {
        const updatedGroup = await groupModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedGroup) {
            res.status(200).json(updatedGroup);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllGroups = async (req: Request, res: Response) => {
    try {
        const groups = await groupModel.find();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getGroupById = async (req: Request, res: Response) => {
    try {
        const group = await groupModel.findById(req.params.id)
        .populate('calendar') // Asegúrate de usar populate para obtener los detalles del calendario
        .populate('tasks');
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const deletedGroup = await groupModel.findByIdAndDelete(req.params.id);
        if (deletedGroup) {
            res.status(200).json({ message: 'Group deleted' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addUserToGroup = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const group = await groupModel.findById(req.params.id);

        if (group) {
            if (!group.members.includes(userId)) {
                group.members.push(userId);
                group.updatedAt = new Date();
                await group.save();

                // Ahora, actualiza el usuario añadiendo el grupo al array de `groups`
                const user = await userModel.findById(userId);
                if (user) {
                    if (!user.groups.includes(group._id)) {
                        user.groups.push(group._id); // Añadimos el grupo al array del usuario
                        await user.save();
                        res.status(200).json({ group, user });
                    } else {
                        res.status(400).json({ message: 'Group already added to user' });
                    }
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } else {
                res.status(400).json({ message: 'User is already in the group' });
            }
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addUserToGroupByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const group = await groupModel.findById(req.params.id);

        if (group) {
            const user = await userModel.findOne({ email });

            if (user) {
                if (!group.members.includes(user._id)) {
                    group.members.push(user._id);
                    group.updatedAt = new Date();
                    await group.save();

                    // Ahora actualiza el usuario añadiendo el grupo al array de `groups`
                    if (!user.groups.includes(group._id)) {
                        user.groups.push(group._id); // Añadimos el grupo al array del usuario
                        await user.save();
                        res.status(200).json({ group, user });
                    } else {
                        res.status(400).json({ message: 'Group already added to user' });
                    }
                } else {
                    res.status(400).json({ message: 'User is already in the group' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getGroupsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        
        // Verifica si el usuario existe
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Busca los grupos en los que el usuario es miembro
        const groups = await groupModel.find({ members: userId });

        if (groups.length > 0) {
            res.status(200).json(groups);
        } else {
            res.status(404).json({ message: 'No groups found for this user' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getUsersByIds = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid input. Expecting an array of IDs.' });
        }

        const users = await userModel.find({ _id: { $in: ids } }).select('name lastname username email');

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeUserFromGroup = async (req, res) => {
    try {
        // Busca el grupo por ID
        const group = await groupModel.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Busca al usuario por ID
        const user = await userModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifica si el usuario está en el grupo
        const isUserInGroup = group.members.includes(req.params.userId);
        if (!isUserInGroup) {
            return res.status(400).json({ message: 'User is not a member of the group' });
        }

        // Remover el usuario del grupo
        group.members = group.members.filter(memberId => memberId.toString() !== req.params.userId);
        await group.save();

        // Remover el grupo del array de grupos del usuario
        user.groups = user.groups.filter(groupId => groupId.toString() !== group._id.toString());
        await user.save();

        res.status(200).json({ message: 'User removed from group successfully', group, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};