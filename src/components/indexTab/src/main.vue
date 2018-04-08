<template>
  <div class="sys_con" :class="{sys_close:close}">
    <div class="sys_route">
      <div class="sys_header">
        <h4><span class="sys_logo"><img src="./assets/cap.png"></span>{{$store.getters.title}}<br /><span id="English">COLLABORATION APPLICATION PLATFORM</span></h4><!--修改图片src-20180326-->
        <!--<h5 class="sys_df"><span class="sys_header_icon"><img src="./assets/index.png"></span>主页</h5>-->
        <h5 class="sys_df"><span class="sys_header_icon"><img src="./assets/search.png"></span></h5><!--搜索按钮图片-->
        <h5 class="sys_ab"><span class="sys_header_icon"><img src="./assets/menu.png"></span></h5><!--菜单按钮图片-->
        <h5 class="sys_user"><span class="sys_userPhoto"><img src="./assets/1.png"></span><span id="logname">艾光</span>&nbsp;<img src="./assets/down.png"><br /><span id="department">信息技术部</span></h5>
        <hr />
      </div>

      <div class="sys_route_out">
        <transition name="router-fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "hh-index-tab",
    data(){
      return {
        close:false,
        currRoute: null,
        crumbs:[],
        cUrl: null
      }
    },
    methods:{
      hashChangeFire(to, from, next){
        if(!to.name){
          this.$store.commit("OPENERROR", true);
          return;
        }
        var that = this;
        /*try{
          document.querySelector(".route_out").scrollLeft = document.querySelector(".route_out").scrollTop = 0;
        }catch(error){}*/
        if(to.path == "/" || to.path == "") {
          var list = that.$router.options.routes[0].children[0].childrens;
          try {
            if(list && list.length > 0){
              that.$router.push({path: "/" + that.$router.options.routes[0].children[0].childrens[0].name});
            }else{
              that.$router.push({path: "/" + that.$router.options.routes[0].children[0].name});
            }
          }catch(error){}
        }
        if(to.matched.length <= 0) return;
        var _url = (to.matched.length >= 2) ? to.matched[1].path : to.matched[0].path;
        var _parent = to.matched[0].path == "" ? "/" : to.matched[0].path;
        var _rouMap = this.$router.options.routes;
        //获取当前父路由表
        var _currMap = _rouMap.filter(function (element) {return element.path == _parent});
        if(!_currMap[0] || _currMap[0].length <= 0)return;
        if(!_currMap[0].hasOwnProperty("children"))return;
        //获取当前子路
        var _currChildMap = _currMap[0].children.filter(function(element){
          //return _parent + element.path == _url;
          return element.path == _url;
        });
        this.currRoute = _currChildMap[0];
        this.rCurrRouteData();
      },
      //返回当前页路由信息
      rCurrRouteData(){
        this.$emit("currRouterEvent", this.currRoute);
      }
    },
    computed:{
      closeMenuState(){
        return this.$store.getters.mentState;
      }
    },
    watch:{
      closeMenuState(value){
        if(value)
          this.close = true;
        else
          this.close = false;
      }
    },
    mounted(){
      this.$router.afterEach(this.hashChangeFire);
    }
  }
</script>
<style lang="scss">
  .sys_con{
    background-color: #fff;
    box-sizing:border-box;
    width:100%;
    height:100%;
    padding-left: 220px;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    transition: all .5s;
    &.sys_close{
      padding-left: 55px;
    }
    .sys_route{
      position: relative;
      box-sizing:border-box;
      padding: 0px 10px 10px 5px;
      height: 100%;
      width:100%;
    }
    .sys_route_out{
      position: relative;
      width: 100%;
      height:100%;
    }
  }
</style>
<style src="./css/my.css"></style>
