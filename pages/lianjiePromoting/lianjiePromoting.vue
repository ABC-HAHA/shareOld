<template>
	<div>
		<nodataPage v-if="list.length==0"></nodataPage>
		<FaceContent :shareList="list"></FaceContent>
		<Loading v-if="list.length!==0" :loadingType="loadingType" :showFalg="showFalg"></Loading>
	</div>
</template>

<script>
import FaceContent from '../../components/faceContent/faceContent.vue';
import Loading from '../../components/loading/loading.vue';
import nodataPage from "@/components/nodata/nodata"
var self;
export default {
	data() {
		return {
			list: [],
			start: 0, 
			page: 10, 
			showFalg: true,
			loadingType: 0 
		};
	},
	methods: {
		// 查询任务列表
		lianjieData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/comnet/list/2',
					method: 'GET',
					data: {
						start: self.start,
						page: self.page
					},
					success: function(res) {
						if (res.data.data.list.length >= res.data.data.totalCount) {
							self.list = res.data.data.list;
							self.loadingType = 2;
							return;
						}
						self.list = res.data.data.list;
						console.log(self.list);
						self.page += self.page;
					}
				});
		}
	},
	onLoad: function() {
		this.lianjieData();
	},
	onReachBottom() {
		console.log('onReachBottom');
		this.loadingType = 0;
		setTimeout(() => {
			this.lianjieData();
		}, 300);
	},
	components: { FaceContent, Loading,nodataPage }
};
</script>

<style scoped>
.uni-loadmore {
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	background: #ffffff;
	font-weight: 400;
	color: rgba(107, 107, 107, 1);
	text-align: center;
	font-size: 20upx;
}
</style>
