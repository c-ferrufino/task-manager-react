import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

const app = express();
const PORT = 3000;

// Permite que el frontend consuma esta API
app.use(cors());
app.use(express.json());

const adapter = new PrismaPg(process.env['DATABASE_URL']!);
const prisma = new PrismaClient({ adapter });

const SECRET_KEY = "6844149christian"; 

// Verificar que el backend está corriendo
app.get('/', (_req: any, res: any) => {
    res.json({ message: 'Backend running....' });
});

// POST /login - Valida credenciales y devuelve un token JWT
app.post('/login', (req: any, res: any) => {
    const { username, password } = req.body;
    if (username !== 'admin' || password !== '1234') {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware que verifica si el token JWT es válido
const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: 'Token requerido' });
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// GET /private - Ruta protegida, requiere token válido
app.get('/private', verifyToken, (_req: any, res: any) => {
    res.json({ message: 'Acceso permitido' });
});

// GET /tasks - Devuelve todas las tareas
app.get('/tasks', async (_req: any, res: any) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

// POST /tasks - Crea una nueva tarea
app.post('/tasks', async (req: any, res: any) => {
    const task = await prisma.task.create({
        data: {
            text: req.body.text,
            completed: req.body.completed ?? false,
        },
    });
    res.json(task);
});

// DELETE /tasks/:id - Elimina una tarea por id
app.delete('/tasks/:id', async (req: any, res: any) => {
    const id = Number.parseInt(req.params.id);
    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted' });
});

// PUT /tasks/:id - Actualiza el estado completed de una tarea
app.put('/tasks/:id', async (req: any, res: any) => {
    const id = Number.parseInt(req.params.id);
    const task = await prisma.task.update({
        where: { id },
        data: { completed: req.body.completed },
    });
    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
