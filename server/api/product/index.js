'use strict';

import {Router} from 'express';
import * as controller from './product.controller';
import multipart from 'connect-multiparty';
import config from '../../config/environment/index';
var router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',multipart(config.uploads.productUpload) ,controller.create);
router.put('/:id', multipart(config.uploads.productUpload),controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
