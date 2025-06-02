module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", ["defaultKey1", "defaultKey2"]),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  url: env("BASE_URL"),
  proxy: true,
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: ['*']
    },
  },
});
