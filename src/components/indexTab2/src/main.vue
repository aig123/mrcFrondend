<template>
  <div class="sys_con" :class="{sys_close:close}">
    <div class="sys_route">
      <div class="sys_header"><!--sys_header开始-->
        <h5 class="sys_df" style="margin-top: 20px;position: absolute;z-index: 2" v-if="!$store.getters.phone">
          <el-radio-group v-model="languageValue" @change="languageChange">
            <el-radio  label="cn">中文</el-radio>
            <el-radio  label="en">英文</el-radio>
          </el-radio-group>
        </h5><!--搜索按钮图片-->
        <div class="sys_head el-dropdown-link" v-if="!$store.getters.phone">
          <el-dropdown @command="" class="personBox" trigger="click">
            <div>
              {{user}}<i class="el-icon-arrow-down el-icon--right"></i><br />
            <span>{{department}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="imgBox">
            <img src="./assets/1.png" alt="" width="50" height="50" style="">
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="20"><h4>{{title}}</h4></el-col>
        </el-row>
      </div><!--sys_header结束-->
      <div class="sys_route_out">
        <transition name="router-fade" mode="out-in">
          <!--<keep-alive>-->
          <div>
          <router-view v-if="routerType=='normal'"></router-view>
          <!--</keep-alive>-->
          <mrc-iframe-tab  v-if="routerType=='iframe'"> </mrc-iframe-tab>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import language  from "../../language/language";
  export default {
    name: "hh-index-tab",
    data(){
      return {
        close:false,
        currRoute: null,
        crumbs:[],
        cUrl: null,
        title:language.platformName,
        user:language.user,
        department:language.department,
        languageValue:"cn",
        // iframe tab 设置
        routerType:"normal",
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 1
      }
    },
    methods:{
      languageChange(val){
        localStorage.setItem('ELEMENT_LANGUAGE',val)
        window.location.reload();
      },
      addTab(targetName,src) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: targetName,
          name: newTabName,
          src:src
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabs;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
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
      },
      $route(data) {
        if (data.meta[0] &&data.meta[0].type && data.meta[0].type == 'iframe') {
          this.routerType = "iframe";
        }else {
          this.routerType = "normal";
        }
      }
    },
    mounted(){
      if (this.$route.meta[0] &&this.$route.meta[0].type && this.$route.meta[0].type == 'iframe') {
        this.routerType = "iframe";
      }else {
        this.routerType = "normal";
      }
      this.languageValue = localStorage.getItem('ELEMENT_LANGUAGE')
    }
  }
</script>
<style lang="scss">
  .sys_con{
    background-color: #fff;
    width:100%;
    height: 100%;
    padding-left: 220px;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    transition: all .5s;
    &.sys_close{
      padding-left: 64px;
    }
    .sys_route{
      position: relative;
      padding: 0px 10px 10px 5px;
      height: 100%;
      width:100%;
    }
    .sys_route_out{
      position: relative;
      width: 100%;
      height: -webkit-calc(100% - 90px);
      height: -moz-calc(100% - 90px);
      height: calc(100% - 90px);
      overflow-y: auto;
      top:100px;

    }
  }
  .sys_route_out > div{height: 100%}/*整个表格垂直方向铺满*/
  .searchForm{background: transparent;border:none;margin-left: 8px;overflow-x: hidden;}/*去除searchForm背景颜色和边框*/
  .el-input__inner {border-color: #9f9eb1 !important;background-color:white !important;color: #fff;}
  input{color:#9f9eb1 !important;}
</style>
<style src="./css/my.css" scoped></style>
