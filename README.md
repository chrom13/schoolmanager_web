# School Manager - Frontend

Sistema de gestión escolar construido con React, TypeScript, y Tailwind CSS.

## Stack Tecnológico

- **React 18.3** - Framework UI
- **TypeScript 5.7** - Lenguaje
- **Vite 6** - Build tool
- **Tailwind CSS 3.4** - Estilos
- **React Router v7** - Routing
- **Zustand 5** - State management
- **TanStack Query v5** - Data fetching
- **React Hook Form + Zod** - Formularios y validación
- **Axios** - HTTP client
- **Lucide React** - Iconos
- **ESLint 9** - Linter (flat config)

## Primeros Pasos

> ⚠️ **Importante**: Este proyecto usa las últimas versiones estables de todas las dependencias. Consulta [ACTUALIZACION.md](ACTUALIZACION.md) para más detalles.

### Instalación

```bash
# Opción 1: Script automático (recomendado)
chmod +x install.sh
./install.sh

# Opción 2: Manual
npm install
npm run dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

### Variables de Entorno

Copia el archivo `.env.example` a `.env.development`:

```bash
cp .env.example .env.development
```

Configura la URL de tu API backend:

```
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=School Manager
```

## Estructura del Proyecto

```
src/
├── api/                    # Clientes HTTP y endpoints
│   ├── client.ts           # Axios instance con interceptors
│   └── auth.api.ts         # Endpoints de autenticación
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes base (Button, Input, Card, etc)
│   └── layout/             # Componentes de layout (Sidebar, Header)
├── features/               # Features por módulo
│   ├── auth/               # Autenticación
│   │   └── pages/          # LoginPage, RegisterPage
│   └── dashboard/          # Dashboard
│       └── pages/          # DashboardPage
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades
│   ├── utils.ts            # Funciones helper
│   └── formatters.ts       # Formateo de datos
├── routes/                 # Configuración de rutas
│   └── index.tsx           # Definición de rutas
├── stores/                 # Zustand stores
│   └── authStore.ts        # Store de autenticación
├── types/                  # TypeScript types
│   ├── auth.types.ts       # Tipos de autenticación
│   └── models.ts           # Modelos de datos
├── App.tsx                 # Componente principal
├── main.tsx                # Punto de entrada
└── index.css               # Estilos globales
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## Características Implementadas (FASE 1)

### ✅ Autenticación
- [x] Página de Login con validación
- [x] Página de Registro de escuelas
- [x] Store de autenticación con Zustand
- [x] Interceptors de Axios para tokens
- [x] Rutas protegidas

### ✅ Layout
- [x] Sidebar con navegación
- [x] Header con búsqueda y menú de usuario
- [x] Layout responsivo
- [x] Navegación por roles

### ✅ Dashboard
- [x] Dashboard básico con métricas
- [x] Tarjetas de estadísticas
- [x] Acciones rápidas
- [x] Actividad reciente

## Próximas Fases

### FASE 2: Gestión de Estructura Académica
- [ ] CRUD de Niveles (Preescolar, Primaria, etc.)
- [ ] CRUD de Grados (1°, 2°, 3°, etc.)
- [ ] CRUD de Grupos (A, B, C)
- [ ] CRUD de Materias

### FASE 3: Gestión de Alumnos
- [ ] Lista de alumnos con búsqueda y filtros
- [ ] Crear/editar alumno con padres
- [ ] Importación masiva desde Excel
- [ ] Perfil completo del alumno

### FASE 4: Calificaciones y Asistencias
- [ ] Captura de calificaciones
- [ ] Pase de lista
- [ ] Boletas de calificaciones
- [ ] Reportes de asistencia

## Conexión con el Backend

El frontend está configurado para conectarse con la API Laravel en `http://localhost:8080/api/v1`.

Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

## Notas de Desarrollo

- Todos los componentes usan TypeScript estricto
- Los formularios usan React Hook Form con validación Zod
- Las consultas a la API usan TanStack Query para caché automático
- El estado global usa Zustand (ligero y simple)
- Tailwind CSS para estilos, siguiendo el diseño del template AKKHOR

## Template Original

Este proyecto está basado en el template HTML "AKKHOR" que se encuentra en la carpeta `theme/`. Los componentes React replican el diseño y funcionalidad del template original.

## Licencia

Propietario - Sistema de Gestión Escolar
