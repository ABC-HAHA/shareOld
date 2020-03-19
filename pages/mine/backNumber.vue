<template>
	<view>
		<view class="page_block">
			<view class="page_top">
				<view class="registered_account">
					<input class="" v-model="name_user" maxlength="11" placeholder="姓名" placeholder-class="placeholder_style"  />
				</view>
				<view class="registered_account">
					<input type="number" v-model="smsCode" placeholder="银行卡号" placeholder-class="placeholder_style" />
				</view>
				<view class="block_btn" @tap="bindNumber">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name_user: '',
			smsCode: ''
		};
	},
	methods: {
	
		bindNumber() {
			var self = this;
			console.log(self.name_user,self.smsCode);
			// if (self.checkPhone() && self.checkCode() && self.hasAgree()) {
				// let phoneStr = new Buffer(self.phoneNum).toString('base64');
				uni.request({
					url: self.websiteUrl + '/api/user/bindingBankCard',
					method: 'POST',
					header: {
						Authorization: this.$store.state.userInfo.token
					},
					data: {
						cardId:self.smsCode ,
						name: self.name_user 
					},
					success: res => {
						console.log(res);
						if (res.statusCode == 200) {
							console.log(res);
							// self.$store.commit('login', res.data.user);
							// console.log(res);
							plus.nativeUI.toast(res.data.msg);
							uni.switchTab({
								url: '/pages/tarbar/mine/mine',
								animationType: 'slide-in-right'
							});
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast(res.data.msg);
							// #endif
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			// } else {
			// 	return false;
			// }
		}
	}
};
</script>

<style lang="less" scoped></style>
