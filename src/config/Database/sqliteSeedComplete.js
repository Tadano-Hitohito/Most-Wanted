import Database from 'better-sqlite3';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const dbPath = join(process.cwd(), 'data', 'oficiales.db');
if (!existsSync(dbPath)) { console.error('Ejecuta primero npm run db:sqlite'); process.exit(1); }
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

const funcionarios = [
 ['V-14782193','Kennedy','Leon S.','Masculino',38,'1988-03-14','O+','Soltero/a','Oficial Inspector','Activo','PMZ-1001'],
 ['V-18345210','Valentina','Jill','Femenino',36,'1990-06-02','AB+','Soltero/a','Subcomisario','Activo','PMZ-1002'],
 ['V-21357846','Morales Pérez','Daniel Alejandro','Masculino',34,'1992-09-18','A+','Casado/a','Oficial Agregado','Activo','PMZ-1003'],
 ['V-25896314','Rojas Castillo','Andrea Carolina','Femenino',31,'1995-02-11','B+','Soltero/a','Detective','Comisión','PMZ-1004'],
 ['V-17120589','Vargas Núñez','Miguel Ángel','Masculino',42,'1984-05-27','O-','Casado/a','Comisario','Activo','PMZ-1005'],
 ['V-30988741','Contreras Gil','Mariana Isabel','Femenino',29,'1997-07-09','A-','Soltero/a','Oficial','Activo','PMZ-1006'],
 ['V-24663108','Salazar Medina','Luis Fernando','Masculino',33,'1993-01-22','O+','Casado/a','Sargento Primero','Licencia','PMZ-1007'],
 ['V-19875243','Blanco Herrera','Yoselin Paola','Femenino',40,'1986-11-05','B-','Divorciado/a','Oficial Inspector','Activo','PMZ-1008'],
 ['V-27441965','Martínez Silva','José Enrique','Masculino',37,'1989-04-30','AB-','Soltero/a','Detective','Activo','PMZ-1009'],
 ['V-33102487','Peña Torres','Gabriela Alejandra','Femenino',27,'1999-08-16','A+','Soltero/a','Oficial','Activo','PMZ-1010']
];

