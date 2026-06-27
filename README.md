# TattoHelper: Backend para Gestión de Datos de Tatuajes

**Descripción**
Backend desarrollado con Node.js para proporcionar una API robusta y escalable que centraliza los datos necesarios para el frontend de **TattoHelper**, la aplicación especializada en gestión de tatuajes. Este proyecto permite almacenar, recuperar y sincronizar información clave como diseños de tatuajes, historiales de clientes, precios y servicios.

---

## 🔧 Tecnologías Utilizadas
| Tecnología       | Versión          |
|------------------|------------------|
| Node.js          | 18.x             |
| Express.js       | 4.x              |
| MongoDB          | 6.x (o PostgreSQL) |
| JWT Authentication| Opcional         |

---

## 📌 Características Principales
✅ **API RESTful** para integración con frontend.
✅ **Autenticación segura** (JWT o OAuth).
✅ **Validación de datos** en tiempo real.
✅ **Escalabilidad horizontal** mediante microservicios.
✅ Incluye documentación Swagger/OpenAPI.

---

## 📂 Estructura del Proyecto
```
backend/
├── src/
│   ├── controllers/    # Lógica de negocio (ej: tattooController.js)
│   ├── models/         # Modelos de datos (Mongoose/Sequelize)
│   ├── routes/         # Endpoints API (ej: /api/tattoos)
│   ├── middlewares/    # Middlewares (auth, validation)
│   └── config/         # Configuración (DB, JWT, etc.)
├── tests/
├── .env.example
└── package.json
```

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio:
```bash
git clone https://github.com/tu-repositorio/TattooHelper-Backend.git
cd backend
```

### 2. Configurar variables de entorno:
Copia `.env.example` a `.env`.

### 3. Instalar dependencias:
```bash
npm install
```

### 4. Iniciar el servidor:
```bash
npm start
```


## 🔗 Endpoints API (Ejemplos)
| Método | Ruta               | Descripción                          |
|--------|--------------------|--------------------------------------|
| GET    | `/needles`     | Listar todos los tipos de agujas.           |
| GET   | `/needles/details/{shortname}`     | Obtener todos los detalles del tipo de aguja.                  |



