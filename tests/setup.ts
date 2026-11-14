// Setup global para testes
// Variáveis de ambiente para ambiente de teste isolado
Object.assign(process.env, {
  NODE_ENV: 'test',
  DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'postgresql://easycatalago:easycatalago@localhost:5433/easycatalago_test',
})

