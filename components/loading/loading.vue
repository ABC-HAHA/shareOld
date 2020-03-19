<template>
	<view class="uni-loadmore" v-if="showFalg">
		<view class="" v-if="loadingType === 2"></view>
		<text>{{ loadingText[loadingType] }}</text>
	</view>
</template>
<script>
export default {
	props: {
		loadingType: {
			type: Number,
			default: 2
		},
		loadingText: {
			type: Array,
			default: function() {
				return ['上拉加载更多', '加载中...', '已经加载全部数据'];
			}
		},
		showFalg: {
			type: Boolean,
			default: true
		}
	}
};
</script>
<style scoped>
.uni-loadmore {
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	background: #ffffff;
	font-weight: 400;
	color: rgba(107, 107, 107, 1);
	text-align: center;
	font-size: 20upx;
}
</style>
