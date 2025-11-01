const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Garante que o diretório do banco de dados existe
const dbDir = path.join(__dirname, 'prisma');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Define a URL do banco de dados
const dbPath = path.join(dbDir, 'dev.db');
process.env.DATABASE_URL = `file:./prisma/dev.db`;

// Executa as migrações
try {
  console.log('Executando migrações do Prisma...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Migrações concluídas com sucesso!');
} catch (error) {
  console.error('Erro ao executar migrações:', error);
  process.exit(1);
}
