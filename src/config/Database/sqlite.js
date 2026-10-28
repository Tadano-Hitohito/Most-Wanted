import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.resolve(currentDirectory, '../../../data');
mkdirSync(dataDirectory, { recursive: true });

export const databasePath = path.join(dataDirectory, 'most-wanted.db');
const database = new Database(databasePath);
database.pragma('foreign_keys = ON');
database.pragma('journal_mode = WAL');

export default database;
