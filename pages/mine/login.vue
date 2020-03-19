<template>
	<view>
		<view class="page_block">
			<view class="top"><image src="../../static/152x152.png" mode=""></image></view>
			<view class="page_top">
				<view class="registered_account">
					<input class="" type="number" v-model="phoneNum" maxlength="11" placeholder="手机号" placeholder-class="placeholder_style" @blur="checkPhone" />
				</view>
				<!-- <view class="registered_account">
					<view class="registered_account_send" @click="sendCode" v-if="!beginFalg">{{ sendCodeText }}</view>
					<view class="registered_account_send" :class="[beginFalg ? ' beginClass' : '']" v-if="beginFalg">{{ timeText }}</view>
					<input type="number" v-model="smsCode" placeholder="验证码" placeholder-class="placeholder_style" @blur="checkCode" />
				</view> -->
				<view class="registered_account">
					<input
						:style="{ 'font-size': system == 'IOS' ? '8px;' : '19x' }"
						:class="[isShowPwd ? '' : 'inputPwd']"
						type="text"
						placeholder="请输入密码"
						maxlength="15"
						placeholder-class="placeholder_style"
						:password="isShowPwd"
						v-model="password"
						@blur="checkPwd"
					/>
					<view class="showHidePwd" @tap="showPass">
						<image class="hidePwd" src="/static/hide_pwd.png" mode="" v-if="isShowPwd"></image>
						<image class="showPwd" src="/static/show_pwd.png" mode="" v-if="!isShowPwd"></image>
					</view>
				</view>
				<view class="registered_account_agreement">
					<checkbox value="" :checked="checkFalg" @tap="isAgree" />
					<view class="agreement_content" @tap="toRule">《服务条款和隐私政策》</view>
				</view>
				<view class="block_btn" @tap="login">登录</view>
				<view class="login_onther">
					<view class="navigat">
						<navigator url="/pages/mine/register" animation-type="slide-in-right" hover-class="none"><view class="register">注册</view></navigator>
						<view class="line">|</view>
						<navigator url="/pages/mine/forgetPwd" animation-type="slide-in-right" hover-class="none"><view class="forget_pwd">忘记密码？</view></navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom_title">———————其他登录方式———————</view>
			<view class="pic"><image src="/static/sharemenu/wx.png" mode="widthFix" @click="weixinlogin"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneNum: '',
			smsCode: '',
			phoneFalg: false,
			codeFalg: false,
			pwdFalg: false,
			beginFalg: false,
			sendCodeText: '发送验证码',
			timeText: '',
			num: 60,
			checkFalg: false,
			system: '',
			remPwd: {
				checked: false
			},
			inviteCode: '',
			isShowPwd: true,
			password: ''
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
		checkPhone() {
			let phone_regExp = /^1[3-9]\d{9}$/;
			if (this.phoneNum != '' && phone_regExp.test(this.phoneNum)) {
				this.phoneFalg = true;
				return true;
			} else {
				this.phoneFalg = false;
				uni.showToast({
					title: '请检查手机号',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				return false;
			}
		},
		isAgree() {
			if (this.checkFalg) {
				this.checkFalg = false;
				uni.showToast({
					title: '请阅读相关协议并同意',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				return false;
			} else {
				this.checkFalg = true;
				return true;
			}
		},
		toRule() {
			// 协议和规则
			uni.navigateTo({
				url: '/pages/mine/rule',
				animationType: 'zoom-fade-out',
				animationDuration: 500
			});
		},
		countDown() {
			this.num--;
			this.beginFalg = true;
			this.timeText = this.num + 's';
			if (this.num < 0) {
				this.num = 60;
				this.timeText = '';
				this.beginFalg = false;
				clearInterval(this.codeTime);
			}
		},

		hasAgree() {
			if (this.checkFalg) {
				return true;
			} else {
				uni.showToast({
					title: '请阅读相关协议并同意',
					icon: 'none',
					mask: true
				});
				return false;
			}
		},

		showPass() {
			if (this.isShowPwd) {
				this.isShowPwd = false;
				return false;
			} else {
				this.isShowPwd = true;
				return true;
			}
		},
		checkPwd() {
			let pwd_regExp = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{6,15}$/;
			if (this.password != '' && pwd_regExp.test(this.password)) {
				this.pwdFalg = true;
				return true;
			} else {
				uni.showToast({
					title: '请输入6-15位的字母数字组合',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				this.pwdFalg = false;
				return false;
			}
		},
		login() {
			var self = this;
			if (self.checkPhone() && self.checkPwd() && self.hasAgree()) {
				let phoneStr = new Buffer(self.phoneNum).toString('base64');
				uni.request({
					url: self.websiteUrl + '/api/user/loginpw',
					method: 'POST',
					data: {
						mobile: self.phoneNum,
						pw: self.password,
						inviteCode: self.inviteCode
					},
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							self.$store.commit('login', res.data.user);
							// console.log(res.data.user);
							var usertoken = res.data.user.token;
							if (res.data.user && !res.data.user.wexinOpenId) {
								plus.nativeUI.confirm(
									'还差一步就完成登录?',
									function(e) {
										// console.log("Close confirm: "+e.index);
										if (e.index == 0) {
											uni.login({
												provider: 'weixin',
												success: function(loginRes) {
													// console.log(loginRes);
													// console.log(loginRes.authResult);
													// 获取用户信息
													uni.getUserInfo({
														provider: 'weixin',
														success: function(infoRes) {
															// console.log(infoRes);
															// console.log('用户昵称为：' + infoRes.userInfo.nickName);
															self.weixinLogin(loginRes, infoRes, usertoken);
														}
													});
												}
											});
										} else {
											uni.switchTab({
												url: '/pages/tarbar/mine/mine',
												animationType: 'slide-in-right'
											});
										}
									},
									{ title: '提示', buttons: ['微信登录'], verticalAlign: 'center' }
								);
							} else {
								uni.switchTab({
									url: '/pages/tarbar/mine/mine',
									animationType: 'slide-in-right'
								});
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								mask: true
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: res.data.msg,
							mask: true
						});
					},
					complete: () => {}
				});
			} else {
				return false;
			}
		},
		weixinLogin(loginRes, infoRes, usertoken) {
			var self = this;
			var sendData = {
				openid: loginRes.authResult.openid,
				nickname: infoRes.userInfo.nickName,
				headimgurl: infoRes.userInfo.avatarUrl,
				accessToken: loginRes.authResult.access_token,
				refreshToken: loginRes.authResult.refresh_token,
				inviteCode: self.inviteCode
			};
			console.log(sendData);
			uni.request({
				url: this.websiteUrl + '/api/user/bindingWeiXin',
				method: 'POST',
				header: {
					Authorization: usertoken
				},
				data: sendData,
				success: res => {
					if (res.data.code == 200) {
						// self.$store.commit('wixinlogin', sendData);
						self.$store.commit('login', res.data.user);
						// console.log(res);
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
						// console.log(self.$store.userInfo);
						// console.log(555555555555555);
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
		}
	}
};
</script>

<style lang="less" scoped>
page {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.top {
	display: flex;
	justify-content: center;
	margin-top: 100upx;
	image {
		width: 139upx;
		height: 139upx;
	}
}
.bottom {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	position: absolute;
	bottom: 80upx;
	// margin-top: 300upx;
	.bottom_title {
		width: 750upx;
		height: 36upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(156, 156, 156, 1);
		line-height: 36upx;
		display: flex;
		justify-content: center;
	}
	.pic {
		margin-top: 20upx;
		image {
			width: 80upx;
			height: 80upx;
		}
	}
}

.login_onther {
	width: 580upx;
	height: 30upx;
	margin-top: 48upx;
	line-height: 30upx;
	font-size: 28upx;
	font-family: PingFang-SC-Medium;
	font-weight: 500;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
}
.navigat {
	display: inline-flex;
	justify-content: flex-end;
	align-items: center;
	margin-left: 30upx;
}
.register {
	color: #007aff;
}
.forget_pwd {
	color: #666666;
}

.inputPwd {
	font-size: 19px !important;
}
.showHidePwd {
	height: 100%;
	padding: 0 30rpx;
	display: inline-flex;
	justify-content: flex-end;
	align-items: center;
}
.hidePwd {
	width: 26upx;
	height: 12upx;
}
.showPwd {
	width: 31rpx;
	height: 23rpx;
}
</style>
