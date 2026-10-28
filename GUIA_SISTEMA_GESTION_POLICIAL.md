# Guía funcional para un sistema de gestión policial

Este documento adapta las mecánicas generales del proyecto existente a una plataforma para administrar información de oficiales. No describe una implementación específica de base de datos ni pretende sustituir sistemas policiales oficiales, confidenciales o operativos.

El sistema debe utilizarse únicamente con personal autorizado y para fines institucionales legítimos. Los datos personales, documentos, fotografías, ubicaciones, expedientes disciplinarios y credenciales sensibles deben protegerse según la legislación aplicable.

## 1. Propósito

Crear una plataforma interna para centralizar y consultar información institucional de oficiales y personal de seguridad.

Debe permitir:

- Registrar oficiales y personal autorizado.
- Consultar perfiles profesionales internos.
- Administrar fotografías institucionales.
- Clasificar cargos, unidades, rangos, estados y especialidades.
- Gestionar expedientes administrativos o académicos no sensibles.
- Buscar oficiales por criterios definidos.
- Mantener trazabilidad de altas, cambios, bajas y accesos.
- Mostrar contenidos públicos solo si la institución lo autoriza.

## 2. Roles principales

### Administrador

Puede administrar cuentas, oficiales, catálogos, estados y permisos.

Accesos recomendados:

- Dashboard institucional.
- Registro de oficiales.
- Edición administrativa.
- Gestión de cargos, rangos y unidades.
- Gestión de permisos.
- Auditoría y reportes.

### Supervisores o mandos

Pueden consultar oficiales y administrar registros dentro de su unidad o nivel de autorización.

### Oficial

Puede consultar su perfil institucional y actualizar únicamente datos permitidos, como información de contacto no sensible o preferencias de interfaz.

### Consultor o personal de archivo

Tiene acceso de lectura limitado según unidad y función.

### Invitado público

Solo puede consultar portales públicos aprobados por la institución.

No debe tener acceso por defecto a domicilios, documentos de identidad, datos médicos, familiares, credenciales, ubicación o historial disciplinario sensible.

## 3. Áreas principales

### Inicio institucional

Debe presentar:

- Nombre de la institución.
- Mensaje de bienvenida.
- Avisos internos.
- Accesos rápidos según el rol.
- Indicadores generales permitidos.
- Acceso al inicio de sesión.

### Inicio de sesión

Debe permitir acceder mediante credenciales institucionales.

La interfaz debe contener:

- Correo institucional o número de empleado.
- Contraseña.
- Mensajes de campos obligatorios.
- Mensaje de credenciales inválidas.
- Bloqueo temporal tras intentos sospechosos.
- Opción de recuperación controlada por un administrador.
- Mensaje de sesión expirada.

### Dashboard administrativo

Debe incluir:

- Barra lateral navegable.
- Encabezado con usuario autenticado.
- Oficiales activos.
- Oficiales inactivos.
- Unidades o departamentos.
- Rangos registrados.
- Altas recientes.
- Cambios pendientes de aprobación.
- Accesos recientes.

Los indicadores deben respetar los permisos y no mostrar datos individuales a usuarios sin autorización.

### Registro de oficiales

El formulario puede incluir, según el propósito autorizado del sistema:

- Nombre completo.
- Nombre visible.
- Número de empleado o placa institucional.
- Correo institucional.
- Foto institucional.
- Fecha de ingreso.
- Fecha de nacimiento, solo si la política permite almacenarla.
- Documento de identidad, protegido o referenciado fuera del módulo público.
- Rango.
- Cargo.
- Unidad.
- Estado.
- Especialidad.
- Información de contacto institucional.
- Observaciones administrativas.

Los campos sensibles deben tener reglas de acceso adicionales y, cuando sea posible, cifrado o almacenamiento controlado.

### Perfil interno de oficial

Debe mostrar:

- Foto institucional.
- Nombre visible.
- Número de empleado o identificador interno.
- Rango.
- Cargo.
- Unidad asignada.
- Estado.
- Especialidad.
- Fecha de ingreso.
- Teléfono o correo institucional si está autorizado.
- Insignias o reconocimientos permitidos.
- Registro resumido de asignaciones institucionales.

