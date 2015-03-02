angular.module('Remember')

.controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl(authService, $scope, $state) {
  $scope.invalidUser = false;
  $scope.passwordMatch = false;
  //var vm = this;

  $scope.register = function register(user) {
    authService.register(user, function(authUser, err) {
      if(err) {
        $scope.invalidUser = true;
        console.log('err', err);
      } else {
        $state.go('app.playlists');
      }
    });
  };

  $scope.passwordCheck = function passwordCheck() {
    if($scope.password !== $scope.passwordConfirm) {
      $scope.passwordMatch = true;
    } else {
      $scope.passwordMatch = false;
    }
  };

}