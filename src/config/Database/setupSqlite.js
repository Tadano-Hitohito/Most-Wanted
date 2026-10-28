import database, { databasePath } from './sqlite.js';

const schema = database.transaction(() => {
  database.exec(`
    CREATE TABLE IF NOT EXISTS funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cedula TEXT NOT NULL UNIQUE,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      sexo TEXT,
      edad INTEGER,
      fecha_nacimiento TEXT,
      lugar_nacimiento TEXT,
      partida_nacimiento TEXT,
      grupo_sanguineo TEXT,
      estado_civil TEXT,
      carnet_patria TEXT,
      estado TEXT NOT NULL DEFAULT 'Activo',
      creado_en TEXT NOT NOT DEFAULT CURRENT_TIMESTAMP,
      actualizado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS datos_profesionales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER NOT NULL UNIQUE,
      rango TEXT,
      desarrollo_carrera TEXT,
      credencial_unica TEXT,
      fecha_ingreso TEXT,
      curso_formacion TEXT,
      fecha_ingreso_publica TEXT,
      anos_servicio_publica TEXT,
      formacion_militar TEXT,
      documentacion_ingreso TEXT,
      nivel_academico TEXT,
      grado_academico TEXT,
      lugar_estudio TEXT,
      especialidades TEXT,
      estatus_estudio TEXT,
      segunda_carrera TEXT,
      centro_formacion TEXT,
      titulo_formacion TEXT,
      institucion TEXT,
      tiempo_curso TEXT,
      tiempo_funcion TEXT,
      FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS condicion_vulnerable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER NOT NULL UNIQUE,
      area TEXT,
      tipo_vivienda TEXT,
      gravedad_inmueble TEXT,
      cantidad_nucleos INTEGER DEFAULT 0,
      cantidad_personas INTEGER DEFAULT 0,
      cantidad_hijos INTEGER DEFAULT 0,
      personas_tercera_edad INTEGER DEFAULT 0,
      personas_condicion_medica INTEGER DEFAULT 0,
      breve_resena_amenaza TEXT,
      FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS condicion_medica (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER NOT NULL UNIQUE,
      patologia_medica TEXT,
      alergias TEXT,
      FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contacto_emergencia (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER NOT NULL UNIQUE,
      nombres_apellidos TEXT,
      direccion TEXT,
      telefono TEXT,
      parentesco TEXT,
      FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS auditoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      funcionario_id INTEGER,
      accion TEXT NOT NULL,
      detalle TEXT,
      creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_funcionarios_cedula ON funcionarios(cedula);
    CREATE INDEX IF NOT EXISTS idx_funcionarios_apellidos ON funcionarios(apellidos);
    CREATE INDEX IF NOT EXISTS idx_funcionarios_estado ON funcionarios(estado);
  `);
});

try {
  schema();
  const count = database.prepare('SELECT COUNT(*) AS total FROM funcionarios').get().total;
  console.log(`Base SQLite creada: ${databasePath}`);
  console.log(`Tablas listas. Funcionarios registrados: ${count}`);
} finally {
  database.close();
}
