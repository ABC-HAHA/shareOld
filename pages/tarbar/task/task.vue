<template>
	<div>
		<navigator class="taskbox" url="../../help/help">
			<image src="../../../static/bangzhu.png" mode=""></image>
			<view class="task_list">
				<view class="task_title">帮助中心</view>
				<view class="task_content">为您提供各种任务教程,不懂点这里</view>
			</view>
		</navigator>
		<navigator class="taskbox" url="../../tuwenPromoting/tuwenPromoting">
			<image src="../../../static/tuwen.png" mode=""></image>
			<view class="task_list">
				<view class="task_title">图文推广</view>
				<view class="task_content">分享图文信息到朋友圈，赚取佣金</view>
			</view>
		</navigator>
		<navigator class="taskbox" url="../../lianjiePromoting/lianjiePromoting">
			<image src="../../../static/lianjie.png" mode=""></image>
			<view class="task_list">
				<view class="task_title">链接推广</view>
				<view class="task_content">分享链接信息到朋友圈，赚取佣金</view>
			</view>
		</navigator>
		<navigator class="taskbox" url="../../shipinPromoting/shipinPromoting">
			<image src="../../../static/shipin.png" mode=""></image>
			<view class="task_list">
				<view class="task_title">视频推广</view>
				<view class="task_content">分享图文信息到朋友圈，赚取佣金</view>
			</view>
		</navigator>
		<navigator class="taskbox" url="/pages/help/getMoney/getMoney">
			<image src="../../../static/yongjin.png" mode=""></image>
			<view class="task_list">
				<view class="task_title">领取佣金</view>
				<view class="task_content">点击此处进入，注册账号，领取佣金</view>
			</view>
		</navigator>
		<uni-popup :show="type === 'update_show'" position="middle" :shareStatus="true">
			<view class="shareGroup">
				<!-- 遮罩 -->
				<!-- {{ pro }} -->
				<view class="shareGroup_pro"><cmd-progress :percent="pro" :stroke-width="24" stroke-color="linear-gradient(to right, #ef32d9, #89fffd)"></cmd-progress></view>
			</view>
		</uni-popup>
	</div>
</template>

<script>
import cmdProgress from '@/components/cmd-progress/cmd-progress.vue';
import uniPopup from '@/pages/mine/uni-popup.vue';
export default {
	data() {
		return {
			progress: 0,
			type: ''
		};
	},
	components: {
		uniPopup,
		cmdProgress
	},
	computed: {
		pro: function() {
			return this.progress;
		}
	},
	onLoad() {
		this.update();
	},
	methods: {
		update() {
			//#ifdef APP-PLUS
			let that = this;
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
						console.log(res);
						let data = res.data;
						if (data.data) {
							var currentVersion = data.data.versionName;
						}
						// plus.storage.setItem("app-id", res.data.data.versionName.toString());
						let currentTime = new Date();
						currentTime = currentTime.getTime();
						if (data.data != null) {
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
	}
};
</script>

<style lang="less" scoped>
.taskbox {
	margin: 25upx;
	background: #ffffff;
	display: flex;
	image {
		width: 120upx;
		height: 120upx;
		margin: 35upx 40upx;
	}
	.task_list {
		margin: 58upx 0upx 20upx;
		.task_title {
			font-size: 30upx;
			color: #25a39c;
		}
		.task_content {
			font-size: 24upx;
		}
	}
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
