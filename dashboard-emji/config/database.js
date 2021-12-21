module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'ec2-176-34-105-15.eu-west-1.compute.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'de81b8f7n99spf'),
      user: env('DATABASE_USERNAME', 'quuyrzlyjzyrez'),
      password: env('DATABASE_PASSWORD', '35fa169a633e9f3fcdbe0274af4d640aa060634ea68e3df958828dd5a4a64b7c'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
      },
    },
    options: {
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
