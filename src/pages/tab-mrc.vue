<template>
  <div style="padding: 20px;">
    <div style="margin-bottom: 20px;">

      <el-button
        size="small"
        @click="addTab('百度','https://www.baidu.com/')"
      >
        百度
      </el-button>
      <el-button
        size="small"
        @click="addTab('新浪','http://www.sina.com.cn/')"
      >
        新浪
      </el-button>
      <el-button
        size="small"
        @click="addTab('搜狐','http://www.sohu.com/')"
      >
       搜狐
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <iframe   style="width:100%; height:400px" :src="item.src" v-if="item.src"></iframe>
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        editableTabsValue2: '1',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 contentTab 1 contentTab 1 contentTab 1 contentTab 1 contentTab 1 contentTab 1 contentTab 1 contentTab 1 content'
        }],
        tabIndex: 1
      }
    },
    methods: {
      addTab(targetName,src) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: targetName,
          name: newTabName,
          src:src
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
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

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>
