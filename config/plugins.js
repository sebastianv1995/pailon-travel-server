module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
          },
          region: env("AWS_REGION", "us-east-2"),
          params: {
            ACL: "public-read",
            signedUrlExpires: 15 * 60,
            Bucket: env("AWS_S3_BUCKET", "repositorio-react-native-strapi"),
          },
        },
      },
    },
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
});