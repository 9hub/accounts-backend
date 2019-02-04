import jwt from 'jsonwebtoken';
import config from '../../config';

export class Session {

  static auth(req, res, next) {
    var message = req.body.token ||
      req.query.token ||
      req.headers['authorization'];
    var token = null;
    if (message) {
      if (message.split(' ')[0] !== 'Bearer') {
        return next(new Error('authentication scheme not allowed'));
      }
      token = message.split(' ')[1];
    }
    if (!token) {
      let err = new Error('no authorization provided');
      err.status = 403;
      return next(err);
    }
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        let err = new Error('failed to authenticate token');
        err.status = 403;
        next(err);
      } else {
        req.token = decoded;
        next();
      }
    });
  }
}
