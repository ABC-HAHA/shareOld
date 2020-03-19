<template>
	<div>
		<view class="rank_top">
			<view class="rank_top_title">排行榜</view>
			<image src="../../../static/rank_start.png" mode=""></image>
		</view>
		<view class="rankbox" v-for="(item, index) in rankListData" :key="index">
			<image :src="item.wexinImg" mode=""></image>
			<view class="rank_list">
				<view class="rank_middle">
					<view class="rank_name">{{ item.weixinNickname }}</view>
					<view class="rank_count">推广总数：{{ item.totalPromotions }}</view>
				</view>
				<view class="rank_price">{{ item.withdrawalAmount }}元</view>
			</view>
		</view>
		<Loading :loadingType="loadingType" :showFalg="showFalg"></Loading>
	</div>
</template>

<script>
import Loading from '../../../components/loading/loading.vue';
var self;
export default {
	data() {
		return {
			rankListData: [],
			start: 0, //起始查询序号
			page: 10, //每页查询条数
			showFalg: true,
			loadingType: 0 //0，加载，，1加载中，，，2加载全部
		};
	},
	methods: {
		rankData() {
			(self = this),
			// console.log(self.page)
				uni.request({
					url: this.websiteUrl + '/api/cash/ranking',
					method: 'GET',
					data: {
						start: self.start,
						page: self.page
					},
					success: function(res) {
						if (res.data.data.list.length >= res.data.data.totalCount) {
							self.rankListData = res.data.data.list;
							self.loadingType = 2;
							return;
						}
						self.rankListData = res.data.data.list;
						// console.log(self.rankListData);
						self.page += self.page;
					}
				});
		}
	},
	onLoad: function() {
		this.rankData();
	},
	onReachBottom() {
		// console.log('onReachBottom');
		this.loadingType = 0;
		setTimeout(() => {
			this.rankData();
		}, 300);
	},
	components: { Loading }
};
</script>

<style lang="less" scoped>
.rank_top {
	width: 750upx;
	height: 251upx;
	background: rgba(48, 126, 232, 1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	.rank_top_title {
		font-size: 56upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-left: 124upx;
	}
	image {
		width: 120upx;
		height: 120upx;
		margin-right: 124upx;
	}
}
.rankbox {
	width: 741upx;
	height: 152upx;
	background: rgba(255, 255, 255, 1);
	margin-bottom: 10upx;
	display: flex;
	image {
		width: 84upx;
		height: 84upx;
		margin: 34upx 40upx;
		border-radius: 50%;
	}
	.rank_list {
		width: 100%;
		margin: 40upx 0;
		font-size: 30upx;
		font-family: PingFang SC;
		display: flex;
		justify-content: space-between;
		.rank_middle {
			.rank_name {
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			.rank_count {
				color: #8f8f94;
			}
		}
		.rank_price {
			color: rgba(255, 59, 59, 1);
			font-size: 36upx;
			margin-right: 15upx;
		}
	}
}
</style>
