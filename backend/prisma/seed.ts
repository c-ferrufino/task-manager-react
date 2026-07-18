import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
    connectionString: process.env['DATABASE_URL']!,
    ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.task.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            text: 'Tarea de ejemplo para pruebas',
            completed: false,
        },
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
