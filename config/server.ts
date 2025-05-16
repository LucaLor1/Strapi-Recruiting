export default () => ({
  host: '0.0.0.0',
  port: process.env.PORT,
  app: {
    keys: [process.env.APP_KEYS],
  },
});

