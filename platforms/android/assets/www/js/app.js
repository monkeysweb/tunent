// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//.config(function($cordovaFacebookProvider) {
//  var appID = 879783368757618;
//  var version = "v2.0"; // or leave blank and default is v2.0
//})
.config(function($stateProvider,$urlRouterProvider,$httpProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
})
.controller('loginCtrl', function($scope) {
        $scope.hey=function(){
            SC.get("/groups/55517/tracks", {limit: 1}, function(tracks){
                alert("Latest track: " + tracks[0].title);
            });
        }
        $scope.SoundCloudLogin=function(){
            // initiate auth popup
            SC.initialize({
                client_id: 'e7a47f54bbfac42ca2b1cb1da4e42b2e',
                redirect_uri: 'http://www.google.com'
            });
            SC.connect(function() {
                SC.get('/me', function(me) {
                    alert('Hello, ' + me.username);
                });
            });
        };
});

var tust=function(access_token,appInBrowser){
    $.ajax({url: "https://api.soundcloud.com/me?oauth_token="+access_token, success: function(result){
        alert(JSON.stringify(result));
        appInBrowser.close();
    }});
}