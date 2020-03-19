<template>
	<view class="introduction">
		<!-- <no-data></no-data> -->
		<!-- <view class="no_data_block">
			<image  class="no_data" src="../../static/no.png" mode=""></image>
			<view>暂无数据</view>
		</view> -->
		<view class="box">
			如何赚佣:<br/>1、下载APP后注册登陆，提交申请成为会员，并绑定支付宝；<br/> 2、在账户等级认证中，填写个人资料，提交审核；<br/>
			3、在任务中领取后台发布的任务，根据要求完成商家发布的任务，赚取佣金。
		</view>
	</view>
</template>

<script>
import noData from '@/pages/mine/nodata.vue';
export default {
	components: {
		noData
	},
	data() {
		return {};
	},
	methods: {
		login() {}
	}
};
</script>

<style lang="less" scoped>
.introduction {
	.no_data_block {
		width: 750upx;
		text-align: center;
		margin-top: 400upx;
		.no_data {
			width: 464upx;
			height: 298upx;
		}
		> view {
			font-size: 31upx;
			color: rgba(104, 104, 104, 1);
		}
	}
}
.box {
	padding: 40upx 37upx 52upx;
	width: 661upx;
	height: 559upx;
	font-size: 30upx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(34, 34, 34, 1);
}
</style>
