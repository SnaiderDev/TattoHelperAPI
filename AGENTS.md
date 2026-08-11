# 💉 TattooHelper Backend API
*API para gestión integral de servicios de tatuaje.*

## 📚 Estructura del Proyecto
El proyecto sigue una arquitectura modular y desacoplada:

| Carpeta | Función Principal | Detalles |
| :--- | :--- | :--- |
| `models/` | **Datos** | Definición de esquemas (Usuarios, Citas, Productos). |
| `routes/` | **Endpoints API** | Mapeo URL -> Controlador. |
| `controllers/` | **Lógica de Negocio** | Contiene la lógica principal (Ej: Registrar Usuario, Calcular Ganancias). |
| `config/` | **Servicios** | Gestión de la conexión a la base de datos (`db.ts`). |

## 🚀 Stack y Dependencias Clave
- **Lenguaje:** TypeScript
- **Framework:** ExpressJS
- **Base de Datos:** MongoDB (Mongoose)
- **Seguridad:** JWT, Bcrypt
- *Ver `package.json` para el listado completo.*

---

### ✅ Guía del Desarrollador (Coding Standards)

1. **Nomenclatura:** Usar `camelCase` en inglés para todas las variables y funciones.
2. **Documentación:** Toda función o método debe ir precedido de un comentario explicando su propósito antes de su declaración.
3. **Flujo de Código:** Uso obligatorio de sentencias `import` explícitas al hacer referencia a módulos externos.
4.  **Mantenimiento de Lógica:** Nunca eliminar variables o funciones previamente implementadas con una solicitud de mejora, a menos que se esté realizando una refactorización directa y justificada sobre esa misma funcionalidad
5. **Dependencias:** No instales nuevas dependencias, de ser necesario hazmelo saber y te confirmo para continuar

### ⚙️ Workflow Operacional

| Acción | Comando | Propósito |
| :--- | :--- | :--- |
| **Instalación** | `npm install` | Instala todas las dependencias. |
| **Ejecución Local** | `npm run dev` | Inicia el servidor en modo *debug*. |
| **Testear** | `npm run test -- <ruta>` | Ejecuta pruebas unitarias/integraciones. |
| **Limpiar Código** | `npm run lint -- --fix` | Corrige automáticamente problemas de estilo y tipado. |

> ⚠️ **Recordatorio:** Las variables sensibles siempre deben ser gestionadas mediante `.env`. Los artefactos compilados (ej: JS) se ignoran en Git.
