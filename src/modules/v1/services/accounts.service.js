import _ from 'lodash';
import { PasswordUtils } from '../utils/password';
import { Account } from '../models/account';
import { Credential } from '../models/credential';
import {
  MiddlewareService
} from '../../../components/adapter/middleware.service';

let credential = new Credential();
let model = new Account();
let middleware = new MiddlewareService(model);

export class AccountsService {


  static query(req, res, next) {
    let query = req.query || {};
    model.query(query)
    .then((items) => {
      let accounts = items;
      accounts.forEach(element => {
        delete element._doc.password;
      });
      res.json(accounts);
    })
    .catch((err) => {
      next(err);
    });
  }

  static pagination(req, res, next) {
    middleware.pagination(req, res, next);
  }

  static create(req, res, next) {
    let data = PasswordUtils.change_password(req.body);
    model.find_one({
      email: data.email
    })
    .then((item) => {
      if (item) {
        throw new Error('users already exist');
      }
      return model.create(data);
    })
    .then((item) => {
      let account = item._doc;
      delete account.password;
      res.json(account);
    })
    .catch((err) => {
      next(err);
    });
  }

  static show(req, res, next) {
    let account = req.account._doc;
    delete account.password;
    res.json(account); 
  }

  static showCredentials(req, res, next) {
    credential.query({account_id: req.account._id})
    .then((items) => {
      let account = req.account._doc;
      delete account.password;
      account.credentials = items;
      res.json(account);
    })
    .catch((err) => {
      next(err);
    });
  }

  static update(req, res, next) {
    var data = PasswordUtils.change_password(req.body);
    model.get_by_id(data.user)
    .then((item) => {
      if (!item) {
        throw new Error('invalid user _id');
      }
      if (item.email === data.email) {
        return item;
      }
      return model.find_one({
        email: data.email
      })
      .then((response) => {
        if (!response) {
          return item;
        }
        if (response._id === data._id) {
          return response;
        } else {
          throw new Error('other users has taken this email');
        }
      });
    })
    .then((item) => {
      data = _.extend(item, data);
      return model.update(data);
    })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
  }

  static remove(req, res, next) {
    let data = req[model.model_name.toLowerCase()];
    model.remove(data)
    .then(() => {
      res.status(203).end();
    })
    .catch((err) => {
      next(err);
    });
  }

  static load(req, res, next, id) {
    middleware.load(req, res, next, id);
  }

  static page(req, res, next, id) {
    middleware.page(req, res, next, id);
  }

  static limit(req, res, next, id) {
    middleware.limit(req, res, next, id);
  }
}
