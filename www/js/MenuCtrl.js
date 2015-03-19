angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, $ionicModal, $timeout, $state, authService) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.logout = function() {
    authService.logout(function() {
      $state.go('app.login');
    });
  };
});
