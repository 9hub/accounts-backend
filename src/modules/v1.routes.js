import { Session } from '../components/session';

module.exports = function(app) {
  app.use('/v1', Session.auth);
};
