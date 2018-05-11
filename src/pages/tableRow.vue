<template>
  <div class="content">
    <mrc-table v-model="tableData"></mrc-table>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  import language  from "../language/language";
  export default {
    data(){
      return {
        tableData:{
          arraySpanMethodFn:"arraySpanMethod",//合并行方法
          pagination: {
            switch: true,//是否显示分页
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 30,
            pageIndex: 1,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },//是否开启分页
          selectionChangeFn:"",
          class:"",//添加自定义class
          title: [
            {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"",show:false,fixed:false,sortable:true},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:true},
            {name: "备注", field: "comment",width:"150",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: [],
          hideToolbar:true,
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
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
            return [2,1];
          } else if (columnIndex === 0) {
            return [0, 0];
          }
        }
      },
    },//开始
    mounted: function () {
      this.getTableData();
    },
  }
</script>
