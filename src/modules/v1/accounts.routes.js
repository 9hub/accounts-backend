import express from 'express';
import { AccountsService } from './services/accounts.service';
import { SessionService } from './services/session.service';
import { CredentialsService } from './services/credentials.service';
import { Session } from '../../components/session';

module.exports = (app) => {
  let router = express.Router();
  router.get('/accounts', AccountsService.query);
  router.post('/accounts', AccountsService.create);
  router.route('/accounts/:account_id')
  .get(AccountsService.show)
  .put(AccountsService.update)
  .delete(AccountsService.remove);
  router.param('account_id', AccountsService.load);
  app.use('/p1', router);

  let routerAuth = express.Router();
  routerAuth.post('/login', SessionService.login);
  routerAuth.post('/logout', Session.auth, SessionService.logout);
  app.use('/p1', routerAuth);

  let routerP = express.Router();
  routerP.route('/accounts/:account_id')
  .get(AccountsService.showCredentials);
  routerP.route('/accounts/:account_id/credentials')
  .post(CredentialsService.create);
  routerP.param('account_id', AccountsService.load);
  app.use('/p2', routerP);
};
