<template>
	<div>
		<nodataPage v-if="list.length==0"></nodataPage>
		<FaceContent :shareList="list"></FaceContent>
		<Loading v-if="list.length!==0" :loadingType="loadingType" :showFalg="showFalg"></Loading>
	</div>
</template>

<script>
import FaceContent from '../../components/faceContent/faceContent.vue';
import Loading from '../../components/loading/loading.vue'; //加载动画
import nodataPage from "@/components/nodata/nodata"
export default {
	data() {
		return {
			list: [],
			start: 0, //起始查询序号
			page: 10, //每页查询条数
			showFalg: true,
			loadingType: 0 //0，加载，，1加载中，，，2加载全部
		};
	},
	methods: {
		// 查询任务列表
		shipinData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/comnet/list/3',
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
						// console.log(self.list);
						self.page += self.page;
					}
				});
		}
	},
	onLoad: function() {
		this.shipinData();
	},
	onReachBottom() {
		console.log('onReachBottom');
		this.loadingType = 0;
		setTimeout(() => {
			this.shipinData();
		}, 300);
	},
	components: { FaceContent, Loading,nodataPage }
};
</script>

<style lang="less" scoped></style>
