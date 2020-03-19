<template>
	<div class="box">
		<view class="tuwenbox" v-for="(item, index) in shareList" :key="index" @tap="toDetail(item.esaId)">
			<image :src="item.esaPicUrl" mode=""></image>
			<view class="tuwen_title">
				<!-- <view class="task_group">{{taskTitle[item.taskLevel]}}</view> -->
				<view class="">{{ item.esaAppName }}</view>
				<view class="tuwen_pro"><progress :percent="(item.esaUsedCount / item.esaTotalCount) * 100" activeColor="red" /></view>
				<view class="tuwen_right">{{ item.esaUsedCount }}/{{ item.esaTotalCount }}</view>
			</view>
			<view class="tuwen_bottom">
				<view class="tuwen_left">￥{{ item.esaUnitPrice }}.00元</view>
			</view>
		</view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			taskTitle: ['低级', '中级', '高级']
		};
	},
	methods: {
		// 跳转详情
		toDetail(id) {
			console.log(id);
			uni.navigateTo({
				url: 'detail/detail?esaId=' + id
			});
		}
	},
	props: {
		shareList: {
			type: Array
		}
	}
};
</script>

<style lang="less" scoped>
.box {
	width: 750upx;
	// display: flex;
	// justify-content: space-around;
	// flex-wrap: wrap;
	.tuwenbox {
		height: 220upx;
		margin: 10upx 0;
		font-size: 0;
		display: flex;
		background-color: #ffffff;
		image {
			margin: 20upx;
			width: 180upx;
			height: 180upx;
			border-radius: 10upx;
		}

		.tuwen_title {
			width: 350upx;
			height: 220upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(34, 34, 34, 1);
			margin: 20upx;
			// .task_group {
			// 	background: #f0e68c;
			// 	color: #f5f5f5;
			// 	padding: 3upx;
			// 	border-radius: 20%;
			// 	box-shadow: 1px 1px 5px #f0e68c;
			// }
			.tuwen_pro {
				width: 260upx;
				margin-top: 30upx;
				margin-bottom: 30upx;
			}
		}
		.tuwen_bottom {
			width: 160upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(227, 52, 52, 1);
			padding: 15upx;
			display: flex;
			align-items: center;
		}
	}
}
</style>
