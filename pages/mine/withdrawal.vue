<template>
	<view class="tixian_page">
		<view class="tixian_text">选择提现金额</view>
		<view class="tixian_list">
			<view
				class="tixian_item"
				v-for="(tab, index) in withDrawal"
				:key="index"
				:data-current="index"
				@tap="selectMoney"
				:class="tabIndex == index ? 'tixian_item_active' : ''"
			>
				{{ tab }}元
			</view>
		</view>
		<view class="tixian_but" @tap="withdrawal">提现</view>
		<view class="tixian_text">可用余额{{ balance }}元</view>
		<view class="tixian_dec">
			<view class="tixian_text_big">温馨提示</view>
			<view class="tixian_text_little">
				1. 提现需人工审核，1_3个工作日内审核到账
				<br />
				2. 如审核发现作弊行为，本平台有权利直接扣除提现金钱， 并封禁账号
				<br />
				3. 提现失败时，将全额返还，请检查支付宝是否实名认证
				<br />
				4. 提现需代扣10%的手续费，提现详情可在支付宝中查询
				<br />
				5. 用户首次提现可提50元，之后每次100元起
				<br />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			withDrawal: [50, 100, 200],
			tabIndex: 0,
			balance: 0
		};
	},
	onShow() {
		this.initData();
	},
	onLoad: function(option) {
		this.balance = option.balance;
	},
	methods: {
		initData() {
			var self = this;
			uni.request({
				url: self.websiteUrl + '/api/cash/cashSort',
				method: 'GET',
				header: {
					Authorization: self.$store.state.userInfo.token
				},
				success: res => {
					// console.log(res.data.data);
					self.withDrawal = res.data.data;
					console.log(self.withDrawal);
				},
				fail: () => {
					console.log(Error);
				}
			});
		},
		async selectMoney(e) {
			//点击tab-bar
			console.log(e.target);
			let tabIndex = e.target.dataset.current;
			if (this.tabIndex === tabIndex) {
				return false;
			} else {
				this.tabIndex = tabIndex;
			}
			console.log(this.tabIndex);
		},

		withdrawal() {
			var self = this;
			if (self.withDrawal[self.tabIndex] > self.balance) {
				plus.nativeUI.toast('余额不足');
			} else {
				uni.request({
					url: self.websiteUrl + '/api/cash/getcash',
					method: 'POST',
					header: {
						Authorization: self.$store.state.userInfo.token
					},
					data: { money: self.withDrawal[self.tabIndex] },
					success: res => {
						console.log(res);
						// self.auditList = res.data.data;
						// if(self.auditList.length > 0){
						//  self.historyAuditStatus = true;
						// }else{
						//   self.historyAuditStatus = false;
						// }
						plus.nativeUI.alert(res.data.msg);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.tixian_page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.tixian_text {
		margin-top: 40upx;
		width: 650upx;
		// margin-left:40upx;
		font-size: 36upx;
		color: rgba(51, 51, 51, 1);
	}
	.tixian_list {
		width: 750upx;
		margin-top: 50upx;
		.tixian_item {
			text-align: center;
			width: 208upx;
			height: 160upx;
			line-height: 160upx;
			display: inline-block;
			margin-left: 27upx;
			background: rgba(255, 255, 255, 0.1);
			box-shadow: 0upx 0upx 20upx 0upx rgba(63, 138, 240, 0.2);
			border-radius: 20upx;
			border-radius: 20px;
			font-size: 42upx;
			font-weight: 800;
			color: rgba(34, 34, 34, 1);
		}
		.tixian_item_active {
			background: rgba(63, 138, 240, 0.1);
			border: 4px solid rgba(63, 138, 240, 1);
		}
	}
	.tixian_but {
		width: 660upx;
		height: 80upx;
		line-height: 80upx;
		background: rgba(63, 138, 240, 1);
		border-radius: 40upx;
		font-size: 36upx;
		text-align: center;
		color: rgba(255, 255, 255, 1);
		margin-top: 60upx;
	}
	.tixian_dec {
		width: 750upx;
		height: 670upx;
		margin-top: 30upx;
		background: rgba(255, 255, 255, 0.8);

		// text-align: center;
		.tixian_text_big {
			width: 690upx;
			// margin-top:40upx;
			font-size: 36upx;
			padding: 30upx;
			color: rgba(51, 51, 51, 1);
		}
		.tixian_text_little {
			// width:upx;
			font-size: 26upx;
			line-height: 50upx;
			padding: 0upx 40upx;
			color: rgba(102, 102, 102, 1);
		}
	}
}
</style>
