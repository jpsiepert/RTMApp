angular.module('Remember')

.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $state, memRef) {

  $scope.memories = memRef;

  $scope.addMemory = function() {
    $scope.memories.$add($scope.memory);
  };
}