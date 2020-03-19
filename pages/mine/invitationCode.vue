<template>
	<view>
		<view class="page_block">
			<view class="page_top">
				<view class="code_dec">输入邀请码,绑定关系!</view>
				<view class="registered_account">
					<input class="input_block" type="text" v-model="smsCode" maxlength="11" placeholder="输入邀请码" placeholder-class="placeholder_style" @blur="checkCode" />
				</view>
				<view class="block_btn" @tap="bingCode">提交邀请码</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			smsCode: '',
			codeFalg: false
		};
	},
	methods: {
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
		bingCode() {
			uni.request({
				url: this.websiteUrl + '/api/user/bingCode',
				method: 'POST',
				header: {
					Authorization: this.$store.state.userInfo.token
				},
				data: {
					code: this.smsCode
				},
				success: res => {
					console.log(res);
					plus.nativeUI.toast(res.data.msg)
					uni.switchTab({
						url: '/pages/tarbar/mine/mine',
						animationType: 'slide-in-left',
						animationDuration: 300
					});
					
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.code_dec {
	font-size: 28upx;
	color: rgba(58, 58, 58, 1);
}
.input_block {
	margin-left: 200upx;
}
</style>
