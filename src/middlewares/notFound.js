// ============================================================
// MIDDLEWARE: notFound.js
// Captura peticiones a rutas inexistentes → error 404.
// ============================================================

export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};
