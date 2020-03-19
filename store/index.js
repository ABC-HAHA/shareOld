import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const state = {
	TarCur: 0,
	isLogin: false,
	isDown: false,
	isPush: true,
	userInfo: {},
	userImage: {},
	weixinUserInfo: {},
	deviceId: '',
	progress: 0
}
const getters = {

}
const mutations = {
	changeTar(state, index) {
		state.TarCur = index;
	},
	changeProgress(state, progress) {
		state.progress = progress
	},
	login(state, userObj) {
		state.isLogin = true;
		state.userInfo = userObj;
		uni.setStorage({
			key: 'userInfo',
			data: userObj
		})
	},
	changeStatus(state, status) {
		state.userInfo.status = status;
		uni.setStorage({
			key: 'userInfo',
			data: state.userInfo
		})
	},
	wixinlogin(state, weixinUserObj) {
		state.weixinUserInfo = weixinUserObj;
		uni.setStorage({
			key: 'weixinUserInfo',
			data: weixinUserObj
		})
	},
	logout() {
		state.isLogin = false;
		state.userInfo = {};
		uni.removeStorage({
			key: 'userInfo'
		});
		state.weixinUserInfo = {}
		uni.removeStorage({
			key: 'weixinUserInfo'
		})
	},
	storeImage(state, imgObj) {
		state.userImage.networkImage = imgObj.networkImage;
		state.userImage.localImage = imgObj.localImage;
		uni.setStorage({
			key: 'userImage',
			data: imgObj
		})
	},
	allowDown(state, netObj) {
		if (netObj.status === 1) {
			state.isDown = true;
		} else {
			state.isDown = false;
		}
		uni.setStorage({
			key: 'network',
			data: netObj
		})
	},
	allowPush(state, pushtObj) {
		if (pushtObj.status === 1) {
			state.isPush = true;
		} else {
			state.isPush = false;
		}
		uni.setStorage({
			key: 'push',
			data: pushtObj
		})
	},
	storeDevice(state, str) {
		state.deviceId = str;
		uni.setStorage({
			key: 'device',
			data: str
		})
	}
}
const actions = {

}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
