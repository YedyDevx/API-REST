import { badRequestResponse, notFoundResponse, conflictResponse } from './httpResponse.js';
import pool from './db.js'; // Para validar el email en la BD

// Validar que el ID sea numérico
export const isValidateId = (id, res) => {
	if (isNaN(id)) {
		badRequestResponse(res, 'El ID debe ser un número válido');
		return false;
	}
	return true;
};

// Validar si el usuario existe
export const userValidation = (rows, res) => {
	if (rows.length === 0) {
		notFoundResponse(res, 'Usuario no encontrado');
		return false;
	}
	return true;
};

// Validar que el nombre solo contenga letras y espacios
export const validateName = (name, res) => {
	const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
	if (!nameRegex.test(name)) {
		badRequestResponse(res, 'El nombre solo debe contener letras y espacios');
		return false;
	}
	return true;
};

// Validar si el correo ya está en uso
export const validateEmailExists = async (email, res) => {
	try {
		const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
		if (rows.length > 0) {
			conflictResponse(res, 'El correo electrónico ya está en uso');
			return true; // Indica que el correo ya existe
		}
		return false; // Indica que el correo NO existe
	} catch (error) {
		badRequestResponse(res, 'Error validando el correo');
		return true; // Devuelve true para evitar que el código siga ejecutándose
	}
};
