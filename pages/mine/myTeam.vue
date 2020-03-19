<template>
	<view class="myTeamPage">
		<view class="page_head"></view>
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id"  class="swiper-tab-list" :class="tabIndex==index ? '' : 'active'"
			 :id="tab.id" :data-current="index" @click="tapTab">{{tab.name}}
			  <!-- <hr class = "filerank-swiper-border" :class="tabIndex==index ? 'active' : ''" /> -->
			 </view>
		</scroll-view>
		<no-data v-if="myTeam.length == 0"></no-data>
		<view class="_page" >
			<view class="item_list" v-for="(tab,index) in myTeam" :key="index" >
				<image class="head_img"  :src="tab.img" mode=""></image>
				<view class="head_dec">
					<text class="name">{{tab.name}}</text>
					<text class="vip">{{tab.level}}</text>
					<text class="time">{{tab.creatTime}}</text>
				</view>
				<text class="money">{{tab.contributionIncome}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import noData from '@/pages/mine/nodata.vue';
	export default {
		components: {
			noData
		},
		data() {
			return {
				scrollLeft: 0,
				tabIndex: 0,
				tabBars:[{id:1,name:"一级团队"},{id:2,name:"其他团队"}],
				currentLevel:1,
				myTeam:[],
			}
		},
		onShow() {
			this.firstTeam();
		},
		 methods: {
			 async tapTab(e) { //点击tab-bar
			 	let tabIndex = e.target.dataset.current;
			 	if (this.tabIndex === tabIndex) {
			 		return false;
			 	} else {
			 		this.tabIndex = tabIndex;
			 	}
				if(this.tabIndex !=0){
					this.currentLevel = 1;
				}else{
					this.currentLevel = 3;
				}
				this.firstTeam();
			 },
			 firstTeam(){
					uni.request({
				    url: this.websiteUrl + '/api/user/myteam?level='+this.currentLevel,
				 	header: {
				 		Authorization:this.$store.state.userInfo.token
				 	},
				     success: res => {
						 // console.log(res);
						 this.myTeam = res.data.data;
				     },
				     fail: () => {},
				     complete: () => {}
				 });
			 }, 
		 }
	}
</script>

<style lang="less" scoped>
	.myTeamPage{
		width:750upx;
		.page_head{
			width: 750upx;
			height: 60upx;
			background:rgba(63,138,240,1);
		}
		.uni-swiper-tab{
		background-color:rgba(63,138,240,1);
		// display: inline-block;
		font-size:36upx;
		color:rgba(255,255,255,1);
		.swiper-tab-list {
			width: 200upx;
			padding:20upx;
			display: inline-block;
			text-align: center;
			font-size:36upx;
			color:rgba(255,255,255,1);
		}
			
		}
		.swiper-tab-list.active {
			color:rgba(255,255,255,0.6);
		}
		.item_list{
			padding:20upx;
			background:rgba(255,255,255,1);
			display: flex;
			flex-direction: row;
			justify-content: left;
			align-items: center;
			margin-bottom: 10upx;
			.head_img{
				width:99upx;
				height:99upx;
				background:rgba(63,138,240,1);
				border-radius:50%;
			}
			.head_dec{
				width:300upx;
				display: flex;
				flex-direction: column;
				justify-content: left;
				align-items: left;
				margin-left:20upx;
				.name{
					font-size:37upx;
					color:rgba(65,65,65,1);
				}
				.vip{
					background:rgba(226,226,226,1);
					// width:100upx;
					border-radius:5upx;
					padding: 5upx 10upx;
					margin:10upx 0upx;
					font-size:24upx;
					color:rgba(65,65,65,1);
				}
				.time{
					font-size:22upx;
					color:rgba(65,65,65,1);
				}
			}
			.money{
				width:250upx;
				text-align: right;
				font-size:40upx;
				color:rgba(210,44,98,1);
			}
		}
		
	
	}
</style>
