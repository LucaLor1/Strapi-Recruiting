export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', process.env.PORT || 1337),
  app: {
    keys: env.array('APP_KEYS', ['key123456789', 'key987654321']),
  },
});
