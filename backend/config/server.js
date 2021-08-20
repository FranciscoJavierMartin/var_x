module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("", "http://bf81de1e4a6a.ngrok.io"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "49ace41414218cfe0574dea0ad908e58"),
    },
  },
});
