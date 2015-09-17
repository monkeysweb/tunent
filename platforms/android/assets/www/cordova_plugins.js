cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.oauthio.plugins.oauthio/www/dist/oauth.js",
        "id": "com.oauthio.plugins.oauthio.OAuth",
        "merges": [
            "OAuth"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.facebookconnect/facebookConnectPlugin.js",
        "id": "com.phonegap.plugins.facebookconnect.FacebookConnectPlugin",
        "clobbers": [
            "facebookConnectPlugin"
        ]
    },
    {
        "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
        "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
        "clobbers": [
            "window.plugins.nativepagetransitions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.oauthio.plugins.oauthio": "0.2.4",
    "cordova-plugin-whitelist": "1.0.0",
    "org.apache.cordova.device": "0.2.13",
    "org.apache.cordova.splashscreen": "0.3.5",
    "cordova-plugin-statusbar": "2.0.0-dev",
    "com.phonegap.plugins.facebookconnect": "0.11.0",
    "com.telerik.plugins.nativepagetransitions": "0.4.1",
    "org.apache.cordova.inappbrowser": "0.6.0"
}
// BOTTOM OF METADATA
});