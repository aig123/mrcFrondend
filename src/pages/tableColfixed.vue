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
          title: [
            {name: "编号", field: "id",width:"200",show:true,fixed:true,sortable:true},
            {name: "姓名", field: "name",width:"400",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"200",show:false,fixed:false,sortable:true},
            {name: "日期", field: "date",width:"300",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"600",show:true,fixed:false,sortable:true},
            {name: "备注", field: "comment",width:"450",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 30,
            pageIndex: 1,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },

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
    },//开始
    mounted: function () {

      this.getTableData();
    },
  }
</script>
