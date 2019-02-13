import express from 'express';
import { AccountsService } from './services/accounts.service';
<<<<<<< HEAD
// import { SessionService } from './services/session.service';

// import { Session } from '../../components/session';

module.exports = (app) => {
  
=======
import { SessionService } from './services/session.service';
import { Session } from '../../components/session';

module.exports = (app) => {
>>>>>>> 712305c92947c0543c0c2513b59c0cf9cb13a595
  let router = express.Router();
  router.get('/accounts', AccountsService.query);
  router.post('/accounts', AccountsService.create);
  router.route('/accounts/:account_id')
  .get(AccountsService.show)
  .put(AccountsService.update)
  .delete(AccountsService.remove);
<<<<<<< HEAD
  
  router.param('account_id', AccountsService.load);
  app.use('/p2', router);
  /*
  let routerAuth = express.Router();
  routerAuth.post('/members/login', SessionService.login);
  routerAuth.post('/members/logout', Session.auth, SessionService.logout);
  app.use('/p2', routerAuth);
  */
=======
  router.param('account_id', AccountsService.load);
  app.use('/p1', router);

  let routerAuth = express.Router();
  routerAuth.post('/login', SessionService.login);
  routerAuth.post('/logout', Session.auth, SessionService.logout);
  app.use('/p1', routerAuth);
>>>>>>> 712305c92947c0543c0c2513b59c0cf9cb13a595
};
