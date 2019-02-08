import 'babel-polyfill';
import log4js from 'log4js';
import { System } from './components/system';//busca en el codigo todos los .Route.js para ejecutarlas
import { MongoDB } from './components/mongo';//inicia la conexion y busca todos los .schema.js
import { Socket } from './components/socket';

let logger = log4js.getLogger('app');
logger.level = 'debug';

let system = new System();

MongoDB.start()//hace la conexion a la base de datos
.then(() => {
  logger.info('database connect successfully');
  return MongoDB.loadModels(__dirname);
})
.then(() => {
  logger.info('mongo models were loaded');
  return system.loadModules(__dirname);
})
.then(() => {
  logger.info('modules were loaded');
  return system.start();
})
.then((server) => {
  Socket.init(server);
  logger.info('server started at port: ' + system.port);
})
.catch((err) => {
  logger.error(err);
});
