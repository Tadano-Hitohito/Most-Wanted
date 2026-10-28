import Database from 'better-sqlite3';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const databasePath = join(process.cwd(), 'data', 'oficiales.db');
if (!existsSync(databasePath)) {
  console.error('Primero ejecuta: npm run db:sqlite');
  process.exit(1);
}

const db = new Database(databasePath);
db.pragma('foreign_keys = ON');

const oficiales = [
  ['V-14782193', 'Kennedy', 'Leon S.', 'Masculino', 38, '1988-03-14', 'O+', 'Soltero/a', 'Oficial Inspector', 'Activo', 'PMZ-1001'],
  ['V-18345210', 'Valentina', 'Jill', 'Femenino', 36, '1990-06-02', 'AB+', 'Soltera/a', 'Subcomisario', 'Activo', 'PMZ-1002'],
  ['V-21357846', 'Morales Pérez', 'Daniel Alejandro', 'Masculino', 34, '1992-09-18', 'A+', 'Casado/a', 'Oficial Agregado', 'Activo', 'PMZ-1003'],
  ['V-25896314', 'Rojas Castillo', 'Andrea Carolina', 'Femenino', 31, '1995-02-11', 'B+', 'Soltera/a', 'Detective', 'Comisión', 'PMZ-1004'],
  ['V-17120589', 'Vargas Núñez', 'Miguel Ángel', 'Masculino', 42, '1984-05-27', 'O-', 'Casado/a', 'Comisario', 'Activo', 'PMZ-1005'],
  ['V-30988741', 'Contreras Gil', 'Mariana Isabel', 'Femenino', 29, '1997-07-09', 'A-', 'Soltera/a', 'Oficial', 'Activo', 'PMZ-1006'],
  ['V-24663108', 'Salazar Medina', 'Luis Fernando', 'Masculino', 33, '1993-01-22', 'O+', 'Casado/a', 'Sargento Primero', 'Licencia', 'PMZ-1007'],
  ['V-19875243', 'Blanco Herrera', 'Yoselin Paola', 'Femenino', 40, '1986-11-05', 'B-', 'Divorciada/a', 'Oficial Inspector', 'Activo', 'PMZ-1008'],
  ['V-27441965', 'Martínez Silva', 'José Enrique', 'Masculino', 37, '1989-04-30', 'AB-', 'Soltero/a', 'Detective', 'Activo', 'PMZ-1009'],
  ['V-33102487', 'Peña Torres', 'Gabriela Alejandra', 'Femenino', 27, '1999-08-16', 'A+', 'Soltera/a', 'Oficial', 'Activo', 'PMZ-1010']
];

