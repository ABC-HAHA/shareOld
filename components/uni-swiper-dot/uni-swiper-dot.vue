<template>
	<view class="container">
		<view class="title">{{ currIndex }}/{{swiperImg.length}}</view>
		<!--  :autoplay="true" :interval="3000" :duration="1000" -->
		<swiper class="swiper" :current="swiperCurrent" @change="changeSwiper">
			<swiper-item v-for="item in swiperImg" :key="item.id"><image class="swiper-item" :src="item.linkComment" mode="widthFix"></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			swiperCurrent: 0,
			currIndex: 1
		};
	},
	methods: {
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current;
			this.currIndex = e.detail.current + 1;
		}
	},
	props: {
		swiperImg: {
			type: Array
		}
	},
	onLoad: function() {}
};
</script>

<style lang="less">
uni-page-body,
page {
	background-color: #f8f8f8;
	font-family: PingFang-SC-Medium;
	width: 100%;
	height: 100%;
}
.container {
	text-align: center;
	position: relative;
	background: #333333;
	width: 100%;
	height: 100%;
	.title{
		color: #FFFFFF;
		font-size: 40upx;
		font-weight: bold;
	}
	.swiper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 750upx;
		height: 750upx;
		.swiper-item {
			image {
				width: 750upx;
				height: 750upx;
			}
		}
	}
}
</style>
