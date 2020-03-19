<template>
	<view class="no_data_block">
			<image  class="no_data" src="../../static/no.png" mode=""></image>
			<view>暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		 methods: {
			 login(){ 
			 }
		 }
	}
</script>

<style lang="less" scoped>
	.no_data_block{
		width:750upx;
		text-align: center;
		margin-top: 400upx;
		.no_data{
			width:464upx;
			height: 298upx;
		}
		>view{
			font-size:31upx;
			color:rgba(104,104,104,1);
		}
	}
</style>
