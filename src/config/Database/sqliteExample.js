import Database from 'better-sqlite3';
import { join } from 'node:path';

const db = new Database(join(process.cwd(), 'data', 'oficiales.db'));
db.pragma('foreign_keys = ON');

const insertOfficer = db.transaction((official) => {
  const result = db.prepare(`
    INSERT OR IGNORE INTO oficiales
      (cedula, apellidos, nombres, sexo, edad, fecha_nacimiento, grupo_sanguineo, estado_civil, talla_gorra)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Talla Única')
  `).run(
    official.cedula,
    official.apellidos,
    official.nombres,
    official.sexo,
    official.edad,
    official.fechaNacimiento,
    official.grupoSanguineo,
    official.estadoCivil
  );

  if (result.changes === 0) {
    console.log(`La cédula ${official.cedula} ya existe; no se duplicó.`);
    return;
  }

  const oficialId = Number(result.lastInsertRowid);
  db.prepare(`
    INSERT INTO datos_profesionales
      (oficial_id, rango, estatus_actual, credencial_unica, fecha_ingreso)
    VALUES (?, ?, ?, ?, ?)
  `).run(oficialId, official.rango, 'Activo', official.credencial, official.fechaIngreso);

  db.prepare(`INSERT INTO condicion_medica (oficial_id, patologia_medica, alergias) VALUES (?, ?, ?)`)
    .run(oficialId, 'Ninguna registrada', 'Ninguna registrada');

  db.prepare(`INSERT INTO contacto_emergencia (oficial_id, nombres_apellidos_familiar, parentesco, telefono) VALUES (?, ?, ?, ?)`)
    .run(oficialId, official.contactoNombre, official.contactoParentesco, official.contactoTelefono);

  console.log(`Oficial registrado con ID ${oficialId}: ${official.nombres} ${official.apellidos}`);
});

try {
  insertOfficer({
    cedula: 'V-00000000',
    apellidos: 'García',
    nombres: 'Carlos',
    sexo: 'Masculino',
    edad: 30,
    fechaNacimiento: '1995-01-01',
    grupoSanguineo: 'O+',
    estadoCivil: 'Soltero/a',
    rango: 'Oficial',
    credencial: 'PMZ-0001',
    fechaIngreso: '2024-01-01',
    contactoNombre: 'María García',
    contactoParentesco: 'Familiar',
    contactoTelefono: '0000-0000000'
  });
} finally {
  db.close();
}
