(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/setting"],{"09e9":function(t,e,n){},2837:function(t,e,n){"use strict";n.r(e);var s=n("71de"),o=n("de83");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("aaba");var i,r=n("f0c5"),u=Object(r["a"])(o["default"],s["b"],s["c"],!1,null,"70687ebf",null,!1,s["a"],i);e["default"]=u.exports},"544c":function(t,e,n){"use strict";(function(t,s){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return n.e("components/cmd-progress/cmd-progress").then(n.bind(null,"4d48"))},a=function(){return n.e("pages/mine/uni-popup").then(n.bind(null,"8cc2"))},i={data:function(){return{flag:!1,progress:0,type:""}},components:{uniPopup:a,cmdProgress:o},methods:{briefIntroduction:function(){t.navigateTo({url:"/pages/mine/briefIntroduction",animationType:"slide-in-right"})},loginOut:function(){var e=this,n=this;if(console.log(s(this.$store.state.userInfo," at pages\\mine\\setting.vue:53")),this.$store.state.userInfo&&!this.$store.state.userInfo.userId)return n.$store.commit("logout"),t.showToast({title:"退出成功",mask:!0}),void setTimeout(function(){t.hideToast(),t.switchTab({url:"/pages/tarbar/mine/mine",animationType:"slide-in-right"})},2e3);t.showModal({title:"确认退出？",content:"温馨提示：退出后会影响某些功能使用，确认退出？",showCancel:!0,cancelText:"取消",confirmText:"确定",success:function(s){s.confirm&&t.request({url:n.websiteUrl+"/api/user/logout?userId="+e.$store.state.userInfo.userId,method:"POST",header:{Authorization:e.$store.state.userInfo.token},success:function(e){200==e.data.code?(n.$store.commit("logout"),t.showToast({title:"退出成功",mask:!0}),setTimeout(function(){t.hideToast(),t.switchTab({url:"/pages/tarbar/mine/mine",animationType:"slide-in-right"})},2e3)):600==e.data.code?n.$store.commit("logout"):plus.nativeUI.toast(e.data.msg)},fail:function(){},complete:function(){}})}})},flagUpdate:function(){var e,n=this,o=plus.os.name.toUpperCase(),a=plus.runtime.appid;plus.runtime.getProperty(a,function(a){e=plus.storage.getItem("app-id"),console.log(s(e," at pages\\mine\\setting.vue:118")),e=e?e.replace(/\./g,""):a.versionCode,console.log(s(o,e," at pages\\mine\\setting.vue:124")),t.request({url:n.websiteUrl+"/sys/checkversion",method:"POST",data:{systemName:o,versionCode:e},success:function(t){var e=t.data;null==e.data?n.flag=!1:""==e.data.path&&""==e.data.versionWgtPath||(n.flag=!0)}})})},update:function(){var e,n,o=this,a=plus.os.name.toUpperCase(),i=plus.runtime.appid,r=0,u=0;t.getStorage({key:"version_update_time",success:function(t){u=t.data}}),plus.runtime.getProperty(i,function(i){e=plus.storage.getItem("app-id"),e=e?e.replace(/\./g,""):i.versionCode,t.request({url:o.websiteUrl+"/sys/checkversion",method:"POST",data:{systemName:a,versionCode:e},success:function(e){var i=e.data;if(i.data)var c=i.data.versionName;var l=new Date;if(l=l.getTime(),null!=i.data){if(u+r>l)return;3!=plus.networkinfo.getCurrentType()?(""!=i.data.versionWgtPath&&t.showModal({title:"发现新版本",content:"有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var r=new Date;return r=r.getTime(),void t.setStorage({key:"version_update_time",data:r,success:function(){console.log(s("保存成功"," at pages\\mine\\setting.vue:282"))}})}switch(a){case"ANDROID":var u=t.downloadFile({url:i.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){o.progress=t.progress}),clearInterval(n),o.type="",n=setInterval(function(){if(o.type="update_show",o.$store.commit("changeProgress",o.progress),100==progress)return clearInterval(n),void(o.type="")},500);break;case"IOS":t.downloadFile({url:i.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});break}},fail:function(){},complete:function(){}}),""!=i.data.path&&t.showModal({title:"发现新版本",content:"有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var r=new Date;return r=r.getTime(),void t.setStorage({key:"version_update_time",data:r,success:function(){console.log(s("保存成功"," at pages\\mine\\setting.vue:348"))}})}switch(a){case"ANDROID":var u=t.downloadFile({url:i.data.path,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){},function(){plus.nativeUI.toast("安装失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){o.progress=t.progress}),clearInterval(n),o.type="",n=setInterval(function(){if(o.type="update_show",o.$store.commit("changeProgress",o.progress),100==progress)return clearInterval(n),void(o.type="")},500);break;case"IOS":plus.runtime.openURL(i.data.path);break}},fail:function(){},complete:function(){}})):(""!=i.data.versionWgtPath&&t.showModal({title:"发现新版本",content:"有新的版本发布，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var r=new Date;return r=r.getTime(),void t.setStorage({key:"version_update_time",data:r,success:function(){console.log(s("保存成功"," at pages\\mine\\setting.vue:442"))}})}switch(a){case"ANDROID":var u=t.downloadFile({url:i.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){o.progress=t.progress}),clearInterval(n),o.type="",n=setInterval(function(){if(o.type="update_show",o.$store.commit("changeProgress",o.progress),100==progress)return clearInterval(n),void(o.type="")},500);break;case"IOS":t.downloadFile({url:i.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});break}},fail:function(){},complete:function(){}}),""!=i.data.path&&t.showModal({title:"发现新版本",content:"有新的版本发布，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var r=new Date;return r=r.getTime(),void t.setStorage({key:"version_update_time",data:r,success:function(){console.log(s("保存成功"," at pages\\mine\\setting.vue:508"))}})}switch(a){case"ANDROID":var u=t.downloadFile({url:i.data.path,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){},function(){plus.nativeUI.toast("安装失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){o.progress=t.progress}),clearInterval(n),o.type="",n=setInterval(function(){if(o.type="update_show",o.$store.commit("changeProgress",o.progress),100==progress)return clearInterval(n),void(o.type="")},500);break;case"IOS":plus.runtime.openURL(i.data.path);break}},fail:function(){},complete:function(){}}))}},fail:function(){},complete:function(){}})})}},onShow:function(){},computed:{version:function(){return plus.storage.getItem("app-id")?plus.storage.getItem("app-id"):"2.1.0"},pro:function(){return this.$store.state.progress}},onLoad:function(){this.flagUpdate()}};e.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])},5999:function(t,e,n){"use strict";(function(t){n("0e5e"),n("921b");s(n("66fd"));var e=s(n("2837"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"71de":function(t,e,n){"use strict";var s,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return s})},aaba:function(t,e,n){"use strict";var s=n("09e9"),o=n.n(s);o.a},de83:function(t,e,n){"use strict";n.r(e);var s=n("544c"),o=n.n(s);for(var a in s)"default"!==a&&function(t){n.d(e,t,function(){return s[t]})}(a);e["default"]=o.a}},[["5999","common/runtime","common/vendor"]]]);