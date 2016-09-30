'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import fs from 'fs';
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function profileUploadFileFilter(req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}
/**
 * Editar el perfil de usuario
 */
export function editProfile(req, res) {
  var userId = req.user._id;
  var email=String(req.body.email);
  var name=String(req.body.name);
  var lastname=String(req.body.lastname);
  User.findByIdAsync(userId)
    .then(user => {
        user.name=name;
        user.email=email;
        user.lastname=lastname;
       return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
    });
}
/**
 * Update profile picture
 */
export function changeProfilePicture(req, res) {
  //id del usuario que realizo el request
  var id = req.body.user;
  //File enviado desde el cliente
  var file=req.files.file;
  //ruta dentro del server donde se subira la imagen de perfil
  var uploadPath=(config.uploads.profileUpload.uploadDir+file.name);
  // ruta dentro del server donde se encuentra la imagen de perfil
  var newPath='assets/profile/uploads/' + file.name;
  User.findByIdAsync(id)
    .then(user => {
        //renombro el archivo con el nombre por default
        fs.rename(file.path,uploadPath,err=>{
          //Elimino el archivo temporal en el cliente y actualizo la ruta en base de datos
           fs.unlink(file.path,err=>{
               user.profileImageURL =newPath;
            });
        })
       return user.saveAsync()
          .then(() => {
            res.json(newPath).status(204).end();
          })
          .catch(validationError(res));
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
