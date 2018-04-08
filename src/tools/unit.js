export default{
  winOnresize(referClass, num){
    try {
      var that = this;
      var change = _ => {
        try {
          setTimeout(function(){
            that["tabHeight"] = document.getElementsByClassName(referClass)[0].offsetHeight - num;
          },100)
        }catch (error){}
      };
      change();
      window.onresize = function () {
        change();
      }
    } catch (e) {
    }
  },
  rt(date, bool, type){ // 2014-01-01
    var str = "";
    /*if (date && date.indexOf('-') !== -1) {
      var arr = date.split('-');
      str = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'; // 2014年01月01日
      if(date.split(" ")){
        str += date.split(" ")
      }
    }*/
    if(date){
      var _date = new Date(date);
        if(type) {
          str = _date.getFullYear() + type + (_date.getMonth() + 1) + type + _date.getDate() +""+ (bool ? (" " + _date.getHours() + ":" + _date.getMinutes()) : "");
        }else{
          str = _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日" + (bool ? (" " + _date.getHours() + ":" + _date.getMinutes()) : "");
        }
    }
    return str;
  },
  initTab(tabId, tabList){
    var that = this;
    setTimeout(function(){
      var _list = that.$store.getters.getCurrR.childrens ? that.$store.getters.getCurrR.childrens : [];
      if(_list && _list.length > 0){
        var hash = window.location.hash.split("?");
        if (hash.length >= 2) {
          var _curr = hash[1];
          var _arr = _list.filter(function (element) {
            return element.name == _curr;
          });
          if (_arr && _arr.length > 0) {
            that[tabId] = _curr;
            that[tabList] = _list;
            return;
          };
        }
        that[tabId] = _list[0].name;
        that[tabList] = _list;
      };
    })
  }
}
/* istanbul ignore next */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
/* istanbul ignore next */
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
