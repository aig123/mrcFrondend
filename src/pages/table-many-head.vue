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
            {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"",show:false,fixed:false,sortable:true},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:true},
            {name: "备注", field: "comment",width:"150",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: [],
          hideToolbar:true,
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,
            pageIndex: 1,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },//是否开启分页
        }
      };
    },
    methods: {//开始
      getTableData() {
        let param = {
          pageIndex: 1,
          searchData:{},
          sort:"",//排序字段
          sortasc:"",// asc desc
          pageSize: 10000
        };
        Api.getTableData(param).then((res) => {
          this.tableData.data = res.data.data.content;
        })
      },
    },//开始
    mounted: function () {

      this.getTableData();
    },
  }
</script>
