<template>
  <section  v-bind:class="[(tableData.class&&tableData.class!='') ? tableData.class : 'table_Height']" id="outer">
    <!--表格功能按钮-->
    <div id="user">用户</div>
    <div id="floatR">
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline">添加</el-button>
      <el-button
        type="text"
        icon="el-icon-rank">全屏</el-button>
      <el-button
        type="text"
        icon="el-icon-sort">行高</el-button>
      <el-button
        type="text"
        icon="el-icon-edit">字号</el-button>
    </div>
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
        label="操作"
        v-if="tableData.buttons&&tableData.buttons.length>0"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operateClick(scope.row,data.click)" :disabled="!scope.row[data.field]" size="mini" type="primary"  v-for="data in tableData.buttons" v-if="data.type=='default'"> {{data.name}}</el-button>
          <el-button @click="operateClick(scope.row,data.click)"  :disabled="!scope.row[data.field]" type="danger" size="mini"   v-for="data in tableData.buttons" v-if="data.type=='danger'">{{data.name}}</el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" :fullscreen="true" style="height: 100%">
      <el-table
        :data="tableData.data"
        :empty-text="tableData.emptyText"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%" height="90%">
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
          label="操作"
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
    </el-dialog>
  </section>
</template>
<style scoped>
  .el-dialog__body{
    height: 100%;
  }
</style>
<style>
  .import_img{
    margin-top: 40%;
    margin-left: 17%;
    cursor: pointer;
  }
  .table_Height {
    height: -webkit-calc(100% - 210px);
    height: -moz-calc(100% - 210px);
    height: calc(100% - 210px);
  }
  .el-dialog__body{
    height: -webkit-calc(100% - 41px);
    height: -moz-calc(100% - 41px);
    height: calc(100% - 41px);
  }
  #outer{
    border:solid 1px #dce0e1;border-radius:4px;padding:12px 20px
  }
  #floatR{
    float: right;margin-right: 18px;
  }
  #user{
    float: left;font-size: 22px;margin-bottom:16px;color:#a4aeb2
  }
</style>
<script>
  export default {
    name: 'mrc-table',
    template:'<div><input type="text" type="text" v-model="tableData"/></div>',
    data() {
      return {
        dialogTableVisible:false
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
      },
      // open(){
      //   var de = document.documentElement;
      //   if (de.requestFullscreen) {
      //     de.requestFullscreen();
      //   } else if (de.mozRequestFullScreen) {
      //     de.mozRequestFullScreen();
      //   } else if (de.webkitRequestFullScreen) {
      //     de.webkitRequestFullScreen();
      //   }
      // }
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
