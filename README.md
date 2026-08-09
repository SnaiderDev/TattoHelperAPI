# TattooHelperAPI

Este proyecto es una API backend para la gestión de servicios relacionados con tatuajes y encuentros, permitiendo gestionar perfiles de usuario, detalles de agujas (o patrones) y registros de citas.

backend/
├── config/          # Configuración de la base de datos (db.ts)
├── controllers/     # Lógica de negocio para las entidades principales
│   ├── userControllers.ts
│   ├── needleControllers.ts
│   └── datingControllers.ts
├── models/          # Definición de esquemas y modelos de datos
│   ├── user.ts
│   ├── needle.ts
│   └── dating.ts
├── routes/          # Mapeo de rutas API (Endpoints)
│   ├── userRoute.ts
│   ├── needleRoute.ts
│   └── datingRoute.ts
├── views/           # Vistas o lógica de presentación principal
│   └── index.ts
└── package.json


