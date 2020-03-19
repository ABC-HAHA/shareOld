<template>
	<div>
		<view class="text_title">
			<view class="txt_bold">一、 用户登陆 </view>
			<view class="txt">
				用户登陆分为手机号登陆与微信号登陆两种方式，如果用手机号+验证码登陆，登陆成功后还需绑定微信登陆才可以做任务，直接用微信登陆时不用再绑定。 手机号登陆：
			</view>
			<view class="pic_box"><image src="../../../static/step2.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step3.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step4.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">微信登陆：</view>
			<view class="pic_box"><image src="../../../static/step5.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step6.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">二、 用户等级审核</view>
			<view class="txt">
				登陆成功后，要做任务必须先通过用户等级审核，点击用户审核，然后提交微信人数的截图。系统管理员会在24小时内完成审核。根据微信好友人数的多少分为高、中、低级用户。低级用户只能领取低级任务，中级用户可以领取中级、低级两类任务。高级用户可以领取高、中、低级任务。
			</view>
			<view class="pic_box"><image src="../../../static/step7.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step8.png" mode=""></image></view>
		</view>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.text_title {
	font-size: 33upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(90, 90, 90, 1);
	padding-top: 55upx;
	.txt_bold {
		font-size: 40upx;
		font-weight: bold;
		margin: 10upx;
	}
	.txt {
		margin: 45upx 10upx;
	}
	.pic_box {
		text-align: center;
		image {
			width: 685upx;
			height: 1296upx;
		}
	}
}
</style>
