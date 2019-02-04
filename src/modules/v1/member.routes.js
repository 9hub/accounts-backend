import express from 'express';
import { MemberService } from './services/member.service';
import { SessionService } from './services/session.service';
import { Session } from '../../components/session';

module.exports = (app) => {
  let router = express.Router();
  router.get('/members', MemberService.query);
  router.post('/members', MemberService.create);
  router.route('/members/:member_id')
  .get(MemberService.show)
  .put(MemberService.update)
  .delete(MemberService.remove);
  router.param('member_id', MemberService.load);
  app.use('/p1', router);

  let routerAuth = express.Router();
  routerAuth.post('/members/login', SessionService.login);
  routerAuth.post('/members/logout', Session.auth, SessionService.logout);
  app.use('/p1', routerAuth);
};
