(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tarbar/task/task"],{"0e84":function(t,e,n){"use strict";n.r(e);var a=n("420d"),s=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=s.a},"420d":function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=function(){return n.e("components/cmd-progress/cmd-progress").then(n.bind(null,"4d48"))},o=function(){return n.e("pages/mine/uni-popup").then(n.bind(null,"8cc2"))},r={data:function(){return{progress:0,type:""}},components:{uniPopup:o,cmdProgress:s},computed:{pro:function(){return this.progress}},onLoad:function(){this.update()},methods:{update:function(){var e,n,s=this,o=plus.os.name.toUpperCase(),r=plus.runtime.appid,i=6048e5,u=0;t.getStorage({key:"version_update_time",success:function(t){u=t.data}}),plus.runtime.getProperty(r,function(r){e=plus.storage.getItem("app-id"),e=e?e.replace(/\./g,""):r.versionCode,t.request({url:s.websiteUrl+"/sys/checkversion",method:"POST",data:{systemName:o,versionCode:e},success:function(e){console.log(a(e," at pages\\tarbar\\task\\task.vue:105"));var r=e.data;if(r.data)var c=r.data.versionName;var l=new Date;if(l=l.getTime(),null!=r.data){if(u+i>l)return;3!=plus.networkinfo.getCurrentType()?(""!=r.data.versionWgtPath&&t.showModal({title:"发现新版本",content:"有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var i=new Date;return i=i.getTime(),void t.setStorage({key:"version_update_time",data:i,success:function(){console.log(a("保存成功"," at pages\\tarbar\\task\\task.vue:203"))}})}switch(o){case"ANDROID":var u=t.downloadFile({url:r.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){s.progress=t.progress}),clearInterval(n),s.type="",n=setInterval(function(){if(s.type="update_show",s.$store.commit("changeProgress",s.progress),100==progress)return clearInterval(n),void(s.type="")},500);break;case"IOS":t.downloadFile({url:r.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});break}},fail:function(){},complete:function(){}}),""!=r.data.path&&t.showModal({title:"发现新版本",content:"有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var i=new Date;return i=i.getTime(),void t.setStorage({key:"version_update_time",data:i,success:function(){console.log(a("保存成功"," at pages\\tarbar\\task\\task.vue:269"))}})}switch(o){case"ANDROID":var u=t.downloadFile({url:r.data.path,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){},function(){plus.nativeUI.toast("安装失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){s.progress=t.progress}),clearInterval(n),s.type="",n=setInterval(function(){if(s.type="update_show",s.$store.commit("changeProgress",s.progress),100==progress)return clearInterval(n),void(s.type="")},500);break;case"IOS":plus.runtime.openURL(r.data.path);break}},fail:function(){},complete:function(){}})):(""!=r.data.versionWgtPath&&t.showModal({title:"发现新版本",content:"有新的版本发布，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var i=new Date;return i=i.getTime(),void t.setStorage({key:"version_update_time",data:i,success:function(){console.log(a("保存成功"," at pages\\tarbar\\task\\task.vue:363"))}})}switch(o){case"ANDROID":var u=t.downloadFile({url:r.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){s.progress=t.progress}),clearInterval(n),s.type="",n=setInterval(function(){if(s.type="update_show",s.$store.commit("changeProgress",s.progress),100==progress)return clearInterval(n),void(s.type="")},500);break;case"IOS":t.downloadFile({url:r.data.versionWgtPath,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){plus.storage.setItem("app-id",c.toString()),plus.nativeUI.toast("更新成功"),plus.runtime.restart()},function(){plus.nativeUI.toast("更新失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});break}},fail:function(){},complete:function(){}}),""!=r.data.path&&t.showModal({title:"发现新版本",content:"有新的版本发布，是否立即进行新版本下载？",showCancel:!0,cancelText:"下次再说",confirmText:"现在更新",success:function(e){if(!e.confirm){var i=new Date;return i=i.getTime(),void t.setStorage({key:"version_update_time",data:i,success:function(){console.log(a("保存成功"," at pages\\tarbar\\task\\task.vue:429"))}})}switch(o){case"ANDROID":var u=t.downloadFile({url:r.data.path,success:function(t){200===t.statusCode?plus.runtime.install(t.tempFilePath,{force:!0},function(){},function(){plus.nativeUI.toast("安装失败")}):plus.nativeUI.toast("下载失败，请检查网络")}});u.onProgressUpdate(function(t){s.progress=t.progress}),clearInterval(n),s.type="",n=setInterval(function(){if(s.type="update_show",s.$store.commit("changeProgress",s.progress),100==progress)return clearInterval(n),void(s.type="")},500);break;case"IOS":plus.runtime.openURL(r.data.path);break}},fail:function(){},complete:function(){}}))}},fail:function(){},complete:function(){}})})}}};e.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"8e5b":function(t,e,n){"use strict";var a,s=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return s}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return a})},"94a1":function(t,e,n){},aeb3:function(t,e,n){"use strict";var a=n("94a1"),s=n.n(a);s.a},c0b2:function(t,e,n){"use strict";(function(t){n("0e5e"),n("921b");a(n("66fd"));var e=a(n("de16"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},de16:function(t,e,n){"use strict";n.r(e);var a=n("8e5b"),s=n("0e84");for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);n("aeb3");var r,i=n("f0c5"),u=Object(i["a"])(s["default"],a["b"],a["c"],!1,null,"cea1c85a",null,!1,a["a"],r);e["default"]=u.exports}},[["c0b2","common/runtime","common/vendor"]]]);