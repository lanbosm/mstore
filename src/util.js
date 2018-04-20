/**
 * Created by zwwill on 2017/8/27.
 */

var u = {};

var isAndroid = (/android/gi).test(navigator.appVersion);

var uzStorage = function(){

  var ls = window.localStorage;

  if(isAndroid&&os){

    ls = os.localStorage();

  }

  return ls;

};



u.trim = function(str){

  if(String.prototype.trim){

    return str == null ? "" : String.prototype.trim.call(str);

  }else{

    return str.replace(/(^\s*)|(\s*$)/g, "");

  }

};

u.trimAll = function(str){

  return str.replace(/\s*/g,'');

};

u.isElement = function(obj){

  return !!(obj && obj.nodeType == 1);

};

u.isArray = function(obj){

  if(Array.isArray){

    return Array.isArray(obj);

  }else{

    return obj instanceof Array;

  }

};

u.isEmptyObject = function(obj){

  if(JSON.stringify(obj) === '{}'){

    return true;

  }

  return false;

};




u.setStorage = function(key, value){

  if(arguments.length === 2){

    var v = value;

    if(typeof v == 'object'){

      v = JSON.stringify(v);

      v = 'obj-'+ v;

    }else{

      v = 'str-'+ v;

    }

    var ls = uzStorage();

    if(ls){

      ls.setItem(key, v);

    }

  }

};

u.getStorage = function(key){

  var ls = uzStorage();

  if(ls){

    var v = ls.getItem(key);

    if(!v){return;}

    if(v.indexOf('obj-') === 0){

      v = v.slice(4);

      return JSON.parse(v);

    }else if(v.indexOf('str-') === 0){

      return v.slice(4);

    }

  }

};

u.rmStorage = function(key){

  var ls = uzStorage();

  if(ls && key){

    ls.removeItem(key);

  }

};

u.clearStorage = function(){

  var ls = uzStorage();

  if(ls){

    ls.clear();

  }

};


u.initIconFont=function() {
        //weex
        // let domModule = weex.requireModule('dom');
        // domModule.addRule('fontFace', {
        //     'fontFamily': "iconfont",
        //     'src': "url('http://at.alicdn.com/t/font_404010_jgmnakd1zizr529.ttf')"
        // });
        //web
        let head=document.querySelector('head');
        let fontCss=document.createElement('link');
            fontCss.rel="stylesheet";
            fontCss.type="text/css";
            fontCss.href="https://at.alicdn.com/t/font_423293_oalpx9xgy4i8jjor.css"
        head.appendChild(fontCss);
      //  alert(dom);
}

u.setBundleUrl=function(url, jsFile) {
        const bundleUrl = url;
        let host = '';
        let path = '';
        let nativeBase;
        const isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
        const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
        if (isAndroidAssets) {
            nativeBase = 'file://assets/dist';
        } else if (isiOSAssets) {
            // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
            // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
        } else {
            const matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
            const matchFirstPath = /\/\/[^\/]+\/([^\/]+)\//.exec(bundleUrl);
            if (matches && matches.length >= 2) {
                host = matches[1];
            }
            if (matchFirstPath && matchFirstPath.length >= 2) {
                path = matchFirstPath[1];
            }
            nativeBase = 'http://' + host + '/';
        }
        const h5Base = './index.html?page=';
        // in Native
        let base = nativeBase;
        if (typeof navigator !== 'undefined' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko')) {
            // check if in weexpack project
            if (path === 'web' || path === 'dist') {
                base = h5Base + '/dist/';
            } else {
                base = h5Base + '';
            }
        } else {
            base = nativeBase + (!!path? path+'/':'');
        }

        const newUrl = base + jsFile;
        return newUrl;
}

u.getUrlSearch=function(url,name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = url.slice(url.indexOf('?')+1).match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (_e) {
                return null;
            }
        }
        return null;
};

u.testPromise=function(delay,data){
  // 20ms 后去 resolve
  var delay=delay||300;
  var msg={msg:"响应陈工"}||data;
  return new Promise((resolve,reject) => {
    setTimeout(()=>{ resolve(msg); },delay);
  });
}




export default u;
