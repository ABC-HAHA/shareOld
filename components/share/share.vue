<template>
	<view class="share_page">
		<view class="bottom_title">分享到</view>
		<view class="bottom_content">
			<view v-for="(item, index) in bottomData" :key="index" :id="index" class="bottom_content_box" @click="toShare">
				<image class="bottom_content_image" :src="item.icon"></image>
				<view class="bottom_content_text">{{ item.text }}</view>
			</view>
		</view>
		<view class="bottom_btn" @click="togglePopup">取消分享</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bottomData: [
				// {
				// 	text: 'QQ',
				// 	icon: '../../../static/sharemenu/qq.png',
				// 	name: 'qq'
				// },
				{
					text: '微信好友',
					icon: '../../../static/sharemenu/wx.png',
					name: 'wx'
				},
				{
					text: '微信朋友圈',
					icon: '../../../static/sharemenu/pyq.png',
					name: 'wx'
				}
				// {
				// 	text: '复制链接',
				// 	icon: '../../../static/sharemenu/copy.png',
				// 	name: 'more'
				// }
			]
		};
	},
	props: ['detailDataList'],
	methods: {
		togglePopup() {
			this.$emit('togglePopupEvent');
		},
		// 去掉br
		strFormat(str) {
			return str.replace(/<br\s*\/?>/gi, '\r\n');
		},
		toShare(e) {
			var self = this;
			var loginstatus = this.$store.state.isLogin;
			console.log(self.detailDataList);
			// shrae  的数据
			var hrefData = self.detailDataList['url'];
			var titleData = self.strFormat(self.detailDataList['esaDescribe1']);
			var summaryData = self.detailDataList['esaDescribe2'];
			var imageUrlData = self.detailDataList['esaPicUrl'];
			
			// if (!loginstatus) {
			// 	uni.navigateTo({
			// 		url: '/pages/login/login',
			// 		animationType: 'slide-in-top'
			// 	});
			// 	return;
			// }
			switch (Number(e.currentTarget.id)) {
				// case 0:
				// 	uni.share({
				// 		provider: "qq",
				// 		type:1,
				// 		href: "http://47.98.171.179:8080/download_page/download.html",
				// 		title: '幻影国际，随时随地抢"鲜"看！',
				// 		summary: "精彩大片抢先看",
				// 		success: function (res) {
				// 			self.$emit('successShareEvent')
				// 			console.log("success:" + JSON.stringify(res));
				// 		},
				// 		fail: function (err) {
				// 			self.$emit('successShareEvent')
				// 			console.log("success:" + JSON.stringify(err));
				// 		}
				// 	});
				// 	break;
				case 0:
					uni.share({
						provider: 'weixin',
						scene: 'WXSceneSession',
						type: 0,
						href: hrefData,
						title: '',
						summary: titleData,
						imageUrl: imageUrlData,
						success: function(res) {
							self.$emit('successShareEvent');
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							self.$emit('successShareEvent');
							console.log('success:' + JSON.stringify(err));
							// self.$emit('failShareEvent')
							// console.log("fail:" + JSON.stringify(err));
						}
					});
					break;
				case 1:
					uni.share({
						provider: 'weixin',
						scene: 'WXSenceTimeline',
						type: 0,
						href: hrefData,
						title: '',
						summary: titleData,
						imageUrl: imageUrlData,
						success: function(res) {
							self.$emit('successShareEvent');
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							self.$emit('successShareEvent');
							console.log('success:' + JSON.stringify(err));
						}
					});
					break;
				// case 2:
				// 	uni.setClipboardData({
				// 		data:'http://www.gcso123.com/zfx/zfx.apk',
				// 		complete() {
				// 			uni.showToast({
				// 				title: "已复制到剪贴板"
				// 			})
				// 		}
				// 	})
				// 	break;
				/* case 4:
					uni.share({
						provider: "sinaweibo",
						type: 0,
						href: "http://47.98.171.179:8080/download_page/download.html",
						title: '幻影国际，随时随地抢"鲜"看！',
						summary: "精彩大片抢先看",
						imageUrl: "../../static/98Code.png",
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
					break; */
			}
		}
	}
};
</script>

<style>
/*
		 分享
		*/
.share_page {
	width: 750upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.bottom_title {
	/*  width:80upx; */
	display: flex;
	font-size: 24upx;
	font-weight: bold;
	color: rgba(130, 130, 130, 1);
	margin: 10upx auto;
	/* padding:10upx; */
}

.bottom_content {
	display: flex;
	flex-wrap: wrap;
	padding: 30upx;
}

.bottom_content_box {
	display: flex;
	flex-direction: column;
	align-items: center;
	/* margin-left: 50upx; */
	padding: 0 30upx;
	/* line-height: 40upx; */
}

.bottom_content_image {
	width: 82upx;
	height: 82upx;
}

.bottom_content_text {
	font-size: 24upx;
	font-weight: bold;
	color: rgba(130, 130, 130, 1);
}
.bottom_btn {
	margin-top: 20upx;
	width: 654px;
	height: 80upx;
	line-height: 80upx;
	background: rgba(36, 138, 223, 1);
	border-radius: 8upx;
	font-size: 30upx;
	color: rgba(255, 255, 255, 1);
}
</style>
