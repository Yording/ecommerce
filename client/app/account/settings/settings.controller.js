'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  // En el contructor se pueden añadir depedencias angularjs y llamarlas this.depedencia
  constructor(Auth) {
    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Contraseña cambiada sastifastoriamente.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Contraseña Incorrecta';
          this.message = '';
        });
    }
  }
  // Actualizar informacion de perfil del user
    editProfile(form){
      console.log(form);
      this.submitted=true;
      this.user=this.getCurrentUser();
      if(form.$valid){
        this.Auth.editProfile(this.user)
        .then(() => {
          this.message = 'Perfil actualizado.';
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Retorna los errores de la validacion de mongoose
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });

      }
    } 
 
}
// angular.module('sachaAppApp').factory('Settings',Settings);
angular.module('sachaAppApp')
  .controller('SettingsController',SettingsController);
