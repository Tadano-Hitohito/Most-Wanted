// ============================================================
// CONFIG: env.js
// Carga y exporta todas las variables de entorno del proyecto.
// Centralizar aquí evita acceder a process.env disperso en el código.
// ============================================================

import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT || 3306);
export const DB_NAME = process.env.DB_NAME || 'express_profesional';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
