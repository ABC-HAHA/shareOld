<template>
	<div>
		<view class="text_title">
			<view class="txt_title">
				<i class="txt_red" style="text-indent: 2em;">重要通知！重要通知！重要通知！</i>
				为了便于“赚分享”用户佣金提取。即日起，“赚分享”将取消“我的”-“绑定支付宝”模块儿。“赚分享”用户佣金提取将由“九州彩票”后台运营中心统一进行支付。佣金提取步骤如下：
			</view>
			<view class="txt_bold">一、 点击赚分享APP中“任务”-“领取佣金”。</view>
			<view class="pic_box"><image src="../../../static/step19.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">二、 账号注册。</view>
			<view class="pic_box"><image src="../../../static/step20.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step21.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">三、 用户登录。</view>
			<view class="pic_box"><image src="../../../static/step22.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step23.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">四、 绑定九州彩票账号。</view>
			<view class="pic_box"><image src="../../../static/step24.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step25.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">五、 提现。</view>
			<view class="pic_box"><image src="../../../static/step26.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step27.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step28.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step29.png" mode=""></image></view>
		</view>
		<view class=""><button type="primary" @tap="getMoney">领取佣金</button></view>
	</div>
</template>

<script>
export default {
	methods: {
		// 注册领取佣金
		getMoney() {
			let url = 'https://1700b7.com/';
			// #ifdef APP-PLUS
			plus.runtime.openURL(url);
			// #endif
		}
	}
};
</script>

<style lang="less" scoped>
.text_title {
	font-size: 33upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(90, 90, 90, 1);
	padding-top: 55upx;
	.txt_title {
		font-size: 40upx;
		font-weight: 400;
		margin: 10upx;
		.txt_red {
			color: #f5222d;
		}
	}
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
