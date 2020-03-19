<template>
	<view>
		<view class="page_block">
			<view class="page_top">
				<view class="registered_account">
					<input class="" v-model="trueName" maxlength="11" placeholder="真实姓名" placeholder-class="placeholder_style" @blur="checkTrueName" />
				</view>
				<view class="registered_account">
					<input class="" v-model="userName" maxlength="20" placeholder="用户账号" placeholder-class="placeholder_style" @blur="checkName" />
				</view>
				<!-- <view class="registered_account"><input type="text" v-model="alipay" placeholder="账号密码" placeholder-class="placeholder_style" @blur="checkCode" /></view> -->
				<view class="block_btn" @click="commitAlipay">提交</view>
				<view class="block_tips">温馨提示:请正确填写账号和密码,绑定之后不可修改</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			trueName: '',
			userName: '',
			alipay: ''
		};
	},
	methods: {
		checkTrueName() {
			if (this.trueName != '') {
				return true;
			} else {
				uni.showToast({
					title: '请检查真实姓名',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				return false;
			}
		},
		checkName() {
			let userName_reg = /^[A-Za-z0-9]{5,20}$/;
			if (this.userName != '' && userName_reg.test(this.userName)) {
				return true;
			} else {
				uni.showToast({
					title: '请检查用户账号',
					icon: 'none',
					mask: true
				});
				setTimeout(function() {
					uni.hideToast();
				}, 2000);
				return false;
			}
		},
		// checkCode() {
		// 	let alipay_reg = /^[^\u4e00-\u9fa5]+$/g;
		// 	if (this.alipay != '' && alipay_reg.test(this.alipay)) {
		// 		return true;
		// 	} else {
		// 		uni.showToast({
		// 			title: '请检查密码',
		// 			icon: 'none',
		// 			mask: true
		// 		});
		// 		setTimeout(function() {
		// 			uni.hideToast();
		// 		}, 2000);
		// 		return false;
		// 	}
		// },
		commitAlipay() {
			if (this.checkTrueName() && this.checkName()) {
				uni.request({
					url: this.websiteUrl + '/api/otherUser',
					method: 'POST',
					header: {
						Authorization: this.$store.state.userInfo.token
					},
					data: {
						actualName: this.trueName,
						username: this.userName
					},
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							plus.nativeUI.toast('绑定成功!');
							uni.switchTab({
								url: '/pages/tarbar/mine/mine',
								animationType: 'slide-in-right'
							});
						} else {
							plus.nativeUI.toast(res.data.data);
						}
					}
				});
			}
		}
	}
};
</script>

<style lang="less" scoped></style>
