<template>
	<view  class="personalPage">
		<view class="base_class">头像
			<image class="head_image" :src="head_image" mode=""></image>
		</view>
		<view class="base_class">昵称
		<text>{{nick_name}}</text>
			
		</view>
		<view class="base_class">邀请码
			<text>{{invit_code}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
		 	head_image:function(){
				return this.$store.state.userInfo.wexinImg;
			},
			nick_name:function(){
				return this.$store.state.userInfo.wexinNickName;
			},
			invit_code:function(){	
				return this.$store.state.userInfo.inviteCode;
			},
		},
		 methods: {
			 login(){ 
			 }
		 }
	}
</script>

<style lang="less" scoped>
	.personalPage{
		.base_class{
			background:rgba(255,255,255,1);
			padding:20upx 50upx;
			margin-top:10upx;
			font-size:40upx;
			color:rgba(65,65,65,1);
			display: flex;
			align-items: center;
			justify-content: space-between;
			// text-align: center;
			.head_image{
				background-color: #00ffff;
				width:124upx;
				height:124upx;
				border-radius:50%;
				// float: right;
			}
			>text{
				font-size:37upx;
				color:rgba(129,129,129,1);
			}
		}
	}
</style>
