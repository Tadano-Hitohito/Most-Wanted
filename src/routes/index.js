// ============================================================
// RUTAS: index.js — router principal
// Centraliza y registra todas las rutas del proyecto.
// app.js solo importa este archivo.
// ============================================================

import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);

export default router;
