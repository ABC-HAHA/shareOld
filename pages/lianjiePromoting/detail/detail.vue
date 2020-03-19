<template>
	<div>
		<view class="tuwen_detail">
			<view class="tuwen_detail_title" @tap="goHeadAd(detailData['url'])" v-html="detailData['esaDescribe1']"></view>
			<view v-if="detailData['esaLinkInfoList']" @click="openBrowser(detailData['url'])" class="tuwen_detail_pic">
				<image :src="detailData['esaPicUrl']" mode=""></image>
				<view class="tuwen_detail_pic_content">{{ detailData['esaDescribe2'] }}</view>
			</view>
			<view class="tuwen_detail_share_btn">
				<button class="tuwen_detail_share_btn_copy" @tap="share">分享</button>
				<view class="tuwen_detail_share_btn_line">|</view>
				<button class="tuwen_detail_share_btn_save" @tap="copy">复制分享语</button>
			</view>
			<view class="tuwen_detail_trans">
				<image src="../../../static/zhuanfa.png" mode=""></image>
				<text>转发计费</text>
				<view class="tuwen_detail_trans_content" v-html="detailData['esaCostDesc']"></view>
			</view>
			<view class="tuwen_detail_req">
				<image src="../../../static/yaoqiu.png" mode=""></image>
				<text>要求</text>
				<view class="tuwen_detail_trans_content" v-if="detailData['esaClaimInfo']" v-html="detailData['esaClaimInfo']['claimComment']"></view>
			</view>
			<view class="upload_box" v-if="showUpload">
				<view class="upload" v-if="checkValue" @tap="upload">+</view>
				<image :src="upPic" mode="" v-if="!checkValue"></image>
				<image class="img2" :src="upPicList" mode="" v-if="!checkValue"></image>
			</view>
			<view :class="isLimit ? 'huise' : 'lanse'" class="tuwen_detail_get" @tap="getTask">
				<span>{{ btnArray }}</span>
			</view>
			<hFormAlert v-if="cancelShow" @closeEvent="closeAlert"></hFormAlert>
			<uni-popup :show="type === 'bottom_share'" position="bottom" :shareStatus="true" @hidePopup="hidePopup">
				<view class="shareGroup">
					<share-page
						class="share_popup"
						:detailDataList="detailData"
						@failShareEvent="failShare"
						@successShareEvent="successShare"
						@togglePopupEvent="hidePopup"
					></share-page>
				</view>
			</uni-popup>
		</view>
	</div>
</template>

