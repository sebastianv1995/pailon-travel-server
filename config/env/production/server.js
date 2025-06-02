module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: true,
  url: env('BASE_URL'), // Sets the public URL of the application.
  app: {
    keys: env.array('APP_KEYS')
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // ✅ AGREGAR CONFIGURACIÓN DE CORS
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: ['*'] // O específicamente tu app: ['https://tu-app.com', 'exp://tu-ip:puerto']
    },
  },
});