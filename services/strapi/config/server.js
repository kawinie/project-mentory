module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://8a82866cf6eb.ngrok.io'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'fcd760b844c60f8fb7edd97b429d7934'),
    },
  },
});
