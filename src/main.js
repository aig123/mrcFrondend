import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
import mrcTable from './components/mrcTable';
import mrcTableDrag from './components/mrcTableDrag';
import mrcTableSimple from './components/mrcTableSimple';
import mrcForm from './components/mrcForm';
import mrcSearchForm from './components/mrcSearchForm';
import mrcDialog from './components/mrcDialog';
import mrcFullScreen from './components/mrcFullScreen';
import mrcIframeTab from './components/mrcIframeTab';
import mrcMultipleSelect from './components/mrcMultipleSelect';
import { VueEditor, Quill } from 'vue2-editor';
import VueDND from 'awe-dnd'   //拖拽
import { Drag, Drop } from 'vue-drag-drop';
import Vddl from 'vddl';
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
Vue.use(FullCalendar)
Vue.use(Vddl);
import ECharts from 'vue-echarts'
Vue.component('chart', ECharts)
//语言切换
import locale from 'element-ui/lib/locale/lang/en'
if (localStorage.getItem('ELEMENT_LANGUAGE') == "cn") {
  Vue.use(elementUi);
} else if (localStorage.getItem('ELEMENT_LANGUAGE') == "en") {
  Vue.use(elementUi,{ locale });
}else {
  Vue.use(elementUi);
}
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueDND)
Vue.component('drag', Drag);
Vue.component('drop', Drop);

Vue.component('mrc-table', mrcTable)
Vue.component('mrc-table-drag', mrcTableDrag)
Vue.component('mrc-table-simple', mrcTableSimple)
Vue.component('mrc-form', mrcForm)
Vue.component('mrc-search-form', mrcSearchForm)
Vue.component('mrc-dialog', mrcDialog)
Vue.component('mrc-full-screen', mrcFullScreen)
Vue.component('mrc-iframe-tab', mrcIframeTab)
Vue.component('mrc-multiple-select', mrcMultipleSelect);
Vue.directive('drag', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el) {
    // 聚焦元素
    el.onmousedown = function(e){
      var disx = e.clientX - el.offsetLeft;
      var disy = e.clientY - el.offsetTop;
      document.onmousemove = function (e){
        el.style.left = e.clientX - disx+'px';
        el.style.top = e.clientY - disx+'px';

        if (disx<= 0) {
          el.style.left = 0 + "px";
        }
        if (disy<= 0) {
          el.style.top = 0 + "px";
        }
      }
      document.onmouseup = function(){
        document.onmousemove = document.onmouseup = null;
        //document.onmousemove = null;
      }
    }
  }
})
import routerMap from "../src/router/routerMap"
import mock from "./mock/mock"
mock.bootstrap()
let _App = new Vue({
  router: routerMap,
  store: store,
  render: h => h(App)
}).$mount('#app');

//import {cats} from './index2.js'
//import install from '../dist/bundle.js'
//var  install=require('../dist/bundle.js').default
//console.log(install,'------------cats');
//console.log(install);
