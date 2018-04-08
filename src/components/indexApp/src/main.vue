<template>
  <div class="menu_right" :class="{closeMenu:isOpen}">
    <div class="listP">
      <div class="menu_head">
        <menuState ref="menuState" :isOpen="isOpen" @click="menuStateHandle"></menuState>
        <!--<a @click="menuStateHandle" ref="menuState" href="javascript:void(0)" :class="{on:isOpen}"><img src="./assets/menu_click.png"/></a>-->
      </div>
      <div class="list">
        <div class="list_bgcolor"></div>
        <div class="list_con">
          <ul>
            <li class="listCon" v-for = "(item, index) in menuListData" @click.stop = "listClickHandle(item)">
              <div class="cAccordion" :class="{titleBold:item.isCurr}">
                <a>
                  <!--图标-->
                  <span class="ca_img">
                    <span class="yellow" :class="{on:item.isCurr}"></span>
                    <span class="img">
                      <img :src="require('./assets/'+item.name+'.png')">
                      <!--<img src="./assets/demo.png">-->
                    </span>
                  </span>
                  <!--标题-->
                  <div class="ca_title">
                    <i :class="{on:item.isOpen}" v-show="item.childrens && item.childrens.length"></i>
                    <span class="title sopt">{{item.title}}</span>
                  </div>
                </a>
              </div>
              <div class="childrenList" v-if="item.childrens && item.childrens.length" :style="item.openStyle">
                <div class="btn_mask"></div>
                <div class="menu_children_li">
                  <span v-for="_item in item.childrens" :class="{titleColor: _item.isCurr}"  @click.stop = "listClickHandle(_item, $event)">
                      <span class="sTitle sopt">{{_item.title}}</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
        css:{
          //编辑
          isHidden: true
        },
        mouseenterArr:[],
        isOpen: false,//菜单是否打开
        childrenListHeight:40,
        menuListData:[]
      }
    },
    props:["title", "parentName"],
    computed:{
    },
    //方法
    methods:{
      changeOpen(element, bool){
        var _height = (this.childrenListHeight * element.childrens.length) +"px";
        if(!bool){
          _height = 0;
        }
        return {height: _height};
      },
      //点击close关闭
      closeListHandle(index){
        this.menuListData.splice(index, 1);
      },
      //点击每个ELE
      listClickHandle(currRouteMap){
        //有子的展开菜单
        if((currRouteMap.lev == 1 && currRouteMap.childrens && currRouteMap.childrens.length > 0) && currRouteMap.lev != 2){
          if(currRouteMap.isOpen){
            this.closeAllAccord();
            this.menuListData = Object.assign([], this.menuListData);
          }else {
            this.openAccordionMenu(currRouteMap);
          }
          //没子的跳转
        }else {
          var _parentName = "";
          //解决有子子路由跳回父路由找不到页面问题
          if(this.parentName)
            _parentName = "/"+this.parentName+"/";
          this.$router.push({path:_parentName + currRouteMap.path});
        }
      },
      //折叠初始化
      closeAllAccord(){
        var that = this;
        var _arr =  this.menuListData;
        _arr.forEach(function(element){
          //that.$set(element, "currRouterMap", null);
          if(element.childrens && element.childrens.length > 0){
            element.isOpen = false;
            element.openStyle = that.changeOpen(element, element.isOpen);
          }
        });
      },
      //展开当前
      openAccordionMenu(currRouteMap){
        this.closeAllAccord();
        currRouteMap.isOpen = true;
        currRouteMap.openStyle = this.changeOpen(currRouteMap, currRouteMap.isOpen);
        this.menuListData = Object.assign([], this.menuListData);
      },
      //初始化当前项
      initChildrenStyle(){
        this.menuListData.forEach(function(element){
          if(element.childrens && element.childrens.length > 0){
            element.isCurr = false;
            element.childrens.forEach(function(_element){
              _element.isCurr = false;
            });
          }else {
            element.isCurr = false;
          }
        });
      },
      menuStateHandle(){
        var _this = this;
        this.$refs["menuState"].$off("MENUSTATE", this.menuStateHandle);
        this.isOpen = this.isOpen ? false : true;
        this.$store.commit("MENUSTATE", this.isOpen);
        setTimeout(function(){
          _this.$refs["menuState"].$on("MENUSTATE", _this.menuStateHandle);
        }, 500)

      },
      //改变样式
      changeState(currRouter){
        this.closeAllAccord();
        var _element = currRouter;
        if(_element){
          this.initChildrenStyle();
          if(_element.parent){
            var _currParent = null;
            var _currElement = null;
            if(_element.type == "children"){
              _currParent = _element.parent;
              _currElement = _element;
              _currParent.isOpen = true;
              _currParent.openStyle = this.changeOpen(_currParent, _currParent.isOpen);
            }
            _currElement.isCurr = true;
            _currParent.isCurr = true;
          }else{
            _element.isCurr = true;
          }
        }
        this.menuListData = Object.assign([], this.menuListData);
      },
      //清除所有滑过事件
      clearMouseenter(doms){
        var _this = this;
        doms.forEach(function(element, index){
          element.removeEventListener("mouseenter", _this.mouseenterArr[index])
        });
      },
      clearCollLays(){
        document.querySelectorAll(".listCon").forEach(function(element, index) {
          if (element.querySelector(".childrenList")) {
            element.querySelector(".childrenList").classList.remove("on");
          }
        });
      },
      mouseenterHandle(){
        return function(){

        }
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
    computed:{
      currRouteData(){
        return this.$store.getters.currRouter;
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
      currRouteData(val){
        //选项卡状态监控
        //改变当前菜单状态
        this.changeState(val);
      },
      menuListData(val){
        //console.log("menuListData................");
      }
    },
    mounted(){
      //this.$store.commit("LOADHOME", true);
      var that = this;
      var _listArr = [];
      var _arr = this.$router.options.routes[0].children;
      _arr.forEach(function(element, _index){
        if(!element.hasOwnProperty("parent")){
          if(element.hasOwnProperty("childrens")){
            //是否展开
            element.isOpen = false;
            element.openStyle = that.changeOpen(element, element.isOpen);
          }else {
            element.openStyle = "";
          }
          _listArr.push(element);
        };
      });
      this.$set(this.$data, "menuListData", _listArr);
      this.$refs["menuState"].$on("MENUSTATE", this.menuStateHandle);
    }
  }
</script>
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
      width: 55px;

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
    left:0;
  }
  #logo{/*修改大众logo位置样式，重新赋予id-20180328*/
    margin-left: -20px;
    position: absolute;
    left:-130px;
    top:20px;
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
</style>
<style lang="scss" src="../../scss/app-while.scss"></style>
