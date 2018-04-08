<template>
  <div style="padding: 10px;overflow: scroll;height: 100%;">
    <mrc-search-form v-model="formData" style="padding: 10px"></mrc-search-form>
    <pre class="language-html"><code>&lt;mrc-search-form v-model="formData"&gt;&lt;/mrc-search-form&gt;</code></pre>
    <pre class="language-js"><code>  data(){
        return {
          formData:{
            buttons:{dataLeft:[{name:"搜索",click:"search"}],dataRight:[{name:"导出",click:"add"}]},
            data:[
              {type:'input',title:"姓名",value:"aiguang",placeholder:"默认的姓名"},
              {type:'input',title:"年龄",value:"12",placeholder:"请输入年龄"},
              {type:'select',title:"年级",change:"alert(3)",key:{label:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],value:1},
            ]
          },
        };
    },
   methods: {
      search(){
        this.formData.data[0].value="搜索改变了这里的值";
      }
    },</code></pre>
    <div style="width: 100%">
      <table class="table">
        <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>formData</td>
          <td>组件的数据配置</td>
          <td>对象</td>
          <td>—</td>
        </tr>
        <tr>
          <td>buttons</td>
          <td>搜索栏显示的按钮，dataLeft 左边显示，dataRight右边显示，name 显示名称，click 点击触发的方法名</td>
          <td>对象</td>
          <td>空</td>
        </tr>
        <tr>
          <td>data</td>
          <td>循环的数据源</td>
          <td>数组</td>
          <td>空</td>
        </tr>
        <tr>
          <td>type:'input'</td>
          <td>输入框，title 显示的名称 value 输入框的值  placeholder 为空默认显示的值</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>type:'select'</td>
          <td>下拉框，title 显示的名称 value 下拉框的值 change 值改变触发的方法名  key=》label 数据源 key的名称，value 数据源 value 的名称</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>type:'select'=》data</td>
          <td>select数据源</td>
          <td>—</td>
          <td>—</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'demo',
    data(){
      return {
        tableData:{
          datad:true,
          Pagination:true,
          title:[{name:"时间",value:"date"},{name:"姓名",value:"name"},{name:"地址",value:"address"}],
          data:[
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        },
        formData:{
          buttons:{dataLeft:[{name:"搜索",click:"search"}],dataRight:[{name:"导出",click:"add"}]},
          data:[
            {type:'input',title:"姓名",value:"aiguang",placeholder:"默认的姓名"},
            {type:'input',title:"年龄",value:"12",placeholder:"请输入年龄"},
            {type:'select',title:"年级",change:"alert(3)",key:{label:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],value:1},
          ]
        },

      };
    },
    methods: {
      search(){
        this.formData.data[0].value="搜索改变了这里的值";
      }
    },
    mounted: function () {
      // this.getDatas();
    }
  }
</script>
<style scoped>
  .title{
    padding: 10px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;
  }
  table th {
    border-bottom: 1px solid #d8d8d8;
    padding: 15px;
    max-width: 250px;
    text-align: left;
    white-space: nowrap;
    color: #666;
    font-weight: 400;
  }
  td {
    color: #333;
  }
  table td,table th {
    border-bottom: 1px solid #d8d8d8;
    padding: 15px;
    max-width: 250px;
    text-align: left;
  }
</style>
