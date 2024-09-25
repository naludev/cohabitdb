import calendarModel from "../models/calendar.model";
import groupModel from "../models/group.model";
import taskModel from "../models/task.model";
import userModel from "../models/users.model";


export const getUserByAssignedTo = async (req, res) => {
    try {
        const { assignedTo } = req.params; // Obtener el ID del usuario asignado desde los parámetros

        // Buscar el usuario por su ID
        const user = await userModel.findById(assignedTo);
        
        if (user) {
            res.json(user); // Retornar la información del usuario
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, assignedTo, date, dueDate } = req.body;

        // Buscar y actualizar solo los campos permitidos
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            { title, description, assignedTo, date, dueDate },
            { new: true, runValidators: true } // Retorna la tarea actualizada
        );

        if (updatedTask) {
            res.json({
                message: 'Task updated successfully',
                task: updatedTask,
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, groupId, calendarId, status, date, dueDate } = req.body;

        const newTask = new taskModel({
            title,
            description,
            assignedTo,
            groupId,
            status,
            date,
            dueDate,
        });

        const savedTask = await newTask.save();

        const calendar = await calendarModel.findById(calendarId);
        if (!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }

        calendar.tasks.push(savedTask._id);
        await calendar.save();

        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        group.tasks.push(savedTask._id);
        await group.save();

        res.status(201).json({
            message: 'Task created and added to calendar and group',
            task: savedTask,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id)
        if (task) res.json(task);
        else res.status(404).json({ message: 'Task not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la tarea desde los parámetros

        // Buscar y actualizar el estado de la tarea
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            { status: 'realizada' }, // Cambiar el estado a "realizada"
            { new: true, runValidators: true } // Retorna la tarea actualizada
        );

        if (updatedTask) {
            res.json({
                message: 'Task status updated to "realizada"',
                task: updatedTask,
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la tarea desde los parámetros

        const deletedTask = await taskModel.findByIdAndDelete(id);

        if (deletedTask) {
            res.json({
                message: 'Task deleted successfully',
                task: deletedTask,
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
