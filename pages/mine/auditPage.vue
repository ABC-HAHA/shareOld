<template>
	<view class="auditPage">
		<view class="audit_specification">我们需要审核您的微信好友人数，根据您的好友 人数划分不同的会员组，
		不同的会员组可接的任 务数不同，一些指定的高级任务必须更高的会员 组才可以接，
		好友人数越多，会员组越高（如下 图）本页面用于您提交好友人数截图，给您划分 会员组，
		如果您在审核完成之后，好友人数达到 更高组别的要求，您也可以再次提交审核	
		</view>
		<view class="audit_dec">
			<text  class="audit_dec_vip">认证会员</text>
			<text class="audit_dec_num">200好友数</text>
			<text class="audit_dec_task">99999任务数</text>
		</view>
		<view class="audit_upload" v-if ="canUploadImage">
			<view class="audit_dec_text">用户审核: 微信通讯录拉至底部截图好友数量</view>
			<image class="delete_image" v-if="deleteStatus" src="../../static/delete.png" mode="" @tap="deleteImage"></image>
			<image  class="upload_image" :src="audit_image" mode="" @tap="upload"></image>
			<view class="commit_audit" @tap="commitAudit">提交审核</view>
		</view>
		<view class="bottom_block"  v-if="historyAuditStatus">
			<view class="histor_title">历史审核记录</view>
			<view class="history_item"  v-for="(tab,index) in auditList" :key="index">
				<image :src="tab.imgUrl" mode=""></image>
				<view>
					<view class="">审核状态:{{tab.statusStr}}</view>
					<view class="">审核时间:{{tab.createDate}}</view>
					<view class="">审核备注:{{tab.reviewComment}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				smsCode: '',
				codeFalg: false,
				audit_image:"../../static/addPage.png",
				deleteStatus:false,
				auditList:[],
				historyAuditStatus:false,
				canUploadImage:true,
				sendImage:'',
				uploadImage:''
			}
		},
		onShow() {
			this.reviewInfo();
		},
		 methods: {
			upload(){
				 var   self = this;
				uni.chooseImage({
				count:1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
					success: function (res) {
				     console.log(JSON.stringify(res.tempFilePaths[0]));
					 self.uploadImage = res.tempFilePaths[0];
					uni.uploadFile({
					 	header: {
					 		Authorization:self.$store.state.userInfo.token
					 	},
					 	url: self.websiteUrl +'/api/file/uploadFile',//仅为示例，非真实的接口地址
					 	filePath: self.uploadImage,
					 	name: 'file',
					 	success: (uploadFileRes) => {
							self.audit_image =  self.uploadImage;
							 self.deleteStatus = true;
					 		self.sendImage = JSON.parse(uploadFileRes.data).imgurl;
					 	}
					 });
					}
				});
			},
			deleteImage(){
				 this.deleteStatus = false;
				 this.audit_image = "../../static/addPage.png";
			},
			reviewInfo(){
				var  self  = this;
				uni.request({
					url: self.websiteUrl + '/api/user/reviewInfo',
					header: {
						Authorization:self.$store.state.userInfo.token
					},
					 success: res => {
						  console.log(res);
						 if(res.data.code == 200){
							  self.auditList = res.data.data;
							  if(res.data.status == 0 || res.data.status == 1 ){
								self.canUploadImage= false ;
							  }
							 if(self.auditList.length > 0){
								self.historyAuditStatus = true;
							 }else{
								self.historyAuditStatus = false;
							 }
						 }else{
							  plus.nativeUI.toast(res.data.msg);
						 }
					 },
					 fail: () => {},
					 complete: () => {}
				});
			},
			commitAudit(){
				var  self  = this;
				if(self.deleteStatus){
					uni.request({
						url: self.websiteUrl +'/api/user/reviewSub',
						method: 'POST',
						header: {
							Authorization:self.$store.state.userInfo.token
						},
						data: {imgUrl:self.sendImage},
						success: (res) => {
							console.log(res);
							if(res.data.code == 200){
								self.canUploadImage = false;
								self.reviewInfo();
							}
							plus.nativeUI.toast(res.data.msg);
							}
						});
				}else{
					 plus.nativeUI.toast('请上传图片');
				}
			}
		 }
	}
</script>

<style lang="less" scoped>
	.auditPage{
		width:750upx;
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
		.audit_specification{
			width:705upx;
			margin: 0 auto;
			height:384upx;
			padding-top: 30upx;
			// text-align: center;
			line-height: 50upx;
			background:rgba(255,255,255,1);
			font-size:30upx;
			color:rgba(65,65,65,1);
		}
		.audit_dec{
			width:600upx;
			margin:30upx auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.audit_dec_vip{
				font-size:34upx;
				color:rgba(65,65,65,1);
			}
			.audit_dec_num{
				font-size:29upx;
				color:rgba(191,109,137,1);
			}
			.audit_dec_task{
				font-size:29upx;
				color:rgba(49,162,218,1);
			}
			
		}
		.audit_upload{
			text-align: center;
			position:relative;
			.audit_dec_text{
				width:600upx;
				margin:0 auto;
				font-size:30upx;
				color:rgba(191,109,137,1);
			}
			.delete_image{
				position: absolute;
				top:110upx;
				right:140upx;
				width:40upx;
				height:40upx;
			}
			.upload_image{
				margin-top:20upx;
				width:544upx;
				height:979upx;
			}
			.commit_audit{
				margin: 60upx;
				width:638upx;
				height:81upx;
				line-height: 81upx;
				background:rgba(63,138,240,1);
				border-radius:40upx;
				font-size:30upx;
				color:rgba(255,255,255,1)
			}
		}
		.bottom_block{
			.histor_title{
				width:705upx;
				height:118upx;
				line-height: 118upx;
				background:rgba(255,255,255,1);
				font-size:38upx;
				color:rgba(134,134,134,1);
				padding-left: 30upx;
			}
			.history_item{
				display: flex;
				flex-direction: row;
				align-items: center;
				>image{
					margin-left:10upx;
					width:207upx;
					height:205upx;
				}
				>view{
				font-size:34upx;
				color:rgba(107,107,107,1);
				>view{
					padding:10upx 40upx;
				}
				
				}
				
			}
		}
	
	}
	
</style>
