'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import multipart from 'connect-multiparty';
import config from '../../config/environment/index';
var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);//actualizar contraseña
router.put('/:id/profile', auth.isAuthenticated(),controller.editProfile);//actualizar profile
router.post('/:id/picture',multipart(config.uploads.profileUpload),controller.changeProfilePicture);//cambiar imagen profile
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
export default router;
