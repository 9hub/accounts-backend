import express from 'express';
import { AcountService } from './services/acount.service';
import { SessionService } from './services/session.service';
import { Session } from '../../components/session';


module.exports = (app) => {
  let router = express.Router();
  router.get('/acount', AcountService.query);
  router.post('/acount', AcountService.create);
  router.route('/acount/:acount_id')
  .get(AcountService.show)
  .put(AcountService.update)
  .delete(AcountService.remove);
  router.param('acount_id', AcountService.load);
  app.use('/p1', router);

  let routerAuth = express.Router();
  routerAuth.post('/acount/login', SessionService.login);
  routerAuth.post('/acount/logout', Session.auth, SessionService.logout);
  app.use('/p1', routerAuth);
};
