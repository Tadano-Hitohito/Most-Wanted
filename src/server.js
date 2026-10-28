// ============================================================
// server.js — Punto de entrada de la aplicación
// Importa app.js y arranca el servidor HTTP.
// Separar server.js de app.js facilita pruebas unitarias.
// ============================================================

import app        from './app.js';
import { PORT }   from './config/env.js';

const server = app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso.`);
    console.error(`Abre http://localhost:${PORT} o detén el proceso existente antes de iniciar otro servidor.`);
    process.exitCode = 1;
    return;
  }

  console.error('No se pudo iniciar el servidor:', error);
  process.exitCode = 1;
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
