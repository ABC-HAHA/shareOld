function update(websiteUrl, updateType,progress) {
	//#ifdef APP-PLUS
	// let that = this;
	let systemName = plus.os.name.toUpperCase();
	let versionNum;
	// let progress = 0;
	let downtimer;
	let appid = plus.runtime.appid;
	let upgradeCycle = 604800000;
	let lastTime = 0;
	uni.getStorage({
		key: 'version_update_time',
		success: function(res) {
			lastTime = res.data;
		}
	});
	plus.runtime.getProperty(appid, function(wgtinfo) {
		var self = this;
		versionNum = plus.storage.getItem('app-id'); // wgtinfo.versionCode;
		// console.log(versionNum);
		// console.log(111111111111111111111111111111111111, wgtinfo);
		if (!versionNum) {
			versionNum = wgtinfo.versionCode;
		} else {
			versionNum = versionNum.replace(/\./g, '');
		}
		// console.log(systemName, versionNum);
		uni.request({
			url: websiteUrl + '/sys/checkversion',
			method: 'POST',
			data: {
				systemName: systemName,
				versionCode: versionNum
			},
			success: res => {
				// console.log(res);
				let data = res.data;
				if (data.data) {
					var currentVersion = data.data.versionName;
				}
				// plus.storage.setItem("app-id", res.data.data.versionName.toString());
				let currentTime = new Date();
				currentTime = currentTime.getTime();
				if (data.data != null) {

					// let doNotification = CreateDownNotification();
					// console.log(updateType)

					if (updateType == 1) {
						if (lastTime + upgradeCycle > currentTime) {
							return;
						}
					}


					if (plus.networkinfo.getCurrentType() != 3) {
						if (data.data.versionWgtPath != '') {
							uni.showModal({
								title: '发现新版本',
								content: '有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？',
								showCancel: true,
								cancelText: '下次再说',
								confirmText: '现在更新',
								success: res => {
									if (res.confirm) {
										switch (systemName) {
											case 'ANDROID':
												let downloadTask = uni.downloadFile({
													url: data.data.versionWgtPath,
													success: function(res) {
														if (res.statusCode === 200) {
															plus.runtime.install(
																res.tempFilePath, {
																	force: true
																},
																function() {
																	plus.storage.setItem('app-id', currentVersion.toString());
																	plus.nativeUI.toast('更新成功');
																	plus.runtime.restart();
																},
																function() {
																	plus.nativeUI.toast('更新失败');
																}
															);
														} else {
															plus.nativeUI.toast('下载失败，请检查网络');
														}
													}
												});
												downloadTask.onProgressUpdate(function(res) {
													progress = res.progress;
												});
												console.log(progress)
												// clearInterval(downtimer);
												// downtimer = setInterval(function() {
												// 	doNotification(progress, true);
												// 	if (progress == 100) {
												// 		clearInterval(downtimer);
												// 		return;
												// 	}
												// }, 500);
												break;
											case 'IOS':
												uni.downloadFile({
													url: data.data.versionWgtPath,
													success: function(res) {
														if (res.statusCode === 200) {
															plus.runtime.install(
																res.tempFilePath, {
																	force: true
																},
																function() {
																	plus.storage.setItem('app-id', currentVersion.toString());
																	plus.nativeUI.toast('更新成功');
																	plus.runtime.restart();
																},
																function() {
																	plus.nativeUI.toast('更新失败');
																}
															);
														} else {
															plus.nativeUI.toast('下载失败，请检查网络');
														}
													}
												});
												break;
										}
									} else {
										let currentTapTime = new Date();
										currentTapTime = currentTapTime.getTime();
										uni.setStorage({
											key: 'version_update_time',
											data: currentTapTime,
											success: function() {
												console.log('保存成功');
											}
										});
										return;
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
						if (data.data.path != '') {
							uni.showModal({
								title: '发现新版本',
								content: '有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？',
								showCancel: true,
								cancelText: '下次再说',
								confirmText: '现在更新',
								success: res => {
									if (res.confirm) {
										switch (systemName) {
											case 'ANDROID':
												let downloadTask = uni.downloadFile({
													url: data.data.path,
													success: function(res) {
														if (res.statusCode === 200) {
															plus.runtime.install(
																res.tempFilePath, {
																	force: true
																},
																function() {},
																function() {
																	plus.nativeUI.toast('安装失败');
																}
															);
														} else {
															plus.nativeUI.toast('下载失败，请检查网络');
														}
													}
												});
												downloadTask.onProgressUpdate(function(res) {
													progress = res.progress;
												});
												console.log(progress)
												// clearInterval(downtimer);
												// downtimer = setInterval(function() {
												// 	doNotification(progress, true);
												// 	if (progress == 100) {
												// 		clearInterval(downtimer);
												// 		return;
												// 	}
												// }, 500);
												break;
											case 'IOS':
												plus.runtime.openURL(data.data.path);
												break;
										}
									} else {
										let currentTapTime = new Date();
										currentTapTime = currentTapTime.getTime();
										uni.setStorage({
											key: 'version_update_time',
											data: currentTapTime,
											success: function() {
												console.log('保存成功');
											}
										});
										return;
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
					} else {
						if (data.data.versionWgtPath != '') {
							uni.showModal({
								title: '发现新版本',
								content: '有新的版本发布，是否立即进行新版本下载？',
								showCancel: true,
								cancelText: '下次再说',
								confirmText: '现在更新',
								success: res => {
									if (res.confirm) {
										switch (systemName) {
											case 'ANDROID':
												let downloadTask = uni.downloadFile({
													url: data.data.versionWgtPath,
													success: function(res) {
														if (res.statusCode === 200) {
															plus.runtime.install(
																res.tempFilePath, {
																	force: true
																},
																function() {
																	plus.storage.setItem('app-id', currentVersion.toString());
																	plus.nativeUI.toast('更新成功');
																	plus.runtime.restart();
																},
																function() {
																	plus.nativeUI.toast('更新失败');
																}
															);
														} else {
															plus.nativeUI.toast('下载失败，请检查网络');
														}
													}
												});
												downloadTask.onProgressUpdate(function(res) {
													progress = res.progress;
												});
												
												clearInterval(downtimer);
												downtimer = setInterval(function() {
													console.log(progress)
													if (progress == 100) {
														clearInterval(downtimer);
														return;
													}
												}, 500);
												break;
											case 'IOS':
												uni.downloadFile({
													url: data.data.versionWgtPath,
													success: function(res) {
														if (res.statusCode === 200) {
															plus.runtime.install(
																res.tempFilePath, {
																	force: true
																},
																function() {
																	plus.storage.setItem('app-id', currentVersion.toString());
																	plus.nativeUI.toast('更新成功');
																	plus.runtime.restart();
																},
																function() {
																	plus.nativeUI.toast('更新失败');
																}
															);
														} else {
															plus.nativeUI.toast('下载失败，请检查网络');
														}
													}
												});
												break;
										}
									} else {
										let currentTapTime = new Date();
										currentTapTime = currentTapTime.getTime();
										uni.setStorage({
											key: 'version_update_time',
											data: currentTapTime,
											success: function() {
												console.log('保存成功');
											}
										});
										return;
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
						if (data.data.path != '') {
							uni.showModal({
								title: '发现新版本',
								content: '有新的版本发布，是否立即进行新版本下载？',
								showCancel: true,
								cancelText: '下次再说',
								confirmText: '现在更新',
								success: res => {
									if (res.confirm) {
										switch (systemName) {
											case 'ANDROID':
												let downloadTask = uni.downloadFile({
													url: data.data.path,
													success: function(res) {
														if (res.statusCode === 200) {
															plus.runtime.install(
																res.tempFilePath, {
																	force: true
																},
																function() {},
																function() {
																	plus.nativeUI.toast('安装失败');
																}
															);
														} else {
															plus.nativeUI.toast('下载失败，请检查网络');
														}
													}
												});
												downloadTask.onProgressUpdate(function(res) {
													progress = res.progress;
												});
												console.log(progress)
												// clearInterval(downtimer);
												// downtimer = setInterval(function() {
												// 	doNotification(progress, true);
												// 	if (progress == 100) {
												// 		clearInterval(downtimer);
												// 		return;
												// 	}
												// }, 500);
												break;
											case 'IOS':
												plus.runtime.openURL(data.data.path);
												break;
										}
									} else {
										let currentTapTime = new Date();
										currentTapTime = currentTapTime.getTime();
										uni.setStorage({
											key: 'version_update_time',
											data: currentTapTime,
											success: function() {
												console.log('保存成功');
											}
										});
										return;
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
					}
				}
			},
			fail: () => {},
			complete: () => {}
		});
	});
	//#endif

}

module.exports = {
	update: update
}
