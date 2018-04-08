import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
import routerUtil from "./router/routerUtil"
import mrcTable from './components/mrcTable.vue';
import mrcForm from './components/mrcForm';
import mrcSearchForm from './components/mrcSearchForm';
import mrcDialog from './components/mrcDialog';
// import './components/scss/app.scss'
import vueMrc from 'vue-mrc'
import VuePrism from 'vue-prismjs'
import 'prismjs/themes/prism.css'
import * as API from "./api/api"
Vue.use(VueRouter);
Vue.use(elementUi);
//Vue.use(vueMrc);
//Vue.use(Vuex);
Vue.component('mrc-table', mrcTable)
Vue.component('mrc-form', mrcForm)
Vue.component('mrc-search-form', mrcSearchForm)
Vue.component('mrc-dialog', mrcDialog)
import mock from "./mock/mock"
mock.bootstrap()
let _routerMap =
  {
    childrens: [
      {
        "name": "demo",
        "title": "案例"
      },
      {
        "name": "demo1",
        "title": "案例1"
      },
      {
        "name": "demo2",
        "title": "案例2"
      }
    ]
  };
let _apiRouterMap =
  {
    childrens: [
      {
        "name": "demo",
        "title": "案例"
      },
      {
        "name": "demo1",
        "title": "案例1"
      },
      {
        "name": "demo2",
        "title": "案例2"
      }
    ]
  };
routerUtil.initFormat(_routerMap);
_routerMap = routerUtil.getDataMap(_routerMap);
let _routerData =
  [
    {
      path: '/',
      name: 'home',
      //redirect: "index",
      component: (resolve) => {
        require(['./pages/home.vue'], resolve)
      },
      children: [
        ..._routerMap
      ]
    },
    {
      path: '/document',
      name: 'document',
      //redirect: "index",
      component: (resolve) => {
        require(['./document/document.vue'], resolve)
      },
      children: [
        {
          path: 'searchForm',
          name: 'searchForm',
          component: (resolve) => {
            require(['./document/searchForm.vue'], resolve)
          }
        },
        {
          path: 'table',
          name: 'table',
          component: (resolve) => {
            require(['./document/table.vue'], resolve)
          }
        }
      ]
    }
    ,
    {
      path: '/document2',
      name: 'document2',
      component: (resolve) => {
        require(['./pages/document2.vue'], resolve)
      }
    }
  ];
let router = new VueRouter({routes: _routerData});
let _App = new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app');
;
//}
//});