El expediente completo no debe ser visible dentro del perfil público.

### Editor de oficial

Debe permitir editar campos autorizados:

- Datos personales básicos.
- Foto institucional.
- Rango.
- Cargo.
- Unidad.
- Estado.
- Especialidades.
- Contacto institucional.
- Observaciones internas.

Los cambios sensibles deben requerir autorización adicional o aprobación.

## 4. Catálogos institucionales

Los valores que se repiten deben administrarse desde catálogos separados y modificables sin alterar el código visual.

Ejemplos:

- Rangos.
- Cargos.
- Unidades.
- Estados del oficial.
- Especialidades.
- Tipos de reconocimiento.
- Motivos de baja temporal.
- Tipos de capacitación.
- Ubicaciones institucionales autorizadas.

Categorías desactivadas no deben eliminarse automáticamente si ya están asociadas con oficiales o registros históricos.

## 5. Estados de un oficial

Estados mínimos sugeridos:

- Activo.
- En comisión.
- En licencia.
- En capacitación.
- Suspendido temporalmente.
- Baja administrativa.
- Retirado.

El cambio de estado debe registrar:

- Oficial afectado.
- Estado anterior.
- Estado nuevo.
- Usuario que realizó el cambio.
- Fecha y hora.
- Motivo, si está autorizado.

Estados restringidos deben quedar pendientes de aprobación cuando correspondan.

## 6. Autenticación y permisos

### Inicio de sesión

El proceso debe seguir:

1. Recibir identificador y contraseña.
2. Validar que los campos estén presentes.
3. Comprobar que la cuenta existe y está activa.
4. Comparar la contraseña protegida.
5. Crear una sesión con el rol y permisos mínimos necesarios.
6. Registrar el acceso.
7. Redirigir al dashboard correspondiente.

Las contraseñas nunca deben mostrarse ni almacenarse sin protección criptográfica adecuada.

### Registro interno

Las cuentas institucionales pueden ser creadas únicamente por administradores.

Antes de crear una cuenta debe validar:

- Todos los campos obligatorios están completos.
- El correo institucional o número de empleado no está duplicado.
- El oficial existe o puede vincularse a su registro institucional.
- El rol solicitado está dentro de los permisos del creador.
- El número de empleado cumple el formato institucional.
- La cuenta inicial está activa solo si corresponde.

### Roles y permisos

El sistema debe aplicar permisos por módulo y acción.

Permisos mínimos por acción:

- Ver.
- Crear.
- Editar.
- Aprobar.
- Desactivar.
- Exportar.
- Consultar auditora.

Ejemplos:

- Un supervisor puede consultar su unidad, pero no exportar información.
- Un oficial puede ver su perfil, pero no cambiar su rango.
- Un administrador puede crear cuentas, pero no superar la restricción de acceso a expedientes reservados.
- La auditoría debe ser visible solo para roles autorizados.

La autorización se verifica en el servidor, nunca solamente ocultando botones.

## 7. Gestión de registros de oficiales

Los registros pueden estar en tres estados funcionales:

- Borrador: visible solo para el creador o responsables autorizados.
- Pendiente: esperando aprobación.
- Aprobado: visible para los roles autorizados.
- Archivado: conservado históricamente sin aparecer como registro activo.

Cambiar el estado no debe duplicar el registro principal, y cada cambio debe quedar registrado.

### Flujo de registro

1. Abrir el formulario de alta.
2. Seleccionar unidad, rango y cargo disponibles.
3. Introducir datos obligatorios.
4. Validar campos institucionales.
5. Adjuntar documentación autorizada si corresponde.
6. Guardar como borrador o enviarlo a revisión.
7. Aprobar o devolver el registro desde la interfaz de supervisión.
8. Activar al oficial solo después de la aprobación requerida.

## 8. Fotografías y documentos

### Fotografías

El sistema puede admitir:

- Fotografía oficial actual.
- Foto temporal de perfil.
- Fotografía para uniforme o identificación.
- Logo institucional configurado por unidad.

