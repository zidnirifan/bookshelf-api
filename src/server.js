const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    host:
      // change production-host to ip private server
      process.env.NODE_ENV !== 'production' ? 'localhost' : 'production-host',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server running at ${server.info.uri}`);
};

init();
