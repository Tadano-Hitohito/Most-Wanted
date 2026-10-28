import Database from 'better-sqlite3';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dataDirectory = join(process.cwd(), 'data');
const databasePath = join(dataDirectory, 'oficiales.db');

if (!existsSync(dataDirectory)) {
  mkdirSync(dataDirectory, { recursive: true });
}

const db = new Database(databasePath);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

const schema = `
CREATE TABLE IF NOT EXISTS oficiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cedula TEXT NOT NULL UNIQUE,
  apellidos TEXT NOT NULL,
  nombres TEXT NOT NULL,
  sexo TEXT,
  edad INTEGER,
  fecha_nacimiento TEXT,
  lugar_nacimiento TEXT,
  partida_nacimiento TEXT,
  grupo_sanguineo TEXT,
  estado_civil TEXT,
  rif TEXT,
  carnet_patria TEXT,
  direccion TEXT,
  correo TEXT,
  telefono_movil TEXT,
  telefono_fijo TEXT,
  centro_votacion TEXT,
  talla_zapato TEXT,
  talla_camisa TEXT,
  talla_pantalon TEXT,
  talla_cinturon TEXT,
  talla_gorra TEXT DEFAULT 'Talla Única',
  estatura REAL,
  peso REAL,
  contextura TEXT,
  tipo_piel TEXT,
  color_ojos TEXT,
  tatuajes TEXT,
  cicatriz TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS datos_profesionales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  oficial_id INTEGER NOT NULL UNIQUE,
  rango TEXT,
  estatus_actual TEXT,
  desarrollo_carrera TEXT,
  credencial_unica TEXT UNIQUE,
  fecha_ingreso TEXT,
  curso_formacion TEXT,
  fecha_ingreso_administracion TEXT,
  anos_servicio_publico TEXT,
  formacion_militar TEXT,
  documentacion_ingreso TEXT,
  tiempo_curso_formacion TEXT,
  tiempo_funcion_policial TEXT,
  nivel_academico TEXT,
  grado_academico TEXT,
  lugar_estudio TEXT,
  especialidades TEXT,
  estatus_estudio TEXT,
  segunda_carrera TEXT,
  centro_formacion TEXT,
  titulo_formacion TEXT,
  institucion TEXT,
  FOREIGN KEY (oficial_id) REFERENCES oficiales(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS condicion_vulnerable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  oficial_id INTEGER NOT NULL UNIQUE,
  area TEXT,
  tipo_vivienda TEXT,
  gravedad_inmueble TEXT,
  cantidad_nucleos_familiares INTEGER,
  cantidad_personas_vivienda INTEGER,
  cantidad_hijos INTEGER,
  personas_tercera_edad INTEGER,
  personas_condicion_medica INTEGER,
  reseña_amenaza TEXT,
  FOREIGN KEY (oficial_id) REFERENCES oficiales(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS condicion_medica (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  oficial_id INTEGER NOT NULL UNIQUE,
  patologia_medica TEXT,
  alergias TEXT,
  FOREIGN KEY (oficial_id) REFERENCES oficiales(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacto_emergencia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  oficial_id INTEGER NOT NULL UNIQUE,
  nombres_apellidos_familiar TEXT,
  direccion TEXT,
  telefono TEXT,
  parentesco TEXT,
  FOREIGN KEY (oficial_id) REFERENCES oficiales(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_oficiales_cedula ON oficiales(cedula);
CREATE INDEX IF NOT EXISTS idx_oficiales_apellidos ON oficiales(apellidos);
CREATE INDEX IF NOT EXISTS idx_datos_profesionales_rango ON datos_profesionales(rango);
`;

try {
  db.exec(schema);
  const count = db.prepare('SELECT COUNT(*) AS total FROM oficiales').get().total;
  console.log(`Base SQLite creada: ${databasePath}`);
  console.log(`Tablas: oficiales, datos_profesionales, condicion_vulnerable, condicion_medica, contacto_emergencia`);
  console.log(`Registros actuales: ${count}`);
} catch (error) {
  console.error('No se pudo crear la base SQLite:', error.message);
  process.exitCode = 1;
} finally {
  db.close();
}
