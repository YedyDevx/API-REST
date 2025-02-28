import pg from 'pg';
import {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../config.js';

const { Pool } = pg;

// Configuración de la conexión
const pool = new Pool({
	user: DB_USER,
	host: DB_HOST,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	port: DB_PORT,
});

// Verificar conexión
(async () => {
	try {
		const client = await pool.connect();
		console.log("📌 Conexión exitosa a PostgreSQL");
		client.release();
	} catch (err) {
		console.error("❌ Error de conexión a PostgreSQL:", err);
	}
})();

export default pool;
