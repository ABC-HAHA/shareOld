<template>
	<view class="a_mask" v-show="maskValue" @tap="closeMask">
		<view class="a_box">
			<view class="a_head">{{ title }}</view>
			<view class="otherLogin">
				<view class="weiixnLogin" @click="weixinlogin">
					<image src="../../../static/weixin.png" mode=""></image>
					<view class="">微信快捷登录</view>
				</view>
				<view class="iphoneLogin" @click="iphonelogin">
					<image src="../../../static/iphone.png" mode=""></image>
					<view class="">手机号登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '网赚登录'
		}
	},
	data() {
		return {
			maskValue: true,
			inviteCode: ''
		};
	},
	onLoad() {
		uni.getStorage({
			key: 'openinstallInfo',
			success: res => {
				console.log('ok');
				this.inviteCode = JSON.parse(JSON.parse(res.data).bindData).inviteCode;
			}
		});
	},
	methods: {
		closeMask() {
			this.$emit('closeEvent');
			// this.maskValue = false;
		},
		weixinlogin() {
			var self = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					// console.log(loginRes.authResult);
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							// console.log('用户昵称为：' + infoRes.userInfo.avatarUrl);
							self.toWeixinLogin(loginRes, infoRes);
						}
					});
				}
			});
		},
		toWeixinLogin(loginRes, infoRes) {
			var self = this;
			var sendData = {
				openid: loginRes.authResult.openid,
				nickname: infoRes.userInfo.nickName,
				headimgurl: infoRes.userInfo.avatarUrl,
				accessToken: loginRes.authResult.access_token,
				refreshToken: loginRes.authResult.refresh_token,
				inviteCode: self.inviteCode
			};
			// console.log(sendData);
			uni.request({
				url: this.websiteUrl + '/api/user/weixin',
				method: 'POST',
				data: sendData,
				success: res => {
					// console.log(res);
					if (res.data.code == 200) {
						// console.log(66666666666666);
						// console.log(sendData);
						// console.log(res);
						// console.log(res.data.user);
						self.$store.commit('login', res.data.user);
						// self.$store.commit('wixinlogin',sendData);
						// console.log(555555555555555);
						// console.log(self.$store.userInfo);
						//    console.log(self.$store.weixinUserInfo);
						uni.switchTab({
							url: '/pages/tarbar/mine/mine',
							animationType: 'slide-in-right'
						});
					} else {
						plus.nativeUI.toast(res.data.msg);
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		iphonelogin() {
			uni.navigateTo({
				url: '/pages/mine/login',
				animationType: 'slide-in-right'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.a_mask {
	position: fixed;
	z-index: 99999;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	.a_box {
		width: 500upx;
		overflow: hidden;
		background-color: #fff;
		border-radius: 10upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.a_head {
			text-align: left;
			font-size: 30upx;
			line-height: 88upx;
			margin-left: 30upx;
		}
		.otherLogin {
			margin: 0 auto;
			padding: 30upx 80upx;
			display: flex;
			justify-content: space-between;
			view {
				text-align: center;
				image {
					width: 95upx;
					height: 95upx;
					background: #fff;
					border-radius: 95upx;
				}
			}
		}
	}
}
</style>
