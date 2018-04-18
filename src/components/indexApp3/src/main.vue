<template>
  <div class="menu_right" :class="{closeMenu:isOpen}">
    <div class="listP">
      <div class="menu_head">
        <menuState ref="menuState" :isOpen="isOpen" @click="menuStateHandle"></menuState>
      </div>
      <div class="list "style="margin-top: 70px" >
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
        defaultActive:this.menuListData[0].path,
        css:{
          isHidden: true
        },
        mouseenterArr:[],
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
        this.defaultActive = key;
      },
      //清除所有滑过事件
      clearMouseenter(doms){
        var _this = this;
        doms.forEach(function(element, index){
          element.removeEventListener("mouseenter", _this.mouseenterArr[index])
        });
      },
    },
    components:{
      "menuState": {
        template: '<a href="javascript:void(0)" :class="{on:isOpen}"  id="logoClick"><img :src="imgUrl" id="menu_click" @click = "clickHandle"/></a>',
        data(){
          return {
            imgUrl: require("./assets/menu_click.png"),
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
          document.querySelectorAll(".listCon").forEach(function(element, index){
            var _fun = (function(_index, _this){
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
            })(index, _this)
            _this.mouseenterArr.push(_fun);
            element.addEventListener("mouseenter", _fun);
            element.addEventListener("mouseleave", (function(_this){
              return function(){
                _this.clearCollLays();
              }
            })(_this));
          });
        }else{
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
    mounted(){
      //this.$store.commit("LOADHOME", true);
      var that = this;
      var _listArr = [];
      this.$refs["menuState"].$on("MENUSTATE", this.menuStateHandle);
      // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth;
          console.log(that.screenWidth);
          if(that.screenWidth<700){
            that.isOpen=true;
            this.isCollapse=true
          }else {
            that.isOpen=false;
            this.isCollapse=false
          }
          that.$store.commit("MENUSTATE", that.isOpen);
          setTimeout(function(){
            that.$refs["menuState"].$on("MENUSTATE", that.menuStateHandle);
          }, 500)
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
  .el-menu--collapse > .el-menu-item span, .el-menu--collapse > .lable-menu > .el-submenu >  .el-submenu__title span {
    height: 0;
    width: 10px;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu{border-right:none !important}/*去除左侧导航右侧边框*/
</style>
<style lang="scss">
  /*menu max width out scroll*/
  /*$menu_width : 215px;*/
  @mixin menu_width {
    width: -webkit-calc(100% - 5px);
    width: -moz-calc(100% - 5px);
    width: calc(100% - 5px);
  }
  /*border color*/
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
    height:100%;

    &.closeMenu{
      width: 64px;
    }
    .listP{
      height: 100%;
      padding-top: 15px;
      /*box-shadow: 2px 0px 30px #c8c8c8;*/
      /*menu header*/
      .menu_head{
        position: absolute;
        @include menu_width;
        height: 50px;
        top:0px;
        z-index: 1;
        &>a{
          &.on{
           // left:12px !important;/*点击按钮之后，logoClick位置是否改变*/
          }
        }
      }
      .list{
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
  }
  #logo{/*修改大众logo位置样式，重新赋予id-20180328*/
    margin-left: -20px;
    position: absolute;
    left:-130px;
    top:9px;
    width: 80px;
  }
  #logoClick{/*将原来的模板内的a标签样式单独提出来，重新赋予id-20180328*/
    position:absolute;top:0;left:170px;transition: all .5s
  }
  .on #menu_click{/*新定义样式-20180328*/
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    webkit-transform:rotate(90deg)
  }
  #menu_click{/*为该id添加渐变CSS-20180328*/
    transition: all .5s
  }
  .sys_con .sys_route{
    left:5px;
  }/*将去除滚动条产生的边距-20180329*/
  .sys_home .sys_header h4{
    margin-left:168px;/*调整文字距离左边的距离*/
  }
</style>
<style lang="scss" src="../../scss/app-while.scss"></style>
