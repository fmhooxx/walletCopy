(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-transaction-entrust-buy"],{"0b98":function(t,e,i){"use strict";i.r(e);var n=i("548f"),a=i("9321");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("416a");var r,l=i("f0c5"),c=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"5c361d36",null,!1,n["a"],r);e["default"]=c.exports},1082:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".index .header[data-v-642621ad]{position:relative;height:%?80?%;line-height:%?80?%}.index .header > uni-text[data-v-642621ad]{color:#3f3f3f;font-size:%?35?%;font-weight:600;margin-left:%?30?%}.index .header > uni-view[data-v-642621ad]{width:100%;position:absolute;top:0;right:0}.index .header > uni-view[data-v-642621ad] .u-dropdown__menu__item{-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;padding-right:%?30?%}.index .header > uni-view[data-v-642621ad] .u-dropdown__menu__item /deep/ .u-dropdown__menu__item__text{color:#3f3f3f;font-size:%?35?%;font-weight:600}.index .box[data-v-642621ad]{padding:0 %?30?%}.index .box .box-head[data-v-642621ad]{margin:%?20?% 0;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.index .box .box-head .limit[data-v-642621ad]{font-size:%?28?%;color:#bbb}.index .box .box-head .limit > uni-text[data-v-642621ad]{color:#4b4b4b;font-size:%?28?%;font-weight:700;margin-left:%?20?%}.index .box .box-head .reference[data-v-642621ad]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.index .box .box-head .reference > uni-view[data-v-642621ad]{color:#bbb;font-size:%?28?%;font-weight:500}.index .box .box-head .reference > uni-text[data-v-642621ad]{color:#e21656;font-size:%?28?%;font-weight:700}.index .box .box-common[data-v-642621ad]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?22?%;-webkit-border-radius:%?9?%;border-radius:%?9?%;border:%?1?% solid #b8b8b8;margin-bottom:%?34?%}.index .box .box-common > uni-view[data-v-642621ad]{width:80%}.index .box .box-common > uni-text[data-v-642621ad]{color:#3f3f3f;font-size:%?28?%;font-weight:700}.index .box .box-common .CNY[data-v-642621ad]{color:#e21656}.index .box .list[data-v-642621ad]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.index .box .list .list-item[data-v-642621ad]{position:relative;width:%?142?%;height:%?82?%;background:#f3f3f3;border:%?3?% solid transparent;color:#b0b0b0;-webkit-border-radius:%?9?%;border-radius:%?9?%}.index .box .list .list-item > uni-view[data-v-642621ad]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.index .box .list .list-item > uni-image[data-v-642621ad]{position:absolute;bottom:0;right:0;width:%?45?%;height:%?35?%}.index .box .list .item-active[data-v-642621ad]{color:#4059ff;border:%?3?% solid #4059ff;background-color:#fff}.index .box .btn[data-v-642621ad]{margin:%?32?% auto 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?686?%;height:%?82?%;background:#c34554;-webkit-border-radius:%?9?%;border-radius:%?9?%;color:#fff;font-size:%?30?%;font-weight:700}",""]),t.exports=e},"335e":function(t,e,i){"use strict";var n=i("4ea4");i("a9e3"),i("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5c0f")),o={name:"u-input",mixins:[a.default],props:{value:{type:[String,Number],default:""},type:{type:String,default:"text"},inputAlign:{type:String,default:"left"},placeholder:{type:String,default:"请输入内容"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},placeholderStyle:{type:String,default:"color: #c0c4cc;"},confirmType:{type:String,default:"done"},customStyle:{type:Object,default:function(){return{}}},fixed:{type:Boolean,default:!1},focus:{type:Boolean,default:!1},passwordIcon:{type:Boolean,default:!0},border:{type:Boolean,default:!1},borderColor:{type:String,default:"#dcdfe6"},autoHeight:{type:Boolean,default:!0},selectOpen:{type:Boolean,default:!1},height:{type:[Number,String],default:""},clearable:{type:Boolean,default:!0},cursorSpacing:{type:[Number,String],default:0},selectionStart:{type:[Number,String],default:-1},selectionEnd:{type:[Number,String],default:-1},trim:{type:Boolean,default:!0},showConfirmbar:{type:Boolean,default:!0}},data:function(){return{defaultValue:this.value,inputHeight:70,textareaHeight:100,validateState:!1,focused:!1,showPassword:!1,lastValue:""}},watch:{value:function(t,e){this.defaultValue=t,t!=e&&"select"==this.type&&this.handleInput({detail:{value:t}})}},computed:{inputMaxlength:function(){return Number(this.maxlength)},getStyle:function(){var t={};return t.minHeight=this.height?this.height+"rpx":"textarea"==this.type?this.textareaHeight+"rpx":this.inputHeight+"rpx",t=Object.assign(t,this.customStyle),t},getCursorSpacing:function(){return Number(this.cursorSpacing)},uSelectionStart:function(){return String(this.selectionStart)},uSelectionEnd:function(){return String(this.selectionEnd)}},created:function(){this.$on("on-form-item-error",this.onFormItemError)},methods:{handleInput:function(t){var e=this,i=t.detail.value;this.trim&&(i=this.$u.trim(i)),this.$emit("input",i),this.defaultValue=i,setTimeout((function(){e.dispatch("u-form-item","on-form-change",i)}),40)},handleBlur:function(t){var e=this;setTimeout((function(){e.focused=!1}),100),this.$emit("blur",t.detail.value),setTimeout((function(){e.dispatch("u-form-item","on-form-blur",t.detail.value)}),40)},onFormItemError:function(t){this.validateState=t},onFocus:function(t){this.focused=!0,this.$emit("focus")},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},inputClick:function(){this.$emit("click")}}};e.default=o},"416a":function(t,e,i){"use strict";var n=i("d8fd"),a=i.n(n);a.a},"548f":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uIcon:i("1d43").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-input",class:{"u-input--border":t.border,"u-input--error":t.validateState},style:{padding:"0 "+(t.border?20:0)+"rpx",borderColor:t.borderColor,textAlign:t.inputAlign},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.inputClick.apply(void 0,arguments)}}},["textarea"==t.type?i("v-uni-textarea",{staticClass:"u-input__input u-input__textarea",style:[t.getStyle],attrs:{value:t.defaultValue,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,maxlength:t.inputMaxlength,fixed:t.fixed,focus:t.focus,autoHeight:t.autoHeight,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"cursor-spacing":t.getCursorSpacing,"show-confirm-bar":t.showConfirmbar},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):i("v-uni-input",{staticClass:"u-input__input",style:[t.getStyle],attrs:{type:"password"==t.type?"text":t.type,value:t.defaultValue,password:"password"==t.type&&!t.showPassword,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled||"select"===t.type,maxlength:t.inputMaxlength,focus:t.focus,confirmType:t.confirmType,"cursor-spacing":t.getCursorSpacing,"selection-end":t.uSelectionEnd,"selection-start":t.uSelectionStart,"show-confirm-bar":t.showConfirmbar},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"u-input__right-icon u-flex"},[t.clearable&&""!=t.value&&t.focused?i("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}},[i("u-icon",{attrs:{size:"32",name:"close-circle-fill",color:"#c0c4cc"}})],1):t._e(),t.passwordIcon&&"password"==t.type?i("v-uni-view",{staticClass:"u-input__right-icon__clear u-input__right-icon__item"},[i("u-icon",{attrs:{size:"32",name:t.showPassword?"eye-fill":"eye",color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPassword=!t.showPassword}}})],1):t._e(),"select"==t.type?i("v-uni-view",{staticClass:"u-input__right-icon--select u-input__right-icon__item",class:{"u-input__right-icon--select--reverse":t.selectOpen}},[i("u-icon",{attrs:{name:"arrow-down-fill",size:"26",color:"#c0c4cc"}})],1):t._e()],1)],1)},o=[]},5687:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uDropdown:i("f02c").default,uDropdownItem:i("a529").default,uInput:i("0b98").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"index"},[i("v-uni-view",{staticClass:"header"},[i("v-uni-text",[t._v("一建买币")]),i("v-uni-view",[i("u-dropdown",[i("u-dropdown-item",{attrs:{title:t.active,options:t.options},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeOptions.apply(void 0,arguments)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1)],1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"box-head"},[i("v-uni-view",{staticClass:"limit"},[t._v("限额:"),i("v-uni-text",[t._v("100-1000000")])],1),i("v-uni-view",{staticClass:"reference"},[i("v-uni-view",[t._v(t._s(t.active)+"参考价")]),i("v-uni-text",[t._v("1.00 CNY/"+t._s(t.active))])],1)],1),i("v-uni-view",{staticClass:"box-common"},[i("v-uni-view",[i("u-input",{attrs:{"border-color":"#B0B0B0",type:"number","placeholder-style":"color:#B0B0B0",placeholder:"购买数量"},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),i("v-uni-text",[t._v(t._s(t.active))])],1),i("v-uni-view",{staticClass:"box-common"},[i("v-uni-view",[i("u-input",{attrs:{"border-color":"#B0B0B0",type:"number",disabled:!0,"placeholder-style":"color:#B0B0B0",placeholder:"需要金额"},model:{value:t.price,callback:function(e){t.price=e},expression:"price"}})],1),i("v-uni-text",{staticClass:"CNY"},[t._v("CNY")])],1),i("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"list-item",class:n==t.current?"item-active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeList(n)}}},[i("v-uni-view",[t._v(t._s(e.text))]),i("v-uni-image",{directives:[{name:"show",rawName:"v-show",value:n==t.current,expression:"index == current"}],attrs:{src:"/static/tr-active.png"}})],1)})),1),i("v-uni-view",{staticClass:"btn"},[t._v("一键买入")])],1)],1)},o=[]},"5c0f":function(t,e,i){"use strict";function n(t,e,i){this.$children.map((function(a){t===a.$options.name?a.$emit.apply(a,[e].concat(i)):n.apply(a,[t,e].concat(i))}))}i("99af"),i("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={methods:{dispatch:function(t,e,i){var n=this.$parent||this.$root,a=n.$options.name;while(n&&(!a||a!==t))n=n.$parent,n&&(a=n.$options.name);n&&n.$emit.apply(n,[e].concat(i))},broadcast:function(t,e,i){n.call(this,t,e,i)}}};e.default=a},"82c6":function(t,e,i){"use strict";i.r(e);var n=i("5687"),a=i("d858");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("ee7b");var r,l=i("f0c5"),c=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"642621ad",null,!1,n["a"],r);e["default"]=c.exports},"8c29":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-input[data-v-5c361d36]{position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row\n}.u-input__input[data-v-5c361d36]{font-size:%?28?%;color:#303133;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-input__textarea[data-v-5c361d36]{width:auto;font-size:%?28?%;color:#303133;padding:%?10?% 0;line-height:normal;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-input--border[data-v-5c361d36]{-webkit-border-radius:%?6?%;border-radius:%?6?%;-webkit-border-radius:4px;border-radius:4px;border:1px solid #dcdfe6}.u-input--error[data-v-5c361d36]{border-color:#fa3534!important}.u-input__right-icon__item[data-v-5c361d36]{margin-left:%?10?%}.u-input__right-icon--select[data-v-5c361d36]{-webkit-transition:-webkit-transform .4s;transition:-webkit-transform .4s;transition:transform .4s;transition:transform .4s,-webkit-transform .4s}.u-input__right-icon--select--reverse[data-v-5c361d36]{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}',""]),t.exports=e},9321:function(t,e,i){"use strict";i.r(e);var n=i("335e"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},c16c:function(t,e,i){var n=i("1082");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("73046c83",n,!0,{sourceMap:!1,shadowMode:!1})},cc38:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{value:0,options:[{label:"USDT",value:0},{label:"FHC",value:1}],active:"",number:"",price:"",list:[{id:0,text:"银行卡"},{id:1,text:"支付宝"},{id:2,text:"微信"}],current:0}},created:function(){this.active=this.options[0].label},methods:{changeList:function(t){this.current=t},changeOptions:function(t){this.active=this.options[t].label}}};e.default=n},d858:function(t,e,i){"use strict";i.r(e);var n=i("cc38"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},d8fd:function(t,e,i){var n=i("8c29");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("53f27528",n,!0,{sourceMap:!1,shadowMode:!1})},ee7b:function(t,e,i){"use strict";var n=i("c16c"),a=i.n(n);a.a}}]);