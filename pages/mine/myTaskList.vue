<template>
	<view class="task_page">
		<view class="page_head"></view>
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view
				v-for="(tab, index) in tabBars"
				:key="tab.id"
				class="swiper-tab-list"
				:class="tabIndex == index ? '' : 'active'"
				:id="tab.id"
				:data-current="index"
				@click="tapTab"
			>
				{{ tab.name }}
				<!-- <hr class = "filerank-swiper-border" :class="tabIndex==index ? 'active' : ''" /> -->
			</view>
		</scroll-view>
		<scroll-view id="tab-bar" class="uni-swiper-tab-two" scroll-x :scroll-left="scrollLeft">
			<view
				v-for="(tab, index) in tabBarsTwo"
				:key="tab.id"
				class="swiper-tab-list-two"
				:class="tabIndexTwo == index ? '' : 'active'"
				:id="tab.id"
				:data-current="index"
				@click="tapTabTwo"
			>
				{{ tab.name }}
				<!-- <hr class = "filerank-swiper-border" :class="tabIndex==index ? 'active' : ''" /> -->
			</view>
		</scroll-view>
		<no-data v-if="taskList.length == 0"></no-data>
		<view class="list_item" v-for="(tab, index) in taskList" :key="index" :id="tab.taskId" @tap="taskDetails(tab.taskId)">
			<image class="item_image" :src="tab.taskImg" mode=""></image>
			<view class="item_text">
				<view>{{ tab.taskName }}</view>
				<text>{{ tab.creatTime }}</text>
			</view>
			<view class="item_money">{{ tab.price }}￥</view>
			<view class="item_remark">{{ tab.remark }}</view>
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
			tabBars: [{ id: 1, name: '图文分享' }, { id: 2, name: '视频分享' }, { id: 3, name: '链接分享' }],
			tabBarsTwo: [{ id: 1, name: '进行中' }, { id: 2, name: '审核中' }, { id: 3, name: '已完成' }, { id: 4, name: '未通过' }],
			tabIndexTwo: 0,
			taskList: []
		};
	},
	onShow() {
		this.myTask();
	},
	methods: {
		async tapTab(e) {
			//点击tab-bar
			console.log(e.target);
			let tabIndex = e.target.dataset.current;
			if (this.tabIndex === tabIndex) {
				return false;
			} else {
				this.tabIndex = tabIndex;
			}
			console.log(this.tabIndex);
			this.myTask();
		},
		async tapTabTwo(e) {
			//点击tab-bar
			// console.log(e.target);
			let tabIndexTwo = e.target.dataset.current;
			if (this.tabIndexTwo === tabIndexTwo) {
				return false;
			} else {
				this.tabIndexTwo = tabIndexTwo;
			}
			// console.log(this.tabIndexTwo);
			this.myTask();
		},
		myTask() {
			uni.request({
				url: this.websiteUrl + '/api/task/myTask?typeId=' + this.tabIndex + '&&status=' + this.tabIndexTwo,
				header: {
					Authorization: this.$store.state.userInfo.token
				},
				success: res => {
					console.log(res);
					this.taskList = res.data.data;
					console.log(this.taskList);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		taskDetails(id) {
			// /pages/mine/login
			console.log(id);
			if (this.tabIndex == 0) {
				uni.navigateTo({
					url: '/pages/tuwenPromoting/detail/detail?esaId=' + id,
					animationType: 'slide-in-right'
				});
			} else if (this.tabIndex == 1) {
				uni.navigateTo({
					url: '/pages/shipinPromoting/detail/detail?esaId=' + id,
					animationType: 'slide-in-right'
				});
			} else {
				uni.navigateTo({
					url: '/pages/lianjiePromoting/detail/detail?esaId=' + id,
					animationType: 'slide-in-right'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.task_page {
	.page_head {
		width: 750upx;
		// background: rgba(63, 138, 240, 1);
		border-bottom: 1upx solid #F1F1F1;
	}
	.uni-swiper-tab {
		// margin-top: 60upx;
		background: rgba(63, 138, 240, 1);
		font-size: 36upx;
		color: rgba(255, 255, 255, 1);
		.swiper-tab-list {
			width: 200upx;
			padding: 20upx;
			display: inline-block;
			text-align: center;
			font-size: 36upx;
			color: rgba(255, 255, 255, 1);
		}
	}
	.swiper-tab-list.active {
		color: rgba(255, 255, 255, 0.6);
	}
	.uni-swiper-tab-two {
		background: rgba(255, 255, 255, 1);
		font-size: 36upx;
		color: rgba(255, 255, 255, 1);
		.swiper-tab-list-two {
			width: 145upx;
			padding: 20upx;
			display: inline-block;
			text-align: center;
			font-size: 34upx;
			color: rgba(63, 138, 240, 1);
		}
	}
	.swiper-tab-list-two.active {
		color: rgba(181, 181, 181, 1);
	}
	.list_item {
		width: 750upx;
		height: 160upx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 10upx;
		.item_image {
			width: 84upx;
			height: 84upx;
			background-color: brown;
		}
		.item_text {
			width: 250upx;
			font-size: 34upx;
			margin-left: 20upx;
			color: rgba(20, 152, 243, 1);
			> text {
				font-size: 24upx;
				color: rgba(175, 175, 175, 1);
			}
		}
		.item_money {
			font-size: 36upx;
			color: rgba(210, 44, 98, 1);
		}
		.item_remark {
			width: 250upx;
			font-size: 20upx;
			margin-left: 30upx;
			color: rgba(210, 44, 98, 1);
		}
	}
}
</style>
