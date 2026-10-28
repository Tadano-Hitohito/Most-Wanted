import Database from 'better-sqlite3';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const databasePath = join(process.cwd(), 'data', 'oficiales.db');

if (!existsSync(databasePath)) {
  console.error('No existe data/oficiales.db. Ejecuta: npm run db:sqlite');
  process.exitCode = 1;
} else {
  const db = new Database(databasePath, { readonly: true });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const officers = db.prepare('SELECT id, cedula, apellidos, nombres FROM oficiales ORDER BY id').all();

  console.log('Base de datos:', databasePath);
  console.log('Tablas:', tables.map(({ name }) => name).join(', '));
  console.log('Oficiales:', officers.length);
  console.table(officers);
  db.close();
}
