(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-transaction-binding-bankCard"],{"0b98":function(t,e,n){"use strict";n.r(e);var i=n("548f"),a=n("9321");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("416a");var r,l=n("f0c5"),c=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"5c361d36",null,!1,i["a"],r);e["default"]=c.exports},"326d":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uInput:n("0b98").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"index"},[n("v-uni-view",{staticClass:"box"},[n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("开户银行")]),n("v-uni-view",[n("u-input",{attrs:{"border-color":"#B0B0B0","placeholder-style":"color:#B0B0B0",placeholder:"请输入开户银行名称",border:!0},model:{value:t.bank,callback:function(e){t.bank=e},expression:"bank"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("用户名称")]),n("v-uni-view",[n("u-input",{attrs:{"border-color":"#B0B0B0","placeholder-style":"color:#B0B0B0",placeholder:"请输入用户名称",border:!0},model:{value:t.uname,callback:function(e){t.uname=e},expression:"uname"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("营业网点")]),n("v-uni-view",[n("u-input",{attrs:{"border-color":"#B0B0B0","placeholder-style":"color:#B0B0B0",placeholder:"请输入营业网点",border:!0},model:{value:t.bankName,callback:function(e){t.bankName=e},expression:"bankName"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("银行卡号")]),n("v-uni-view",[n("u-input",{attrs:{type:"number","border-color":"#B0B0B0","placeholder-style":"color:#B0B0B0",placeholder:"请输入银行卡号",border:!0},model:{value:t.cardNum,callback:function(e){t.cardNum=e},expression:"cardNum"}})],1)],1),n("v-uni-view",{staticClass:"common"},[n("v-uni-text",[t._v("预留手机")]),n("v-uni-view",[n("u-input",{attrs:{type:"number","border-color":"#B0B0B0","placeholder-style":"color:#B0B0B0",placeholder:"请输入预留手机号码",border:!0},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1)],1),n("v-uni-view",{staticClass:"upload"},[n("v-uni-image",{attrs:{src:"/static/plus-add.png"}}),n("v-uni-view",[t._v("上传银行卡正面")])],1),n("v-uni-view",{staticClass:"footer"},[n("v-uni-view",{staticClass:"footer-one",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.remove.apply(void 0,arguments)}}},[t._v("重置")]),n("v-uni-view",{staticClass:"footer-two",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.determine.apply(void 0,arguments)}}},[t._v("确定")])],1)],1)],1)},o=[]},"335e":function(t,e,n){"use strict";var i=n("4ea4");n("a9e3"),n("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5c0f")),o={name:"u-input",mixins:[a.default],props:{value:{type:[String,Number],default:""},type:{type:String,default:"text"},inputAlign:{type:String,default:"left"},placeholder:{type:String,default:"请输入内容"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},placeholderStyle:{type:String,default:"color: #c0c4cc;"},confirmType:{type:String,default:"done"},customStyle:{type:Object,default:function(){return{}}},fixed:{type:Boolean,default:!1},focus:{type:Boolean,default:!1},passwordIcon:{type:Boolean,default:!0},border:{type:Boolean,default:!1},borderColor:{type:String,default:"#dcdfe6"},autoHeight:{type:Boolean,default:!0},selectOpen:{type:Boolean,default:!1},height:{type:[Number,String],default:""},clearable:{type:Boolean,default:!0},cursorSpacing:{type:[Number,String],default:0},selectionStart:{type:[Number,String],default:-1},selectionEnd:{type:[Number,String],default:-1},trim:{type:Boolean,default:!0},showConfirmbar:{type:Boolean,default:!0}},data:function(){return{defaultValue:this.value,inputHeight:70,textareaHeight:100,validateState:!1,focused:!1,showPassword:!1,lastValue:""}},watch:{value:function(t,e){this.defaultValue=t,t!=e&&"select"==this.type&&this.handleInput({detail:{value:t}})}},computed:{inputMaxlength:function(){return Number(this.maxlength)},getStyle:function(){var t={};return t.minHeight=this.height?this.height+"rpx":"textarea"==this.type?this.textareaHeight+"rpx":this.inputHeight+"rpx",t=Object.assign(t,this.customStyle),t},getCursorSpacing:function(){return Number(this.cursorSpacing)},uSelectionStart:function(){return String(this.selectionStart)},uSelectionEnd:function(){return String(this.selectionEnd)}},created:function(){this.$on("on-form-item-error",this.onFormItemError)},methods:{handleInput:function(t){var e=this,n=t.detail.value;this.trim&&(n=this.$u.trim(n)),this.$emit("input",n),this.defaultValue=n,setTimeout((function(){e.dispatch("u-form-item","on-form-change",n)}),40)},handleBlur:function(t){var e=this;setTimeout((function(){e.focused=!1}),100),this.$emit("blur",t.detail.value),setTimeout((function(){e.dispatch("u-form-item","on-form-blur",t.detail.value)}),40)},onFormItemError:function(t){this.validateState=t},onFocus:function(t){this.focused=!0,this.$emit("focus")},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},inputClick:function(){this.$emit("click")}}};e.default=o},"416a":function(t,e,n){"use strict";var i=n("d8fd"),a=n.n(i);a.a},"443e":function(t,e,n){var i=n("c72d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("d0453d7c",i,!0,{sourceMap:!1,shadowMode:!1})},"548f":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("1d43").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-input",class:{"u-input--border":t.border,"u-input--error":t.validateState},style:{padding:"0 "+(t.border?20:0)+"rpx",borderColor:t.borderColor,textAlign:t.inputAlign},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.inputClick.apply(void 0,arguments)}}},["textarea"==t.type?n("v-uni-textarea",{staticClass:"u-input__input u-input__textarea",style:[t.getStyle],attrs:{value:t.defaultValue,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,fixed:t.fixed,focus:t.focus,autoHeight:t.autoHeight,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"cursor-spacing":t.getCursorSpacing,"show-confirm-bar":t.showConfirmbar},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):n("v-uni-input",{staticClass:"u-input__input",style:[t.getStyle],attrs:{type:"password"==t.type?"text":t.type,value:t.defaultValue,password:"password"==t.type&&!t.showPassword,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled||"select"===t.type,maxlength:t.inputMaxlength,focus:t.focus,confirmType:t.confirmType,"cursor-spacing":t.getCursorSpacing,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"show-confirm-bar":t.showConfirmbar},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"u-input__right-icon u-flex"},[t.clearable&&""!=t.value&&t.focused?n("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}},[n("u-icon",{attrs:{size:"32",name:"close-circle-fill",color:"#c0c4cc"}})],1):t._e(),t.passwordIcon&&"password"==t.type?n("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item"},[n("u-icon",{attrs:{size:"32",name:t.showPassword?"eye-fill":"eye",color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPassword=!t.showPassword}}})],1):t._e(),"select"==t.type?n("v-uni-view",{staticClass:"u-input__right-icon--select u-input__right-icon__item",class:{"u-input__right-icon--select--reverse":t.selectOpen}},[n("u-icon",{attrs:{name:"arrow-down-fill",size:"26",color:"#c0c4cc"}})],1):t._e()],1)],1)},o=[]},"5c0f":function(t,e,n){"use strict";function i(t,e,n){this.$children.map((function(a){t===a.$options.name?a.$emit.apply(a,[e].concat(n)):i.apply(a,[t,e].concat(n))}))}n("99af"),n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={methods:{dispatch:function(t,e,n){var i=this.$parent||this.$root,a=i.$options.name;while(i&&(!a||a!==t))i=i.$parent,i&&(a=i.$options.name);i&&i.$emit.apply(i,[e].concat(n))},broadcast:function(t,e,n){i.call(this,t,e,n)}}};e.default=a},"69ff":function(t,e,n){"use strict";n.r(e);var i=n("d02c"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"84a1":function(t,e,n){"use strict";var i=n("443e"),a=n.n(i);a.a},"8c29":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-input[data-v-5c361d36]{position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row\n}.u-input__input[data-v-5c361d36]{font-size:%?28?%;color:#303133;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-input__textarea[data-v-5c361d36]{width:auto;font-size:%?28?%;color:#303133;padding:%?10?% 0;line-height:normal;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-input--border[data-v-5c361d36]{-webkit-border-radius:%?6?%;border-radius:%?6?%;-webkit-border-radius:4px;border-radius:4px;border:1px solid #dcdfe6}.u-input--error[data-v-5c361d36]{border-color:#fa3534!important}.u-input__right-icon__item[data-v-5c361d36]{margin-left:%?10?%}.u-input__right-icon--select[data-v-5c361d36]{-webkit-transition:-webkit-transform .4s;transition:-webkit-transform .4s;transition:transform .4s;transition:transform .4s,-webkit-transform .4s}.u-input__right-icon--select--reverse[data-v-5c361d36]{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}',""]),t.exports=e},9321:function(t,e,n){"use strict";n.r(e);var i=n("335e"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},b03c:function(t,e,n){"use strict";n.r(e);var i=n("326d"),a=n("69ff");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("84a1");var r,l=n("f0c5"),c=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,"2c3260a0",null,!1,i["a"],r);e["default"]=c.exports},c72d:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".index[data-v-2c3260a0]{position:relative}.index .box[data-v-2c3260a0]{width:90%;position:absolute;top:%?60?%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.index .box .common[data-v-2c3260a0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?30?%}.index .box .common > uni-text[data-v-2c3260a0]{color:#223041;font-size:%?28?%;font-weight:700;-webkit-box-flex:1;-webkit-flex:1;flex:1}.index .box .common > uni-view[data-v-2c3260a0]{-webkit-box-flex:4;-webkit-flex:4;flex:4}.index .box .upload[data-v-2c3260a0]{margin:%?60?% auto 0;width:%?586?%;height:%?300?%;background:#fafbfd;-webkit-border-radius:%?5?%;border-radius:%?5?%;border:%?2?% dashed #6c7aa7;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.index .box .upload > uni-image[data-v-2c3260a0]{width:%?80?%;height:%?80?%;margin-bottom:%?30?%}.index .box .upload > uni-view[data-v-2c3260a0]{color:#aeaeae;font-size:%?24?%}.index .box .footer[data-v-2c3260a0]{margin-top:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;justify-content:space-evenly}.index .box .footer > uni-view[data-v-2c3260a0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?200?%;height:%?70?%;-webkit-border-radius:%?8?%;border-radius:%?8?%}.index .box .footer .footer-one[data-v-2c3260a0]{color:#7d7d7d;font-size:%?28?%;font-weight:700;background-color:#eaeaea}.index .box .footer .footer-two[data-v-2c3260a0]{color:#fff;font-size:%?28?%;font-weight:700;background-color:#4059ff}",""]),t.exports=e},d02c:function(t,e,n){"use strict";n("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{bank:"",uname:"",bankName:"",cardNum:"",phone:""}},methods:{determine:function(){this.condition()},condition:function(){return 0==this.bank.trim().length?this.$api.msg("请输入开户银行名称"):0==this.uname.trim().length?this.$api.msg("请输入用户名称"):0==this.bankName.trim().length?this.$api.msg("请输入营业网点"):0==this.cardNum.trim().length?this.$api.msg("请输入银行卡号"):0==this.phone.trim().length?this.$api.msg("请输入预留手机号码"):void 0},remove:function(){this.bank="",this.uname="",this.bankName="",this.cardNum="",this.phone=""}}};e.default=i},d8fd:function(t,e,n){var i=n("8c29");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("53f27528",i,!0,{sourceMap:!1,shadowMode:!1})}}]);