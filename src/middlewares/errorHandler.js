// ============================================================
// MIDDLEWARE: errorHandler.js
// Manejador global de errores. Debe registrarse ÚLTIMO en app.js.
// ============================================================

import { NODE_ENV } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : undefined,
  });
};
