<template>
	<div>
		<view class="text_title">
			<view class="txt_bold">一、 下载安装</view>
			<view class="txt">
				通过下载链接（<text selectable="true">http://www.398.net</text>）下载安装该APP。（根据手机型号，安卓手机点击或扫描二维码下载安卓版本；苹果手机点击或扫描二维码下载苹果版本）
			</view>
			<view class="pic_box"><image src="../../../static/step1.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">二、 用户登陆</view>
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
			<view class="txt_bold">三、 用户等级审核</view>
			<view class="txt">
				
				登陆成功后，要做任务必须先通过用户等级审核，点击用户审核，然后提交微信人数的截图。系统管理员会在24小时内完成审核。根据微信好友人数的多少分为高、中、低级用户。不同等级的用户只能领取与其对应等级的任务。
			</view>
			<view class="pic_box"><image src="../../../static/step7.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step8.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">四、 任务领取与任务审核</view>
			<view class="txt">
				点击“任务”，选择任务类型，进入任务详情页，选择系统所发布的任务，然后点击领取任务。领取成功后点击分享（分享给微信好友或者微信朋友圈）。分享成功后将分享页面截图，提交审核，上传图片即可。
				任务领取：
			</view>
			<view class="pic_box"><image src="../../../static/step9.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step10.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step11.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">任务分享与提交审核：</view>
			<view class="pic_box"><image src="../../../static/step12.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step13.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step14.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step15.png" mode=""></image></view>
			<view class="pic_box"><image src="../../../static/step16.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">审核通过后：</view>
			<view class="pic_box"><image src="../../../static/step17.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">奖金：</view>
			<view class="pic_box"><image src="../../../static/step18.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">
				五、佣金领取：
			</view>
			<view class="txt">
				由此进入，注册账号，即可领取佣金
			</view>
			<view class="pic_box"><image src="../../../static/step19.png" mode=""></image></view>
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