<script>
import hFormAlert from '@/components/h-form-alert/h-form-alert.vue'; //引入弹窗
import uniPopup from '../uni-popup/uni-popup.vue';
import sharePage from '../share/share.vue';
var self;
var esaId; //任务id
var USERID; //用户id
var USERTOKEN; //用户token
var EXTENDINFOID; //领取的任务的id
var IMGLIST = []; //提交审核时的图片数组
export default {
	data() {
		return {
			cancelShow: false, //显示隐藏弹窗
			btnArray: '',
			btnIndex: 0, //0,任务达到上限，1，领取任务，2提交审核，3审核中，4，完成任务
			showUpload: false, //是否显示上传
			checkValue: true, //显示上传图片
			detailData: [], //详情页数据
			upperLimit: 0, //控制任务是否达到上限的背景
			isLimit: false,
			upPic: '', //审核图片预览
			upPicList: '', //审核后的图片
			type: '' //遮罩邀请层
		};
	},
	methods: {
		//关闭弹出框
		closeAlert() {
			this.cancelShow = false;
		},
		// 跳转第三方页面
		openBrowser(url) {
			plus.runtime.openURL(url);
		},
		goHeadAd(url) {
			// #ifdef APP-PLUS
			plus.runtime.openURL(url);
			// #endif
		},
		// 获取任务
		getTask(option) {
			// 如果已登录，直接领取
			// if (this.$store.state.isLogin) {

			if (this.$store.state.isLogin) {
				// 已登录
				// if (this.$store.state.userInfo.inviteGroupId >= this.detailData.taskLevel) {
				// 	// 账号等级
				console.log(this.btnIndex);
				if (this.btnIndex == 1) {
					// 1,领取任务
					console.log(this.btnIndex);
					console.log(esaId);
					console.log(this.$store.state.isLogin);
					self = this;
					uni.request({
						url: this.websiteUrl + '/api/task/recieve',
						method: 'GET',
						header: {
							Authorization: USERTOKEN
						},
						data: {
							esaid: esaId,
							userId: USERID
						},
						success: function(res) {
							console.log(res, 11111111111);

							if (res.data.code == 601) {
								// 去审核账户
								uni.showToast({
									title: '请去审核账户！',
									mask: true
								});
								uni.redirectTo({
									url: '/pages/mine/auditPage',
									animationType: 'slide-in-right',
									animationDuration: 300
								});
							}
							// 改变按钮里面的内容
							else if (res.data.code == 705) {
								// 达到领取上限
								// #ifdef APP-PLUS
								plus.nativeUI.toast(res.data.msg);
								// #endif
								self.btnIndex = 2;
							} else if (res.data.code == 200) {
								uni.showToast({
									title: '领取成功',
									mask: true
								});
								// 领取成功显示提交审核
								self.btnArray = '提交审核';
								self.btnIndex = 2;
							}
						}
					});
					// 2，提交审核
				} else if (this.btnIndex == 2) {
					console.log('点击了提交审核');
					this.submitAudit();
				}
				// } else {
				// 	//账户等级
				// 	plus.nativeUI.toast('请领取匹配自己账户等级的任务!!!');
				// }
			} else {
				//如果未登录
				this.cancelShow = true;
				console.log('未登录');
			}
		},
		// 去掉br
		strFormat(str) {
			return str.replace(/<br\s*\/?>/gi, '\r\n');
		},
		// // 分享语
		// share() {
		// 	let hrefData = this.detailData['esaLinkInfoList'][0]['linkComment'];
		// 	let titleData = this.detailData['esaDescribe1'];
		// 	let summaryData = this.detailData['esaDescribe2'];
		// 	let imageUrlData = this.detailData['esaPicUrl'];
		// 	// #ifdef APP-PLUS
		// 	uni.share({
		// 		provider: 'weixin',
		// 		scene: 'WXSceneSession',
		// 		type: 0,
		// 		href: hrefData,
		// 		title: "",
		// 		summary: this.strFormat(titleData),
		// 		imageUrl: imageUrlData,
		// 		success: function(res) {
		// 			console.log('success:' + JSON.stringify(res));
		// 		},
		// 		fail: function(err) {
		// 			console.log('fail:' + JSON.stringify(err));
		// 		}
		// 	});
		// 	// #endif
		// },
		hidePopup() {
			this.type = '';
		},
		share() {
			this.type = 'bottom_share';
		},
		successShare() {
			uni.showToast({
				title: '分享成功！！！',
				mask: true
			});
		},
		failShare() {
			uni.showToast({
				title: '分享失败！！！',
				mask: true
			});
		},
		// 复制分享语
		copy() {
			let copyData = this.detailData.esaDescribe1;
			// #ifdef APP-PLUS
			uni.setClipboardData({
				data: this.strFormat(copyData),
				success: function() {
					uni.showToast({
						title: '复制成功',
						mask: true
					});
					setTimeout(function() {
						uni.hideToast();
					}, 2000);
				}
			});
			// #endif
		},
		// 任务审核上传图片
		upload() {
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url: this.websiteUrl + '/api/file/uploadFile', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							Authorization: USERTOKEN
						},
						success: function(uploadFileRes) {
							uni.showToast({
								title: '上传成功',
								mask: true
							});
							// console.log(uploadFileRes);
							self.upPic = JSON.parse(uploadFileRes.data).imgurl;
							// 把图片放进数组给提交审核做准备
							IMGLIST.push(self.upPic);
							// console.log(self.upPic);
							// 显示用户上传的图片
							self.checkValue = false;
						}
					});
				}
			});
		},
		// 提交审核
		submitAudit() {
			if (IMGLIST.length == 0) {
				plus.nativeUI.toast('请上传需要审核的照片！！！');
			} else {
				uni.request({
					url: this.websiteUrl + '/api/comnet/audit',
					method: 'POST',
					header: {
						Authorization: USERTOKEN
					},
					data: {
						extendId: EXTENDINFOID,
						imgList: IMGLIST
					},
					success: function(res) {
						console.log(res.data);
						uni.showToast({
							title: '提交审核成功',
							mask: true
						});
						//显示上传框
						self.showUpload = true;
						// 显示用户上传的图片
						self.checkValue = false;
						// 显示的是待审核
						if (res.data.status == 1) {
							self.btnArray = res.data.statusStr;
							self.btnIndex = 3;
						}
					}
				});
			}
		}
	},
	components: { hFormAlert, uniPopup, sharePage },
	onLoad: function(option) {
		// 设置登录用户id
		USERID = this.$store.state.userInfo.userId;
		USERTOKEN = this.$store.state.userInfo.token;
		// console.log(this.$store.state.userInfo.userId);
		// console.log(USERID);
		self = this;
		// 任务id
		esaId = option.esaId;
		if (this.$store.state.isLogin) {
			console.log('已经登录');
			// 已登录
			uni.request({
				url: this.websiteUrl + '/api/comnet/info/' + esaId,
				method: 'GET',
				data: {
					userId: USERID
				},
				success: function(res) {
					self.detailData = res.data.data;
					EXTENDINFOID = self.detailData.extendInfoId;
					console.log(self.detailData);

					//进入页面，初始化，处理领取任务按钮
					// 未领取
					if (self.detailData.status == -1) {
						self.upperLimit = self.detailData.esaUsedCount;
						if (self.upperLimit >= self.detailData.esaTotalCount) {
							self.isLimit = true;
							self.btnArray = '任务已达上限';
							return;
						}
						// 改变按钮里面的内容,根据后台返回显示的应该是是未领取任务
						self.btnIndex = 1;
						// 改变按钮里面的内容
						self.btnArray = '领取任务';
					}
					// 已经领取成功
					if (self.detailData.status == 0) {
						// 改变按钮里面的内容,根据后台返回显示的应该是是未领取任务
						self.btnIndex = 2;
						// 改变按钮里面的内容
						self.btnArray = self.detailData.statusStr;
						// 显示上传框
						self.showUpload = true;
					}
					// 已经提交审核，显示待审核
					if (self.detailData.status == 1) {
						// 改变按钮里面的内容,根据后台返回显示的应该是是未领取任务
						self.btnIndex = 3;
						// 改变按钮里面的内容
						self.btnArray = self.detailData.statusStr;
						// 显示上传框
						self.showUpload = true;
						// 显示用户上传的图片
						self.checkValue = false;
						// 显示审核后的图片
						self.upPicList = self.detailData.imgs[0].image;
					}
					// 已经待审核，显示审核完成
					if (self.detailData.status == 2) {
						// 改变按钮里面的内容
						self.btnArray = self.detailData.statusStr;
						// 显示上传框
						self.showUpload = false;
						// 显示用户上传的图片
						self.checkValue = true;

						//重置按钮为领取任务
						self.detailData.status == -1;
						// 改变按钮里面的内容,根据后台返回显示的应该是是未领取任务
						self.btnIndex = 1;
						// 改变按钮里面的内容
						self.btnArray = '领取任务';
					}
					// 审核失败
					if (self.detailData.status == 3) {
						// 改变按钮里面的内容
						self.btnArray = self.detailData.statusStr;
						// 显示上传框
						self.showUpload = true;
						// 显示用户上传的图片
						self.checkValue = false;
					}
				}
			});
		} else {
			//未登录
			console.log('未登录');
			uni.request({
				url: this.websiteUrl + '/api/comnet/info/' + esaId,
				method: 'GET',
				success: function(res) {
					self.detailData = res.data.data;
					console.log(self.detailData);
					// console.log(self.detailData.esaUsedCount);
					//进入页面，初始化，处理领取任务按钮
					// 没有领取，让去领取
					if (self.detailData.status == -1) {
						self.upperLimit = self.detailData.esaUsedCount;
						if (self.upperLimit >= self.detailData.esaTotalCount) {
							self.isLimit = true;
							self.btnArray = '任务已达上限';
							return;
						}
						// 改变按钮里面的内容,根据后台返回显示的应该是是未领取任务
						self.btnIndex = 1;
						// 改变按钮里面的内容
						self.btnArray = '领取任务';
					}
				}
			});
		}
	},
	onShow: function() {}
};
</script>

