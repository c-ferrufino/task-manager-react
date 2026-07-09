# Task Manager

![CI](https://github.com/c-ferrufino/task-manager-react/actions/workflows/ci.yml/badge.svg)


Aplicación fullstack de gestión de tareas desarrollada.

## Tecnologías

**Frontend**
- React 19 + TypeScript
- Vite
- CSS modular por componente

**Backend**
- Node.js + Express
- TypeScript
- JWT para autenticación
- Prisma ORM

**Base de datos**
- PostgreSQL (Render)

## Funcionalidades

- Crear, completar y eliminar tareas
- Contador de tareas pendientes y completadas
- Autenticación con JWT (`POST /login`, `GET /private`)
- API REST con Express

## Instalación

Clona el repositorio e instala las dependencias del frontend y del backend por separado.

```bash
git clone https://github.com/c-ferrufino/task-manager-react.git
cd task-manager-react

# Frontend
npm install

# Backend
cd backend
npm install
```

### Variables de entorno

Crea un archivo `.env` dentro de `backend/` con:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/nombre_bd?sslmode=require"
JWT_SECRET="una_clave_secreta_larga_y_aleatoria"
```

> Render exige SSL, por lo que `DATABASE_URL` debe incluir `?sslmode=require`.

## Comandos

**Frontend** (raíz del proyecto)

```bash
npm run dev      # entorno de desarrollo
npm run build    # build de producción
npm run preview  # previsualizar build
npm run lint     # linting
```

**Backend** (`backend/`)

```bash
npm run dev      # entorno de desarrollo
npm run build    # prisma generate
npm start        # levantar el servidor
```

## Despliegue

- **Frontend**: Vercel
- **Backend**: Render
- **Base de datos**: PostgreSQL en Render (gestionada con Prisma ORM)

