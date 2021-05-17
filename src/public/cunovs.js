var cunovs = {
  cnVersion: '1.0.0',
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnId: function () {
    return cnGlobalIndex++;
  },
  cnIsArray: function (o) {
    if (cnIsDefined(o)) {
      return cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]';
    }
    return false;
  },
  cnIsDefined: function (o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null);
  },
  cnIsDevice: function () {
    return typeof (device) != 'undefined';
  },
  cnIsAndroid: function () {
    return cnIsDevice() && device.platform == 'Android';
  },
  cnIsiOS: function () {
    return cnIsDevice() && device.platform == 'iOS';
  },
  cnUpdate: function (url) {
    window.location.href = url;
  },
  cnDeviceType: function () {
    if (cnIsAndroid()) {
      return 'android';
    }
    return '';
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString('#4eaaf7');
      } else {
        router = router || '/';
        switch (router) {
          case '/':
          case '/dashboard': {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#fff');
            break;
          }
          default: {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#fff');
          }
        }
      }
    }
  },
  cnPlayAudio: function (id, played) {
    var el;
    if (cnIsDefined(id) && (el = document.getElementById(id))) {
      played === true ? el.pause() : el.play();
    }
  },
  cnPrn: function (ars) {
    console.log(ars || arguments);
  },
  cnTakePhoto: function (cb, type) {
    var onSuccess = function (cb, dataurl) {
      cb(cnCreateBlob(dataurl), dataurl);
    };
    var onFail = function () {
    };
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    });
  },
  cnCreateBlob: function (data, name, type) {
    var arr = data.split(',')
      ,
      bstr = atob(arr.length > 1 ? arr[1] : data)
      ,
      n = bstr.length
      ,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], {
      type: type || 'image/jpeg',
    });
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg';
    return blob;
  },
  checkConnection: function () {
    if (navigator.connection) {
      var networkState = (navigator.connection.type).toLocaleUpperCase();
      var states = {};
      const Connection = {};
      states.UNKNOWN = '未知网络';
      states.ETHERNET = 'Ethernet connection';
      states.WIFI = '正在用WIFI观看';
      states.CELL_2G = '正在用2G网络观看';
      states.CELL_3G = '正在用3G网络观看';
      states.CELL_4G = '正在用4G网络观看';
      states.CELL = 'Cell generic connection';
      states.NONE = '无网络连接';
      return (states[networkState]);
    }
  },
  cnOpen: function (url, target, params, callback) {
    //target = target || '_blank';
    window.open(url, target);
  },
  cnReadFile: function (file, params, onSuccess, onError) {
    onSuccess = onSuccess || cnPrn;
    onError = onError || cnPrn;
    params = params || {};
    if (!file) {
      onError({
        message: '文件不存在。',
      });
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        onSuccess(cnCreateBlob(e.target.result, params.name, params.type), params);
      };
      reader.onerror = onError;
      reader.readAsDataURL(file);
    }
  },
  cnCheckPermissions: function (type = 'RECORD_AUDIO', onSuccess, onError, stopRecord) {
    if (cordova.plugins) {
      var permissions = cordova.plugins.permissions;
      permissions.checkPermission(permissions[type], function (s) {
        if (!s.hasPermission) {
          stopRecord()
          permissions.requestPermission(permissions[type], function (s) {
            if (s.hasPermission) {
              onSuccess();
            }
            else {
              onError();
              stopRecord()
            }
          }, function (error) {
            console.log(error);
          });
        } else {
          onSuccess();
        }
      }, function (error) {
        console.log(error);
      });
    }
  },
  cnStartRecord: function (onSuccess, onError) {
    if (xunfeiListenSpeaking) {
      xunfeiListenSpeaking.startListen(onSuccess, onError, false, true);
    }
  },
  cnStartSpeak: function (onSuccess, onError, text) {
    if (xunfeiListenSpeaking) {
      xunfeiListenSpeaking.startSpeak(onSuccess, onError, text);
    }
  },
  cnStopRecord: function () {
    if (xunfeiListenSpeaking) {
      xunfeiListenSpeaking.stopListen();
    }
  },
  cnDecode: function (json) {
    try {
      return eval('(' + json + ')');
    } catch (e) {
      try {
        return JSON.parse(json);
      } catch (e) {
        return json;
      }
    }
  },
  cnShowToast: function (d, time) {
    //退出提示
    var dialog = document.createElement('div');
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);';
    dialog.innerHTML = d;
    document.getElementsByTagName('body')[0].appendChild(dialog);
    setTimeout(function () {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog);
      }
    }, time || 2000);
  },
  cnScreenChange: function (isFull) {
    console.log(' ------------- isFull : ' + isFull);
    if (cnIsDevice()) {
      if (isFull === true) {
        screen.orientation.lock('landscape');
        StatusBar.hide();
      } else {
        screen.orientation.lock('portrait');
        StatusBar.show();
      }
    }
  },
};

