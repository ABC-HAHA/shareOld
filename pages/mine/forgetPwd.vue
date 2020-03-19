<template>
	<view>
		<view class="forget_password">
			<view class="forget_password_phone">
				<input type="number" v-model="phoneNum" maxlength="11" placeholder="请输入手机号码" placeholder-class="placeholder_style" @blur="checkPhone" />
				<view class="forget_password_send" @tap="sendCode" v-if="!beginFalg">{{ sendCodeText }}</view>
				<view class="forget_password_send" :class="[beginFalg ? ' beginClass' : '']" v-if="beginFalg">{{ timeText }}</view>
			</view>
			<view class="forget_password_code">
				<input type="number" v-model="smsCode" placeholder="请输入短信验证码" placeholder-class="placeholder_style" @blur="checkCode" />
			</view>
			<view class="forget_password_new">
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
			<view class="forget_password_confirm">
				<input
					type="text"
					:style="{ 'font-size': system == 'IOS' ? '8px;' : '20px' }"
					v-model="confirmPwd"
					password="true"
					maxlength="15"
					placeholder="请确认新密码"
					placeholder-class="placeholder_style"
					@blur="checkPwdSame"
				/>
			</view>
			<view class="forget_password_btn" @tap="confirm">确认</view>
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
			confirmPwd: '',
			phoneFalg: false,
			codeFalg: false,
			pwdFalg: false,
			beginFalg: false,
			isSame: false,
			sendCodeText: '发送验证码',
			timeText: '',
			num: 60,
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
			if (this.num <= 0) {
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
		checkPwdSame() {
			if (this.confirmPwd != '' && this.password === this.confirmPwd) {
				this.isSame = true;
				return true;
			} else {
				this.isSame = false;
				uni.showToast({
					title: '两次密码必须相同',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				return false;
			}
		},
		confirm() {
			if (this.checkPhone() && this.checkPwd() && this.checkPwdSame() && this.checkCode()) {
				let pwdStr = this.password;
				let phoneStr = this.phoneNum;
				uni.request({
					url: this.websiteUrl + '/api/user/updateUserPw',
					method: 'POST',
					data: {
						mobile: phoneStr,
						pw: pwdStr,
						smsCode: this.smsCode
					},
					success: res => {
						if (res.data && res.data.code === 200) {
							uni.showToast({
								title: '修改成功',
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
					fail: err => {},
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
.forget_password {
	width: 100%;
	margin-top: 72upx;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.rforget_password input {
	width: 100%;
}
.forget_password_phone {
	width: 640upx;
	height: 94upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
}
.forget_password_send {
	width: 50%;
	text-align: right;
	font-size: 28upx;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: #248adf;
}
.forget_password_code {
	width: 640upx;
	height: 94upx;
	margin-top: 30upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	align-items: center;
}
.forget_password_new {
	width: 640upx;
	height: 94upx;
	margin-top: 30upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	align-items: center;
}
.forget_password_new > input {
	width: 100%;
}
.forget_password_confirm {
	width: 640upx;
	height: 94upx;
	margin-top: 30upx;
	border-bottom: 1upx solid #bfbfbf;
	display: inline-flex;
	align-items: center;
}
.forget_password_btn {
	width: 640upx;
	height: 80upx;
	line-height: 80upx;
	margin-top: 108upx;
	text-align: center;
	color: #ffffff;
	font-weight: 500;
	font-family: PingFangSC-Regular;
	background: #248adf;
	border-radius: 8upx;
	font-size: 30upx;
	opacity: 1;
}
/* .forget_password_btn.btn_select{
        opacity: 1;
    } */
.placeholder_style {
	font-size: 28upx;
	font-weight: 400;
	color: #888888;
}
.forget_password_send.beginClass {
	color: #888888;
}
</style>