Reglas:

- Validar tipo y tamaño tanto en cliente como servidor.
- Conservar la imagen anterior si el campo llega vacío.
- Permitir URL controlada únicamente si proviene de una fuente autorizada.
- No mostrar documentos personales en vistas públicas.
- Evitar credenciales del almacenamiento dentro del código del navegador.

### Documentos y archivos

Según el expediente, puede utilizarse un gestor controlado para:

- Certificados académicos.
- Cursos y capacitaciones.
- Reconocimientos.
- Órdenes de asignación.
- Cambios administrativos.
- Documentación de alta o baja.

Debe limitarse por:

- Tipo de archivo.
- Tamaño.
- Usuario responsable.
- Unidad autorizada.
- Tipo de expediente.
- Fecha de conservación o eliminación.

## 9. Búsqueda institucional

La búsqueda debe permitir consultar según permisos:

- Número de empleado.
- Nombre completo.
- Nombre visible.
- Unidad.
- Rango.
- Cargo.
- Estado.
- Especialidad.
- Fecha de ingreso.

### Normalización

Antes de buscar:

- Eliminar espacios exteriores.
- Convertir espacios consecutivos a uno solo.
- Normalizar acentos solo si la búsqueda lo permite.
- Eliminar caracteres no válidos del número institucional.
- Aplicar coincidencias parciales según el campo.

### Resultados

Debes separar visualmente los siguientes bloques:

- Oficiales.
- Unidades.
- Rangos o cargos.
- Registros pendientes.

Solo mostrar datos permitidos para el rol actual. Nunca se deben incluir contraseñas, tokens, documentos privados, domicilios o claves en los resultados.

## 10. Historial y auditoría

Cada operación crítica debe generar una entrada de auditoría.

Debe registrarse al menos:

- Usuario responsable.
- Acción realizada.
- Tipo de registro afectado.
- Identificador del registro.
- Fecha y hora.
- Cambio relevante.
- Dirección o dispositivo de origen, si la política lo permite.

Ejemplos de operaciones auditables:

- Alta de oficial.
- Cambio de rango.
- Cambio de unidad.
- Cambio de estado.
- Modificación de datos sensibles.
- Creación de usuario.
- Cambio de rol.
- Consulta de expediente restringido.
- Exportación de información.
- Eliminación o desactivación.

La auditoría debe ser append-only: los usuarios ordinarios no pueden modificar ni eliminar el historial.

## 11. Perfiles públicos opcionales

La institución puede habilitar una ficha pública solamente para información aprobada.

Datos públicos posibles:

- Nombre institucional.
- Unidad de enlace ciudadano.
- Cargo público.
- Horario de atención.
- Contacto oficial general.
- Nombre de portavoces autorizados.

Datos que no deben mostrarse públicamente sin una base legal y medidas adicionales:

- Número de empleado completo.
- Documento de identidad.
- Dirección particular.
- Información médica o familiar.
- Historial disciplinario completo.
- Armamento, equipo o credenciales.
- Rutas, ubicaciones operativas o turnos sensibles.

## 12. Arquitectura recomendada

Mantener responsabilidades separadas:

```text
Vista -> Controlador -> Servicio -> Repositorio o modelo -> Almacenamiento
```

### Vistas

Solo contienen estructura y presentación. No deben contener consultas ni credenciales.

### Controladores

Se encargan de:

- Recibir parámetros.
- Validar formato básico.
- Comprobar sesión y permisos.
- Invocar servicios.
- Resolver respuesta o redirección.

### Servicios

Contienen la lógica principal:

- Autenticación.
- Creación de oficiales.
- Cambios de rango, cargo y unidad.
- Aprobaciones.
- Procesamiento de archivos.
- Búsqueda.
- Auditoría.
- Exportaciones permitidas.

### Modelos o repositorios

Representan entidades y encapsulan operaciones de lectura y escritura.

## 13. Manejo de errores

Implementar:

- Página 404 para registros inexistentes.
- 403 cuando el usuario carece de autorización.
- Mensajes claros para datos inválidos.
- Mensajes técnicos limitados fuera de desarrollo.
- Registro de errores críticos sin exponer información sensible.
- Protección contra enumeración de cuentas y oficiales.

