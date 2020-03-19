<template>
	<div>
		<navigator class="helpbox" url="leadDetail/leadDetail">
			<view class="help_card">
				<view class="help_title">新手引导</view>
				<view class="help_content">怎么开始赚钱看这里~</view>
			</view>
			<view class="help_back"><image src="../../static/gengduo.png" mode=""></image></view>
		</navigator>
		<navigator class="helpbox" url="loginDetail/loginDetail">
			<view class="help_card">
				<view class="help_title">登录引导</view>
				<view class="help_content">怎么登录、审核账户看这里~</view>
			</view>
			<view class="help_back"><image src="../../static/gengduo.png" mode=""></image></view>
		</navigator>
		<navigator class="helpbox" url="getDetail/getDetail">
			<view class="help_card">
				<view class="help_title">领取任务引导</view>
				<view class="help_content">怎么开始领取任务、赚钱看这里~</view>
			</view>
			<view class="help_back"><image src="../../static/gengduo.png" mode=""></image></view>
		</navigator>
		<navigator class="helpbox" url="infoDetail/infoDetail">
			<view class="help_card">
				<view class="help_title">什么是赚分享</view>
				<view class="help_content">为您介绍什么是赚分享~</view>
			</view>
			<view class="help_back"><image src="../../static/gengduo.png" mode=""></image></view>
		</navigator>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.helpbox {
	// width: 750px;
	// height: 160px;
	background: rgba(255, 255, 255, 1);
	display: flex;
	padding: 39upx 30upx 19upx;
	margin-bottom: 10upx;
	justify-content: space-between;
	.help_card {
		.help_title {
			width: 145px;
			height: 35px;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(63, 138, 240, 1);
		}
		.help_content {
			width: 284px;
			height: 28px;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(0, 0, 0, 1);
		}
	}
	.help_back {
		line-height: 120upx;
		image {
			width: 16upx;
			height: 30upx;
		}
	}
}
</style>
