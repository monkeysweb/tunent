/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //alert('Ready');
//facebookConnectPlugin.login(["public_profile"," manage_pages"],
//    fbLoginSuccess,
//    function (error) { alert("Error" + JSON.stringify(error)) }
//);
//        var svg = document.querySelector('svg.round-progress');
//        //class="draggable"
//        $('path').addClass('draggable');
//        console.log($('path'));
//        console.log('HERE COMETH THE SVG'+svg);
//// Create an SVGPoint for future math
//        var pt = svg.createSVGPoint();
//        var elem = document.querySelector('.draggable');
//        var draggie = new Draggabilly( elem, {
//            containment: 'true'
//        });
//// Get point in global SVG space
//        function cursorPoint(evt){
//            pt.x = evt.targetTouches[0].clientX; pt.y = evt.targetTouches[0].clientY;
//            return pt.matrixTransform(svg.getScreenCTM().inverse());
//        }
//// function angle(ex, ey) {
////   var dy = ey - 100;
////   var dx = ex - 100;
////   var theta = Math.atan2(dy, dx); // range (-PI, PI]
////   theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
////   //if (theta < 0) theta = 360 + theta; // range [0, 360)
////   return theta;
//// }
//        function angle(center, p1) {
//            var p0 = {x: center.x, y: center.y - Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x)
//                + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))};
//            return (2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)) * 180 / Math.PI;
//        }
//        svg.addEventListener('touchstart',function(evt){
//            var loc = cursorPoint(evt);
//            // Use loc.x and loc.y here
//            // console.log(Math.sqrt((100-loc.x)*(100-loc.x) + (100-loc.y)*(100-loc.y)));
//            // console.log(Math.sqrt((100-loc.x)*(100-loc.x) + (100-loc.y)*(100-loc.y)) > 93 && Math.sqrt((100-loc.x)*(100-loc.x) + (100-loc.y)*(100-loc.y)) < 100)
//            // console.log(Math.atan2( (loc.y), (loc.x)) * (180 / Math.PI));
//            console.log("X: "+loc.x+" Y: "+loc.y);
//            console.log(angle({x:100,y:100},{x:loc.x,y:loc.y}));
//            console.log((2*Math.PI*100*(angle({x:100,y:100},{x:loc.x,y:loc.y})/360)/627)*angular.element(document.querySelector('#circle1')).scope().myTrack.duration);
//            console.log(angular.element(document.querySelector('#circle1')).scope().myTrack.progress);
//            angular.element(document.querySelector('#circle1')).scope().myTrack.progress=(2*Math.PI*100*(angle({x:100,y:100},{x:loc.x,y:loc.y})/360)/628.32)*angular.element(document.querySelector('#circle1')).scope().myTrack.duration;
//            angular.element(document.querySelector('#circle')).scope().sliderRelease();
//            angular.element(document.querySelector('#circle')).scope().$apply();
//        } );

        //facebookConnectPlugin.logout(function(){}, function(){});
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        //
        //console.log('Received Event: ' + id);
    }
};

app.initialize();