<template>
  <div class="content">
    <mrc-table-simple v-model="tableData"></mrc-table-simple>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  import language  from "../language/language";
  export default {
    data(){
      return {
        tableData:{
          hideToolbar:true,
          pagination: {
            switch: false,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },
          index:false,//显示索引序号
          indexName:language.index,//索引序号标题
          Checkbox:false,//是否显示复选框
          selectionChangeFn:"",//Select框变化触发方法
          class:"",//添加自定义class
          buttons:[],//表格功能按钮
          operate:[{name:language.delect,click:"delData",type:'danger',field:"del"},{name:language.edit,click:"editData",type:'default',field:"edit"},{name:"查看",click:"viewData",type:'default',field:"view"}],//表格操作按钮
          title: [//表格信息
            {name: "编号", field: "sortId",width:"150",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"150",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"150",show:true,fixed:false},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"450",show:true,fixed:false},
            {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []//表格内部数据
        },
      };
    },
    methods: {//开始
      getTableData() {
        let param = {
          pageIndex: this.tableData.pagination.pageIndex,
          searchData:{},
          sort:"",//排序字段
          sortasc:"",// asc desc
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
    },
  }
</script>