const seed = db.transaction(() => {
  const personalInsert = db.prepare(`INSERT OR IGNORE INTO oficiales
  (cedula,apellidos,nombres,sexo,edad,fecha_nacimiento,grupo_sanguineo,estado_civil,talla_gorra)
  VALUES (?,?,?,?,?,?,?,?,?)`);
  const personalUpdate = db.prepare(`UPDATE oficiales SET lugar_nacimiento=?,partida_nacimiento=?,rif=?,carnet_patria=?,direccion=?,correo=?,telefono_movil=?,telefono_fijo=?,centro_votacion=?,talla_zapato=?,talla_camisa=?,talla_pantalon=?,talla_cinturon=?,talla_gorra='Talla Única',estatura=?,peso=?,contextura=?,tipo_piel=?,color_ojos=?,tatuajes=?,cicatriz=? WHERE cedula=?`);
  const profesionalInsert = db.prepare(`INSERT INTO datos_profesionales (oficial_id,rango,estatus_actual,credencial_unica) VALUES (?,?,?,?) ON CONFLICT(oficial_id) DO UPDATE SET rango=excluded.rango,estatus_actual=excluded.estatus_actual,credencial_unica=excluded.credencial_unica`);
  const vulnerableUpsert = db.prepare(`INSERT INTO condicion_vulnerable (oficial_id,area,tipo_vivienda,gravedad_inmueble,cantidad_nucleos_familiares,cantidad_personas_vivienda,cantidad_hijos,personas_tercera_edad,personas_condicion_medica,reseña_amenaza) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(oficial_id) DO UPDATE SET area=excluded.area,tipo_vivienda=excluded.tipo_vivienda,gravedad_inmueble=excluded.gravedad_inmueble,cantidad_nucleos_familiares=excluded.cantidad_nucleos_familiares,cantidad_personas_vivienda=excluded.cantidad_personas_vivienda,cantidad_hijos=excluded.cantidad_hijos,personas_tercera_edad=excluded.personas_tercera_edad,personas_condicion_medica=excluded.personas_condicion_medica,reseña_amenaza=excluded.reseña_amenaza`);
  const medicaUpsert = db.prepare(`INSERT INTO condicion_medica (oficial_id,patologia_medica,alergias) VALUES (?,?,?) ON CONFLICT(oficial_id) DO UPDATE SET patologia_medica=excluded.patologia_medica,alergias=excluded.alergias`);
  const emergenciaUpsert = db.prepare(`INSERT INTO contacto_emergencia (oficial_id,nombres_apellidos_familiar,direccion,telefono,parentesco) VALUES (?,?,?,?,?) ON CONFLICT(oficial_id) DO UPDATE SET nombres_apellidos_familiar=excluded.nombres_apellidos_familiar,direccion=excluded.direccion,telefono=excluded.telefono,parentesco=excluded.parentesco`);

  const profesionalUpdate = db.prepare(`UPDATE datos_profesionales SET desarrollo_carrera=?,fecha_ingreso=?,curso_formacion=?,fecha_ingreso_administracion=?,anos_servicio_publico=?,formacion_militar=?,documentacion_ingreso=?,tiempo_curso_formacion=?,tiempo_funcion_policial=?,nivel_academico=?,grado_academico=?,lugar_estudio=?,especialidades=?,estatus_estudio=?,segunda_carrera=?,centro_formacion=?,titulo_formacion=?,institucion=? WHERE oficial_id=?`);

  const ciudades=['Zamora','Barinas','Caracas','Mérida','Valencia','Maracay','Barquisimeto','San Cristóbal','Puerto Cabello','Maracaibo'];
  funcionarios.forEach((f,index) => {
    const [cedula,apellidos,nombres,sexo,edad,nacimiento,sangre,civil,rango,estado,credencial]=f;
    personalInsert.run(cedula,apellidos,nombres,sexo,edad,nacimiento,sangre,civil,'Talla Única');
    const oficial = db.prepare('SELECT id FROM oficiales WHERE cedula=?').get(cedula);
    const id = oficial.id;
    const ciudad=ciudades[index];
    personalUpdate.run(ciudad,`P-${2000+index}-${cedula.slice(-4)}`,`J-${1000+index}-0`,`CP-${3000+index}`,`Sector ${ciudad}, calle 0${index+1}`,`oficial${index+1}@institucional.local`,`0414-${String(1000000+id*791).slice(-7)}`,`0250-5550${String(index).padStart(2,'0')}`,`Centro ${ciudad}`,'42','M','32','40',165+index,68+index,['Atlética','Media'][index%2],['Trigueña','Morena','Blanca'][index%3],['Marrones','Verdes','Negros'][index%3],index%3===0?'Brazo derecho':'No registra',index%4===0?'Antebrazo izquierdo':'No registra',cedula);
    profesionalInsert.run(id,rango,estado,credencial);
    const especialidad=['Investigación criminal','Tránsito terrestre','Seguridad urbana','Orden público'][index%4];
    profesionalUpdate.run(`Carrera policial nivel ${index+2}`,`${2012+(index%10)}-${String((index%9)+1).padStart(2,'0')}-15`,'Curso Nacional de Formación Policial',`${2013+(index%8)}-01-10`,`${8+(index%12)} años`,index%3===0?'Formación militar básica':'No aplica','Documentación completa',`${3+(index%5)} meses`,`${6+index} años`,'Universitario',['Licenciatura','TSU','Especialización'][index%3],'Instituto de Formación Nacional',especialidad,'Graduado/a',index%2===0?'Criminología':'No aplica','Academia Policial Nacional','Título profesional registrado','Universidad Nacional',id);
    vulnerableUpsert.run(id,['Urbana','Troncal','Vial'][index%3],['Propia','Alquilada','Familiar'][index%3],['Adecuado','Deteriorado','Alto riesgo'][index%3],1+(index%3),2+(index%4),index%4,index%4===0?1:0,index%5===0?1:0,index%4===0?'Amenaza registrada sin detalles sensibles.':'Sin amenazas registradas.');
    medicaUpsert.run(id,index%3===0?'Hipertensión controlada':'Ninguna registrada',index%4===0?'Penicilina':'Ninguna registrada');
    emergenciaUpsert.run(id,`${nombres.split(' ')[0]} ${apellidos.split(' ')[0]}`,`Dirección familiar en ${ciudad}`,`0414-${String(1000000+id*791).slice(-7)}`,index%2===0?'Hermano/a':'Cónyuge');
  });
  console.log(`Semilla completa procesada: ${funcionarios.length} funcionarios.`);
});

try { seed(); console.log('Oficiales en base:', db.prepare('SELECT COUNT(*) total FROM oficiales').get().total); } finally { db.close(); }
