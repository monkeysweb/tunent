// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ui.router','ionic-audio','angular-svg-round-progress'])

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
        $stateProvider.state('artistlogin', {
            url: '/artistlogin',
            templateUrl: 'templates/artistlogin.html',
            controller: 'artistloginCtrl'
        });
        $stateProvider.state('discover', {
        url: '/discover',
        templateUrl: 'templates/discover.html',
        controller: 'discoverCtrl'
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
.controller('loginCtrl', function($scope,$state) {
        //$scope.$on("$ionicView.loaded", function() {
        //
        //});
        var fbLoginSuccess = function (userData) {
            alert("UserInfo: " + JSON.stringify(userData));
            $state.go('discover');
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
        }
        $scope.checkLogin=function(){
            facebookConnectPlugin.getLoginStatus(function(response){
                if(response.status=='connected'){
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    alert('Already logged-in. UUID: '+uid);
                    alert('Access Token: '+accessToken);
                    $state.go('discover');
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
                }
                else{
                    facebookConnectPlugin.login(["public_profile"," manage_pages"],
                        fbLoginSuccess,
                        function (error) { alert("" + error) }
                    );
                }
            }, function(error){alert('error '+error)});
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
}).controller('artistloginCtrl', function($scope,$state) {
        $scope.gotoAppSettings=function(){
            $state.go('login');
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
        };
        $scope.checkLogin=function(){
            facebookConnectPlugin.getLoginStatus(function(response){
                if(response.status=='connected'){
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    alert('Already logged-in. UUID: '+uid);
                    alert('Access Token: '+accessToken);
                    $state.go('discover');
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
                }
                else{
                    facebookConnectPlugin.login(["public_profile"," manage_pages"],
                        fbLoginSuccess,
                        function (error) { alert("" + error) }
                    );
                }
            }, function(error){alert('error '+error)});
        };
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
    .controller('discoverCtrl', function($scope,$state) {
        $scope.gotoSettings=function(){
            $state.go('settings.index');
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
        $scope.$on("$ionicView.loaded", function() {
        var svg = document.querySelector('svg.round-progress');
        //class="draggable"
        $('path').addClass('draggable');
        console.log($('path'));
        console.log('HERE COMETH THE SVG'+svg);
// Create an SVGPoint for future math
        var pt = svg.createSVGPoint();
        var elem = document.querySelector('.draggable');
        var draggie = new Draggabilly( elem, {
            containment: 'true'
        });
// Get point in global SVG space
        function cursorPoint(evt){
            pt.x = evt.targetTouches[0].clientX; pt.y = evt.targetTouches[0].clientY;
            return pt.matrixTransform(svg.getScreenCTM().inverse());
        }
// function angle(ex, ey) {
//   var dy = ey - 100;
//   var dx = ex - 100;
//   var theta = Math.atan2(dy, dx); // range (-PI, PI]
//   theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
//   //if (theta < 0) theta = 360 + theta; // range [0, 360)
//   return theta;
// }
        function angle(center, p1) {
            var p0 = {x: center.x, y: center.y - Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x)
                + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))};
            return (2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)) * 180 / Math.PI;
        }
        svg.addEventListener('touchstart',function(evt){
            var loc = cursorPoint(evt);
            // Use loc.x and loc.y here
            // console.log(Math.sqrt((100-loc.x)*(100-loc.x) + (100-loc.y)*(100-loc.y)));
            // console.log(Math.sqrt((100-loc.x)*(100-loc.x) + (100-loc.y)*(100-loc.y)) > 93 && Math.sqrt((100-loc.x)*(100-loc.x) + (100-loc.y)*(100-loc.y)) < 100)
            // console.log(Math.atan2( (loc.y), (loc.x)) * (180 / Math.PI));
            console.log("X: "+loc.x+" Y: "+loc.y);
            console.log(angle({x:100,y:100},{x:loc.x,y:loc.y}));
            console.log((2*Math.PI*100*(angle({x:100,y:100},{x:loc.x,y:loc.y})/360)/627)*angular.element(document.querySelector('#circle1')).scope().myTrack.duration);
            console.log(angular.element(document.querySelector('#circle1')).scope().myTrack.progress);
            angular.element(document.querySelector('#circle1')).scope().myTrack.progress=(2*Math.PI*100*(angle({x:100,y:100},{x:loc.x,y:loc.y})/360)/628.32)*angular.element(document.querySelector('#circle1')).scope().myTrack.duration;
            angular.element(document.querySelector('#circle')).scope().sliderRelease();
            angular.element(document.querySelector('#circle')).scope().$apply();
        } );
        });
        console.log('In Discover');
        $scope.myTrack = {
            url: 'http://www.thedatasin.net/mp32/R/Red%20Hot%20Chili%20Peppers/By%20The%20Way/06%20The%20Zephyr%20Song.mp3',
            artist: 'Somebody',
            title: 'Song name',
            art: 'https://ionic-audio.s3.amazonaws.com/The_Police_Greatest_Hits.jpg'
        }
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

angular.module('angular-svg-round-progress').config(['$provide', function($provide) {
    $provide.decorator('roundProgressDirective', ['$delegate', function($delegate){
        var directive = $delegate[0];

        directive.compile = function(element){
            element.find('path').eq(0).attr('marker-start', 'url(#circle)');
            return directive.link;
        };

        return $delegate;
    }]);
}]);




var tust=function(access_token,appInBrowser){
    $.ajax({url: "https://api.soundcloud.com/me?oauth_token="+access_token, success: function(result){
        alert(JSON.stringify(result));
        appInBrowser.close();
    }});
}