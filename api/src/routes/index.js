const { Router } = require('express'); //* Esto lo que hace es crear una instancia de ruteo, en otras palabras
//* para crear otras rutas.

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Countries = require('./countries');
const Activities = require('./activities');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", Countries); //* configuramos los routers con middlewares 
router.use("/activities", Activities);

module.exports = router;