## 14. Seguridad mínima

- Cookies de sesión HTTPOnly y Secure cuando corresponda.
- Contraseñas protegidas con algoritmo moderno.
- Sesiones con expiración e invalidación al cerrar.
- Autorización por acción y por unidad.
- Validación del servidor para todas las operaciones.
- Protección contra inyección, CSRF y XSS.
- Bloqueo o restricción ante intentos repetidos de acceso.
- Cifrado de datos sensibles cuando sea necesario.
- Copias de seguridad protegidas.
- Auditoría inmutable para acciones críticas.
- Descargas autorizadas y con registro.
- No almacenar credenciales, claves o documentos en el navegador.
- No publicar información operativa o sensible.
- Acceso por menor privilegio.

## 15. Organización visual

Separar estilos por función:

- Estilos generales.
- Inicio institucional.
- Login y recuperación.
- Dashboard administrativo.
- Registro y edición de oficiales.
- Perfil interno.
- Búsqueda y resultados.
- Auditoría.
- Catálogos.

Principios visuales:

- Estética institucional seria y profesional.
- Navegación lateral compacta.
- Identidad visual basada en colores policiales institucionales, sin apropiarse indebidamente de escudos o insignias reales.
- Tarjetas para resúmenes generales.
- Formularios agrupados por secciones.
- Indicadores de estado claros.
- Diseño adaptable.
- Estados de carga, vacío, error, pendiente y éxito.

## 16. Contenido editable

Todo texto configurable debe almacenarse fuera de las vistas.

Esto incluye:

- Nombre institucional.
- Mensajes de bienvenida.
- Textos de login.
- Avisos internos.
- Etiquetas de módulos.
- Mensajes de validación.
- Estados iniciales.
- Información pública aprobada.

El código debe contener estructura, reglas y presentación, no datos personales reales ni información operativa.

## 17. Pruebas funcionales mínimas

1. Inicio de sesión correcto crea una sesión con el rol adecuado.
2. Inicio de sesión incorrecto no concede acceso.
3. Una cuenta suspendida no puede iniciar sesión.
4. Un oficial sin permiso no accede al expediente restringido.
5. Solo administradores autorizados crean cuentas.
6. No se permiten números de empleado duplicados.
7. Rangos, cargos y unidades inválidos son rechazados.
8. Cambios sensibles requieren aprobación si la política lo establece.
9. Cada cambio crítico genera auditoría.
10. La auditoría no puede ser editada por usuarios normales.
11. Un supervisor solo consulta su unidad.
12. Los oficiales archivados no aparecen como activos.
13. Los borradores no aparecen en la lista institucional aprobada.
14. Los campos vacíos no eliminan fotografías existentes.
15. Archivos inválidos son rechazados.
16. Un usuario sin permiso recibe 403.
17. La búsqueda excluye datos que el rol no puede ver.
18. Los resultados no incluyen contraseñas ni tokens.
19. Las exportaciones producen solo campos autorizados.
20. Las URLs públicas muestran únicamente información aprobada.

## 18. Estados vacíos

La interfaz debe definir:

- Sin oficiales registrados.
- Sin oficiales en una unidad.
- Sin resultados de búsqueda.
- Sin expedientes pendientes.
- Sin unidades disponibles.
- Sin fotografías.
- Sin permisos asignados.
- Servicio temporalmente indisponible.

## 19. Alcance opcional futuro

Puede añadirse posteriormente:

- Expedientes académicos y de capacitación.
- Registro de reconocimientos.
- Gestión de turnos autorizados.
- Vehículos asignados, sin datos sensibles de operación.
- Evaluaciones administrativas.
- Solicitudes y aprobaciones internas.
- Reportes anónimos o estadísticos.
- Firma digital institucional.
- Integración con sistemas oficiales mediante autorización.
- Doble autenticación.
- Gestión centralizada de sesiones.
- Exportación cifrada.
- Controles avanzados de retención de documentos.

## 20. Alcance que debe evitar este proyecto

