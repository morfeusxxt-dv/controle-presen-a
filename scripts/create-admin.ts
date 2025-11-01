import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const hashedPassword = await hash(password, 12);

  // Verifica se o usuário admin já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('Usuário administrador já existe:');
    console.log(`Email: ${email}`);
    return;
  }

  // Cria o usuário admin
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Usuário administrador criado com sucesso:');
  console.log(`Email: ${user.email}`);
  console.log(`Senha: ${password}`);
  console.log('Por favor, altere a senha após o primeiro login.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
