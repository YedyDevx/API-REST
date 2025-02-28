export const successResponse = (res, data, message = 'Operación exitosa') => {
	res.status(200).json({ status: 200, message, data });
};

export const createdResponse = (res, data, message = 'Recurso creado correctamente') => {
	res.status(201).json({ status: 201, message, data });
};

export const notFoundResponse = (res, message = 'Recurso no encontrado') => {
	res.status(404).json({ status: 404, message });
};

export const badRequestResponse = (res, message = 'Solicitud incorrecta') => {
	res.status(400).json({ status: 400, message });
};

export const conflictResponse = (res, message = 'Conflicto en la solicitud') => {
	res.status(409).json({ status: 409, message });
};

export const serverErrorResponse = (res, error) => {
	console.error('Error:', error.message);
	res.status(500).json({ status: 500, message: 'Error interno del servidor', error: error.message });
};
