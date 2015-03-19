angular.module('Remember')

.service('authService', authService);

function authService($firebase) {
  var firebaseUrl = 'https://rememberthismoment.firebaseio.com/';
  var ref = new Firebase(firebaseUrl);
  var auth = this;


  var setUser = function(user){
    user.uid = user.uid.replace('simplelogin:', '');
    localStorage.setItem('user', JSON.stringify(user));
  };

  auth.login = function login(user, cb) {
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, function(err, authData) {
      if(err) {
        cb(null, err);
      } else {
        setUser(authData);
        cb(authData);
      }
    });
  };

  auth.register = function register(user, cb) {
      ref.createUser({
      email    : user.email,
      password : user.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        return error;
      } else {
          console.log("Successfully created user account with uid:", userData.uid);
          userData.name = user.name;
          userData.userId = userData.uid.replace('simplelogin:', '');
          console.log('userData', userData);
          ref.child('users').child(userData.uid.replace('simplelogin:', '')).set(userData);
          auth.login(userData, cb);
      }
    });
  };

  auth.checkAuth = ref.getAuth();

  auth.logout = function(cb) {
    ref.unauth();
    cb();
  };
}