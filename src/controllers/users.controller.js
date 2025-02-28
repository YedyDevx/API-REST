import pool from '../utils/db.js';
import { isValidateId, userValidation, validateName, validateEmailExists } from '../utils/validations.js';
import {
	successResponse,
	createdResponse,
	conflictResponse,
	serverErrorResponse,
} from '../utils/httpResponse.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
	try {
		const { rows } = await pool.query('SELECT * FROM users');
		successResponse(res, rows, 'Usuarios obtenidos correctamente');
	} catch (error) {
		serverErrorResponse(res, error);
	}
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;

		// Validar ID
		if (isValidateId(id, res)) return;

		// Consultar usuario
		const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

		// Validar existencia del usuario
		if (userValidation(rows, res)) return;

		// Responder con éxito
		successResponse(res, rows[0]);
	} catch (error) {
		serverErrorResponse(res, error);
	}
};

// Crear un usuario
export const createUser = async (req, res) => {
	const { name, email } = req.body;

	// Validaciones
	if (validateName(name, res)) return;
	const emailExists = await validateEmailExists(email, res);
	if (emailExists) return;

	try {
		const { rows } = await pool.query(
			'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
			[name, email]
		);

		createdResponse(res, rows[0]);
	} catch (error) {
		if (error.code === '23505') return conflictResponse(res, 'El usuario ya existe');
		serverErrorResponse(res, error);
	}
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;

	// Validaciones
	if (isValidateId(id, res)) return;
	if (validateName(name, res)) return;

	// Verificar si el usuario existe antes de actualizar
	const { rows: user } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	if (userValidation(user, res)) return;

	// Evitar que el email ya exista en otro usuario
	if (await validateEmailExists(email, res, id)) return;

	try {
		const { rows } = await pool.query(
			'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
			[name, email, id]
		);

		successResponse(res, rows[0], 'Usuario actualizado correctamente');
	} catch (error) {
		serverErrorResponse(res, error);
	}
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
	const { id } = req.params;

	// Validar ID
	if (isValidateId(id, res)) return;

	// Verificar si el usuario existe antes de eliminar
	const { rows: user } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	if (userValidation(user, res)) return;

	try {
		await pool.query('DELETE FROM users WHERE id = $1', [id]);
		successResponse(res, null, `Usuario con ID ${id} eliminado correctamente`);
	} catch (error) {
		serverErrorResponse(res, error);
	}
};
