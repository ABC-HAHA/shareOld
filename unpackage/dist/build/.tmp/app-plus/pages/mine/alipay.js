(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/alipay"],{"3b9e":function(e,t,a){"use strict";var n,u=function(){var e=this,t=e.$createElement;e._self._c},i=[];a.d(t,"b",function(){return u}),a.d(t,"c",function(){return i}),a.d(t,"a",function(){return n})},"84f5":function(e,t,a){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{trueName:"",userName:"",alipay:""}},methods:{checkTrueName:function(){return""!=this.trueName||(e.showToast({title:"请检查真实姓名",icon:"none",mask:!0}),setTimeout(function(){e.hideToast()},2e3),!1)},checkName:function(){var t=/^[A-Za-z0-9]{5,20}$/;return!(""==this.userName||!t.test(this.userName))||(e.showToast({title:"请检查用户账号",icon:"none",mask:!0}),setTimeout(function(){e.hideToast()},2e3),!1)},commitAlipay:function(){this.checkTrueName()&&this.checkName()&&e.request({url:this.websiteUrl+"/api/otherUser",method:"POST",header:{Authorization:this.$store.state.userInfo.token},data:{actualName:this.trueName,username:this.userName},success:function(t){console.log(a(t," at pages\\mine\\alipay.vue:89")),200==t.data.code?(plus.nativeUI.toast("绑定成功!"),e.switchTab({url:"/pages/tarbar/mine/mine",animationType:"slide-in-right"})):plus.nativeUI.toast(t.data.data)}})}}};t.default=n}).call(this,a("6e42")["default"],a("0de9")["default"])},a894:function(e,t,a){"use strict";a.r(t);var n=a("3b9e"),u=a("b9d9");for(var i in u)"default"!==i&&function(e){a.d(t,e,function(){return u[e]})}(i);var o,r=a("f0c5"),s=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,"e3845e30",null,!1,n["a"],o);t["default"]=s.exports},b9d9:function(e,t,a){"use strict";a.r(t);var n=a("84f5"),u=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=u.a},bc1e:function(e,t,a){"use strict";(function(e){a("0e5e"),a("921b");n(a("66fd"));var t=n(a("a894"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])}},[["bc1e","common/runtime","common/vendor"]]]);