<style lang="less" scoped>
.tuwen_detail {
	overflow-x: hidden;
	.tuwen_detail_title {
		// width:515upx;
		// height:207upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(34, 34, 34, 1);
		margin: 38upx 35upx 35upx 35upx;
	}
	.tuwen_detail_pic {
		width: 750upx;
		display: flex;
		margin: 0upx 30upx 30upx;
		font-size: 0;
		image {
			width: 100upx;
			height: 100upx;
			// margin: 20upx 0 0 0;
		}
		.tuwen_detail_pic_content {
			background: #f1f1f1;
			width: 540upx;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			padding: 20upx 20upx 0;
		}
	}
	.tuwen_detail_share_btn {
		border-top: 1px solid #e9e9e9;
		display: flex;
		margin-top: 30upx;
		button::after {
			border: none;
			border-radius: 0;
		}
		.tuwen_detail_share_btn_copy {
			width: 335upx;
			font-size: 30upx;
			font-family: PingFang SC;
			color: rgba(63, 138, 240, 1);
		}
		.tuwen_detail_share_btn_line {
			width: 8upx;
			height: 10upx;
			font-size: 30upx;
			color: #3f8af0;
			line-height: 70upx;
		}
		.tuwen_detail_share_btn_save {
			width: 335upx;
			font-size: 30upx;
			font-family: PingFang SC;
			color: rgba(63, 138, 240, 1);
		}
	}
	.tuwen_detail_req,
	.tuwen_detail_trans {
		image {
			width: 36upx;
			height: 36upx;
			margin-right: 20upx;
			margin-left: 35upx;
		}
		text {
			font-size: 36upx;
			font-weight: 500;
			color: rgba(34, 34, 34, 1);
		}
		.tuwen_detail_trans_content {
			width: 563upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			margin: 29upx 91upx 29upx 96upx;
		}
	}
	.tuwen_detail_req {
		.tuwen_detail_trans_content {
			margin-bottom: 30upx;
		}
	}
	.upload_box {
		position: relative;
		width: 220upx;
		height: 220upx;
		background: rgba(255, 255, 255, 1);
		margin: 20upx 10upx;
		margin-bottom: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.upload {
			font-size: 100upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(102, 102, 102, 1);
		}
		image {
			width: 220upx;
			height: 220upx;
		}
		.img2 {
			position: absolute;
			top: 0;
			left: 0;
			width: 220upx;
			height: 220upx;
		}
	}
	.tuwen_detail_get {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750upx;
		height: 80upx;
		// background: rgba(63, 138, 240, 1);
		text-align: center;
		span {
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 80upx;
		}
	}
}

.lanse {
	background: rgba(63, 138, 240, 1);
}
.huise {
	background: #999999;
}
</style>
