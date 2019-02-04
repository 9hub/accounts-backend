import express from 'express';
import { AreaService } from './services/area.service';

module.exports = (app) => {
  let router = express.Router();

  router.get('/areas', AreaService.query);
  router.get(
    '/areas/page/:page/limit/:limit', AreaService.pagination
  );
  router.post('/areas', AreaService.create);
  router.route('/areas/:area_id')
  .get(AreaService.show)
  .put(AreaService.update)
  .delete(AreaService.remove);
  router.param('page', AreaService.page);
  router.param('limit', AreaService.limit);
  router.param('area_id', AreaService.load);

  app.use('/v1', router);
};
