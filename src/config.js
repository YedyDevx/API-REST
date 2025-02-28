//Aqui vamos a transportar las variables de entorno a una constante para poder utilizarlas en cualquier parte de la aplicación.
import 'dotenv/config';  // Asegura que dotenv cargue las variables de entorno

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT; //Puerto de la base de datos
export const PORT = process.env.PORT; //Puerto del servidor

console.log(DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT); // Para debuggear