window.cnApply = cunovs.cnIsDefined(Object.assign) ? Object.assign : function (target, source) {
  if (target && source && typeof source == 'object') {
    for (var att in source) {
      target[att] = source[att];
    }
    return target;
  }
  return target || {};
};
cnApply(window, cunovs);

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
  };
}

(function () {
  var onDeviceReady = function () {
      try {
        if (cnIsDefined(StatusBar) != 'undefined') {
          StatusBar.overlaysWebView(false);
          cnSetStatusBarStyle();
        }
        if (cordova.InAppBrowser) {
          cnOpen = function (url, target, params, callback) {
            var getDefaultTarget = function () {
              if (cnIsiOS()) {
                return '_blank';
              }
              return '_self';
            };
            var getDefaultParams = function () {
              if (cnIsiOS()) {
                return 'location=no,toolbarposition=top,closebuttoncaption=完成,closebuttoncolor=#ffffff,hideurlbar=yes,toolbarcolor=#4eaaf7,navigationbuttoncolor=#ffffff';
              }
              return 'location=yes,hideurlbar=yes,toolbarcolor=#22609c,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff';
            };
            target = target || getDefaultTarget();
            params = params || getDefaultParams();
            callback = callback || new Function();
            var ref = cordova.InAppBrowser.open(url, target, params, callback),
              spinner = '<!DOCTYPE html><html><head><meta name=\'viewport\' content=\'width=device-width,height=device-height,initial-scale=1\'><style>.loader {position: absolute;    margin-left: -2em;    left: 50%;    top: 50%;    margin-top: -2em;    border: 5px solid #f3f3f3;    border-radius: 50%;    border-top: 5px solid #3498db;    width: 50px;    height: 50px;    -webkit-animation: spin 1.5s linear infinite;    animation: spin 1.5s linear infinite;}@-webkit-keyframes spin {  0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); }}@keyframes spin {  0% { transform: rotate(0deg); }  100% { transform:rotate(360deg); }}</style></head><body><div class=\'loader\'></div></body></html>';
            ref.executeScript({ code: '(function() {document.write("' + spinner + '");window.location.href=\'' + url + '\';})()' });
          };
        }
      } catch (exception) {
      }
    },
    exitApp = function () {
      navigator.app.exitApp();
    },
    onExitApp = function () {
      if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined') {
        var curHref = window.location.href;
        if (curHref.indexOf('/login') != -1) {
          navigator.app.exitApp();
        } else if (curHref.indexOf('/?_k') != -1) {
          cnShowToast('再按一次退出APP');
          document.removeEventListener('backbutton', onExitApp, false);
          document.addEventListener('backbutton', exitApp, false);
          var intervalID = window.setTimeout(function () {
            window.clearTimeout(intervalID);
            document.removeEventListener('backbutton', exitApp, false);
            document.addEventListener('backbutton', onExitApp, false);
          }, 2000);
        } else {
          navigator.app.backHistory();
        }
      }
    },
    screenChangeEvents = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
  for (var i = 0; i < screenChangeEvents.length; i++) {
    document.addEventListener(screenChangeEvents[i], function (e) {
      if (e.target && e.target.tagName === 'VIDEO' && cnIsDefined(document.webkitIsFullScreen)) {
        cnScreenChange(document.webkitIsFullScreen);
      }
    });
  }
  document.addEventListener('deviceready', onDeviceReady, false);
  document.addEventListener('backbutton', onExitApp, false);

  function resizeBaseFontSize () {
    var rootHtml = document.documentElement
      ,
      deviceWidth = rootHtml.clientWidth;
    if (deviceWidth > 1024) {
      deviceWidth = 1024;
    }
    cnhtmlSize = deviceWidth / 7.5;
    rootHtml.style.fontSize = cnhtmlSize + 'px';
  }

  resizeBaseFontSize();
  window.addEventListener('resize', resizeBaseFontSize, false);
  window.addEventListener('orientationchange', resizeBaseFontSize, false);
})();
