import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import sequelize from './database.js';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../env.js';

const ensureDatabaseExists = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  const databaseName = DB_NAME.replace(/`/g, '``');
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
  await connection.end();
};

export const initializeDatabase = async () => {
  await ensureDatabaseExists();
  await sequelize.authenticate();

  const tablesDirectory = fileURLToPath(new URL('./tables', import.meta.url));
  const tableEntries = (await readdir(tablesDirectory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'));
  const invalidTableFiles = tableEntries
    .filter((entry) => !/^\d+_.+\.js$/.test(entry.name))
    .map((entry) => entry.name);

  if (invalidTableFiles.length > 0) {
    throw new Error(`Los archivos de tablas deben comenzar con un número: ${invalidTableFiles.join(', ')}`);
  }

  const tableFiles = tableEntries
    .map((entry) => entry.name)
    .sort((firstFile, secondFile) => {
      const firstOrder = Number(firstFile.match(/^\d+/)[0]);
      const secondOrder = Number(secondFile.match(/^\d+/)[0]);
      return firstOrder - secondOrder || firstFile.localeCompare(secondFile);
    });

  for (const tableFile of tableFiles) {
    const tableModule = await import(`./tables/${tableFile}`);
    const tableSql = Object.values(tableModule)
      .find((value) => typeof value === 'string' && value.trim().toUpperCase().startsWith('CREATE TABLE'));

    if (!tableSql) {
      throw new Error(`El archivo ${tableFile} no exporta una sentencia CREATE TABLE válida.`);
    }

    await sequelize.query(tableSql);
  }

  console.log('Base de datos conectada y tablas verificadas.');
};

if (process.argv[1]?.endsWith('Insertion.js')) {
  initializeDatabase()
    .then(async () => {
      await sequelize.close();
    })
    .catch(async (error) => {
      console.error('Error al verificar las tablas:', error.message);
      await sequelize.close();
      process.exitCode = 1;
    });
}