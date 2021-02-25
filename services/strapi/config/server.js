module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://pure-atoll-68448.herokuapp.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'fcd760b844c60f8fb7edd97b429d7934'),
    },
  },
});
