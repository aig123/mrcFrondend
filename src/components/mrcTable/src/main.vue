﻿<template>
  <section  id="outer" :style="'height:'+ '-webkit-calc(100% - '+sHeight+'px)'+';'+'height:'+ 'calc(100% - '+sHeight+'px)' ">
    <!--表格功能按钮-->
    <div id="user">{{tableData.description}}</div>
    <div id="floatR">
      <el-button type="text" icon="el-icon-rank" @click="dialogTableVisible=true" v-if="tableData.FullScreen">{{fullScreenName}}</el-button>
      <el-button
        type="text"
        :icon="data.icon" v-for="data in tableData.buttons" :key="data.name" @click="operateClick(data.click)">{{data.name}}</el-button>
      <!--小按钮开始-->
      <div class="show-set" style="margin-left:8px">
        <span class="el-icon-setting" @click="searDialogVisible=true"></span>
      </div>
      <!--小按钮结束-->
    </div>
    <el-table
      :data="tableData.data"
      :empty-text="tableData.emptyText"
      border
      @selection-change="handleSelectionChange"
      height="80%" style="width: 99%;margin: 0 auto;"
      class="mrcTable">
      <!--v-bind:class="[(tableData.class&&tableData.class!='') ? tableData.class : 'table_Height']"-->
      <!--check多选框-->
      <el-table-column
        width="80" label="拖拽排序">
        <template slot-scope="scope">
          <!--<i class="el-icon-menu" style="cursor: pointer"></i>-->
          <drop @drop="handleDrop(scope.row, ...arguments)" class="event">
            <drag :transfer-data="scope.row" class="drag"> <i class="el-icon-menu" style="cursor: move"></i>
              <div slot="image" class="drag-image">
                <ul>
                  <li style="float: left;list-style-type:none;width: 350px" v-for="(data,index) in tableData.title" :key="index">{{scope.row[data.field]}}</li>
                  <li ></li>
                </ul>
              </div>
            </drag>
          </drop>
        </template>
      </el-table-column>
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

      <el-table-column v-for="(data,index) in tableData.title"
                       :key="index"
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
        v-if="tableData.buttons&&tableData.operate.length>0"
        width="150">
        <template slot-scope="scope">
          <el-button @click="operateClick(data.click,scope.row)" :disabled="!scope.row[data.field]" size="mini" type="text"  v-for="data in tableData.operate" :key="data.name" v-if="data.type=='default'"> {{data.name}}</el-button>
          <el-button @click="operateClick(data.click,scope.row)"  :disabled="!scope.row[data.field]" type="text" size="mini"   v-for="data in tableData.operate" :key="data.name" v-if="data.type=='danger'">{{data.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <el-pagination
      v-if="tableData.pagination.switch"
      background
      :page-sizes="tableData.pagination.pageSizes"
      :layout="tableData.pagination.layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
      class="tablePaging"
    >
    </el-pagination>
    <el-dialog title="全屏列表" :visible.sync="dialogTableVisible" :fullscreen="true" style="height: 100%">
      <el-table
        :data="tableData.data"
        :empty-text="tableData.emptyText"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;overflow-y: auto"
        class="dialogTable">
        <!--check多选框-->
        <el-table-column
          type="selection"
          v-if="tableData.Checkbox"
          width="60">
        </el-table-column>
        <!--索引列 -->
        <el-table-column
          :label="tableData.indexName"
          type="index"
          width="60"
          v-if="tableData.index"
        >
        </el-table-column>

        <el-table-column v-for="(data,index) in tableData.title"
                         :prop="data.field"
                         :key="index"
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
            <el-button @click="operateClick(data.click,scope.row)" :disabled="!scope.row[data.field]" size="mini" type="text"  v-for="data in tableData.operate" :key="data.name" v-if="data.type=='default'"> {{data.name}}</el-button>
            <el-button @click="operateClick(data.click,scope.row)"  :disabled="!scope.row[data.field]" type="text" size="mini"   v-for="data in tableData.operate" :key="data.name" v-if="data.type=='danger'">{{data.name}}</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <el-pagination
        v-if="tableData.pagination.switch"
        background
        :page-sizes="tableData.pagination.pageSizes"
        :layout="tableData.pagination.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
        class="dialogPaging"
      >
      </el-pagination>
    </el-dialog>
    <el-dialog
      title="设置表格"
      :visible.sync="searDialogVisible"
      width="30%">
      <span>
        <el-checkbox-group v-model="fields" style="margin-top: 10px">
          <el-checkbox  v-dragging="{ item: data, list: tableData.title, group: 'data'}" v-for="(data,index) in tableData.title" :label="data.field" :key="data.field">{{data.name}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
           <el-button @click="searDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<style>
  #outer{
    border:solid 1px #dce0e1;
    border-radius:4px;
    padding:12px 20px;
    height:calc(100% - 73px);
    margin: 0 2px;

  }
  #floatR{
    float: right;margin-right: -14px;margin-top:-5px
  }
  #user{
    float: left;font-size: 18px;margin-bottom:16px;color:#a4aeb2;margin-left: 8px;
  }
  .tablePaging,.dialogPaging{text-align: right;margin-top: 10px}/*分页右对齐和上边界*/
  .mrcTable{height: calc(100% - 80px) !important;}/*表格高度*/
  .dialogTable{height: calc(100% - 43px) !important}/*调整dialog内部分页位置*/
  .el-checkbox:first-child {/*调整弹窗内部复选框对齐*/
    margin-left: 30px!important;
  }
</style>
<script>
  import language  from "../../language/language";
  export default {
    name: 'mrc-table',
    template:'<div><input type="text" type="text" v-model="tableData"/></div>',
    data() {
      return {
        dialogTableVisible:false,
        fullScreenName:language.fullScreen,
        searDialogVisible:false,//默认表格排序隐藏
        fields:[]//为checkbox绑定数据

      };
    },
    props: ['value'],
//    props: {
//      value:Array,
//    },
    methods:{
      handleDrop(toList, data) {
         debugger
         let indexTo=this.tableData.data.indexOf(toList);
         let index=this.tableData.data.indexOf(data);
         let _toList=Object.assign({}, toList);
         let _data=Object.assign({}, data);
        // console.log(indexTo);
      //  this.tableData.data[1].id=23;
        for(let title of this.tableData.title){
          this.tableData.data[indexTo][title.field]=_data[title.field];
          this.tableData.data[index][title.field]=_toList[title.field];
        }
      //  this.tableData.data[0]=Object.assign({}, toList);
       // this.tableData.data[0]=toList;
       // this.tableData.data.splice(this.tableData.data.indexOf(data) - 1, 1, ... this.tableData.data.splice(this.tableData.data.indexOf(toList)- 1, 1, this.tableData.data[this.tableData.data.indexOf(data) - 1]))
      },
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
      operateClick(fn,data,){
        this.$parent[fn](data);
      },

      //点击保存按钮触发方法
      save(){
        this.searDialogVisible=false;
        console.log(this.fields);
        for(let showFalse of this.tableData.title){
           showFalse.show=false
         }
        for(let data of this.tableData.title){
          for(let field of this.fields){
            if(field==data.field){
              data.show=true
            }
          }
        }
      },
    },
    mounted: function () {
      this.tableData = this.value;
      this.fields=[];
      for(let data of this.tableData.title){
      if(data.show==true){
        this.fields.push(data.field);
      }
      }
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
      },
      sHeight() {
        return this.$store.getters.sHeight;
      }
    },

  };
</script>
