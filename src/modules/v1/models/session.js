import jwt from 'jsonwebtoken';
import config from '../../../config';
import { Acount } from './acount';
import { PasswordUtils } from '../utils/password';

export class Session {

  constructor() {
    this.MESSAGE = 'no authorization provided';
    this.member = new Acount();
  }

  login(req, res, next) {
    if (!req.body.email) {
      throw new Error('email is undefined');
    }
    if (!req.body.password) {
      throw new Error('password is undefined');
    }
    var data = PasswordUtils.change_password(req.body);
    return this.member.find_one({
      email: data.email,
      password: data.password
    })
    .then((user) => {
      if (!user) {
        throw new Error('authentication failed. user not found');
      }
      if (user.password != req.body.password) {
        throw new Error('authentication failed. user not found');
      }
      var token = jwt.sign({
        _id: user._id,
        config: user.config,
        email: user.email,
        password: user.password
      }, config.secret, {
      //  expiresIn: 86400 * 7,// 1440 expires in 24 hours
        // algorithm: 'HS512'
        algorithm: 'HS256'
      });
      var token = {
        session_id: token
      };
      var us = user._doc;
      us.token = token;
      delete us.password;
      res.json(us);
    })
    .catch((err) => {
      err.status = 401;
      next(err);
    });
  }

  logout(req, res, next) {
    res.status(204).send();
  }
}
