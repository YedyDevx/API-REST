import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

export const router = Router();

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

//Ruta para obtener usuario por su ID
router.get('/users/:id', getUser);

// Ruta para crear un usuario
router.post('/users', createUser);

// Ruta para actualizar un usuario
router.put('/users/:id', updateUser);

//Ruta para eliminar un usuario
router.delete('/users/:id', deleteUser);

export default router;
