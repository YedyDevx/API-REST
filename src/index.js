import express from 'express';
import { PORT } from './config.js'; // Import the PORT variable from config.js
import userRoutes from './routes/user.routes.js'; // Import the userRoutes from user.routes.js
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // Middleware para ver las peticiones en consola
app.use(express.json()); // Middleware para que express pueda entender los json
app.use(userRoutes); // Uso de las rutas de usuario

//Puerto donde va correr el servidor
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

