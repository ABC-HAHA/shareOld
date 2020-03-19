<template>
	<view class="invite_page">
		<image class="invite_one" src="../../static/invite_head.png"></image>
		<view class="share_container">
			<text class="bottom_title">邀请关系</text>
			<view class="bottom_content">
				<view v-for="(item, index) in bottomData" :key="index" :id="index" class="bottom_content_box" @click="toShare">
					<image class="bottom_content_image" :src="item.icon"></image>
					<view class="bottom_content_text">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<image class="invite_two" src="../../static/invite_one.png"></image>
		<image class="invite_three" src="../../static/invite_two.png"></image>
		<image class="invite_four" src="../../static/invite_three.png"></image>
		<image class="invite_five" src="../../static/invite_four.png"></image>
		<image class="invite_six" src="../../static/invite_five.png"></image>
		<!-- 邀请好友按钮 -->
		<!-- <view class="invite_butt"><image src="../../static/invite_butt.png" @tap="displayPopup"></image></view> -->

		<uni-popup :show="type === 'bottom_share'" position="middle" :shareStatus="true" @hidePopup="hidePopup">
			<view class="shareGroup">
				<!-- 遮罩 -->
				<image :src="baseUrl + '/api/activity/getCode?url=http://118.31.120.214/zfx/download?inviteCode=' + inviteCode" mode="widthFix" @tap="hidePopup"></image>
				<!-- <share-page class="share_popup" @failShareEvent="failShare" @successShareEvent="successShare" @togglePopupEvent="hidePopup"></share-page> -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/pages/mine/uni-popup.vue';
import sharePage from '@/pages/mine/share.vue';
export default {
	components: {
		uniPopup,
		sharePage
	},
	data() {
		return {
			baseUrl: this.websiteUrl,
			inviteCode: this.$store.state.userInfo.inviteCode,
			phoneNum: '',
			type: '',
			bottomData: [
				// {
				// 	text: 'QQ',
				// 	icon: '../../static/sharemenu/qq.png',
				// 	name: 'qq'
				// },
				{
					text: '微信好友',
					icon: '../../static/sharemenu/wx.png',
					name: 'wx'
				},
				{
					text: '微信朋友圈',
					icon: '../../static/sharemenu/pyq.png',
					name: 'wx'
				},
				{
					text: '二维码',
					icon: '../../static/sharemenu/ewm.png',
					name: 'wx'
				},
				{
					text: '复制链接',
					icon: '../../static/sharemenu/copy.png',
					name: 'more'
				}
			]
		};
	},
	methods: {
		hidePopup() {
			this.type = '';
		},
		displayPopup() {
			this.type = 'bottom_share';
		},
		successShare() {
			uni.showToast({
				title: '分享成功！！！',
				mask: true
			});
		},
		failShare() {
			uni.showToast({
				title: '分享失败！！！',
				mask: true
			});
		},
		toShare(e) {
			var self = this;
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
				// 'http://118.31.120.214/zfxDL/download?inviteCode=' + this.invit_code,
				case 0:
					uni.share({
						provider: 'weixin',
						scene: 'WXSceneSession',
						type: 2,
						imageUrl: self.baseUrl + '/api/activity/getCode?url=http://118.31.120.214/zfx/download?inviteCode=' + self.inviteCode,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('success:' + JSON.stringify(err));
						}
					});
					break;
				case 1:
					uni.share({
						provider: 'weixin',
						scene: 'WXSenceTimeline',
						type: 2,
						imageUrl: self.baseUrl + '/api/activity/getCode?url=http://118.31.120.214/zfx/download?inviteCode=' + self.inviteCode,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('success:' + JSON.stringify(err));
						}
					});
					break;
				case 2:
					self.displayPopup();
					break;
				case 3:
					uni.setClipboardData({
						data: 'http://118.31.120.214/zfx/download?inviteCode=' + self.inviteCode,
						complete() {
							uni.showToast({
								title: '已复制到剪贴板'
							});
						}
					});
					break;
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

<style lang="less" scoped>
.invite_page {
	background: rgba(235, 221, 248, 1);
	font-size: 0;
	text-align: center;
	.invite_one {
		width: 750upx;
		height: 629upx;
		margin-left: -1upx;
	}
	.share_container {
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url(~@/static/invite_bg.png);
		background-size: 100%;
		.bottom_title {
			font-size: 34upx;
			font-weight: bold;
			color: rgba(130, 130, 130, 1);
			margin: 10upx auto;
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
	}
	.invite_two {
		width: 750upx;
		height: 456upx;
	}
	.invite_three {
		width: 750upx;
		height: 140upx;
	}
	.invite_four {
		width: 750upx;
		height: 628upx;
	}
	.invite_five {
		width: 750upx;
		height: 629upx;
	}
	.invite_six {
		width: 750upx;
		height: 180upx;
		padding-bottom: 160upx;
	}
	.invite_butt {
		position: fixed;
		width: 750upx;
		text-align: center;
		// top:0upx;
		> image {
			width: 649upx;
			height: 110upx;
		}

		// padding: 50upx;
		bottom: 0upx;
	}
	.shareGroup {
		margin-top: 250upx;
	}
}
</style>
