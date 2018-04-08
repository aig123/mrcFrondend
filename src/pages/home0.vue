<template>
  <div class="sys_home">
    <!--<div class="sys_header">-->
      <!--<h4><span class="sys_logo"><img src="../assets/images/logo.png"></span>{{$store.getters.title}}</h4>-->
      <!--<h5 class="sys_df"><span class="sys_header_icon"><img src="../assets/images/index.png"></span>主页</h5>-->
      <!--<h5 class="sys_ab"><span class="sys_header_icon"><img src="../assets/images/about.png"></span>关于</h5>-->
      <!--<h5 class="sys_user"><span class="sys_userPhoto"><img src="../assets/images/1.png"></span>艾光</h5>-->
      <!--<span class="sys_exit"><img src="../assets/images/esc.png"/></span>-->
    <!--</div>-->
    <div class="sys_home_parent">
      <hh-index-app></hh-index-app>
      <hh-index-tab defPartUrl = "school"  @currRouterEvent = "getCurrRouterHandle" ref="mainContent"></hh-index-tab>
    </div>
  </div>
</template>
<script>
  import hhIndexApp from "../components/indexApp"
  import hhIndexTab from "../components/indexTab"
  export default {
    name: 'home',
    components: {
      "hh-index-app": hhIndexApp,
      "hh-index-tab": hhIndexTab
    },
    data () {
      return {
        currRoute: null,
      }
    },
    beforeRouteEnter (to, from, next) {
      //通过这个访问组件
      next(vm => {
        vm.$refs.mainContent.hashChangeFire(to, from, next);
      })
    },

    methods: {
      getCurrRouterHandle(currRoute){
        this.$store.commit("CURRROUTER", currRoute);
      }
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
      background-image:url(../assets/images/bg.jpg);
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
      line-height: 50px;
      padding-left: 80px;
      color: #303133;
      width:330px;
      .sys_logo{
        position: absolute;
        left: 20px;
        top:10px;
      }
    }
    h5{
      height:50px;
      line-height: 50px;
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
        top: 5px;
        img{
          width: 100%;
        }
      }
    }
  }
    .sys_home_parent{
      height: 100%;
      width: 100%;
      padding-top: 50px;
      box-sizing: border-box;
    }
  }
</style>