const insert = db.transaction(() => {
  const insertPersonal = db.prepare(`INSERT OR IGNORE INTO oficiales
    (cedula, apellidos, nombres, sexo, edad, fecha_nacimiento, grupo_sanguineo, estado_civil, talla_gorra)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Talla Única')`);
  const updatePersonal = db.prepare(`UPDATE oficiales SET
    lugar_nacimiento=?, partida_nacimiento=?, rif=?, carnet_patria=?, direccion=?, correo=?,
    telefono_movil=?, telefono_fijo=?, centro_votacion=?, talla_zapato=?, talla_camisa=?,
    talla_pantalon=?, talla_cinturon=?, talla_gorra='Talla Única', estatura=?, peso=?,
    contextura=?, tipo_piel=?, color_ojos=?, tatuajes=?, cicatriz=? WHERE cedula=?`);
  const findPersonal = db.prepare('SELECT id FROM oficiales WHERE cedula=?');
  const upsertProfessional = db.prepare(`INSERT INTO datos_profesionales
    (oficial_id, rango, estatus_actual, desarrollo_carrera, credencial_unica, fecha_ingreso,
     curso_formacion, fecha_ingreso_administracion, anos_servicio_publico, formacion_militar,
     documentacion_ingreso, tiempo_curso_formacion, tiempo_funcion_policial, nivel_academico,
     grado_academico, lugar_estudio, especialidades, estatus_estudio, segunda_carrera,
     centro_formacion, titulo_formacion, institucion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(oficial_id) DO UPDATE SET rango=excluded.rango,
    estatus_actual=excluded.estatus_actual, desarrollo_carrera=excluded.desarrollo_carrera,
    credencial_unica=excluded.credencial_unica, fecha_ingreso=excluded.fecha_ingreso,
    curso_formacion=excluded.curso_formacion, fecha_ingreso_administracion=excluded.fecha_ingreso_administracion,
    anos_servicio_publico=excluded.anos_servicio_publico, formacion_militar=excluded.formacion_militar,
    documentacion_ingreso=excluded.documentacion_ingreso, tiempo_curso_formacion=excluded.tiempo_curso_formacion,
    tiempo_funcion_policial=excluded.tiempo_funcion_policial, nivel_academico=excluded.nivel_academico,
    grado_academico=excluded.grado_academico, lugar_estudio=excluded.lugar_estudio,
    especialidades=excluded.especialidades, estatus_estudio=excluded.estatus_estudio,
    segunda_carrera=excluded.segunda_carrera, centro_formacion=excluded.centro_formacion,
    titulo_formacion=excluded.titulo_formacion, institucion=excluded.institucion`);
  const upsertVulnerable = db.prepare(`INSERT INTO condicion_vulnerable
    (oficial_id, area, tipo_vivienda, gravedad_inmueble, cantidad_nucleos_familiares,
     cantidad_personas_vivienda, cantidad_hijos, personas_tercera_edad,
     personas_condicion_medica, reseña_amenaza)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(oficial_id) DO UPDATE SET area=excluded.area, tipo_vivienda=excluded.tipo_vivienda,
    gravedad_inmueble=excluded.gravedad_inmueble, cantidad_nucleos_familiares=excluded.cantidad_nucleos_familiares,
    cantidad_personas_vivienda=excluded.cantidad_personas_vivienda, cantidad_hijos=excluded.cantidad_hijos,
    personas_tercera_edad=excluded.personas_tercera_edad,
    personas_condicion_medica=excluded.personas_condicion_medica, reseña_amenaza=excluded.reseña_amenaza`);
  const upsertMedical = db.prepare(`INSERT INTO condicion_medica (oficial_id, patologia_medica, alergias)
    VALUES (?, ?, ?) ON CONFLICT(oficial_id) DO UPDATE SET patologia_medica=excluded.patologia_medica,
    alergias=excluded.alergias`);
  const upsertEmergency = db.prepare(`INSERT INTO contacto_emergencia
    (oficial_id, nombres_apellidos_familiar, direccion, telefono, parentesco)
    VALUES (?, ?, ?, ?, ?) ON CONFLICT(oficial_id) DO UPDATE SET nombres_apellidos_familiar=excluded.nombres_apellidos_familiar,
    direccion=excluded.direccion, telefono=excluded.telefono, parentesco=excluded.parentesco`);

  let processed = 0;
  oficiales.forEach((row, index) => {
    const [cedula, apellidos, nombres, sexo, edad, nacimiento, sangre, civil, rango, estado, credencial] = row;
    insertPersonal.run(cedula, apellidos, nombres, sexo, edad, nacimiento, sangre, civil);
    processed += 1;
    const oficialId = findPersonal.get(cedula).id;
    const ciudades = ['Zamora', 'Barinas', 'Caracas', 'Mérida', 'Valencia', 'Maracay', 'Barquisimeto', 'San Cristóbal', 'Puerto Cabello', 'Maracaibo'];
    const especialidad = ['Investigación criminal', 'Tránsito terrestre', 'Seguridad urbana', 'Orden público'][index % 4];
    updatePersonal.run(ciudades[index], `P-${2000 + index}-${cedula.slice(-4)}`, `J-${1000 + index}-0`, `CP-${3000 + index}`, `Sector ${ciudades[index]}, calle 0${index + 1}`, `oficial${index + 1}@institucional.local`, `0414-10${String(index).padStart(6,'0')}`, `0250-5550${String(index).padStart(2,'0')}`, `Centro ${ciudades[index]}`, '42', 'M', '32', '40', 165 + index, 68 + index, ['Atlética','Media'][index % 2], ['Trigueña','Morena','Blanca'][index % 3], ['Marrones','Verdes','Negros'][index % 3], index % 3 === 0 ? 'Brazo derecho' : 'No registra', index % 4 === 0 ? 'Antebrazo izquierdo' : 'No registra', cedula);
    upsertProfessional.run(oficialId, rango, estado, `Carrera policial nivel ${index + 2}`, credencial, `${2012 + (index % 10)}-${String((index % 9) + 1).padStart(2,'0')}-15`, 'Curso Nacional de Formación Policial', `${2013 + (index % 8)}-01-10`, `${8 + (index % 12)} años`, index % 3 === 0 ? 'Formación militar básica' : 'No aplica', 'Documentación completa', `${3 + (index % 5)} meses`, `${6 + index} años`, 'Universitario', ['Licenciatura','TSU','Especialización'][index % 3], 'Instituto de Formación Nacional', especialidad, 'Graduado/a', index % 2 === 0 ? 'Criminología' : 'No aplica', 'Academia Policial Nacional', 'Título profesional registrado', 'Universidad Nacional');
    upsertVulnerable.run(oficialId, ['Urbana','Troncal','Vial'][index % 3], ['Propia','Alquilada','Familiar'][index % 3], ['Adecuado','Deteriorado','Alto riesgo'][index % 3], 1 + (index % 3), 2 + (index % 4), index % 4, index % 4 === 0 ? 1 : 0, index % 5 === 0 ? 1 : 0, index % 4 === 0 ? 'Amenaza registrada sin detalles sensibles.' : 'Sin amenazas registradas.');
    upsertMedical.run(oficialId, index % 3 === 0 ? 'Hipertensión controlada' : 'Ninguna registrada', index % 4 === 0 ? 'Penicilina' : 'Ninguna registrada');
    upsertEmergency.run(oficialId, `${nombres.split(' ')[0]} ${apellidos.split(' ')[0]}`, `Dirección familiar en ${ciudades[index]}`, `0414-${String(1000000 + oficialId * 791).slice(-7)}`, index % 2 === 0 ? 'Hermano/a' : 'Cónyuge');
  });

  console.log(`Semilla procesada: ${processed} funcionario(s).`);
});

try {
  insert();
  const total = db.prepare('SELECT COUNT(*) AS total FROM oficiales').get().total;
  console.log(`Total de oficiales registrados: ${total}`);
} finally {
  db.close();
}
