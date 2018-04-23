<template>
  <div class="menu_right" :class="{closeMenu:isOpen}">
    <div class="listP">
      <div class="menu_head">
        <menuState ref="menuState" :isOpen="isOpen" @click="menuStateHandle"></menuState>
      </div>
      <div class="list "style="margin-top: 71px;" >
        <el-menu
          router
          :default-active="defaultActive"
          :unique-opened="true"
          class="el-menu-vertical-demo "
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="true"
          active-text-color="rgb(3, 131, 247)"
        >
          <span v-for="item in menuListData" :key="item.title" class="lable-menu">
             <el-submenu v-if="item.children&&item.children.length>0" :index="item.path">
               <template slot="title">
                 <i :class="item.icon"></i>
                 <span slot="title">{{item.title}}</span>
               </template>
                 <el-menu-item :index="menuItem.path" :key="index" v-for="(menuItem,index) in item.children">
                   {{menuItem.title}}
                 </el-menu-item>
             </el-submenu>
             <el-menu-item :index="item.path" v-if="!item.children||item.children.length==0">
               <i :class="item.icon"></i>
               <span slot="title">{{item.title}}</span>
             </el-menu-item>
           </span>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "hh-index-app",
    data(){
      return {
        theTitle: "我的应用",
        isCollapse: false,
        isOpen: false,//菜单是否打开
        childrenListHeight:40,
        screenWidth: document.body.clientWidth,
        defaultActive:"",
        css:{
          isHidden: true
        },
        mouseenterArr:[],
        phone:false
      }
    },
    props:["menuListData"],
    //方法
    methods:{
      menuStateHandle(){
        var _this = this;
        if(_this.isCollapse){
          _this.isCollapse=false
        }else {
          _this.isCollapse=true
        }
        this.$refs["menuState"].$off("MENUSTATE", this.menuStateHandle);
        this.isOpen = this.isOpen ? false : true;
        this.$store.commit("MENUSTATE", this.isOpen);
        setTimeout(function(){
          _this.$refs["menuState"].$on("MENUSTATE", _this.menuStateHandle);
        }, 500)

      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        this.defaultActive = keyPath;
      },
      //清除所有滑过事件
      clearMouseenter(doms){
        var _this = this;
        // doms.forEach(function(element, index){
        //   element.removeEventListener("mouseenter", _this.mouseenterArr[index])
        // });
        for(let index of doms){
          debugger
          doms[index].removeEventListener("mouseenter", _this.mouseenterArr[index])
        }
      },
      changePhone(){
        let that=this;
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth;
        console.log(that.screenWidth);
        if(that.screenWidth<700){
          that.isOpen=true;
          that.phone=true
          this.isCollapse=true
        }else {
          that.isOpen=false;
          that.phone=false
          this.isCollapse=false
        }
        that.$store.commit("MENUSTATE", that.isOpen);
        that.$store.commit("phone", that.phone);
        // setTimeout(function(){
        //   that.$refs["menuState"].$on("MENUSTATE", that.menuStateHandle);
        // }, 500)
      }
    },
    components:{
      "menuState": {
        template: '<a href="javascript:void(0)" :class="{on:isOpen}"  id="logoClick"><img :src="imgUrl" id="menu_click" @click = "clickHandle"/><img :src="logoUrl" id="logo"></a>',
        data(){
          return {
            imgUrl: require("./assets/menu_click.png"),
            logoUrl:require("./assets/logo.png")/*logo图片路径-20180326*/
          }
        },
        props:["isOpen"],
        methods:{
          clickHandle(evt){
            this.$emit("MENUSTATE", evt);
          }
        }
      }
    },
    watch:{
      title(val){
        this.theTitle = val;
      },
      isOpen(val){
        var _this = this;
        if(val){
          this.mouseenterArr = [];
          for(let element of document.querySelectorAll(".listCon")){
            var _fun = (function(_this){
              return function (evt) {
                var _target = evt.target;
                var _childrenList = evt.target.querySelector(".childrenList");
                var _top = _target.getBoundingClientRect().top;
                var _currY = _target.getBoundingClientRect().y;
                var _container =  window.document.body.clientHeight;
                _this.clearCollLays();
                if (_childrenList) {
                  _childrenList.classList.add("on");
                  _childrenList.style.top = _top + "px";
                  var menuChildrenListHeight = _childrenList.querySelector(".menu_children_li").clientHeight;
                  if((_container - _currY) < menuChildrenListHeight){
                    //console.info(menuChildrenListHeight - (_container - _currY));
                    _childrenList.querySelector(".menu_children_li").style.top = (_container - _currY) - menuChildrenListHeight  + "px";
                  }else {
                    _childrenList.querySelector(".menu_children_li").style.top = 0;
                  }
                }
              }
            })(_this);
            _this.mouseenterArr.push(_fun);
            element.addEventListener("mouseenter", _fun);
            element.addEventListener("mouseleave", (function(_this){
              return function(){
                _this.clearCollLays();
              }
            })(_this));
          }

        }
        else{
          this.clearMouseenter(document.querySelectorAll(".listCon"));
        }
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      },
      $route(data) {
        this.handleSelect(data.name,data.path)
      }
    },
    mounted(){//this.$store.commit("LOADHOME", true);
      this.handleSelect(this.$route.name,this.$route.path)
      var that = this;
      var _listArr = [];
      this.$refs["menuState"].$on("MENUSTATE", this.menuStateHandle);
      this.changePhone();
      // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      window.onresize = () => {
        return (() => {
          this.changePhone();
        })()
      }
    },

  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
  .el-menu{
    border-right: solid 0px #e6e6e6!important;
  }
  .el-menu--collapse > .el-menu-item span, .el-menu--collapse > .lable-menu > .el-submenu >  .el-submenu__title span {
    height: 0;
    width: 10px;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu--collapse > .el-menu-item .el-submenu__icon-arrow, .el-menu--collapse > .lable-menu >.el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
  ul.el-menu{ height: calc(100% - 85px);
    /* border: solid 1px red; */
    overflow-y: auto;
    overflow-x: hidden;}




  ::-webkit-scrollbar-thumb{
    background-color:#c1c1c1;
    height:50px;
    outline-offset:-2px;
    outline:2px solid #fff;
    -webkit-border-radius:4px;
    border: 2px solid #fff;
  }
  /*---鼠标点击滚动条显示样式--*/
  ::-webkit-scrollbar-thumb:hover{
    background-color:#c1c1c1;
    height:50px;
    -webkit-border-radius:4px;
  }
  /*---滚动条大小--*/
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
  }
  /*---滚动框背景样式--*/
  ::-webkit-scrollbar-track-piece{
    background-color:#fff;
    -webkit-border-radius:0;
  }
  body{
    scrollbar-arrow-color: #fff; /*三角箭头的颜色*/
    scrollbar-face-color: #c1c1c1; /*立体滚动条的颜色（包括箭头部分的背景色）*/
    scrollbar-3dlight-color: #fff; /*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: #fff; /*滚动条的高亮颜色（左阴影？）*/
    scrollbar-shadow-color: #fff; /*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: #fff; /*立体滚动条外阴影的颜色*/
    scrollbar-track-color: #fff; /*立体滚动条背景颜色*/
    scrollbar-base-color:#000; /*滚动条的基色*/
  }



