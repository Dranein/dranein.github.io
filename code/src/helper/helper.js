import Vue from 'vue'
import $ from 'jquery'



var storage = (function() {
  var isSupport = function(storageType) {
    var testKey = 'test'
    var storage = window[storageType]
    try {
      storage.setItem(testKey, '1')
      storage.removeItem(testKey)
      return storageType in window && window[storageType]
    } catch (e) {
      return false
    }
  }
  var storages = ['localStorage', 'sessionStorage']
  for (var i = 0, len = storages.length; i < len; i++) {
    if (isSupport(storages[i])) return window[storages[i]]
  }
  return null
})()

const _buffer = {
  nonMark: false,
  sessionData: {

  }
}

const helper = {
  loadingStatus_show: 0,
  loadingStatus_hide: 0,
  storage: storage,
  /* 判断 obj 是否为 null
     Usage:
       var obj = null
       helper.isNull(obj) // 输出 true
  */
  isNull: function(obj) {
    return obj === null || obj === undefined || obj === "" || obj !== obj;
  },

  /* 判断 obj 是否为 function
     Usage:
       var obj = 'abc'
       helper.isFunction(obj) // 输出 false
  */
  isFunction: isType('Function'),

  /* 判断 obj 是否为 object
     Usage:
       var obj = {}
       helper.isObject(obj) // 输出 true
  */
  isObject: isType('Object'),

  /* 判断 obj 是否为 array
     Usage:
       var obj = ['abc']
       helper.isArray(obj) // 输出 true
  */
  isArray: window.isArray || isType('Array'),

  /* 判断 obj 是否为 string
     Usage:
       var obj = 'abc'
       helper.isString(obj) // 输出 true
  */
  isString: isType('String'),

  /* 判断 obj 是否为 undefined
     Usage:
       var obj = 'abc'
       helper.isUndefined(obj) // 输出 false
  */
  isNumber: isType('Number'),
  /* 判断 obj 是否为 Number
     Usage:
       var obj = 123
       helper.isUndefined(obj) // 输出 true
  */
  isUndefined: isType('Undefined'),

  // 获取 Cookie
  getCookie: getCookie,
  // 设置 Cookie
  setCookie: setCookie,
  // 移除 Cookie
  removeCookie: removeCookie,
  // 获取 Session
  getSession: getSession,
  // 设置 Session
  setSession: setSession,

  timeout: null,

  /* 判断请求是否成功
      @param res `Object` 后台返回的response对象
     Usage:
      helper.isSuccess(res)
  */
  isSuccess: function(res) {
    return Number(res.code) === 0 && (res.data == undefined || res.data != null)
  },

  /* 获取浏览器存储里key为item的值
      @param item 要获取的数据的索引值
     Usage:
       helper.get('token')
  */
  get: function(item) {
    var value;
    if (this.storage) {
      value = this.storage.getItem(item)
    } else {
      value = getCookie(item)
    }
    return (value ? this.decrypt(value) : '')
  },

  /* 将数据存储在浏览器存储里
      @param obj 要存储的数据对象
     Usage:
       j.set({ token: 'as23q1sdf212swsxx', uname: 'jacket' })
  */
  set: function(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.storage ? this.storage.setItem(key, this.encrypt(String(obj[key]))) : setCookie(key, this.encrypt(String(obj[key])), 1)
      }
    }
    return this
  },

  //清空缓存
  clear: function() {
    function clearCookie() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    }
    if (this.storage) {
      this.storage.clear();
    } else {
      clearCookie();
    }
    return this;
  },
  
  /* 删除浏览器存储的数据
      @param itemArr 要删除的数据的key组成的数组
     Usage:
      j.remove(['token', 'uname']) // 将删除浏览器存储中，索引为token和uname的数据
  */
  remove: function(itemArr) {
    for (var i = 0, len = itemArr.length; i < len; i++) {
      if (this.storage) {
        this.storage.removeItem(itemArr[i])
      } else {
        removeCookie(itemArr[i])
      }
    }
    return this
  },

  /* 深层索引：通过标识符获取对象里面的值
      @param obj - 对象字面量
      @param identify - 索引标识符
     Usage:
      var obj = {
          a: {
              b: {
                  c: 1
              }
          }
      }
      helper.get(obj, 'a.b.c')
      结果：取得obj['a']['b']['c']的值1
  */
  getObjItem: function(obj, identify) {
    if (!identify) return null;
    var arr = identify.split('.');
    arr.forEach(function(item) {
      obj = obj[item];
    });
    return obj;
  },

  // 获取search对象
  // 页面url为http://a.com?i=1&j=2&k=3, 将输出{i: 1, j: 2, k:3}
  getSearch: function() {
    var hash = window.location.hash,
      index = hash.indexOf('?');
    var search = window.location.search || (index !== -1 ? hash.substr(index) : ''),
      o = {},
      item;
    if (search) {
      search = search.substr(1).split('&');
      for (var i = 0, len = search.length; i < len; i++) {
        item = search[i].split('=');
        o[item[0]] = item[1];
      }
    }
    return o;
  },

  /* 获取search的某个值
     Usage:
       页面url为http://a.com?i=1&j=2&k=3, j.getSearchItem('k') 将输出'3'
  */
  getSearchItem: function(key) {
    var o = this.getSearch()
    return o[key] ? decodeURIComponent(o[key]) : null
  },

  /* 获取当前年月日
      @param seperator `String` 分隔符
     Usage:
       helper.getCurrentDate('/')
       输出
       2016/01/02
  */
  getCurrentDate: function(seperator) {
    seperator = seperator && typeof seperator === 'string' ? seperator : '-'
    var o = new Date()
    var y = o.getFullYear()
    var m = o.getMonth() + 1
    var d = o.getDate()
    if (m < 10) m = '0' + m
    if (d < 10) d = '0' + d
    return y + seperator + m + seperator + d
  },

  // 加密
  encrypt: function(value) {
    var encryptValue = ''
    var mask
    var maskValue
    for (var i = 0, len = value.length; i < len; i++) {
      mask = Math.round(Math.random() * 111) + 77
      maskValue = value.charCodeAt(i) + mask
      mask += i
      encryptValue += String.fromCharCode(maskValue, mask)
    }
    return encryptValue
  },

  // 解密
  decrypt: function(value) {
    var decryptValue = ''
    var k = 0
    var v
    var m
    var decrypt = function(v, m, i) {
      v = v.charCodeAt(0)
      m = m.charCodeAt(0)
      m -= i
      v -= m
      return String.fromCharCode(v)
    }
    for (var i = 0, len = value.length; i < len; i++) {
      if (!(i % 2)) {
        v = value[i]
      } else {
        m = value[i]
        decryptValue += decrypt(v, m, k)
        k++
      }
    }
    return decryptValue
  },

  /* 获取对象组成的数组中，key=value的对象在数组中的索引值
      @param arr 'Array' 数组
      @param key 'String|Number' 对象的key
      @param value 'String|Number|Boolean' 对象的value
     Usage:
      var arr = [ {a: 0}, {a: 1}, {b: 3}, {d: '8'} ]
      helper.getIndex(arr, 'a', 1)
      输出
      1
  */
  getIndex: function(arr, key, value) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!this.isObject(arr[i])) return -1
      for (var k in arr[i]) {
        if (k === key && arr[i][k] === value) return i
      }
    }
    return -1
  },

  /* 获取对象组成的数组中，key=value的对象在数组中的名称
      @param arr 'Array' 数组
      @param key 'String|Number' 对象的key
      @param value 'String|Number|Boolean' 对象的value
      @param name 获取字典name值
     Usage:
      var arr = [ {a: 0, a1: '一'}, {b: 1, b1: '二'}, {c: 3, c1: '三'}, {d: '8', d1: '八'} ]
      helper.getName(arr, 'a', 1, 'a1')
      输出
      1
  */
 
  globalLoading_show:function(callBack){
    var that = this;
    that.loadingStatus_show++;
    $("#global_loading").show();
    if(callBack){
      callBack()
    }
  },
  globalLoading_hide:function(callBack){
    var that = this;
    that.loadingStatus_hide++;
    if(that.loadingStatus_show == that.loadingStatus_hide){
      $("#global_loading").hide();
      if(callBack){
        callBack()
      }
      that.loadingStatus_show = 0;
      that.loadingStatus_hide = 0;
    }
  },
  getName: function(arr, key, value, name) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!this.isObject(arr[i])) return -1
      for (var k in arr[i]) {
        if (k === key && arr[i][k] === value) return arr[i][name]
      }
    }
    return ""
  },

  /* 获取对象组成的数组中，key=value的对象在数组中的名称数组字符串
      @param arr 'Array' 数组
      @param key 'String|Number' 对象的key
      @param name 获取字典name值
      @param values value数组
      @param splitChar 间隔字符
     Usage:
      var arr = [ {a: 0, a1: '一'}, {b: 1, b1: '二'}, {c: 3, c1: '三'}, {d: '8', d1: '八'} ]
      var values = [0,1,2,3]
      helper.getArrText(arr, 'a', 'a1', values, ',')
      输出
      1
  */
  getArrText(arr, key, name, values, splitChar) {
    var txt = [];
    for (var k in values) {
      txt.push(this.getName(arr, key, values[k], name));
    }
    return txt.join(splitChar);
  },
  /* 表单校验函数
     将表单抽象为一个对象obj，传入validate函数中。
     obj = {
      mobile: { // 手机号
        value: $('#phone').val(),
        regex: /^1[3|4|5|8][0-9]\d{8}$/,
        error: ['手机号不能为空', '请输入正确的手机号码'],
        allowEmpty: true,
        fn: function () {...}
      },
      ...
     }
     其中，regex为mobile字段合法性正则表达式，error为错误提示信息。
     error[0]一般为非空错误提示，error[1]为输入不合法值时的错误提示。
     allowEmpty: true 允许为空
     regex和fn为可选，
      - 有regex，无fn，则用regex检查value的合法性，如果为false，则return false
      - 无regex, 有fn，则执行fn，并传入value和error，fn里定义返回false的逻辑条件
      - 无regex, 无fn，则只执行非空检测
    */
  validate: function(obj) {
    var item
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        item = obj[key]
        if (item.value === undefined) item.value = ''
        if (item.allowEmpty && item.value === '') return true
        if (!item.allowEmpty && !item.value && !item.fn) { // 值为空
          alter(item.error[0]);
          return false
        } else { // 值不为空
          if (item.regex) {
            if (!item.regex.test(item.value)) {
              // 合法性校验
              alter(item.error[1] || item.error[0])
              return false
            }
          } else if (item.fn) {
            if (typeof item.fn === 'function') {
              if (!item.fn.call(window, item.value, item.error)) {
                return false
              }
            }
          }
        }
      }
    }
    return true
  },
  /**
   * 数组去重
   */
  getNewArray(arr) {
    var newArr = []; //新建一个数组
    for (var i = 0, len = arr.length; i < len; i++) {
      if (newArr.indexOf(arr[i]) == -1) { //若新数组中未包含该项则将其存入新数组
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },
  //查找数组项的索引值index
  getArrayIndex(arr, val) {
    var index;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        index = i
      }
    }
    return index;
  },
  //排序，小到大
  getArrayByAce(arr) {
    return arr.sort(function(a1, a2) {
      return a1 - a2
    });
  },
  // 身份证校验
  checkCardNum(card) {
    // 身份证号码为15位或者18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(reg.test(card) === false){ 
      return false; 
    }else{
      return true;
    }
  },
  //图片base64 上传
  ImgUploadByBase64(file, successCall) {
    var data64, filename, file = file;
    var reader = new FileReader();
    reader.onload = function() {
      data64 = this.result;
      filename = file.name;
      if (typeof successCall == 'function') {
        successCall(data64, filename);
      }
    };
    reader.readAsDataURL(file);
  },
  getCurYear(){
    var t = new Date()
    var curYear = t.getFullYear()
    return curYear;
  },
  getCurYearList() {
    var t = new Date()
    var curYear = t.getFullYear()
    var yearList = [
      {id: curYear+1, name: curYear+1, active: false},
      {id: curYear, name: curYear, active: true},
      {id: curYear - 1,name: curYear - 1, active: false}
    ];
    return yearList;
  },
  //深度克隆
  deepClone(obj) {
    var that = this;
    var result;
    var oClass = that.isClass(obj);
    //确定result的类型
    if (oClass === "Object") {
      result = {};
    } else if (oClass === "Array") {
      result = [];
    } else {
      return obj;
    }
    for (var key in obj) {
      var copy = obj[key];
      if (that.isClass(copy) == "Object") {
        result[key] = that.deepClone(copy); //递归调用
      } else if (that.isClass(copy) == "Array") {
        result[key] = that.deepClone(copy);
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  },
  // 时间字符串比较函数，第一个比较大的话就返回true，否则false
  compareDate(DateOne, DateTwo) {
    DateOne += '';
    DateTwo += '';
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
    if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
      return true;
    } else {
      return false;
    }
  },
  //返回传递给他的任意对象的类
  isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  },

  //过滤函数，接收一个id和一个数组，匹配数组里面的额id，返回相应的name；
  getFilter(id, list) {
    var result = "";
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].Id == id || list[i].id == id) {
        result = list[i].name;
      }
    }
    return result;
  },
  formatMonth(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    return y + '-' + m ;
  },
  formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },
  // 将数字转化为千分位，三位以逗号隔开
  formatNum:function(num){
    if(num){
      return parseFloat(num).toLocaleString();
    }
    return num;
  },

  formatDateAndTime (mydate,format) {
    var mydate = new Date(mydate);
     var args = {
         "M+": mydate.getMonth() + 1,
         "d+": mydate.getDate(),
         "h+": mydate.getHours(),
         "m+": mydate.getMinutes(),
         "s+": mydate.getSeconds(),
         "q+": Math.floor((mydate.getMonth() + 3) / 3),  //quarter
         "S": mydate.getMilliseconds()
     };
     if (/(y+)/.test(format))
         format = format.replace(RegExp.$1, (mydate.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var i in args) {
         var n = args[i];
         if (new RegExp("(" + i + ")").test(format))
             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
     }
     return format;
  },
  /*
   资金格式化插件
   @value 金额(單位分)
   */
  moneyFormart: function(value) {
    var data,
      decimals,
      integer,
      length;
    var m = [];
    var isBack = false;
    if(value<0){
      isBack = true;
      value = -value;
    }
    if(value == 0 || value == null){
      return 0;
    }
    if(isNaN(Number(value))){
      return value;
    }
    value = Number(value).toFixed(2);
    //获取小数部分
    decimals = value.match(/\.[0-9]*/g);
    //获取整数部分
    integer = parseInt(value).toString();
    var temp = integer.split("");
    length = temp.length;
    if(isBack){
      return length > 3 ? '-'+formart() : '-'+value;
    }else{
      return length > 3 ? formart() : value;
    }
    //添加","分隔符
    function formart() {
      var result;
      var count = 0;
      for (var n = length; n > 0; n--, count++) {
        if (count && count % 3 == 0) {
          m.unshift(",");
          count = 0;
        }
        m.unshift(temp.pop());
      }
      result = m.join("");
      return decimals ? result.concat(decimals) : result;
    }
  },

  moneyFormart_toFixed4: function(value) {
    var data,
      decimals,
      integer,
      length;
    var m = [];
    var isBack = false;
    if(value<0){
      isBack = true;
      value = -value;
    }
    if(value == 0 || value == null){
      return 0;
    }
    if(isNaN(Number(value))){
      return value;
    }
    value = Number(value).toFixed(4);
    //获取小数部分
    decimals = value.match(/\.[0-9]*/g);
    //获取整数部分
    integer = parseInt(value).toString();
    var temp = integer.split("");
    length = temp.length;
    if(isBack){
      return length > 3 ? '-'+formart() : '-'+value;
    }else{
      return length > 3 ? formart() : value;
    }
    //添加","分隔符
    function formart() {
      var result;
      var count = 0;
      for (var n = length; n > 0; n--, count++) {
        if (count && count % 3 == 0) {
          m.unshift(",");
          count = 0;
        }
        m.unshift(temp.pop());
      }
      result = m.join("");
      return decimals ? result.concat(decimals) : result;
    }
  },
  decimal4: function(number){
    var regex = /^[0-9]+\.{0,1}[0-9]{0,4}$/;
    return regex.test(number);
  },
 
  //指定位置 插入文本
  insertAtCursor: function(myField, myValue) {
    //IE support
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      // save scrollTop before insert
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
      if (restoreTop > 0) {
        myField.scrollTop = restoreTop;
      }
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
    } else {
      myField.value += myValue;
      myField.focus();
    }
  },

  timestampToTime:function(timestamp,type) {
    var Y,M,D,h,m,s,date;
    date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate();
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    if(type && type == 'date'){
      return Y+M+D;
    }
    return Y+M+D + ' ' +h+m+s;
  },

    /*
   * 根据Value格式化为带有换行、空格格式的HTML代码
   * @param strValue {String} 需要转换的值
   * @return  {String}转换后的HTML代码
   * @example  
   * getFormatCode("测\r\n\s试")  =>  “测<br/> 试”
   */
  getFormatCode: function(strValue){
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
  }
}

