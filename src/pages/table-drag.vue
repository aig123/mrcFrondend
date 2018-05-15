<template>
  <div class="content">
    <mrc-table-drag v-model="tableData"></mrc-table-drag>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  import language  from "../language/language";
  export default {
    data(){
      return {
        tableData:{
          title: [//表格信息
            {name: "编号", field: "sortId",width:"50",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"150",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"50",show:true,fixed:false,formatter:"sexFormatter"},//转换性别的内容
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"250",show:true,fixed:false},
            {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []//表格内部数据
        },
      };
    },
    methods: {//开始
      getTableData() {
        let param = {
          pageIndex: 1,
          searchData:{},
          sort:"",//排序字段
          sortasc:"",// asc desc
          pageSize: 100
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
