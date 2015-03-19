angular.module('Remember')

.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $state, firebaseService) {
  var mem = this;

  mem.memories = firebaseService.getMemories(5);

  mem.addMemory = function() {
    mem.memories.$add(mem.memory);
    mem.memory = '';
  };

}