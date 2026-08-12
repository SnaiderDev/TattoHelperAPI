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
2. **Documentación:** Toda función o método debe ir posteriormente de un comentario simple y directo explicando el motivo de su funcionalidad.
3. **Flujo de Código:** Uso obligatorio de sentencias `import` explícitas al hacer referencia a módulos externos y respetar las reglas o normas del lenguage de programacion seleccionado.
4.  **Typing & TypeScript Best Practices:** Siempre que se trabaje con tipos importados (Modelos, Clases), prefiere usar `typeof ImportedModule` o el tipo exportado (`ImportedModule`) en lugar de solo el nombre del módulo cuando sea necesario diferenciar entre una variable/valor y un tipo estructural.
5. **Mantenimiento de Lógica:** No eliminar variables o funciones previamente implementadas con una solicitud de mejora, a menos que se esté realizando una refactorización directa y justificada para eliminar código obsoleto o redundante.
7. **Logging:** Para mensajes de consola como logs o errores que requieren formato (ej. advertencias), se debe utilizar la librería `picocolors` con el apodo `pc` para aplicar un estilo visual consistente en toda la aplicación. Ejemplo: `console.log(pc.yellow('Mensaje'));`
6. **Coding Standards:** to mandate that all suggested code must adhere strictly to TypeScript best practices, syntax, and rules to prevent runtime compilation errors.


### ⚙️ Workflow Operacional

| Acción | Comando | Propósito |
| :--- | :--- | :--- |
| **Instalación** | `npm install` | Instala todas las dependencias. |
| **Ejecución Local** | `npm run dev` | Inicia el servidor en modo *debug*. |
| **Testear** | `npm run test -- <ruta>` | Ejecuta pruebas unitarias/integraciones. |
| **Limpiar Código** | `npm run lint -- --fix` | Corrige automáticamente problemas de estilo y tipado. |

> ⚠️ **Recordatorio:** Las variables sensibles siempre deben ser gestionadas mediante `.env`. Los artefactos compilados (ej: JS) se ignoran en Git.
