import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
import mrcTable from './components/mrcTable.vue';
import mrcForm from './components/mrcForm';
import mrcSearchForm from './components/mrcSearchForm';
import mrcDialog from './components/mrcDialog';
import mrcFullScreen from './components/mrcFullScreen';
import mrcIframeTab from './components/mrcIframeTab';
import { VueEditor, Quill } from 'vue2-editor';
import VueDND from 'awe-dnd'   //拖拽
// import fullCalendar from 'vue-fullcalendar'  //日历
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
Vue.use(FullCalendar)
import ECharts from 'vue-echarts'
Vue.component('chart', ECharts)
//语言切换
import locale from 'element-ui/lib/locale/lang/en'
if (localStorage.getItem('ELEMENT_LANGUAGE') == "cn") {
  Vue.use(elementUi);
} else if (localStorage.getItem('ELEMENT_LANGUAGE') == "en") {
  Vue.use(elementUi,{ locale });
}
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueDND)
Vue.component('mrc-table', mrcTable)
Vue.component('mrc-form', mrcForm)
Vue.component('mrc-search-form', mrcSearchForm)
Vue.component('mrc-dialog', mrcDialog)
Vue.component('mrc-full-screen', mrcFullScreen)
Vue.component('mrc-iframe-tab', mrcIframeTab)
import routerMap from "../src/router/routerMap"
import mock from "./mock/mock"
mock.bootstrap()
let _App = new Vue({
  router: routerMap,
  store: store,
  render: h => h(App)
}).$mount('#app');
