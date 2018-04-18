import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  "mentState": false,
  "currRouter": {},
  "languageValue": "cn",

}

// 定义所需的 mutations
const mutations = {
  MENUSTATE(state, mentState) {
    state = Object.assign(state, {"mentState": mentState});
  },
  CURRROUTER(state, currRouter) {
    state = Object.assign(state, {"currRouter": currRouter});
  },
  languageValue(state, languageValue) {
    state = Object.assign(state, {"languageValue": languageValue});
  }
}

// 创建 store 实例
export default new Vuex.Store({
    getters,
    state,
    mutations
})
