<template>
  <section  v-bind:class="[(tableData.class&&tableData.class!='') ? tableData.class : 'table_Height']">

    <el-table
      :data="tableData.data"
      :empty-text="tableData.emptyText"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%" height="100%">
      <!--check多选框-->
      <el-table-column
        type="selection"
        v-if="tableData.Checkbox"
        width="60">
      </el-table-column>
      <!--索引列-->
      <el-table-column
        :label="tableData.indexName"
        type="index"
        width="60"
        v-if="tableData.index"
      >
      </el-table-column>

      <el-table-column v-for="data in tableData.title"
        :prop="data.field"
        :label="data.name"
         v-if="data.show"
         :width="data.width"
         :fixed="data.fixed"
         :sortable="data.sortable"
         :show-overflow-tooltip="data.showOverflowTooltip"
         :align="data.align"
         :headerAlign="data.headerAlign"
        >
      </el-table-column>
      <!--操作栏-->
      <el-table-column
        label="操作455"
        v-if="tableData.buttons&&tableData.buttons.length>0"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operateClick(scope.row,data.click)" :disabled="scope.row[data.fieldname]" size="mini" type="primary"  v-for="data in tableData.buttons" v-if="data.type=='default'"> {{data.name}}</el-button>
          <el-button @click="operateClick(scope.row,data.click)"  :disabled="scope.row[data.fieldname]" type="danger" size="mini"   v-for="data in tableData.buttons" v-if="data.type=='danger'">{{data.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <el-pagination
      v-if="tableData.pagination.switch"
      style="float: right;margin-top: 10px"
      background
      :page-sizes="tableData.pagination.pageSizes"
      :layout="tableData.pagination.layout"
      @size-change="handleSizeChange"
       @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"

    >
    </el-pagination>

    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage4"-->
      <!--:page-sizes="[100, 200, 300, 400]"-->
      <!--:page-size="100"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="400">-->
    <!--</el-pagination>-->
  </section>
</template>
<style>
  .import_img{
    margin-top: 40%;
    margin-left: 17%;
    cursor: pointer;
  }
  .table_Height {
    height: -webkit-calc(100% - 102px);
    height: -moz-calc(100% - 102px);
    height: calc(100% - 102px);
  }

</style>
<script>
  export default {
    name: 'mrc-table',
    template:'<div><input type="text" type="text" v-model="tableData"/></div>',
    data() {
      return {
      };
    },
    props: ['value'],
//    props: {
//      value:Array,
//    },
    methods:{
      //Select框变化触发方法
      handleSelectionChange(val) {
       // this.multipleSelection = val;
        if(this.tableData.selectionChangeFn&&this.tableData.selectionChangeFn!=""){
          this.$parent[this.tableData.selectionChangeFn](val);
        }
      },
      //当前页变化触发方法
      handleCurrentChange(val) {
        this.tableData.pagination.pageIndex = val;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          this.$parent[this.tableData.pagination.CurrentChangeFn](val);
        }
      },
      //当前页显示条数变化 触发方法
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          this.$parent[this.tableData.pagination.CurrentChangeFn](val);
        }
      },
      //操作按钮触发方法
      operateClick(data,fn){
        this.$parent[fn](data);
      }
    },
    mounted: function () {
      this.tableData = this.value;
    },
    computed: {
      tableData: {
        // 动态计算currentValue的值
        get: function () {
          return this.value;
        },
        set: function (val) {
          this.$emit('input', val);
        }
      }
    },

  };
</script>