function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) === '[object ' + type + ']'
  }
}

/* 获取 Cookie 值
 */
function getCookie(name) {
  var c = document.cookie
  if (c.length > 0) {
    var s = c.indexOf(name + '=')
    if (s !== -1) {
      s = s + name.length + 1
      var e = c.indexOf('', s)
      return unescape(c.substring(s, e))
    }
  }
  return ''
}

/* 保存 Cookie 值
 */
function setCookie(name, value, expiredays) {
  var exdate = new Date()
  if (value !== null && value !== '' && value !== 'null') {
    exdate.setDate(exdate.getDate() + expiredays)
  } else {
    exdate.setDate(exdate.getDate() - 1)
  }
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : 'expires=' + exdate.toGMTString())
}

/* 删除 Cookie
 */
function removeCookie(name) {
  setCookie(name, '', -1)
}

/**
 * 保存会话数据，临时数据存储使用
 * @param key
 * @return {*}
 */
function setSession(key, val) {
  if (sessionStorage.setItem) {
    try {
      sessionStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      _buffer.nonMark = true;
      _buffer.sessionData[key] = val;
    }
  } else {
    _buffer.nonMark = true;
    _buffer.sessionData[key] = val;
  }
};

/**
 * 获取会话数据，临时数据存储使用
 * @param key
 * @return {*}
 */
function getSession(key) {
  if (sessionStorage.getItem && !_buffer.nonMark) {
    var val = sessionStorage.getItem(key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  } else {
    return _buffer.sessionData[key];
  }
};

export default helper