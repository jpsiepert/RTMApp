angular.module('Remember')

.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $state, firebaseService, $ionicHistory, authService, $timeout, $cordovaCamera) {
  var mem = this;
  mem.user = {};
  

  var checkAuth = function() {
    authService.checkAuth(function(userAuth) {
      if(userAuth) {
        $ionicHistory.clearHistory();
        var id = userAuth.uid.replace('simplelogin:', '');
        mem.user = firebaseService.getUser(id);
      } else {
        $state.go('app.login');
      }
    });
  };

  checkAuth();

  console.log('mem.user', mem.user);

  mem.memories = firebaseService.getMemories(mem.user.$id);

  mem.addMemory = function() {
    mem.memory.date = Firebase.ServerValue.TIMESTAMP;
    mem.memories.$add(mem.memory);
    mem.memory = '';
  };


  mem.upload = function() {
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
        mem.memories.$add({image: imageData}).then(function() {
            alert("Image has been uploaded");
        });
    }, function(error) {
        console.error(error);
    });
  };


}