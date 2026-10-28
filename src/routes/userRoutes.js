// ============================================================
// RUTAS: userRoutes.js
// Define los endpoints de /users y los conecta con el controlador.
// ============================================================

import express from 'express';
import { getAll, getOne } from '../controllers/userController.js';

const router = express.Router();

router.get('/',    getAll);   // GET /users
router.get('/:id', getOne);  // GET /users/:id

export default router;