- Vigilancia masiva no autorizada.
- Perfiles públicos con datos personales sensibles.

## Alcance de la demo

En esta primera versión, el sistema será una demostración funcional y visual. No deberá utilizar datos policiales reales ni funcionar como un sistema oficial de operación.

La demo puede utilizar:

- Oficiales ficticios claramente identificados como datos de prueba.
- Fotografías de ejemplo o personajes ficticios.
- Rangos, unidades y cargos demostrativos.
- Usuarios locales y permisos simulados.
- Datos institucionales inventados.
- Historial y auditoría de ejemplo.

El propósito principal es demostrar el diseño, los flujos de autenticación, la administración de perfiles, las búsquedas, los catálogos, los estados de oficiales y la navegación por roles. Antes de cualquier uso real debe realizarse una validación jurídica, institucional y de seguridad adicional.

## Estructura funcional definida para la demo

### Módulo 1: datos personales del funcionario

Datos personales básicos de los oficiales ficticios:

- Cédula.
- Apellidos y nombres.
- Sexo.
- Edad.
- Fecha de nacimiento.
- Lugar de nacimiento.
- Partida de nacimiento.
- Grupo sanguíneo.
- Estado civil.
- Carnet de la Patria.

Estos datos deben utilizarse únicamente con valores de prueba claramente ficticios. En una versión real, su visualización debe limitarse por permisos y cumplimiento legal, especialmente en el caso de documentos de identidad, partidas de nacimiento y datos personales sensibles.

---

### Módulo 2: datos profesionales y académicos del funcionario

- Rango.
- Estatus Actual.
- Desarrollo de Carrera Oficial.
- Credencial Única.
- Fecha de Ingreso (Día, Mes, Año).
- Curso de Formación Policial u Oficial.
- Fecha de Ingreso a la Administración Pública.
- Años de Servicio en la Administración Pública (Día, Mes, Año).
- Formación Militar.
- Documentación de Ingreso.
- Nivel Académico.
- Grado Académico.
- Lugar de Estudio.
- Especialidades.
- Estatus de Estudio.
- Segunda Carrera Académica.
- Centro de Formación.
- Título de Formación.
- Institución.
- Tiempo de Curso de Formación.
- Tiempo de Función Policial.

---

### Módulo 3: condición vulnerable

- Área (Troncal / Urbana / Vial).
- Tipo de Vivienda (Propia, Alquilada, etc.).
- Gravedad del Inmueble (Deteriorado o Alto Riesgo).
- Cantidad de Núcleos Familiares que viven en la vivienda.
- Cantidad de Personas que viven en la vivienda.
- Cantidad de Hijos.
- Cantidad de Personas de Tercera Edad a su Cargo.
- Cantidad de Personas con Condiciones Médicas Comprometidas.
- Breve Reseña si ha sido Amenazado en la comunidad donde vive.

---

### Módulo 4: condición médica del funcionario

- Patología Médica.
- Alergias a algún Medicamento o Alimento.

*(Nota: la línea tachada del cuaderno fue excluida.)*

---

### Módulo 5: en caso de emergencia (contacto de emergencia)

- Nombres y Apellidos del Familiar.
- Dirección.
- Teléfono.
- Parentesco.

---

### ✅ ARREGLOS APLICADOS

1. **Carnet de la Patria** → movido del Módulo 2 al Módulo 1 (junto al RIF), por ser documento de identidad personal.
2. **Línea tachada** del bloque médico → excluida de la estructura.
3. **Módulo 2** renombrado como **"Datos Profesionales y Académicos"** para reflejar que incluye formación y estudios.
4. **Módulo 5** con doble denominación: *En Caso de Emergencia / Contacto de Emergencia*.
5. **Talla de Gorra** fijada como valor "Talla Única".

---

Con esto queda todo unificado y limpio. 👮‍♂️

¿Quieres que ahora te arme el **script SQL** con esta estructura (tablas separadas por módulo, relacionadas por ID del funcionario) para PostgreSQL, MySQL o SQLite? Dime el gestor y te lo dejo listo para copiar y pegar.