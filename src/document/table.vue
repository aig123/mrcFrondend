<template>
  <div style="padding: 10px;overflow: scroll;height: 100%;">
    <mrc-table v-model="tableData"></mrc-table>
    <br> <br> <br>
    <pre class="language-html"><code>&lt;mrc-table v-model="formData"&gt;&lt;/mrc-table&gt;</code></pre>
    <pre class="language-js"><code>  data(){
        return {
          tableData:{
            class:"mrc-table",//添加自定义class
            pagination: {
              switch: true,
              CurrentChangeFn: "getTableData",
              pageSize: 5,
              pageIndex: 1,
              layout: "prev, pager, next, jumper, total",
              pageSizes: [10, 20, 40],

            },//是否开启分页
            index:false,//显示索引序号
            indexName:"序号",
            Checkbox:false,
            selectionChangeFn:"",
            buttons:[{name:"删除",click:"delect",type:'danger',fieldname:"del"},{name:"编辑",click:"edit",type:'default',fieldname:"edit"}],
            title: [
              {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
              {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:false},
              {name: "性别", field: "sex",width:"",show:false,fixed:false,sortable:false},
              {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
              {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:false},
              {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
            ],
            data: []
            //数据后端返回  格式参考
             [{id: 1, name: "zhangsan", sex: "男", date: "2018-3-19", city: "长春", comment: "这是一个备注","del":false,edit:true}],
          }
        };
    },
   methods: {
     getTableData() {
        let param = {
          pageIndex: this.tableData.pagination.pageIndex,
          condition: "",
          pageSize: this.tableData.pagination.pageSize
        };
        Api.getTableData(param).then((res) => {
          this.tableData.data = res.data.data.content;
          this.tableData.pagination.total = res.data.data.totalPages;
        })
      }
    },
    </code></pre>
    <pre class="language-css"><code>
      &lt;style>
         .mrc-table{
           height: 260px;
         }
      &lt;/style>
    </code></pre>
    <div style="width: 100%">
      <el-table
        :data="apiData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="param"
          align="left"
          header-align="left"
          label="参数"
          width="230">
        </el-table-column>
        <el-table-column
          prop="instruction"
          label="说明"
          align="left"
          header-align="left"
         >
        </el-table-column>
        <el-table-column
          prop="type"
          align="left"
          header-align="left"
          width="100"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="default"
          align="left"
          width="100"
          header-align="left"
          label="默认值">
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 30px"></div>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  export default {
    name: 'demo',
    data(){
      return {
        tableData:{
          class:"mrc-table",//添加自定义class
          pagination: {
            switch: true,
            CurrentChangeFn: "getTableData",
            pageSize: 5,
            pageIndex: 1,
            layout: "prev, pager, next, jumper, total",
            pageSizes: [10, 20, 40],

          },//是否开启分页
          index:false,//显示索引序号
          indexName:"序号",
          Checkbox:false,
          selectionChangeFn:"",
          buttons:[{name:"删除",click:"delect",type:'danger',fieldname:"del"},{name:"编辑",click:"edit",type:'default',fieldname:"edit"}],
          title: [
            {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:false},
            {name: "性别", field: "sex",width:"",show:false,fixed:false,sortable:false},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:false},
            {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: [
          ],
          emptyText:"这里面没有数据啊········"
        },
        apiData:[
          {param:"class",instruction:"自定义table样式，例如定义高度",type:"对象",default:"空"},
          {param:"pagination",instruction:"分页配置",type:"对象",default:"false"},
          {param:"pagination=>switch",instruction:"是否显示分页",type:"bool",default:"false"},
          {param:"pagination=>CurrentChangeFn",instruction:"点击分页触发的回调方法",type:"字符串",default:"空"},
          {param:"pagination=> pageSize",instruction:"每页显示条目个数",type:"Number",default:"空"},
          {param:"pagination=> pageIndex",instruction:"当前页数",type:"Number",default:"1"},
          {param:"pagination=> layout",instruction:"组件布局，子组件名用逗号分隔[sizes, prev, pager, next, jumper, total]",type:"String",default:"空"},
          {param:"pagination=> pageSizes",instruction:"每页显示个数选择器的选项设置",type:"Number[]",default:"空"},
          {param:"index",instruction:"显示索引序号",type:"bool",default:"false"},
          {param:"indexName",instruction:"自定义索引名称",type:"String",default:"序号"},
          {param:"Checkbox",instruction:"表格显示多选框",type:"bool",default:"false"},
          {param:"selectionChangeFn",instruction:"多选框选中变化触发的方法，返回选中行数据",type:"字符串",default:"空"},

          {param:"buttons",instruction:"操作区的操作按钮",type:"[]",default:"空"},
          {param:"buttons=>name",instruction:"按钮名称",type:"String",default:"空"},
          {param:"buttons=>click",instruction:"按钮点击触发的方法",type:"String",default:"空"},
          {param:"buttons=>danger",instruction:"按钮类型 danger 为红色",type:"String",default:"空"},
          {param:"buttons=>fieldname",instruction:"操作本身字段名",type:"字符串",default:"空"},

          {param:" title",instruction:"表头",type:"String",default:"空"},
          {param:" title=>name",instruction:"表头名称",type:"String",default:"空"},
          {param:" title=>field",instruction:"字段名称",type:"String",default:"空"},
          {param:" title=>width",instruction:"列的宽度",type:"String",default:"自适应"},
          {param:" title=>show",instruction:"列是否显示",type:"bool",default:"false"},
          {param:" title=>fixed",instruction:"固定列",type:"bool",default:"false"},
          {param:" title=>sortable",instruction:"是否进行排序",type:"bool",default:"false"},
          {param:" data",instruction:"数据源",type:"[]",default:""},
          {param:" emptyText",instruction:"空数据时显示的文本内容",type:"String",default:"暂无数据"},

        ]
      };
    },
    methods: {
      getTableData() {
        let param = {
          pageIndex: this.tableData.pagination.pageIndex,
          condition: "",
          pageSize: this.tableData.pagination.pageSize
        };
        Api.getTableData(param).then((res) => {
          this.tableData.data = res.data.data.content;
          this.tableData.pagination.total = res.data.data.totalPages;
        })
      },
    },
    mounted: function () {
      this.getTableData();
    }
  }
</script>
<style scoped>
  .mrc-table{
    height: 260px;
  }

</style>
