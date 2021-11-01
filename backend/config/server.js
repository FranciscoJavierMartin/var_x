module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  cron: { enabled: true },
  url: env("URL", "http://localhost"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "49ace41414218cfe0574dea0ad908e58"),
    },
  },
});
