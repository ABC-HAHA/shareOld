<template>
	<view class="setting_page">
		<view class="other_list" @tap="briefIntroduction">
			<image class="mine_other_list_icon" src="../../static/guanyu.png"></image>
			<view class="mine_other_list_content">关于网赚</view>
			<image class="mine_other_list_image" src="../../static/jiantou.png"></image>
		</view>
		<view class="other_list" @tap.once="update()">
			<image class="mine_other_list_icon" :class="flag ? 'active' : ''" src="../../static/banbengengxin.png"></image>
			<view class="mine_other_list_one">更新版本</view>
			<view class="mine_other_list_two">{{ version }}</view>
			<image class="mine_other_list_image" src="../../static/jiantou.png"></image>
		</view>
		<uni-popup :show="type === 'update_show'" position="middle" :shareStatus="true">
			<view class="shareGroup">
				<!-- 遮罩 -->
				<!-- {{ pro }} -->
				<view class="shareGroup_pro"><cmd-progress :percent="pro" :stroke-width="24" stroke-color="linear-gradient(to right, #ef32d9, #89fffd)"></cmd-progress></view>
			</view>
		</uni-popup>

		<view class="block_btn" @tap="loginOut">退出登录</view>
	</view>
</template>

<script>
import cmdProgress from '@/components/cmd-progress/cmd-progress.vue';
import uniPopup from '@/pages/mine/uni-popup.vue';
export default {
	data() {
		return {
			flag: false,
			progress: 0,
			type: ''
		};
	},
	components: {
		uniPopup,
		cmdProgress
	},
	methods: {
		briefIntroduction() {
			uni.navigateTo({
				url: '/pages/mine/briefIntroduction',
				animationType: 'slide-in-right'
			});
		},
		loginOut() {
			let that = this;
			// if (!this.$store.state.isLogin) {
			//     return
			// }
			console.log(this.$store.state.userInfo);
			if (this.$store.state.userInfo && !this.$store.state.userInfo.userId) {
				that.$store.commit('logout');
				uni.showToast({
					title: '退出成功',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
					uni.switchTab({
						url: '/pages/tarbar/mine/mine',
						animationType: 'slide-in-right'
					});
				}, 2000);
				return;
			}
			uni.showModal({
				title: '确认退出？',
				content: '温馨提示：退出后会影响某些功能使用，确认退出？',
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						uni.request({
							url: that.websiteUrl + '/api/user/logout?userId=' + this.$store.state.userInfo.userId,
							method: 'POST',
							header: {
								Authorization: this.$store.state.userInfo.token
							},
							success: res => {
								if (res.data.code == 200) {
									that.$store.commit('logout');
									uni.showToast({
										title: '退出成功',
										mask: true
									});
									setTimeout(function() {
										uni.hideToast();
										uni.switchTab({
											url: '/pages/tarbar/mine/mine',
											animationType: 'slide-in-right'
										});
									}, 2000);
								} else if (res.data.code == 600) {
									that.$store.commit('logout');
								} else {
									plus.nativeUI.toast(res.data.msg);
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}
			});
		},
		flagUpdate() {
			// #ifdef APP-PLUS
			let self = this;
			let systemName = plus.os.name.toUpperCase();
			let versionNum;
			let appid = plus.runtime.appid;
			plus.runtime.getProperty(appid, function(wgtinfo) {
				versionNum = plus.storage.getItem('app-id'); // wgtinfo.versionCode;
				console.log(versionNum);
				if (!versionNum) {
					versionNum = wgtinfo.versionCode;
				} else {
					versionNum = versionNum.replace(/\./g, '');
				}
				console.log(systemName, versionNum);
				uni.request({
					url: self.websiteUrl + '/sys/checkversion',
					method: 'POST',
					data: {
						systemName: systemName,
						versionCode: versionNum
					},
					success: res => {
						let data = res.data;
						// console.log(111,data);
						if (data.data == null) {
							self.flag = false;
						} else if (data.data.path != '' || data.data.versionWgtPath != '') {
							self.flag = true;
						}
					}
				});
			});
			// #endif
		},
		// update() {
		// 	update.update(this.websiteUrl, this.updateType, this.progress);
		// },
		update() {
			//#ifdef APP-PLUS
			let that = this;
			let systemName = plus.os.name.toUpperCase();
			let versionNum;
			// let progress = 0;
			let downtimer;
			let appid = plus.runtime.appid;
			// let upgradeCycle = 604800000;
			let upgradeCycle = 0;
			let lastTime = 0;
			uni.getStorage({
				key: 'version_update_time',
				success: function(res) {
					lastTime = res.data;
				}
			});
			plus.runtime.getProperty(appid, function(wgtinfo) {
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
					url: that.websiteUrl + '/sys/checkversion',
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

							if (lastTime + upgradeCycle > currentTime) {
								return;
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
																		res.tempFilePath,
																		{
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
															that.progress = res.progress;
														});
														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
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
																		res.tempFilePath,
																		{
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
																		res.tempFilePath,
																		{
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
															that.progress = res.progress;
														});
														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
																return;
															}
														}, 500);
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
																		res.tempFilePath,
																		{
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
															that.progress = res.progress;
														});

														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
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
																		res.tempFilePath,
																		{
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
																		res.tempFilePath,
																		{
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
															that.progress = res.progress;
														});
														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
																return;
															}
														}, 500);
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
	},
	onShow() {
		// // #ifdef APP-PLUS
		// this.version = plus.storage.getItem('app-id');
		// console.log(this.version);
		// // #endif
	},
	computed: {
		// #ifdef APP-PLUS
		version: function() {
			return plus.storage.getItem('app-id') ? plus.storage.getItem('app-id') : '2.1.0';
		},
		// #endif
		pro: function() {
			return this.$store.state.progress;
		}
	},
	onLoad() {
		this.flagUpdate();
	}
};
</script>

<style lang="less" scoped>
.setting_page {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20upx;

	.other_list {
		width: 750upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10upx;
		line-height: 100upx;
		background-color: #ffffff;
		.mine_other_list_icon {
			margin-left: 30upx;
			width: 36upx;
			height: 36upx;
		}
		.mine_other_list_image {
			width: 17upx;
			height: 29upx;
		}
		.mine_other_list_content {
			width: 600upx;
			font-size: 40upx;
			color: rgba(40, 40, 40, 1);
			margin-left: 30upx;
		}
		.mine_other_list_one {
			width: 350upx;
			font-size: 40upx;
			color: rgba(40, 40, 40, 1);
			margin-left: 30upx;
		}
		.mine_other_list_two {
			width: 215upx;
			font-size: 40upx;
			color: rgba(40, 40, 40, 1);
			margin-left: 30upx;
		}
	}
	.block_btn {
		width: 504upx;
		height: 82upx;
		line-height: 82upx;
		margin-top: 50upx;
		font-size: 30upx;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		background: rgba(63, 138, 240, 1);
		border-radius: 40upx;
	}
}

.active {
	border-radius: 50%;
	background-color: #dd524d;
}
.shareGroup {
	width: 750upx;
	height: 480upx;
	background-image: url(~@/static/update_img.png);
	background-size: 100% 100%;
	margin-top: 150upx;
	margin-left: 30upx;
	color: #007aff;
	position: relative;
	.shareGroup_pro {
		position: absolute;
		top: 330upx;
		left: 10%;
		width: 600upx;
	}
}
</style>
