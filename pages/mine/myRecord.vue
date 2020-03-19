<template>
	<view class="recordPage">
		<view class="tabbar">
			<view
				v-for="(tab, index) in tabBars"
				:key="index"
				:data-current="index"
				@tap="tapTab"
				:class="[tabIndex == index ? 'tabbar_block_active' : 'tabbar_block', tabIndex == 1 ? 'right_tab' : 'left_tab']"
			>
				{{ tab }}
			</view>
		</view>

		<view class="list_block">
			<view class="list_title">
				<text>收入日期</text>
				<text>收入金额(元)</text>
				<text>状态</text>
				<text>备注</text>
			</view>
			<view v-if="dataStatus" class="list_item" v-for="(tab, index) in resultData.list" :key="index">
				<text>{{ tab.incomeDate }}</text>
				<text>{{ tab.money }}</text>
				<text>{{ tab.startStr }}</text>
				<text>{{ tab.remark }}</text>
			</view>
		</view>
		<no-data v-if="!dataStatus"></no-data>
	</view>
</template>

<script>
import noData from '@/pages/mine/nodata.vue';
export default {
	components: {
		noData
	},
	data() {
		return {
			tabBars: ['提现记录', '收入记录'],
			tabIndex: 0,
			start: 1,
			resultData: {},
			totalPage: 1,
			dataStatus: false
		};
	},
	onShow() {
		this.myWidthDrawalRecord();
	},
	methods: {
		async tapTab(e) {
			//点击tab-bar
			console.log(e.target);
			let tabIndex = e.target.dataset.current;
			if (this.tabIndex === tabIndex) {
				return false;
			} else {
				this.tabIndex = tabIndex;
			}
			this.start = 1;
			console.log(this.tabIndex);
			if (tabIndex === 0) {
				this.myWidthDrawalRecord();
			} else {
				this.myInRecord();
			}
		},
		//我的提现记录
		myWidthDrawalRecord() {
			var self = this;
			
			if (this.start <= this.totalPage) {
				uni.request({
					url: self.websiteUrl + '/api/cash/moneyRecord',
					header: {
						Authorization: self.$store.state.userInfo.token
					},
					data: { start: this.start, page: 10 },
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							this.resultData = res.data.data;
							if (this.resultData.list && this.resultData.list.length > 0) {
								this.dataStatus = true;
							}else{
								this.dataStatus = false;
							}

							console.log(this.resultData);
						} else {
							plus.nativeUI.toast('res.data.msg');
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		// 我的收入记录
		myInRecord() {
			var self = this;
			uni.request({
				url: self.websiteUrl + '/api/cash/incomeHistory',
				header: {
					Authorization: self.$store.state.userInfo.token
				},
				data: { start: this.start, page: 10 },
				success: res => {
					console.log(res);
					if (res.data.code == 200) {
						this.resultData = res.data.data;
						console.log(this.resultData.list);
						if (this.resultData.list && this.resultData.list.length > 0) {
							this.dataStatus = true;
						}else{
								this.dataStatus = false;
							}
					} else {
						plus.nativeUI.toast('res.data.msg');
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
.recordPage {
	width: 750upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.tabbar {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		height: 230upx;
		line-height: 230upx;
		text-align: center;
		.tabbar_block {
			margin-top: 50upx;
			width: 200upx;
			height: 68upx;
			line-height: 68upx;
			text-align: center;
			display: inline-block;
			background: rgba(255, 255, 255, 1);
			border: 2px solid rgba(63, 138, 240, 1);
			// border-radius:10upx 10upx 10upx 10upx;
			font-size: 30upx;
			color: rgba(63, 138, 240, 1);
		}
		.tabbar_block_active {
			margin-top: 50upx;
			width: 200upx;
			height: 76upx;
			line-height: 76upx;
			text-align: center;
			display: inline-block;
			background: rgba(63, 138, 240, 1);
			// border-radius:10upx 10upx 10upx 10upx;
			font-size: 30upx;
			color: rgba(255, 255, 255, 1);
		}
		.left_tab {
			// border-radius:10upx 0upx 0upx 10upx;
		}
		.right_tab {
			// border-radius:0upx 10upx 10upx 0upx;
		}
	}

	.list_block {
		.list_title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 10upx 50upx;
			height: 60upx;
			line-height: 60upx;
			> text {
				font-size: 24upx;
				color: rgba(51, 51, 51, 1);
			}
		}
		.list_item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 10upx 50upx;
			height: 60upx;
			line-height: 50upx;
			background: rgba(255, 255, 255, 1);
			> text {
				font-size: 24upx;
				color: rgba(51, 51, 51, 1);
			}
		}
	}
}
</style>