</style>
<style lang="scss">
  @mixin menu_width {
    width: -webkit-calc(100% - 5px);
    width: -moz-calc(100% - 5px);
    width: calc(100% - 5px);
  }
  .menu_right{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    transition: all .5s;
    position:absolute;
    width:220px;
    height: 100%;
    &.closeMenu{
      width: 64px;
    }
    .listP{
      height: 100%;
      padding-top: 15px;
      /*menu header*/
      .menu_head{
        position: absolute;
        @include menu_width;
        height: 50px;
        top:0px;
        background: #4777e9;//头部背景颜色
        height: 85px;
        width: 100%;
        z-index: 1;
        &>a{
          &.on{
            left:12px !important;/*新添加的-20180327*/
          }
        }
      }
      .list{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .list_con{
          .sopt{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

  }
  #menu_click{/*修改菜单按钮位置样式，重新赋予id-20180328*/
    position: absolute;
    top:30px;
    left:7px;
    transition: all .5s
  }
  #logo{/*修改大众logo位置样式，重新赋予id-20180328*/
    margin-left: -20px;
    position: absolute;
    left:-130px;
    top:9px;
    width:80px;
  }
  #logoClick{
    position:absolute;top:0;left:170px;transition: all .5s
  }
  .on #menu_click{/*新定义样式-20180328*/
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    webkit-transform:rotate(90deg)
  }
</style>
<style lang="scss" src="../../scss/app.scss"></style>
