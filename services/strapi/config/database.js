const { parseUri } = require('mysql-parse')
const config = parseUri(process.env.JAWSDB_RED_URL);

module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: "mysql",
          host: env('DATABASE_HOST', config.host),
          port: env('DATABASE_PORT', config.port),
          database: env('DATABASE_NAME', config.database),
          username: env('DATABASE_USERNAME', config.user),
          password: env('DATABASE_PASSWORD', config.password),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  });