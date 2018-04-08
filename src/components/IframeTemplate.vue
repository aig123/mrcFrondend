<template>
  <!--iframe页面展示区域-->
  <div id="fwIframe">
    <!--<Tabs class="full temporary-tabs" v-model="store.state.iframeSelectTab" type="card">-->
    <Tabs class="full temporary-tabs" :value="iframeSelectTab" type="card">
      <TabPane
        v-for="(item, index) in iframeTabData"
        :key="item.tag"
        :label="item.name"
        :name="item.tag"
      >
        <iframe :key="item.tag" v-once :src="item.url" frameborder="0"></iframe>
      </TabPane>
    </Tabs>
  </div>
</template>

<style lang="scss">
  #fwIframe {
    /*测试位置的时候显示这段--开始*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background-color: red;*/
    /*display: block !important;*/
    /*测试位置的时候显示这段--结束*/
    position: absolute;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 0;
    z-index: 5000 !important;
    .el-tab-pane {
      height: 100%;
      width: 100%;
      iframe {
        /*height: auto;*/
        min-height: 600px;
        /*height: calc(100% - 45px);*/
        width: 100%;
      }

    }
    .full {
      position: relative;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
</style>

<script>

  // selectTabCode=>iframeSelectTab
  // tabsList=>iframeTabData
  import {mapState} from 'vuex'
  import * as mainConst from '@/store/mainConst.js'
  export default{
    data(){
      return {
//    tabsList: [],
//    selectTabCode: ''
      }
    },
    computed: {
      ...mapState([
        'iframeTabData',
        'iframeSelectTab',
        'navTabData',
        'systemName'
      ])
    },
    mounted(){
      const _this = this

      // 1、监听添加iframe中tab的广播
      this.$root.bus.$on('addIframeTab', function (item) {

        // _this.tabsList.push(item)
        // _this.selectTabCode = item.tag
        _this.$store.commit(mainConst.M_IFRAME_PUSH_TAB, item)
        _this.$store.commit(mainConst.M_IFRAME_CHANGE_SELECTCODE, item.tag)
      })

      // 2、监听切换iframe中tab的广播
      this.$root.bus.$on('changeIframeTab', function (tag) {
        _this.$store.commit(mainConst.M_IFRAME_CHANGE_SELECTCODE, tag)

      })
      // 3、监听删除iframe中tab的广播
      this.$root.bus.$on('deleteIframeTab', function (obj) {
        // 1、删除iframe中的指定tab页面
        _this.$store.commit(mainConst.M_IFRAME_DELETE_TAB, obj)
        // _this.tabsList = _this.tabsList.filter(tab => tab.tag !== obj.tag)

        // 2、如果删除的一级tab不是当前激活的一级tab，TabsTemeplate中的一级tab删除事件已经在vuex中删除了，不需要做路由跳转操作了
        let index = obj.index
        for (let i = 0; i < _this.navTabData.length; i++) {
          if (_this.navTabData[i].active) {
            return
          }
        }

        // 3、如果删除的一级tab是当前激活的一级tab，
        const con = _this.navTabData[index - 1] || _this.navTabData[index]
        let url = `/${_this.systemName}`
        if (con) {
          // 还有其他的一级tab，就赋值其他的一级tab的url，探后跳转
          url = con.url
          con.active = true
=
          // 如果还有其他一级的tab,那么还要判断跳转的页面是不是iframe
          if (url.toLowerCase().indexOf("/iframe") == 0) {
            // 如果是iframe页面，显示iframe,广播iframe的切换tab切换事件，路由进行跳转
            _this.$store.commit(mainConst.M_SHOW_IFRAME)
            _this.$root.bus.$emit("changeIframeTab", url.slice(8))

          } else {
            // 如果不是iframe页面，隐藏iframe,路由进行跳转
            _this.$store.commit(mainConst.M_HIDE_IFRAME)
            // _this.$store.commit(mainConst.M_UPDATE_NAVTABDATA, {navIndex: index})
          }
        }
        else {
          // 没有其他的一级tab，直接隐藏iframe，跳首页
          _this.$store.commit(mainConst.M_HIDE_IFRAME)
        }

        _this.$router.push(url)
      })
    }
  }
</script>
