import express from 'express';
import { AccountService } from './services/account.service';
import { SessionService } from './services/session.service';
import { Session } from '../../components/session';

module.exports = (app) => {
  let router = express.Router();
  router.get('/account', AccountService.query);
  router.post('/account', AccountService.create);
  router.route('/account/:account_id')
  .get(AccountService.show)
  .put(AccountService.update)
  .delete(AccountService.remove);
  router.param('account_id', AccountService.load);
  app.use('/p1', router);

  let routerAuth = express.Router();
  routerAuth.post('/login', SessionService.login);
  routerAuth.post('/logout', Session.auth, SessionService.logout);
  app.use('/p1', routerAuth);
};
