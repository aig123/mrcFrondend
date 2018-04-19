<template>
  <div class="sys_home">
    <div class="sys_home_parent">
      <hh-index-app :menuListData="menu"></hh-index-app>
      <hh-index-tab  ref="mainContent"></hh-index-tab>
    </div>
  </div>
</template>
<script>
  import hhIndexApp from "../components/indexApp3"
  import hhIndexTab from "../components/indexTab3"
  export default {
    name: 'home',
    components: {
      "hh-index-app": hhIndexApp,
      "hh-index-tab": hhIndexTab
    },
    data () {
      return {
        menu:[

          {
            title: "table列表",
            icon:"el-icon-menu",
            path: "/home/table",
            children:[
              {
                path: '/home/tableMrc',
                title: "组件列表",
                icon:"el-icon-edit-outline",
              },
              {
                path: '/home/table',
                title: "普通列表",
                icon:"el-icon-edit-outline",
              },
            ]
          },
          {
            title: "form列表",
            icon:"el-icon-menu",
            path: "/home/form",
            children:[
              {
                path: "/home/formMrc",
                title: "组件表单",
                icon:"el-icon-news",
              },
              {

                path: "/home/form",
                title: "普通表单",
                icon:"el-icon-message",
              },
            ]
          },
          {
            title: "tab列表",
            icon:"el-icon-menu",
            path: "/home/tab",
            children:[
              {
                path: "/home/tab",
                title: "普通tab",
                icon:"el-icon-news",
              },
              {
                path: "/home/tabMrc",
                title: "普通tabMrc",
                icon:"el-icon-news",
              }
            ]
          },
          {

            path: "/home/fullScreen",
            title: "全屏组件",
            icon:"el-icon-news",

          },
          {

            path: "/home/editor",
            title: "编辑器组件",
            icon:"el-icon-news",

          },
          {
            title: "iframe列表",
            icon:"el-icon-menu",
            path: "/home/iframe",
            children:[
              {
                path: '/home/sogou',
                title: "搜狗",
                icon:"el-icon-edit-outline",
              },
              {
                path: '/home/baidu',
                title: "百度",
                icon:"el-icon-edit-outline",
              },
            ]
          },
          {
            path: "/home/tree",
            title: "tree组件",
            icon:"el-icon-news",
          },
          {
            path: "/home/selectPeople",
            title: "人员搜索组件",
            icon:"el-icon-news",
          },
          {
            path: "/home/fullCalendar",
            title: "日历组件",
            icon:"el-icon-news",
          },
          {
            path: "/home/elSteps",
            title: "时间轴",
            icon:"el-icon-news",
          },
          {
            path: "/home/echart",
            title: "echart组件",
            icon:"el-icon-news",
          }
          ,
          {
            path: "/home/drag",
            title: "拖拽组件",
            icon:"el-icon-news",
          }
        ]
      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>
<style lang="scss">
  .sys_home{
    top:0px;
    left:0px;
    height:100%;
    width:100%;
    position:absolute;
    .sys_header{
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      /*background-image:url(../assets/images/bg.jpg);*//*取消背景图片链接-20180326*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: -webkit-calc(100% + 5px);
      width: -moz-calc(100% + 5px);
      width: calc(100% + 5px);
      height: 50px;
      position: absolute;
      top:0px;
      left:0px;
      margin-left: -5px;
      margin-right: -5px;
      .sys_exit{
        position: absolute;
        right: 10px;
        top: 13px;
        cursor: pointer;
        border-left: 1px solid #909399;
        padding-left: 6px;
      }
      h4{
        height:50px;
        line-height: 18px;
        padding-left: 78px;/*修改文字与图标距离-20180327*/
        color: #7a7b7d;
        width:330px;
        font-weight:500;
        font-size:20px;
        font-family: "微软雅黑";
        margin-top:12px;
        letter-spacing: 2px;
        .sys_logo{
          position: absolute;
          left: 26px;/*修改头部图标距离左侧距离-20180327*/
          top:10px;
        }
      }
      h5{
        height:50px;
        line-height: 36px;
        color: #606266;
        position: absolute;
        top:0px;
        cursor:pointer;
        &.sys_df{
          right: 290px;/*调整搜索图标位置-20180327*/
        }
        &.sys_ab{
          right: 190px;/*调整菜单图标位置-20180327*/
        }
        &.sys_user{
          right: 50px;
          .sys_userPhoto{
            width: 40px;
            height: 40px;
            position: absolute;
            border-radius: 20px;
            background-color: #1b2034;
            left: -50px;
            top: 5px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
              border-radius: 20px;
            }
          }
        }
        .sys_header_icon{
          position: absolute;
          display: block;
          width: 20px;
          left: -25px;
          top: 12px;/*调整图标和顶端距离*/
          img{
            width: 100%;
          }
        }
      }
    }
    .sys_home_parent{
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
