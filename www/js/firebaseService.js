angular.module('Remember')

.service('firebaseService', firebaseService);

function firebaseService ($firebase) {

  var firebaseUrl = 'https://rememberthismoment.firebaseio.com/';
  var ref = new Firebase(firebaseUrl);


  this.getMemories = function(userId) {
    return $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/memories')).$asArray();
  };
}