import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createDefaultUser() {
  const defaultUser = await prisma.user.upsert({
    where: { id: '00000000-0000-0000-0000-000000000000' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Usuário Padrão',
      email: 'default@example.com',
      password: await hash('defaultpassword', 10), // Senha segura, mas não será usada para login
      role: 'ADMIN',
    },
  });

  console.log('Usuário padrão criado/atualizado:', defaultUser);
}

createDefaultUser()
  .catch((e) => {
    console.error('Erro ao criar usuário padrão:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
