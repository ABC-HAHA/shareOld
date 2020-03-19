<template>
	<view>
		<view class="page_block">
			<view class="page_top">
				<view class="registered_account">
					<input class="" type="number" v-model="phoneNum" maxlength="11" placeholder="手机号" placeholder-class="placeholder_style" @blur="checkPhone" />
				</view>
				<view class="registered_account">
					<view class="registered_account_send" @click="sendCode" v-if="!beginFalg">{{ sendCodeText }}</view>
					<view class="registered_account_send" :class="[beginFalg ? ' beginClass' : '']" v-if="beginFalg">{{ timeText }}</view>
					<input type="number" v-model="smsCode" placeholder="验证码" placeholder-class="placeholder_style" @blur="checkCode" />
				</view>
				<view class="registered_account_agreement">
					<checkbox value="" :checked="checkFalg" @tap="isAgree" />
					<view class="agreement_content">《服务条款和隐私政策》</view>
				</view>
				<view class="block_btn" @tap="bindNumber">提交</view>
			</view>
			<form-alert v-if="!loginStatus"></form-alert>
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
			}
		};
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
		sendCode() {
			console.log(111111111111);
			if (this.checkPhone()) {
				this.codeTime = setInterval(this.countDown, 1000);
				uni.request({
					url: this.websiteUrl + '/api/user/code/sms',
					method: 'POST',
					data: {
						mobile: this.phoneNum
					},
					success: res => {
						// #ifdef APP-PLUS
						plus.nativeUI.toast('短信发送成功!');
						// #endif
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		bindNumber() {
			var self = this;
			if (self.checkPhone() && self.checkCode() && self.hasAgree()) {
				let phoneStr = new Buffer(self.phoneNum).toString('base64');
				uni.request({
					url: self.websiteUrl + '/api/user/bindingMobile',
					method: 'POST',
					header: {
						Authorization: this.$store.state.userInfo.token
					},
					data: {
						mobile: self.phoneNum,
						smsCode: self.smsCode
					},
					success: res => {
						if (res.statusCode == 200) {
							self.$store.commit('login', res.data.user);
							console.log(res);
							uni.switchTab({
								url: '/pages/tarbar/mine/mine',
								animationType: 'slide-in-right'
							});
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast('请更换手机号，重新绑定！');
							// #endif
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

<style lang="less" scoped></style>
