# HACKATRIP

## Descripción

La API de Hackatrip sirve como backend para una aplicación para una plataforma de una gencia de viajes online. La API también se integra con una base de datos MySQL para almacenar y recuperar datos relacionados con eventos.

## Como usar HACKATRIP

### Base de datos

Hackatrip utiliza MySQL como base de datos para almacenar información de viajes y usuarios. Asegúrese de seguir estos pasos para configurar la base de datos correctamente:

Instale MySQL: si no tiene MySQL instalado, puede descargarlo desde [el sitio web oficial](https://www.mysql.com/downloads/) .

Configuración en el Archivo .env:

Asegúrese de que el archivo .env de su proyecto contenga la configuración correcta para MySQL (hay un archivo .env.example).

Cliente MySQL: Hackatrip utiliza un módulo llamado getPool.js para administrar la conexión de la base de datos. Asegúrese de que este archivo esté configurado para usar las variables de entorno del archivo .env:

- `MYSQL_HOST` debe ser "localhost" o la dirección de su base de datos MySQL.
- `MYSQL_USER` debe ser "root" o el usuario de su base de datos MySQL.
- `MYSQL_PASS` debe ser su contraseña de MySQL.
- `MYSQL_DB` puedes darle el nombre que prefieras.

### Instalar dependencias

Para ejecutar, siga estos pasos:

Instalar dependencias: abra una terminal en la ruta server del proyecto y ejecute el siguiente comando para instalar dependencias:

```
npm i
```

### Crear tablas de la base de datos

Abre la terminal en la ruta server y escribe:

```
npm run initDb
```

Este comando inicializa tablas en la base de datos usando Node.js. Cuando ejecuta este comando, se conecta a la base de datos y crea las tablas necesarias.Este comando debe ejecutarse solo una vez, antes de usar Hackatrip o si necesita reiniciar las tablas de la base de datos. Este comando ya crea la base de datos precargada con usuarios y envíos.

### Iniciar proyecto

Inicie: una vez instaladas las dependencias, puede iniciar con el siguiente comando estando en la ruta server:

```
npm run dev
```

Debería estar escuchando en un puerto específico. Puedes acceder a él a través de las rutas definidas en los controladores.

### Endpoints

#### User

- `POST /users/register`: Registro de un nuevo usuario.

- `PUT /users/validate/:registrationCode`: Validación del nuevo usuario.

- `POST /users/login`: Logearse en la plataforma.

- `POST /users/password/recover` : Recuperar la contraseña de usuario.

- `PUT /users/password/edit`: Cambiar la contraseña de usuario.
  
- `PUT /users/edit`: Actualización perfil del usuario.
  
- `PUT /users/edit`: Editar el usuario.
  
- `PUT /users/avatar/edit`: Cambiar el avatar de usuario.
  
- `PUT /users/role/:userId`: Ver los usuarios apuntados a un viaje.

#### Trip

- `GET /todosviajes`: Lista de viajes filtrados por título, localidad, imagen, fecha, precio, número reservas, reservada si/no, activa/desactiva y/o confirmada.
  
- `GET /ratedcoordinadores`: Puntuar a un coordinador.
  
- `GET /todosviajesconfirmados`: Lista de todos los viajes confirmados.

- `POST /viajes`: Creación de un nuevo viaje por parte del admin.

- `GET /viajes/:viajeId`: Visualización de todos los detalles de un viaje.

- `POST /viajes/:userId/confirmar`: Confirmar el coordinador de un viaje por parte del admin.

- `POST /viajes/:viajeId`: Editar la información de un viaje por parte del admin.

- `POST /viajes/:viajeId/reservarycancelar`: Reservar y cancelar la reserva de un viaje por parte de un usuario.

- `POST /viajes/:viajeId/addpost`: Añadir post de un viaje por parte de un usuario.

- `POST /viajes/:viajeId/coordinadorVotes`: Realizar una puntuación de un coordinador con el que has viajado.

- `POST /viajes/:viajeId/:coordinadorId`: Apuntarse un coordinador a un viaje.
  
- `PUT /viajes/:viajeId/modificarviaje`: Modifica un viaje ya creado.

### Tech stack

- Node.js: la plataforma en la que se construye la aplicación.

- Express.js: un marco web para Node.js, utilizado para construir.

- Cors: un middleware para Express utilizado para permitir el intercambio de recursos entre orígenes.

- Dotenv: un paquete para cargar variables de entorno desde un archivo .env.

- Joi: una biblioteca de validación de datos para Node.js, utilizada para la validación de datos en la aplicación.

- JsonWebToken (JWT): una biblioteca para crear y verificar tokens de autenticación JWT.

- Morgan: un middleware para Express utilizado para el registro de solicitudes HTTP.

- mysql2: un controlador MySQL para Node.js, utilizado para interactuar con la base de datos MySQL.

- UUID: para generar identificadores únicos (UUID).

- Vite: un marco de prueba para aplicaciones Vue 3. Se utiliza para pruebas de proyectos.

- Bcrypt: una biblioteca de hash especializada en seguridad de contraseñas para aplicaciones web.

- Express-fileupload: es un middleware para Express que simplifica la gestión de archivos subidos al servidor a través de formularios HTML.

- Nodemailer: es un módulo de Node.js para enviar correos electrónicos desde una aplicación.

- Randomstring: es un módulo de Node.js que genera cadenas de caracteres aleatorias. Es útil para crear tokens, contraseñas temporales y otros datos aleatorios en tu aplicación.

- Sharp: es un módulo de Node.js para el procesamiento eficiente de imágenes.
