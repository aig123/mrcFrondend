import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const table = r => require.ensure([], () => r(require('@/pages/table')), 'table');
const tableMrc = r => require.ensure([], () => r(require('@/pages/table-mrc')), 'tableMrc');
const tableManyHead = r => require.ensure([], () => r(require('@/pages/table-many-head')), 'tableManyHead');
const tableCol = r => require.ensure([], () => r(require('@/pages/tableCol')), 'tableCol');
const tableRow = r => require.ensure([], () => r(require('@/pages/tableRow')), 'tableRow');
const tableColfixed = r => require.ensure([], () => r(require('@/pages/tableColfixed')), 'tableColfixed');
const tableFilter = r => require.ensure([], () => r(require('@/pages/tableFilter')), 'tableFilter');
const tableCheckbox = r => require.ensure([], () => r(require('@/pages/tableCheckbox')), 'tableCheckbox');
const tableIndex = r => require.ensure([], () => r(require('@/pages/tableIndex')), 'tableIndex');
const form = r => require.ensure([], () => r(require('@/pages/form.vue')), 'form');
const formMrc = r => require.ensure([], () => r(require('@/pages/form-mrc')), 'formMrc');
const formInline = r => require.ensure([], () => r(require('@/pages/formInline')), 'formInline');
const tab = r => require.ensure([], () => r(require('@/pages/tab')), 'tab');
const tabMrc = r => require.ensure([], () => r(require('@/pages/tab-mrc')), 'tabMrc');
const fullScreen = r => require.ensure([], () => r(require('@/pages/fullScreen')), 'fullScreen');
const editor = r => require.ensure([], () => r(require('@/pages/editor')), 'editor');
const tree = r => require.ensure([], () => r(require('@/pages/tree')), 'tree');
const selectPeople = r => require.ensure([], () => r(require('@/pages/selectPeople')), 'selectPeople');
const fullCalendar = r => require.ensure([], () => r(require('@/pages/fullCalendar')), 'fullCalendar');
const elSteps = r => require.ensure([], () => r(require('@/pages/elSteps')), 'elSteps');
const echart = r => require.ensure([], () => r(require('@/pages/echart')), 'echart');
const drag = r => require.ensure([], () => r(require('@/pages/drag')), 'drag');
const ceshi = r => require.ensure([], () => r(require('@/pages/ceshi')), 'ceshi');
const autoForm = r => require.ensure([], () => r(require('@/pages/autoForm')), 'autoForm');
const myIndex = r => require.ensure([], () => r(require('@/pages/myIndex')), 'myIndex');
const routes = [
  // {
  //   path: '/',
  //   component: tableMrc
  // },
  {path: '/', redirect: 'home/tableMrc'},
  {
    path: '/home',
    component: home,
    name: '',
    children: [
      {
        path: 'myIndex',
        name: "myIndex",
        component: myIndex,
        meta: [],
      },
      {
        path: 'autoForm',
        name: "autoForm",
        component: autoForm,
        meta: [],
      },
      {
        path: 'formMrc',
        name: "formMrc",
        component: formMrc,
        meta: [],
      },
      {
        path: 'formInline',
        name: "formInline",
        component: formInline,
        meta: [],
      },
      {
        path: 'form',
        name: "form",
         component: form,
        meta: [],
      },
      {
        path: 'tableMrc',
        name: "tableMrc",
        component: tableMrc,
        meta: [],
      },
      {
        path: 'tableManyHead',
        name: "tableManyHead",
        component: tableManyHead,
        meta: [],
      },
      {
        path: 'tableCol',
        name: "tableCol",
        component: tableCol,
        meta: [],
      },
      {
        path: 'tableRow',
        name: "tableRow",
        component: tableRow,
        meta: [],
      },
      {
        path: 'tableColfixed',
        name: "tableColfixed",
        component: tableColfixed,
        meta: [],
      },
      {
        path: 'tableFilter',
        name: "tableFilter",
        component: tableFilter,
        meta: [],
      },
      {
        path: 'tableCheckbox',
        name: "tableCheckbox",
        component: tableCheckbox,
        meta: [],
      },
      {
        path: 'tableIndex',
        name: "tableIndex",
        component: tableIndex,
        meta: [],
      },

      {
        path: 'table',
        name: "table",
        component: table,
        meta: [],
      },
      {
        path: 'tab',
        name: "tab",
        component: tab,
        meta: [],
      }
      ,
      {
        path: 'tabMrc',
        name: "tabMrc",
        component: tabMrc,
        meta: [],
      }
      ,
      {
        path: 'fullScreen',
        name: "fullScreen",
        component: fullScreen,
        meta: [],
      }
      ,
      {
        path: 'editor',
        name: "editor",
        component: editor,
        meta: [],
      },
      {
        path: 'sogou',
        name: "tableMrc2",
        meta: [{type:'iframe',url:"https://www.sogou.com/",name:"搜狗"}],
      },
      {
        path: 'baidu',
        name: "table2",
        meta: [{type:'iframe',url:"https://www.baidu.com/",name:"百度"}],
      },
      {
         path: 'tree',
         component: tree,
         meta: [],
       },
      {
        path: 'selectPeople',
        component: selectPeople,
        meta: [],
      },
      {
        path: 'fullCalendar',
        component: fullCalendar,
        meta: [],
      },
      {
        path: 'elSteps',
        component: elSteps,
        meta: [],
      },
      {
        path: 'echart',
        component: echart,
        meta: [],
      },
      {
        path: 'drag',
        name: "drag",
        component: drag,
        meta: [],
      },
      {
        path: 'ceshi',
        name: "ceshi",
        component: ceshi,
        meta: [],
      }
      ,
    ]
  }
]
export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
