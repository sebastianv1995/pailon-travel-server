module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "hfvSQos5HI/HNtKqYBGJRA=="),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "TpyJ8RgPZsVD2yryIObnUw=="),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "EyBMAuofZmd0KjZGh5/hKg=="),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
