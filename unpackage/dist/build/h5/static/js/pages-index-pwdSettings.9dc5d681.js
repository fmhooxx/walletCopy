(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-pwdSettings"],{"05c4":function(t,e,n){var r=n("6500");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("44e5ba97",r,!0,{sourceMap:!1,shadowMode:!1})},"0b98":function(t,e,n){"use strict";n.r(e);var r=n("548f"),i=n("9321");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("416a");var a,c=n("f0c5"),u=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"5c361d36",null,!1,r["a"],a);e["default"]=u.exports},"1d78":function(t,e,n){"use strict";var r=n("c082"),i=n.n(r);i.a},"1da1":function(t,e,n){"use strict";function r(t,e,n,r,i,o,a){try{var c=t[o](a),u=c.value}catch(l){return void n(l)}c.done?e(u):Promise.resolve(u).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function c(t){r(a,i,o,c,u,"next",t)}function u(t){r(a,i,o,c,u,"throw",t)}c(void 0)}))}}n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"335e":function(t,e,n){"use strict";var r=n("4ea4");n("a9e3"),n("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("5c0f")),o={name:"u-input",mixins:[i.default],props:{value:{type:[String,Number],default:""},type:{type:String,default:"text"},inputAlign:{type:String,default:"left"},placeholder:{type:String,default:"请输入内容"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},placeholderStyle:{type:String,default:"color: #c0c4cc;"},confirmType:{type:String,default:"done"},customStyle:{type:Object,default:function(){return{}}},fixed:{type:Boolean,default:!1},focus:{type:Boolean,default:!1},passwordIcon:{type:Boolean,default:!0},border:{type:Boolean,default:!1},borderColor:{type:String,default:"#dcdfe6"},autoHeight:{type:Boolean,default:!0},selectOpen:{type:Boolean,default:!1},height:{type:[Number,String],default:""},clearable:{type:Boolean,default:!0},cursorSpacing:{type:[Number,String],default:0},selectionStart:{type:[Number,String],default:-1},selectionEnd:{type:[Number,String],default:-1},trim:{type:Boolean,default:!0},showConfirmbar:{type:Boolean,default:!0}},data:function(){return{defaultValue:this.value,inputHeight:70,textareaHeight:100,validateState:!1,focused:!1,showPassword:!1,lastValue:""}},watch:{value:function(t,e){this.defaultValue=t,t!=e&&"select"==this.type&&this.handleInput({detail:{value:t}})}},computed:{inputMaxlength:function(){return Number(this.maxlength)},getStyle:function(){var t={};return t.minHeight=this.height?this.height+"rpx":"textarea"==this.type?this.textareaHeight+"rpx":this.inputHeight+"rpx",t=Object.assign(t,this.customStyle),t},getCursorSpacing:function(){return Number(this.cursorSpacing)},uSelectionStart:function(){return String(this.selectionStart)},uSelectionEnd:function(){return String(this.selectionEnd)}},created:function(){this.$on("on-form-item-error",this.onFormItemError)},methods:{handleInput:function(t){var e=this,n=t.detail.value;this.trim&&(n=this.$u.trim(n)),this.$emit("input",n),this.defaultValue=n,setTimeout((function(){e.dispatch("u-form-item","on-form-change",n)}),40)},handleBlur:function(t){var e=this;setTimeout((function(){e.focused=!1}),100),this.$emit("blur",t.detail.value),setTimeout((function(){e.dispatch("u-form-item","on-form-blur",t.detail.value)}),40)},onFormItemError:function(t){this.validateState=t},onFocus:function(t){this.focused=!0,this.$emit("focus")},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},inputClick:function(){this.$emit("click")}}};e.default=o},"416a":function(t,e,n){"use strict";var r=n("d8fd"),i=n.n(r);i.a},5032:function(t,e,n){"use strict";n.r(e);var r=n("af88"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"548f":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uIcon:n("1d43").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-input",class:{"u-input--border":t.border,"u-input--error":t.validateState},style:{padding:"0 "+(t.border?20:0)+"rpx",borderColor:t.borderColor,textAlign:t.inputAlign},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.inputClick.apply(void 0,arguments)}}},["textarea"==t.type?n("v-uni-textarea",{staticClass:"u-input__input u-input__textarea",style:[t.getStyle],attrs:{value:t.defaultValue,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,fixed:t.fixed,focus:t.focus,autoHeight:t.autoHeight,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"cursor-spacing":t.getCursorSpacing,"show-confirm-bar":t.showConfirmbar},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):n("v-uni-input",{staticClass:"u-input__input",style:[t.getStyle],attrs:{type:"password"==t.type?"text":t.type,value:t.defaultValue,password:"password"==t.type&&!t.showPassword,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled||"select"===t.type,maxlength:t.inputMaxlength,focus:t.focus,confirmType:t.confirmType,"cursor-spacing":t.getCursorSpacing,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"show-confirm-bar":t.showConfirmbar},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"u-input__right-icon u-flex"},[t.clearable&&""!=t.value&&t.focused?n("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}},[n("u-icon",{attrs:{size:"32",name:"close-circle-fill",color:"#c0c4cc"}})],1):t._e(),t.passwordIcon&&"password"==t.type?n("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item"},[n("u-icon",{attrs:{size:"32",name:t.showPassword?"eye-fill":"eye",color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPassword=!t.showPassword}}})],1):t._e(),"select"==t.type?n("v-uni-view",{staticClass:"u-input__right-icon--select u-input__right-icon__item",class:{"u-input__right-icon--select--reverse":t.selectOpen}},[n("u-icon",{attrs:{name:"arrow-down-fill",size:"26",color:"#c0c4cc"}})],1):t._e()],1)],1)},o=[]},"5c0f":function(t,e,n){"use strict";function r(t,e,n){this.$children.map((function(i){t===i.$options.name?i.$emit.apply(i,[e].concat(n)):r.apply(i,[t,e].concat(n))}))}n("99af"),n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={methods:{dispatch:function(t,e,n){var r=this.$parent||this.$root,i=r.$options.name;while(r&&(!i||i!==t))r=r.$parent,r&&(i=r.$options.name);r&&r.$emit.apply(r,[e].concat(n))},broadcast:function(t,e,n){r.call(this,t,e,n)}}};e.default=i},6500:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,"uni-page-body[data-v-553634a3]{background-color:#f1f3f8}body.?%PAGE?%[data-v-553634a3]{background-color:#f1f3f8}",""]),t.exports=e},"751e":function(t,e,n){"use strict";n.r(e);var r=n("e302"),i=n("5032");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("fca2"),n("1d78");var a,c=n("f0c5"),u=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"553634a3",null,!1,r["a"],a);e["default"]=u.exports},"8c29":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-input[data-v-5c361d36]{position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row\n}.u-input__input[data-v-5c361d36]{font-size:%?28?%;color:#303133;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-input__textarea[data-v-5c361d36]{width:auto;font-size:%?28?%;color:#303133;padding:%?10?% 0;line-height:normal;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-input--border[data-v-5c361d36]{-webkit-border-radius:%?6?%;border-radius:%?6?%;-webkit-border-radius:4px;border-radius:4px;border:1px solid #dcdfe6}.u-input--error[data-v-5c361d36]{border-color:#fa3534!important}.u-input__right-icon__item[data-v-5c361d36]{margin-left:%?10?%}.u-input__right-icon--select[data-v-5c361d36]{-webkit-transition:-webkit-transform .4s;transition:-webkit-transform .4s;transition:transform .4s;transition:transform .4s,-webkit-transform .4s}.u-input__right-icon--select--reverse[data-v-5c361d36]{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}',""]),t.exports=e},9321:function(t,e,n){"use strict";n.r(e);var r=n("335e"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"96cf":function(t,e){!function(e){"use strict";var n,r=Object.prototype,i=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag",l="object"===typeof t,s=e.regeneratorRuntime;if(s)l&&(t.exports=s);else{s=e.regeneratorRuntime=l?t.exports:{},s.wrap=y;var d="suspendedStart",f="suspendedYield",p="executing",h="completed",v={},m={};m[a]=function(){return this};var g=Object.getPrototypeOf,w=g&&g(g(N([])));w&&w!==r&&i.call(w,a)&&(m=w);var b=S.prototype=_.prototype=Object.create(m);k.prototype=b.constructor=S,S.constructor=k,S[u]=k.displayName="GeneratorFunction",s.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===k||"GeneratorFunction"===(e.displayName||e.name))},s.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(b),t},s.awrap=function(t){return{__await:t}},E($.prototype),$.prototype[c]=function(){return this},s.AsyncIterator=$,s.async=function(t,e,n,r){var i=new $(y(t,e,n,r));return s.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(b),b[u]="Generator",b[a]=function(){return this},b.toString=function(){return"[object Generator]"},s.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},s.values=N,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,i){return c.type="throw",c.arg=t,e.next=r,i&&(e.method="next",e.arg=n),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),l=i.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;j(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),v}}}function y(t,e,n,r){var i=e&&e.prototype instanceof _?e:_,o=Object.create(i.prototype),a=new O(r||[]);return o._invoke=C(t,n,a),o}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function _(){}function k(){}function S(){}function E(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function $(t){function e(n,r,o,a){var c=x(t[n],t,r);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"===typeof l&&i.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,a)}),(function(t){e("throw",t,o,a)})):Promise.resolve(l).then((function(t){u.value=t,o(u)}),(function(t){return e("throw",t,o,a)}))}a(c.arg)}var n;function r(t,r){function i(){return new Promise((function(n,i){e(t,r,n,i)}))}return n=n?n.then(i,i):i()}this._invoke=r}function C(t,e,n){var r=d;return function(i,o){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===i)throw o;return B()}n.method=i,n.arg=o;while(1){var a=n.delegate;if(a){var c=L(a,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var u=x(t,e,n);if("normal"===u.type){if(r=n.done?h:f,u.arg===v)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=h,n.method="throw",n.arg=u.arg)}}}function L(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,L(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=x(r,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,v;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,v):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function N(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){while(++r<t.length)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return o.next=o}}return{next:B}}function B(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},"9fb7":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".index[data-v-553634a3]{border-top:%?1?% solid transparent}.index .common[data-v-553634a3]{margin:%?20?% auto;padding:0 %?30?%;width:%?650?%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;background-color:#fff;-webkit-border-radius:%?8?%;border-radius:%?8?%}.index .common > uni-text[data-v-553634a3]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#373737;font-size:%?24?%;margin-right:%?10?%}.index .common > uni-view[data-v-553634a3]{-webkit-box-flex:4;-webkit-flex:4;flex:4}.index .common > uni-view .placeholder-common[data-v-553634a3]{text-align:right}.index .common .code-box[data-v-553634a3]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.index .common .code-box > uni-view[data-v-553634a3]{-webkit-box-flex:2;-webkit-flex:2;flex:2}.index .common .code-box > uni-text[data-v-553634a3]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#4059ff;font-size:%?26?%}.index .btn[data-v-553634a3]{margin:%?40?% auto 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;color:#4059ff;font-size:%?30?%;width:%?650?%;height:%?80?%;background-color:#fff;-webkit-border-radius:%?8?%;border-radius:%?8?%;letter-spacing:%?20?%}.index .condition[data-v-553634a3]{color:#fff;background-color:#4059ff}",""]),t.exports=e},af88:function(t,e,n){"use strict";var r=n("4ea4");n("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=r(n("1da1")),o={data:function(){return{usedPwd:"",pwd:"",confirmPwd:"",code:"",phone:"",isLogin:!0,timer:"",num:60}},onLoad:function(t){uni.setNavigationBarTitle({title:t.text})},computed:{isCondition:function(){return 0!=this.pwd.trim().length&&0!=this.confirmPwd.trim().length&&0!=this.code.trim().length&&0!=this.phone.trim().length}},methods:{preservation:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.pwd.length<6||t.pwd.length>16)){e.next=2;break}return e.abrupt("return",t.$api.msg("请输入六到十六位的密码"));case 2:if(!(t.confirmPwd.length<6||t.confirmPwd.length>16)){e.next=4;break}return e.abrupt("return",t.$api.msg("请输入六到十六位的密码"));case 4:if(t.pwd==t.confirmPwd){e.next=6;break}return e.abrupt("return",t.$api.msg("两次密码不一致, 请重新输入"));case 6:if(6==t.code.length){e.next=8;break}return e.abrupt("return",t.$api.msg("请输入六位数的验证码"));case 8:return n={telephone:t.phone,password:t.pwd,authCode:t.code},e.next=11,t.$api.api.updatePassword(n);case 11:r=e.sent,200==r.data.code?(t.$api.msg("修改密码成功"),setTimeout((function(){uni.navigateBack({delta:1})}),1500)):t.$api.msg(r.data.message);case 13:case"end":return e.stop()}}),e)})))()},getCode:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=/^[1][1,2,3,4,5,7,8,9][0-9]{9}$/,n.test(t.phone)){e.next=3;break}return e.abrupt("return",t.$api.msg("请正确填写手机号码"));case 3:return r={telephone:t.phone,category:"motifyPassword"},e.next=6,t.$api.api.sendcode(r);case 6:i=e.sent,200==i.data.code?(t.$api.msg(i.data.message),t.countDown()):t.$api.msg(i.data.message);case 8:case"end":return e.stop()}}),e)})))()},countDown:function(){var t=this;this.isLogin=!1;var e=this.num;this.timer=setInterval((function(){e--,t.num=e,0==e&&(clearInterval(t.timer),t.isLogin=!0,t.num=60)}),1e3)}}};e.default=o},c082:function(t,e,n){var r=n("9fb7");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("041f9d58",r,!0,{sourceMap:!1,shadowMode:!1})},d8fd:function(t,e,n){var r=n("8c29");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("53f27528",r,!0,{sourceMap:!1,shadowMode:!1})},e302:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uInput:n("0b98").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"index"},[t._e(),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("新密码")]),n("v-uni-view",[n("u-input",{attrs:{type:"password","placeholder-class":"placeholder-common",placeholder:"请输入新密码",clearable:!0},model:{value:t.pwd,callback:function(e){t.pwd=e},expression:"pwd"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("确认密码")]),n("v-uni-view",[n("u-input",{attrs:{type:"password","placeholder-class":"placeholder-common",placeholder:"请再次输入密码",clearable:!0},model:{value:t.confirmPwd,callback:function(e){t.confirmPwd=e},expression:"confirmPwd"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("手机号码")]),n("v-uni-view",[n("u-input",{attrs:{type:"number","placeholder-class":"placeholder-common",placeholder:"请输入手机号码",clearable:!0},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("动态验证")]),n("v-uni-view",{staticClass:"code-box"},[n("v-uni-view",[n("u-input",{attrs:{type:"number",placeholder:"请再次输入密码",clearable:!0},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1),t.isLogin?n("v-uni-text",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v("发送验证码")]):n("v-uni-text",[t._v(t._s(t.num)+"秒后重发")])],1)],1),n("v-uni-view",{staticClass:"btn",class:1==t.isCondition?"condition":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.preservation.apply(void 0,arguments)}}},[t._v("保存")])],1)},o=[]},fca2:function(t,e,n){"use strict";var r=n("05c4"),i=n.n(r);i.a}}]);