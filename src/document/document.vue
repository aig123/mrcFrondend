<template>
  <el-container style="height: 100%">
    <el-header style="height: 70px">
      <div class="sys_header">
        <h4>api 文档</h4>
        <!--<h5 class="sys_df">主页</h5>-->
        <!--<h5 class="sys_ab">关于</h5>-->
        <!--<h5 class="sys_user">艾光</h5>-->
      </div>
    </el-header>
    <el-container>
      <el-aside  width="220px">
        <el-menu
          default-active="searchForm"
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>组件</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="searchForm">搜索栏</el-menu-item>
              <el-menu-item index="table">表格</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view ></router-view>
        <!--<router-view v-show="!showIframe" class="position router-content" ></router-view>-->
        <!--兼容系统外部页面-->
        <!--<iframe-temp v-show="showIframe"></iframe-temp>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data(){
      return {
     //   defaultActive:"demo",
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.defaultActive = key;
      },
      clickHandle(){
        if(this.isCollapse){
          this.isCollapse=false
        }else {
          this.isCollapse=true
        }
      }
    },
    watch: {
      $route(data) {
        console.log(data);
        this.handleSelect(data.name)
      }
    },
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>
<style>
  /*.el-table__header th {background-color: white!important;}*/
</style>

<style lang="scss" scoped>

  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-aside {
    color: #333;
    text-align: left;
    line-height: 200px;
    width: 150px;
  }

  .el-main {
    padding: 0px;
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;

  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .sys_header{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    background-size: 100% 100%;
    width: -webkit-calc(100% + 5px);
    width: -moz-calc(100% + 5px);
    width: calc(100% + 5px);
    height: 60px;
    position: absolute;
    top:0px;
    left:0px;
    margin-left: -5px;
    margin-right: -5px;
    .sys_exit{
      position: absolute;
      right: 10px;
      top: 4px;
      cursor: pointer;
      padding-left: 6px;
    }
    h4 {
      height: 60px;
      line-height: 60px;
      padding-left:33px;
      font-size: 35px;
      color: #303133;
      text-align: left;
      .sys_logo {
        position: absolute;
        left: 20px;
        top: 10px;
      }
    }
  }
  h5{
    height:60px;
    line-height: 60px;
    color: #606266;
    position: absolute;
    top:0px;
    cursor:pointer;
    &.sys_df{
      right: 250px;
    }
    &.sys_ab{
      right: 180px;
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
        top: 10px;
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
      top: 5px;
      img{
        width: 100%;
      }
    }
  }
</style>

