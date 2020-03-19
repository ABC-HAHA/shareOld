<template>
	<view>
		<view class="registered_account">
			<view class="registered_account_phone">
				<input type="number" v-model="phoneNum" maxlength="11" placeholder="请输入手机号码" placeholder-class="placeholder_style" @blur="checkPhone" />
				<view class="registered_account_send" @tap="sendCode" v-if="!beginFalg">{{ sendCodeText }}</view>
				<view class="registered_account_send" :class="[beginFalg ? ' beginClass' : '']" v-if="beginFalg">{{ timeText }}</view>
			</view>
			<view class="registered_account_code">
				<input type="number" v-model="smsCode" placeholder="请输入短信验证码" placeholder-class="placeholder_style" @blur="checkCode" />
			</view>
			<view class="registered_account_new">
				<input
					type="text"
					:style="{ 'font-size': system == 'IOS' ? '8px;' : '20px' }"
					v-model="password"
					password="true"
					maxlength="15"
					placeholder="请输入新密码(6-15位数字,字母组合)"
					placeholder-class="placeholder_style"
					@blur="checkPwd"
				/>
			</view>
			<!-- <view class="registered_account_text">
                <input type="text" v-model="codeText" maxlength="6" placeholder="请输入邀请码(选填)" placeholder-class="placeholder_style"/>
            </view> -->
			<view class="registered_account_agreement">
				<checkbox value="" :checked="checkFalg" @tap="isAgree" />
				<view class="agreement_content" @tap="toRule">请阅读并同意《赚分享用户使用协议》及《赚分享用户服务协议》</view>
			</view>
			<view class="registered_account_btn" @tap="register">立即注册</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneNum: '',
			smsCode: '',
			password: '',
			phoneFalg: false,
			codeFalg: false,
			pwdFalg: false,
			beginFalg: false,
			sendCodeText: '发送验证码',
			timeText: '',
			num: 60,
			checkFalg: false,
			system: ''
		};
	},
	onShow() {
		// #ifdef APP-PLUS
		this.system = plus.os.name.toUpperCase();
		// #endif
	},
	methods: {
		sendCode() {
			let phone_regExp = /^1[3-9]\d{9}$/;
			if (this.phoneNum == '' || !phone_regExp.test(this.phoneNum)) {
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
			this.codeTime = setInterval(this.countDown, 1000);
			let phoneStr = this.phoneNum;
			uni.request({
				url: this.websiteUrl + '/api/user/code/sms',
				method: 'POST',
				data: {
					mobile: phoneStr
				},
				success: res => {
					console.log(res);
				},
				fail: () => {},
				complete: () => {}
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
		checkCode() {
			if (this.smsCode != '') {
				this.codeFalg = true;
				return true;
			} else {
				this.codeFalg = false;
				uni.showToast({
					title: '验证码不能为空',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				return false;
			}
		},
		checkPwd() {
			let pwd_regExp = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{6,15}$/;
			if (this.password != '' && pwd_regExp.test(this.password)) {
				this.pwdFalg = true;
				return true;
			} else {
				this.pwdFalg = false;
				uni.showToast({
					title: '请输入6-15位的字母数字组合',
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
		hasAgree() {
			if (this.checkFalg) {
				return true;
			} else {
				return false;
			}
		},
		register() {
			if (this.checkPhone() && this.checkCode() && this.checkPwd() && this.hasAgree()) {
				let pwdStr = this.password;
				let phoneStr = this.phoneNum;
				uni.request({
					url: this.websiteUrl + '/api/user/regist',
					method: 'POST',
					data: {
						mobile: phoneStr,
						pw: pwdStr,
						smsCode: this.smsCode
					},
					success: res => {
						if (res && res.data.code === 200) {
							uni.showToast({
								title: '注册成功',
								mask: true
							});
							setTimeout(function() {
								uni.hideToast();
								uni.navigateBack({
									delta: 1,
									animationType: 'slide-in-left'
								});
							}, 1600);
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								mask: true
							});
							setTimeout(function() {
								uni.hideToast();
							}, 2000);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			} else {
				return false;
			}
		}
	}
};
</script>

<style>
.registered_account {
	width: 100%;
	margin-top: 72upx;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.registered_account input {
	width: 100%;
}
.registered_account_phone {
	width: 640upx;
	height: 94upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
}
.registered_account_send {
	width: 50%;
	text-align: right;
	font-size: 28upx;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: #248adf;
}
.registered_account_code {
	width: 640upx;
	height: 94upx;
	margin-top: 30upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	align-items: center;
}
.registered_account_new {
	width: 640upx;
	height: 94upx;
	margin-top: 30upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	align-items: center;
}
.registered_account_text {
	width: 640upx;
	height: 94upx;
	margin-top: 30upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	align-items: center;
}
.registered_account_agreement {
	width: 640upx;
	margin-top: 50upx;
	display: inline-flex;
	align-items: baseline;
}
.registered_account_agreement > checkbox {
	transform: scale(0.6);
}
.registered_account_agreement > .agreement_content {
	font-size: 24upx;
	font-family: PingFang-SC-Regular;
	font-weight: bold;
	color: #bfbfbf;
	line-height: 40upx;
}
.registered_account_btn {
	width: 640upx;
	height: 80upx;
	line-height: 80upx;
	margin-top: 118upx;
	text-align: center;
	color: #ffffff;
	font-weight: 500;
	font-family: PingFangSC-Regular;
	background: #248adf;
	border-radius: 8upx;
	font-size: 30upx;
	opacity: 1;
}
/* .registered_account_btn.btn_select{
        opacity: 1;
    } */
.placeholder_style {
	font-size: 28upx;
	font-weight: 400;
	color: #888888;
}
.registered_account_send.beginClass {
	color: #888888;
}
</style>
