<template>
  <div class="menu_right" :class="{closeMenu:isOpen}">
    <div class="listP">
      <div class="menu_head">
        <menuState ref="menuState" :isOpen="isOpen" @click="menuStateHandle"></menuState>
      </div>
      <div class="list "style="margin-top: 15px" >
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
    mounted(){
      //this.$store.commit("LOADHOME", true);
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
</style>
<style lang="scss">
  /*menu max width out scroll*/
  /*$menu_width : 215px;*/
  @mixin menu_width {
    width: -webkit-calc(100% - 5px);
    width: -moz-calc(100% - 5px);
    width: calc(100% - 5px);
  }
  /*list height*/
  $menu_listheight: 50px;
  /*list title*/
  $title_bg_focus_color: rgb(0, 82, 156);/*修改背景颜色-20180326*/
  $title_font_color: #00529c;/*左侧导航文字颜色-20180326*/
  /*border color*/
  $title_border_color: #28448d;
  $childrenList_bg_color: rgba(13, 110, 234,.2);
  $menu_children_li_bg_color: rgba(13, 110, 234, .8);
  $yellow: #00529c;/*修改左侧边线颜色为蓝色-20180326*/
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
    z-index: 100;
    width:220px;
    height:100%;
    &.closeMenu{
      width: 64px;

      .cAccordion{
        .ca_img{

        }
        .ca_title{
          opacity: 0;
        }
      }
      .childrenList{
        overflow: visible !important;
        display: none;
        height: auto !important;
        position:fixed;
        width: 220px;
        left: 50px;
        background-color:rgba(0,0,0,0) !important;
        /*background-color: $title_bg_focus_color !important;*/
        .menu_children_li{
          position: absolute;
          top:0px;
          left: 0px;
          width: 200px;
          background-color: $menu_children_li_bg_color !important;
        }
        &.on{
          display: block;
          .btn_mask{
            pointer-events:none;
            display: block !important;
          }
        }
      }
    }
    *{
      box-sizing: border-box;
    }
    .listP{
      height: 100%;
      padding-top: 15px;
      box-shadow: 2px 0px 30px #c8c8c8;
      /*menu header*/
      .menu_head{
        position: absolute;
        /*width: $menu_width;*/
        @include menu_width;
        height: 50px;
        top:0px;
        /*background-color: #24254f;*//*去掉背景颜色-20180326*/
        z-index: 1;
        &>a{
          -webkit-transition: transform .5s;
          -moz-transition: transform .5s;
          -ms-transition: transform .5s;
          transition: transform .5s;
          position: absolute;
          display: block;
          top: 14px;
          cursor: pointer;
          left: 10px;
          &.on{
            /*transform:rotate(90deg);!*原来点击之后旋转按钮效果消失-20180327*!*!*/
            /*-ms-transform:rotate(90deg);*/
            /*-moz-transform:rotate(90deg);*/
            /*webkit-transform:rotate(90deg);*/
            left:12px !important;/*新添加的-20180327*/
          }
        }
      }
      /*menu content*/
      .list{
        width:100%;/*重新调整宽度-20180329*/
        /*padding-right: 5px;*/
        height:100%;
        overflow-y:hidden;/*去掉IE下滚动条-20180329*/
        /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
        &::-webkit-scrollbar {
          width: 5px;
          border-radius: 50px;
        }
        /*定义滑块，内阴影及圆角*/
        &::-webkit-scrollbar-thumb {
          border-radius: 50px;
          background-color: #d1dbe5;
        }
        /*background*/
        .list_bgcolor{
          position: absolute;
          /*width: $menu_width;*/
          @include menu_width;
          height: 100%;
          /*background: -webkit-linear-gradient(#16458d, #312d7f);*/
          /*background: -moz-linear-gradient(#16458d, #312d7f);*/
          /*background: linear-gradient(#16458d, #312d7f);*//*去掉背景颜色-20180326*/
          top:0px;
          left: 0px;
          width:100%;
          box-shadow: 2px 0px 30px #c8c8c8;/*添加右侧阴影-20180326*/
        }
        /*list li*/
        .list_con{
          cursor: pointer;
          color: $title_font_color;
          ul{
            list-style:none;
            padding-top:70px;/*修改距离顶端距离-20180326*/

            margin: 0px;
            li{
              position:relative;
              /*fold title*/
              .cAccordion{
                /*border-top: 1px solid #{$title_border_color};*/
                font-size: 14px;
                position: relative;
                height: $menu_listheight;
                .title{
                  display: block;
                  line-height:$menu_listheight;
                  text-align:left;
                }
                /*arrow*/
                i{
                  color: #fff;
                  position:absolute;
                  top: 16px;
                  right: 10px;
                  &:after{
                    -webkit-transition: transform .5s;
                    -moz-transition: transform .5s;
                    -ms-transition: transform .5s;
                    transition: transform .5s;
                    content: "\003E";
                    font-family: monospace;
                    font-style: normal;
                    display: block;
                    -webkit-font-smoothing: antialiased;
                  }
                  &.on:after{
                    transform: rotate(90deg);
                    -ms-transform: rotate(90deg);
                    -webkit-transform: rotate(90deg);
                  }
                }
                /*icon*/
                .ca_img{
                  position:absolute;
                  width:$menu_listheight;
                  height:$menu_listheight;
                  overflow: hidden;
                  top:0px;
                  left: 0px;
                  .yellow{
                    display: block;
                    position: absolute;
                    width: 4px;
                    left: 0px;
                    height: 100%;
                    &.on{
                      background-color: $yellow;
                    }
                  }
                  .img{
                    width: 18px;
                    position: absolute;
                    right: 16px;
                    top:16px;
                    img{
                      width: 100%;
                      height: auto;
                    }
                  }
                }
                /*title*/
                .ca_title{
                  -webkit-transition: opacity .5s;
                  -moz-transition: opacity .5s;
                  -ms-transition: opacity .5s;
                  transition: opacity .5s;
                  width: 100%;
                  height:$menu_listheight;
                  padding-left:$menu_listheight;
                }
                /*focus header*/
                &.titleBold{
                  background-color: $title_bg_focus_color;
                  color:white;/*选中文字为白色-20180326*/
                  /*font-size:16px;*/
                }
              }
              /*fold childrens*/
              .childrenList{
                /*.btn_mask{
                  width: $menu_listheight;
                  height:$menu_listheight;
                  background-color: #0d99e9;
                  position: absolute;
                }*/
                .btn_mask{
                  position: absolute;
                  left: -$menu_listheight;
                  width: $menu_listheight;
                  height: $menu_listheight;
                  background-color: rgba(255,255,255, .2);
                  display: none;
                }
                -webkit-transition: height .5s;
                -moz-transition: height .5s;
                -ms-transition: height .5s;
                transition: height .5s;
                background-color: $childrenList_bg_color;
                overflow: hidden;
                height:0px;
                & > div > span{
                  text-align: left;
                  display: block;
                  position: relative;
                  height:40px;
                  .sTitle{
                    cursor: pointer;
                    display: block;
                    width: 100%;
                    height:40px;
                    line-height: 40px;
                    padding-left: 50px;
                  }
                }
                .titleColor .sTitle{
                  color: $yellow !important;
                }
              }
            }
          }
          .sopt{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .closeImg > span{
      font-size: 0px;
      position: absolute;
      top:50%;
      margin-top: -3.5px;
      left:3px;
      transition: transform .8s;
      -ms-transition: transform .8s;
      transition: transform .8s;
      transition: transform .8s;
    }

    .closeImg > span.on{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg);
      -moz-transform:rotate(180deg);
      -webkit-transform:rotate(180deg);
    }

    .closeImg {
      position: absolute;
      top: 50%;
      margin-top: -70px;
    }
    .show{
      display: block !important;
    }
    .hidden{
      display: none;
    }
  }
  #menu_click{/*修改菜单按钮位置样式，重新赋予id-20180328*/
    position: absolute;
    top:40px;
    left:7px;
  }
  #logo{/*修改大众logo位置样式，重新赋予id-20180328*/
    margin-left: -20px;
    position: absolute;
    left:-130px;
    top:9px;
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





  .list{top: 70px;
    position: absolute;
    height: 100%;}
  ul.el-menu{ height: calc(100% - 85px);
    /* border: solid 1px red; */
    overflow-y: auto;
  overflow-x: hidden;}


  /*滚动条样式开始*/



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
<style lang="scss" src="../../scss/app-while.scss"></style>
