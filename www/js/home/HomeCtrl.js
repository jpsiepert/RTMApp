angular.module('Remember')

.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $state, firebaseService, authService) {
  var mem = this;
  $scope.user = {};
  mem.init = function init () {
    var userAuth = authService.checkAuth;
    console.log(userAuth);
    if(userAuth) {
      $scope.user.id = userAuth.uid.replace('simplelogin:', '');
    } else {
      $state.go('app.login');
    }
  }();

  console.log('$scope.user', $scope.user);

  mem.memories = firebaseService.getMemories($scope.user.id);

  mem.addMemory = function() {
    mem.memory.date = Firebase.ServerValue.TIMESTAMP;
    mem.memories.$add(mem.memory);
    mem.memory = '';
  };



}