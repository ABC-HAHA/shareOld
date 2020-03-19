<script>
import { mapMutations } from 'vuex';
const openinstall = uni.requireNativePlugin('openinstall-plugin');
export default {
	onLaunch: function() {
		openinstall.getInstall(8, function(result) {
			uni.setStorage({
				key: 'openinstallInfo',
				data: JSON.stringify(result),
				success: res => {
					console.log('ok');
				}
			});
			// console.log(555555555555555555555555555555555, result);
			// console.log('getInstall : channel=' + result.channelCode + ', data=' + result.bindData);
		});
		// openinstall.registerWakeUp(function(result) {
		// 	uni.setStorage({
		// 		key: 'registerWakeUpInfo',
		// 		data:JSON.stringify(result),
		// 		success: res => {
		// 			console.log('ok');
		// 		}
		// 	});
		// 	console.log(9999999999999999999999, result);
		// 	console.log('getWakeup : channel=' + result.channelCode + ', data=' + result.bindData);
		// });
		uni.getStorage({
			key: 'userInfo',
			success: res => {
				// console.log(res.data);
				if (res.data) {
					this.login(res.data);
				}
			}
		});
		uni.getStorage({
			key: 'weixinUserInfo',
			success: res => {
				// console.log(res.data);
				if (res.data) {
					this.wixinlogin(res.data);
				}
			}
		});
		console.log('App Launch');
		// update.update(this.websiteUrl, this.updateType, this.progress);
	},
	
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapMutations(['login', 'wixinlogin', 'allowDown', 'allowPush', 'storeImage', 'storeDevice', 'inviteCode'])
	}
};
</script>

<style lang="less">
/*每个页面公共css */
uni-page-body,
page {
	background-color: #f8f8f8;
	font-size: 25upx;
	width: 100%;
}
.page_block {
	width: 750upx;
	.page_top {
		margin-top: 50upx;
		display: flex;
		align-items: center;
		flex-direction: column;
		.registered_account {
			width: 550upx;
			height: 70upx;
			// font-size:26upx;
			line-height: 50upx;
			margin-top: 50upx;
			border-bottom: 1upx solid #bfbfbf;
			align-items: center;
			display: inline-flex;
			justify-content: space-between;
			.registered_account_send {
				height: 100upx;
				float: right;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(58, 58, 58, 1);
			}
			.placeholder_style {
				font-size: 28upx;
				font-weight: 400;
				color: #888888;
			}
			.registered_account_send.beginClass {
				color: #888888;
			}
		}
		.registered_account_agreement {
			width: 350upx;
			margin-top: 60upx;
			display: inline-flex;
			align-items: baseline;
		}
		.block_btn {
			width: 504upx;
			height: 82upx;
			line-height: 82upx;
			margin-top: 80upx;
			font-size: 30upx;
			color: rgba(255, 255, 255, 1);
			text-align: center;
			background: rgba(63, 138, 240, 1);
			border-radius: 40upx;
		}
		.block_tips {
			width: 580upx;
			margin-top: 50upx;
			font-size: 28upx;
			font-weight: 500;
			color: rgba(125, 125, 125, 1);
		}
	}
}
</style>
