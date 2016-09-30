/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Product from './product.model';
import config from '../../config/environment';
import fs from 'fs';
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
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

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}
//refactor removeEntity
function removeEntity(product,res){
  product.removeAsync()
    .then(() => {
      res.status(204).end();
    });
}
// function removeEntity(res) {
//   return function(entity) {
//     if (entity) {
//       return entity.removeAsync()
//         .then(() => {
//           res.status(204).end();
//         });
//     }
//   };
// }

//Subir imagenes al server y generar nombre
/**
 * [uploadImages description]
 * @param  {[file]}    file    [description]
 * @param  {[object]}  product [description]
 * @param  {Function}  cb      [description]
 * @return {[object]}  product [description]
 */
function uploadImages(file,product,cb){
  if(file){
    //generar nombre de la imagen
    var nameTmp=file.path.substr(file.path.lastIndexOf('\\')+1,(file.path.indexOf('.')-file.path.lastIndexOf('\\'))-1);
    file.name=nameTmp+'_'+file.name;
    //ruta dentro del server donde se subira la imagen de perfil
    var uploadPath=(config.uploads.productUpload.uploadDir+file.name);
    // ruta dentro del server donde se encuentra la imagen de perfil
    var newPath='assets/product/uploads/' + file.name;
    //renombro el archivo con el nombre por default
    fs.rename(file.path, uploadPath,err =>{
       //Elimino el archivo temporal en el cliente y actualizo la ruta en base de datos
      fs.unlink(file.path, err=>{

      });
    });
    //se agrega la propiedad imageProduct al req actualizada con la nueva ruta
    product.imageProduct=newPath;
  }
  //retorna el callback con el product
  cb(product);
}

// Gets a list of Products
export function index(req, res) {
  Product.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Product from the DB
export function show(req, res) {
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Product in the DB
export function create(req, res) {
  var product=req.body.product;
  //File enviado desde el cliente
  var file=req.files.file;
  //function para subir imagen al server,generar el nombre y eliminar imagen temporal
  uploadImages(file,product,product=>{
    Product.createAsync(product)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
  });
  //se realiza la creacion del documento de forma asincrona

}

// Updates an existing Product in the DB
export function update(req, res) {
//si la actualizacion viene con alguna imagen para subir al server
//sino se actualiza la informacion sin la imagen
 if(req.files){
    var file=req.files.file;
    if (req.body._id) {
      delete req.body._id;
    }
    uploadImages(file,req.body.product,product=>{
      Product.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(saveUpdates(product))
      .then(responseWithResult(res))
      .catch(handleError(res));
    });
  }
  else{
    if (req.body._id) {
      delete req.body._id;
    }
    Product.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
}

// Deletes a Product from the DB
export function destroy(req, res) {
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(product=>{
      if(product.imageProduct!=='assets/product/default.jpg'){
        //se crear el path de la ruta donde se encuentra alojada la imagen
        //para despues eliminarla
        fs.unlink(('client'+'/'+product.imageProduct), err=>{
            //retorna el error si no se puede eliminar la imagen.
            if(err) return res.status(500).send(err);
              //se remueve todo el documento
              removeEntity(product,res);
        });
      }
      else{
        //se remueve todo el documento
        removeEntity(product,res);
      }
    })
    .catch(handleError(res));
}
