(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shipinPromoting/shipinPromoting"],{"1c4f":function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return u}),e.d(n,"a",function(){return a})},2342:function(t,n,e){},"487a":function(t,n,e){"use strict";(function(t,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=u(e("837c"));function u(t){return t&&t.__esModule?t:{default:t}}var i=function(){return e.e("components/faceContent/faceContent").then(e.bind(null,"24fd"))},r=function(){return e.e("components/nodata/nodata").then(e.bind(null,"1d37"))},c={data:function(){return{list:[],start:0,page:10,showFalg:!0,loadingType:0}},methods:{shipinData:function(){self=this,t.request({url:this.websiteUrl+"/api/comnet/list/3",method:"GET",data:{start:self.start,page:self.page},success:function(t){if(t.data.data.list.length>=t.data.data.totalCount)return self.list=t.data.data.list,void(self.loadingType=2);self.list=t.data.data.list,self.page+=self.page}})}},onLoad:function(){this.shipinData()},onReachBottom:function(){var t=this;console.log(a("onReachBottom"," at pages\\shipinPromoting\\shipinPromoting.vue:51")),this.loadingType=0,setTimeout(function(){t.shipinData()},300)},components:{FaceContent:i,Loading:o.default,nodataPage:r}};n.default=c}).call(this,e("6e42")["default"],e("0de9")["default"])},"812d":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={props:{loadingType:{type:Number,default:2},loadingText:{type:Array,default:function(){return["上拉加载更多","加载中...","已经加载全部数据"]}},showFalg:{type:Boolean,default:!0}}};n.default=a},"837c":function(t,n,e){"use strict";e.r(n);var a=e("1c4f"),o=e("a3f7");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);e("9527");var i,r=e("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"57cec0aa",null,!1,a["a"],i);n["default"]=c.exports},9021:function(t,n,e){"use strict";e.r(n);var a=e("487a"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=o.a},9527:function(t,n,e){"use strict";var a=e("2342"),o=e.n(a);o.a},a3f7:function(t,n,e){"use strict";e.r(n);var a=e("812d"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=o.a},cdf6:function(t,n,e){"use strict";(function(t){e("0e5e"),e("921b");a(e("66fd"));var n=a(e("e4d9"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},d2ca:function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",function(){return o}),e.d(n,"c",function(){return u}),e.d(n,"a",function(){return a})},e4d9:function(t,n,e){"use strict";e.r(n);var a=e("d2ca"),o=e("9021");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);var i,r=e("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"810717e0",null,!1,a["a"],i);n["default"]=c.exports}},[["cdf6","common/runtime","common/vendor"]]]);