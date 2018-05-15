<template>
  <div class="content">
  <table class="table">
    <thead>
    <tr>
      <th width="50">排序</th>
      <th :width="title.width" v-for="title in tableData.title">{{title.name}}</th>
    </tr>
    </thead>
    <tbody>
     <tr v-dragging="{ item: data, list:tableData.data, group: 'data'}" v-for="(data,index) in tableData.data" :key="index">
      <td style="text-align: center">
        <i class="el-icon-menu" style="cursor: move"></i>
      </td>
      <td v-for="title in tableData.title">{{data[title.field]}}</td>
    </tr>
    </tbody>

  </table>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  import util from "../common/util";
  export default {
    data(){
      return {
        table: [
          {tr: [{name: 1}, {name: 1}, {name: 1}, {name: 1}, {name: 1}]},
          {tr: [{name: 2}, {name: 2}, {name: 2}, {name: 2}, {name: 2}]},
          {tr: [{name: 3}, {name: 3}, {name: 4}, {name: 3}, {name: 3}]},
          {tr: [{name: 4}, {name: 4}, {name: 1}, {name: 1}, {name: 1}]},
          {tr: [{name: 5}, {name: 5}, {name: 2}, {name: 2}, {name: 2}]},
          {tr: [{name: 6}, {name: 6}, {name: 4}, {name: 3}, {name: 3}]},
          {tr: [{name: 7}, {name: 7}, {name: 1}, {name: 1}, {name: 1}]},
          {tr: [{name: 8}, {name: 8}, {name: 2}, {name: 2}, {name: 2}]},
          {tr: [{name: 9}, {name: 9}, {name: 4}, {name: 3}, {name: 3}]},
          {tr: [{name: 10}, {name: 10}, {name: 1}, {name: 1}, {name: 1}]},
          {tr: [{name: 11}, {name: 21}, {name: 2}, {name: 2}, {name: 2}]},
          {tr: [{name: 12}, {name: 31}, {name: 4}, {name: 3}, {name: 3}]},
          ],
          tableData:{
          title: [//表格信息
            {name: "编号", field: "sortId",width:"150",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"150",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"150",show:true,fixed:false,formatter:"sexFormatter"},//转换性别的内容
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"450",show:true,fixed:false},
            {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []//表格内部数据
        },
      };
    },
    methods: {
      getTableData() {
        let param = {
          pageIndex:1,
          searchData:{},
          sort:"",//排序字段
          sortasc:"",// asc desc
          pageSize: 100
        };
        Api.getTableData(param).then((res) => {
          debugger
          this.tableData.data = res.data.data.content;
         // this.tableData.pagination.total = res.data.data.totalPages;
        })
      },
    },
    mounted: function () {
      debugger
      var  date=util.formatDate.format(new Date(), 'yyyy-MM-dd');
      console.log(util.formatDate.format(new Date(), 'yyyy-MM-dd'));
      console.log(util.formatDate.parse(date, 'yyyy-MM-dd'));
      this.getTableData();
    },
  }
</script>
<style lang="scss" scoped>
 table{
   width: 100%;
 }
  tr{
    width: 100px;
  }
  td{
    border: 1px solid #f56c6c;
    height: 50px;
    line-height: 50px;
  }
 .table {
   width: 100%;
   border: 1px solid #d1dbe5; border-width: 1px 1px 0 0;
   border-collapse:collapse; border-spacing:0;

 th,td {
   height: 40px;
   padding: 0 10px;
   border: 1px solid #d1dbe5; border-width: 0 0 1px 1px;
   background-color: #fff;
   color: #1f2d3d; font-size: 14px; line-height: 24px;
   vertical-align: middle;
   text-align: left;
 //&.left {text-align: left;}
 }
 //tbody tr:hover td,
   th {
     background-color: #eef1f6;
   }
 .table--empty {color: #5e7382; line-height: 60px;}
 }
</style>
