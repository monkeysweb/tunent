// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ui.router'])

.run(function($ionicPlatform,$ionicHistory,$cordovaStatusbar,$rootScope, $urlRouter,$location,$state) {
        $ionicPlatform.registerBackButtonAction(function () {
            if ($state.current.name=="login") {
                navigator.app.exitApp();
            } else {
                $ionicHistory.goBack();
                window.plugins.nativepagetransitions.slide({
                        "direction": 'right'
                    },
                    function(msg) {
                        console.log("success: " + msg);
                    },
                    function(msg) {
                        alert("error: " + msg)
                    }
                )
            }
        }, 100);
        $rootScope.$on('$stateChangeStart', function(evt,toState, toParams, fromState, fromParams) {
            //if(toState.name=='login'){
            //
            //}
            //console.log("From: "+JSON.stringify(fromState));
            //console.log("To: "+JSON.stringify(toState));
            //console.log(evt);
        });
        //$rootScope.$on('$stateChangeSuccess',
        //    function(event, toState, toParams, fromState, fromParams){
        //        console.log('Success');
        //    })
        //$rootScope.$on('$stateChangeError',
        //    function(event, toState, toParams, fromState, fromParams, error){
        //        console.log('Success');
        //    })
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //  if(window.StatusBar) {
    //      alert('Status Bar');
    //      alert($cordovaStatusbar.isVisible());
    //      StatusBar.backgroundColorByName("red");
    //  }
    //if(window.cordova && window.cordova.plugins.Keyboard) {
    //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //}
      // then override any default you want
      window.plugins.nativepagetransitions.globalOptions.duration = 300;
      window.plugins.nativepagetransitions.globalOptions.iosdelay = 150;
      window.plugins.nativepagetransitions.globalOptions.androiddelay = 150;
      window.plugins.nativepagetransitions.globalOptions.winphonedelay = 150;
      window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
      // these are used for slide left/right only currently
      window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
      window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
      $cordovaStatusbar.overlaysWebView(false);

      $cordovaStatusbar.style(0) //Light
      $cordovaStatusbar.styleHex('#FC8053') //Light
      //#FC8053
      //$cordovaStatusbar.hide();
  });
})
//.config(function($cordovaFacebookProvider) {
//  var appID = 879783368757618;
//  var version = "v2.0"; // or leave blank and default is v2.0
//})
.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider) {
        $ionicConfigProvider.views.transition('none');
    $urlRouterProvider.otherwise('login');
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    });
        $stateProvider.state('settings', {
            url: '/settings',
            abstract:true,
            templateUrl:'templates/settingscontainer.html'
        });
        $stateProvider.state('settings.index', {
            url: '',
            onEnter: function () {
                console.log("entered settings state");
                //        $ionicHistory.clearHistory();
            },
            //views:{
            //    settings:{
            //        templateUrl: 'templates/settings.html',
            //        controller: 'settingsCtrl'
            //    }
            //},
            views: {
                'settings': {
                    templateUrl: "templates/settings.html",
                    controller: 'settingsCtrl'
                }
            }
        })
        $stateProvider.state('settings.app', {
            url: '/app',
            views: {
                'settings': {
                    templateUrl: 'templates/appsettings.html',
                    controller: 'AppSettingsCtrl'
                }
            }
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
})
    .controller('settingsCtrl', function($scope,$state) {
        $scope.gotoAppSettings=function(){
            $state.go('settings.app');
            window.plugins.nativepagetransitions.slide({
                    "direction": 'left'
                },
                function(msg) {
                    console.log("success: " + msg);
                },
                function(msg) {
                    alert("error: " + msg)
                }
            )
        };
        //$scope.posts = [];
        //
        //for(var i = 0; i < 7; i++) {
        //    // Fake a date
        //    var date = (+new Date) - (i * 1000 * 60 * 60);
        //    $scope.posts.push({
        //        created_at: date,
        //        text: 'Doing a bit of ' + ((Math.floor(Math.random() * 2) === 1) ? 'that' : 'this')
        //    });
        //}
    })
    .controller('AppSettingsCtrl', function($scope) {
        //$scope.posts = [];
        //
        //for(var i = 0; i < 7; i++) {
        //    // Fake a date
        //    var date = (+new Date) - (i * 1000 * 60 * 60);
        //    $scope.posts.push({
        //        created_at: date,
        //        text: 'Doing a bit of ' + ((Math.floor(Math.random() * 2) === 1) ? 'that' : 'this')
        //    });
        //}
    })
    .directive('goNative', ['$ionicGesture', '$ionicPlatform', function($ionicGesture, $ionicPlatform) {
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {

            $ionicGesture.on('tap', function(e) {

                var direction = attrs.direction;
                var transitiontype = attrs.transitiontype;

                $ionicPlatform.ready(function() {
                    try{
                    switch (transitiontype) {
                        case "slide":
                            window.plugins.nativepagetransitions.slide({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;
                        case "flip":
                            window.plugins.nativepagetransitions.flip({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        case "fade":
                            window.plugins.nativepagetransitions.fade({

                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        case "drawer":
                            window.plugins.nativepagetransitions.drawer({
                                    "origin"         : direction,
                                    "action"         : "open"
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        case "curl":
                            window.plugins.nativepagetransitions.curl({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        default:
                            window.plugins.nativepagetransitions.slide({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                    }}
                    catch (e){
                        console.log(JSON.stringify(e));
                    }
                });
            }, element);
        }
    };
}]);






var tust=function(access_token,appInBrowser){
    $.ajax({url: "https://api.soundcloud.com/me?oauth_token="+access_token, success: function(result){
        alert(JSON.stringify(result));
        appInBrowser.close();
    }});
}