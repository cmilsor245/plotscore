module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      cwd: './desktop/frontend',
      interpreter: 'none',
    },
    {
      name: 'laravel-app',
      script: 'php',
      args: 'artisan serve',
      cwd: './desktop/backend',
    },
  ]
}
