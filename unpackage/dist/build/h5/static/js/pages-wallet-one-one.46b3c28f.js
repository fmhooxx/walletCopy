(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wallet-one-one","pages-wallet-commonWallet-commonWallet"],{"044a":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("commonWallet",{attrs:{num:t.num}}),n("v-uni-view",{staticClass:"index"},[n("v-uni-view",{staticClass:"list"},t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"item"},[t._v(t._s(e.text))])})),1),n("v-uni-view",{staticClass:"text"},[t._v("请将上面的助记词按顺序抄写在一张纸上, 保存在安全的地方")]),n("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goUrl("/pages/wallet/two/two")}}},[t._v("已抄写到纸上")])],1)],1)},o=[]},"0cc9":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".head-bgi[data-v-075a7d21]{width:100%;height:%?80?%;background-color:#415aff}.box-copy[data-v-075a7d21]{position:absolute;left:50%;top:%?30?%;-webkit-transform:translate(-50%);transform:translate(-50%);width:%?690?%;height:%?160?%;-webkit-border-radius:%?30?%;border-radius:%?30?%;background-color:#fff;-webkit-box-shadow:%?0?% %?4?% %?20?% %?-10?% rgba(0,0,0,.4);box-shadow:%?0?% %?4?% %?20?% %?-10?% rgba(0,0,0,.4)}.box-copy .box[data-v-075a7d21]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;justify-content:space-evenly}.box-copy .box > uni-text[data-v-075a7d21]{margin-bottom:%?50?%}.box-copy .box .box-one[data-v-075a7d21]{color:#415aff}.box-copy .box .box-common[data-v-075a7d21]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:%?140?%;width:%?140?%}.box-copy .box .box-common .number[data-v-075a7d21]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?50?%;height:%?50?%;padding:%?10?%;-webkit-border-radius:50%;border-radius:50%;background-color:#415aff;color:#fff;margin-bottom:%?10?%}.box-copy .box .box-common .common-text[data-v-075a7d21]{font-size:%?26?%;font-weight:600}.box-copy .box .box-common .box-text[data-v-075a7d21]{margin-top:%?-6?%;font-size:%?26?%;font-weight:600;color:#ff1507}.footer[data-v-075a7d21]{width:100%;height:%?140?%}",""]),t.exports=e},"2e07":function(t,e,n){"use strict";n.r(e);var i=n("044a"),a=n("6fe4");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("3e9e"),n("a264");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"0c486f2d",null,!1,i["a"],c);e["default"]=s.exports},"3c3a":function(t,e,n){var i=n("64ef");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("5b2d2cc6",i,!0,{sourceMap:!1,shadowMode:!1})},"3e9e":function(t,e,n){"use strict";var i=n("3c3a"),a=n.n(i);a.a},"64ef":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-0c486f2d]{background-color:#fafafa}body.?%PAGE?%[data-v-0c486f2d]{background-color:#fafafa}",""]),t.exports=e},"6fe4":function(t,e,n){"use strict";n.r(e);var i=n("8196"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},8196:function(t,e,n){"use strict";var i=n("4ea4");n("d81d"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("ae5a")),o={components:{commonWallet:a.default},data:function(){return{num:2,list:[],currency:"",contractAddress:""}},onLoad:function(t){this.contractAddress=t.contractAddress,this.getMnemonic(),this.currency=t.currency},onBackPress:function(t){return"navigateBack"!==t.from&&(this.back(),!0)},methods:{back:function(){uni.navigateBack({delta:2})},getMnemonic:function(){var t=n("c826"),e=t.generateMnemonic(),i=[];i=e.split(" "),this.list=i.map((function(t,e){return{text:t,id:e}})),uni.setStorageSync("mnemonicList",this.list),uni.setStorageSync("mnemonic",e)},goUrl:function(t){uni.navigateTo({url:t+"?currency="+this.currency+"&contractAddress="+this.contractAddress})}}};e.default=o},8992:function(t,e,n){var i=n("92b7");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("18a91c7f",i,!0,{sourceMap:!1,shadowMode:!1})},"92b7":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".index[data-v-0c486f2d]{padding:0 %?30?%}.index .list[data-v-0c486f2d]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.index .list .item[data-v-0c486f2d]{padding:%?6?%;-webkit-box-sizing:content-box;box-sizing:content-box;width:20%;height:%?80?%;line-height:%?80?%;text-align:center;-webkit-border-radius:%?12?%;border-radius:%?12?%;background-color:#fff;margin-bottom:%?30?%;font-size:%?26?%}.index .text[data-v-0c486f2d]{font-size:%?24?%;padding:%?20?%;-webkit-border-radius:%?30?%;border-radius:%?30?%;color:#fb2503;background-color:#fff}.index .btn[data-v-0c486f2d]{margin:%?100?% auto 0;width:%?500?%;height:%?100?%;color:#fff;font-weight:600;font-size:%?32?%;text-align:center;line-height:%?100?%;-webkit-border-radius:%?50?%;border-radius:%?50?%;background-color:#d4d8e4}",""]),t.exports=e},"939b":function(t,e,n){"use strict";n.r(e);var i=n("c347"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"9c11":function(t,e,n){var i=n("0cc9");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("d86b0dbc",i,!0,{sourceMap:!1,shadowMode:!1})},a264:function(t,e,n){"use strict";var i=n("8992"),a=n.n(i);a.a},ae5a:function(t,e,n){"use strict";n.r(e);var i=n("f008"),a=n("939b");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("d329");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"075a7d21",null,!1,i["a"],c);e["default"]=s.exports},c347:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{num:{type:Number,default:0}},data:function(){return{}}};e.default=i},d329:function(t,e,n){"use strict";var i=n("9c11"),a=n.n(i);a.a},f008:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uIcon:n("1d43").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"head-bgi"}),n("v-uni-view",{staticClass:"box-copy"},[n("v-uni-view",{staticClass:"box"},[n("v-uni-view",{staticClass:"box-common"},[n("v-uni-view",[t.num>=1?n("u-icon",{attrs:{name:"checkmark-circle-fill",color:"#415aff",size:"60"}}):n("v-uni-view",{staticClass:"number"},[t._v("1")])],1),n("v-uni-view",{staticClass:"common-text",class:t.num>=1?"box-text":""},[t._v("创建钱包")])],1),n("v-uni-text",{class:t.num>=1?"box-one":""},[t._v(".........")]),n("v-uni-view",{staticClass:"box-common"},[n("v-uni-view",[t.num>=2?n("u-icon",{attrs:{name:"checkmark-circle-fill",color:"#415aff",size:"60"}}):n("v-uni-view",{staticClass:"number"},[t._v("2")])],1),n("v-uni-view",{staticClass:"common-text",class:t.num>=2?"box-text":""},[t._v("备份助记词")])],1),n("v-uni-text",{class:t.num>=3?"box-one":""},[t._v(".........")]),n("v-uni-view",{staticClass:"box-common"},[n("v-uni-view",[t.num>=3?n("u-icon",{attrs:{name:"checkmark-circle-fill",color:"#415aff",size:"60"}}):n("v-uni-view",{staticClass:"number"},[t._v("3")])],1),n("v-uni-view",{staticClass:"common-text",class:t.num>=3?"box-text":""},[t._v("确认助记词")])],1)],1)],1),n("v-uni-view",{staticClass:"footer"})],1)},o=[]}}]);