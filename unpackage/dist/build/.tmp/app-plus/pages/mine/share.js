(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/share"],{"111c":function(e,t,n){"use strict";n.r(t);var i=n("d1f0"),s=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);t["default"]=s.a},"6aff":function(e,t,n){"use strict";var i,s=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",function(){return s}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return i})},a14a:function(e,t,n){"use strict";var i=n("bbf6"),s=n.n(i);s.a},aa73:function(e,t,n){"use strict";n.r(t);var i=n("6aff"),s=n("111c");for(var a in s)"default"!==a&&function(e){n.d(t,e,function(){return s[e]})}(a);n("a14a");var o,c=n("f0c5"),r=Object(c["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=r.exports},bbf6:function(e,t,n){},d1f0:function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{bottomData:[{text:"微信好友",icon:"../../static/sharemenu/wx.png",name:"wx"},{text:"微信朋友圈",icon:"../../static/sharemenu/pyq.png",name:"wx"},{text:"复制链接",icon:"../../static/sharemenu/copy.png",name:"more"}]}},computed:{invit_code:function(){return this.$store.state.userInfo.inviteCode}},methods:{togglePopup:function(){this.$emit("togglePopupEvent")},toShare:function(t){var i=this,s=this.$store.state.isLogin;if(s)switch(Number(t.currentTarget.id)){case 0:e.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://118.31.120.214/zfx/download?inviteCode="+this.invit_code,title:"赚分享，随时随地躺着赚！",summary:"随时随地躺着赚",imageUrl:"../../static/logo.png",success:function(e){i.$emit("successShareEvent"),console.log(n("success:"+JSON.stringify(e)," at pages\\mine\\share.vue:91"))},fail:function(e){i.$emit("successShareEvent"),console.log(n("success:"+JSON.stringify(e)," at pages\\mine\\share.vue:95"))}});break;case 1:e.share({provider:"weixin",scene:"WXSenceTimeline",type:0,href:"http://118.31.120.214/zfx/download?inviteCode="+this.invit_code,title:"赚分享，随时随地躺着赚！",summary:"随时随地躺着赚",imageUrl:"../../static/logo.png",success:function(e){i.$emit("successShareEvent"),console.log(n("success:"+JSON.stringify(e)," at pages\\mine\\share.vue:112"))},fail:function(e){i.$emit("successShareEvent"),console.log(n("success:"+JSON.stringify(e)," at pages\\mine\\share.vue:116"))}});break;case 2:e.setClipboardData({data:"http://118.31.120.214/zfx/download?inviteCode="+this.invit_code,complete:function(){e.showToast({title:"已复制到剪贴板"})}});break}else e.navigateTo({url:"/pages/mine/login",animationType:"slide-in-top"})}}};t.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/mine/share-create-component',
    {
        'pages/mine/share-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("aa73"))
        })
    },
    [['pages/mine/share-create-component']]
]);