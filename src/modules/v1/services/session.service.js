import { Session } from '../models/session';

let session = new Session();

export class SessionService {

  static login(req, res, next) {
    session.login(req, res, next);
  }

  static logout(req, res, next) {
    session.logout(req, res, next);
  }
}
