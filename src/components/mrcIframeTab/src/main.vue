<template>
  <div style="position: relative">
    <el-dropdown  style="position: absolute;top: 13px;right: 20px;z-index: 1000;cursor: pointer" @command="handleCommand">
                  <span class="el-dropdown-link">
                      <i class="el-icon-setting"></i>
                   </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="removeTab">关闭当前标签页</el-dropdown-item>
        <el-dropdown-item command="b">关闭其他标签页</el-dropdown-item>
        <el-dropdown-item command="c">关闭左侧标签页</el-dropdown-item>
        <el-dropdown-item command="d">关闭右侧标签页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <iframe   style="width:100%; height:500px;border: 0" :src="item.src" v-if="item.src"></iframe>
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
    <el-button @click="removeTab(editableTabsValue)">关闭当前</el-button>
    <el-button @click="removeTab()">关闭其他</el-button>
  </div>
</template>

<script>
  export default {
    name: "iframe-tab",
    props: [],
    data(){
      return {
        routerType:"normal",
        editableTabsValue: '',
        editableTabs: [],
        tabIndex: 1
      }
    },
    methods:{
      addTab(targetName,src) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: targetName,
          name: newTabName,
          src:src
        });
        this.editableTabsValue = newTabName;
      },

      //
      handleCommand(command) {//点击下拉的回调函数
        if (command === 'removeTab') {
         // removeTab(editableTabsValue)

        }
      },
      //
      removeTab(targetName) {
        console.log(targetName)
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
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
    watch:{
      $route(data) {
        if (data.meta[0] &&data.meta[0].type && data.meta[0].type == 'iframe') {
          this.addTab(data.meta[0].name, data.meta[0].url);
        }
      }
    },
    mounted() {
      if (this.$route.meta[0] &&this.$route.meta[0].type && this.$route.meta[0].type == 'iframe') {
        this.addTab(this.$route.meta[0].name, this.$route.meta[0].url);
      }
    }
  }

</script>
