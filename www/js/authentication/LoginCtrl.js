angular.module('Remember')

.controller('LoginCtrl', AuthCtrl);

function AuthCtrl(authService, $state, $scope, $location, $ionicHistory) {
  $ionicHistory.clearHistory();
  $scope.login = function login(user) {
    authService.login(user, function(usr, err) {
      if(!err) {
        $state.go('app.home');
      } else {

        //TODO: make this a div ng-show
        alert('Oops, something went wrong');
      }
    });
  };
}
