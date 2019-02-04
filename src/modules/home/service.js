import config from '../../../package';
let uptime = new Date();

export class Service {

  static home(req, res, next) {
    res.json({
      uptime,
      name: config.name,
      version: config.version
    });
  }
}
