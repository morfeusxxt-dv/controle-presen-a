module.exports = {
  apps: [{
    name: 'controle-presenca',
    script: 'npm',
    args: 'start',
    cwd: 'C:\\Users\\lian.mendes\\presenca-cursos',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
