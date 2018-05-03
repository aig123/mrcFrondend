<template>
  <div class="content">
    <div class="searchForm" style="margin-bottom: 10px">
      <div class="searchForm--item" v-if="!more">
        <label class="searchForm--item__label">姓名</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="默认的姓名" size="small"></el-input>
        </div>
        <label class="searchForm--item__label">年龄</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="请输入年龄" size="small" title="年龄"></el-input>
        </div>
        <label class="searchForm--item__label">年级</label>
        <div class="searchForm--item__content">
          <el-select v-model="data.value" @change="gradeChange" size="small" placeholder="请选择">
            <el-option label="一年级" value="1"></el-option>
            <el-option label="二年级" value="2"></el-option>
          </el-select>
          <el-date-picker type="date" placeholder="选择日期" v-model="data.value" size="small" v-if="false"></el-date-picker>
        </div>
      </div>
      <div class="searchForm--item" v-if="more">
        <label class="searchForm--item__label">姓名</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="默认的姓名" size="small"></el-input>
        </div>
        <label class="searchForm--item__label">年龄</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="请输入年龄" size="small" title="年龄"></el-input>
        </div>
        <label class="searchForm--item__label">年级</label>
        <div class="searchForm--item__content">
          <el-select v-model="data.value" @change="gradeChange" size="small" placeholder="请选择">
            <el-option label="一年级" value="1"></el-option>
            <el-option label="二年级" value="2"></el-option>
          </el-select>
          <el-date-picker type="date" placeholder="选择日期" v-model="data.value" size="small" v-if="false"></el-date-picker>
        </div>
        <label class="searchForm--item__label">text5</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="请输入年龄" size="small" title="年龄"></el-input>
        </div>
        <label class="searchForm--item__label">text6</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="请输入年龄" size="small" title="年龄"></el-input>
        </div>
        <label class="searchForm--item__label">text7</label>
        <div class="searchForm--item__content">
          <el-input type="input" placeholder="请输入年龄" size="small" title="年龄"></el-input>
        </div>
      </div>
      <div  class="searchForm--item" style="margin-left: 10px">
        <el-button type="primary" @click="" size="small">搜索</el-button>
        <el-button type="primary" @click="moreSearch" size="small">{{moreName}}</el-button>
      </div>
      <div class="show-set">
        <span class="el-icon-setting" @click="searDialogShow"></span>
      </div>
    </div>
    <div id="outer">
      <div id="user">用户</div>
      <div id="floatR">
        <el-button
          type="text"
          icon="el-icon-rank" @click="dialogTableVisible=true">全屏</el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline" @click="addData">增加</el-button>
        <el-button
          type="text"
          icon="el-icon-upload">导入</el-button>
        <el-button
          type="text"
          icon="el-icon-download">导出</el-button>
      </div>
      <el-table
        :data="tableData.data"
        :empty-text="tableData.emptyText"
        border
        @selection-change="handleSelectionChange"
        height="80%" style="width: 99%;margin: 0 auto;"
        class="mrcTable">
        <!--check多选框-->
        <el-table-column
          type="selection"
          v-if="tableData.index"
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
        <el-table-column label="编号"
                         prop="id"
                         sortable>
        </el-table-column>
        <el-table-column label="姓名"
                         prop="name">
        </el-table-column>
        <el-table-column label="日期"
                         sortable
                         width="150"
                         prop="date">
        </el-table-column>
        <el-table-column label="城市"
                         prop="city">
        </el-table-column>
        <el-table-column label="备注"
                         prop="comment"
                         show-overflow-tooltip="true"
                         align="left"
                         headerAlign="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="150"
                         v-if="tableData.buttons&&tableData.buttons.length>0">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="editData(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="delData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="true"
        style="position: fixed; bottom: 15px;right: 10px;"
        background
        :page-sizes="tableData.pagination.pageSize"
        :layout="tableData.pagination.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
        class="tablePaging">
      </el-pagination>
      <!--表格分页结束-->
    </div>
    <!--全屏分页开始-->
    <el-dialog title="全屏列表" :visible.sync="dialogTableVisible" :fullscreen="true" style="height: 100%">
      <el-table
        :data="tableData.data"
        :empty-text="tableData.emptyText"
        border
        @selection-change="handleSelectionChange"
        height="80%" style="width: 99%;margin: 0 auto;"
        class="dialogTable">
        <!--check多选框-->
        <el-table-column
          type="selection"
          v-if="tableData.index"
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
        <el-table-column label="编号"
                         prop="id"
                         sortable>
        </el-table-column>
        <el-table-column label="姓名"
                         prop="name">
        </el-table-column>
        <el-table-column label="日期"
                         sortable
                         width="150"
                         prop="date">
        </el-table-column>
        <el-table-column label="城市"
                         prop="city">
        </el-table-column>
        <el-table-column label="备注"
                         prop="comment"
                         show-overflow-tooltip="true"
                         align="left"
                         header-align="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="150"
                         v-if="tableData.buttons&&tableData.buttons.length>0"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="editData(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="delData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--全屏内分页栏开始-->
      <el-pagination
        v-if="tableData.pagination.switch"
        style="position: fixed; bottom: 15px;right: 10px;"

        :page-sizes="tableData.pagination.pageSizes"
        :layout="tableData.pagination.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
        class="dialogPaging"
      >
      </el-pagination>
      <!--全屏内分页栏结束-->
    </el-dialog>
    <!--全屏分页结束-->
    <!--点击新增按钮弹窗开始-->
    <el-dialog
      title="增加"
      width="40%"
      :visible.sync="dialogData">
      <el-form :model="formData" :rules="formData.rules" :ref="formData.name" label-width="80px">
        <div style="width: 100%;height: 20px"></div>
        <el-form-item label="编号" style="width: 95%;" prop="id">
          <el-input auto-complete="off" style="width: 100%" v-model="formData.data.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="width: 95%;" prop="name">
          <el-input style="width: 100%" v-model="formData.data.name"></el-input>
        </el-form-item>
        <el-form-item label="日期" style="width: 95%;" prop="date">
          <el-date-picker type="date" placeholder="选择日期"  style="width: 100%" v-model="formData.data.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="城市" style="width: 95%;" prop="city">
          <el-input auto-complete="off" style="width: 100%" v-model="formData.data.city"></el-input>
        </el-form-item>
        <el-form-item label="备注" style="width: 95%;">
          <el-input auto-complete="off" placeholder="请输入备注" style="width: 100%" v-model="formData.data.comment"></el-input>
        </el-form-item>
      </el-form>
      <slot></slot>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogData = false">取消</el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </span>
    </el-dialog>
    <!--点击新增按钮弹窗结束-->


    <!--修改searchForm顺序和显示哪个-->
    <el-dialog
      title="更多设置"
      :visible.sync="searDialogVisible"
      width="30%">
      <span>
        <el-checkbox-group v-model="fields" style="margin-top: 10px">
            <el-checkbox  v-dragging="{ item: data, list: formData.moreData, group: 'data'}" v-for="(data,index) in formData.moreData" :label="data.field" :key="data.field">{{data.title}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
           <el-button @click="searDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改searchForm顺序和显示哪个-->

  </div>
</template>
<script>
  import * as Api from "../api/api";
  import language  from "../language/language";
  export default {
    data(){
      return {
        more:false,//更多条件和更少条件切换
        moreName: language.moreConditions,//默认显示更多条件
        dialogData:false,
        dialogTableVisible:false,//全屏dialing默认返回值
        searDialogVisible:false,//点击弹窗编辑更多和拖拽顺序
        fields:[],
        tableData:{
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 10,
            pageIndex: 1,
            layout: "prev, pager, next, jumper, total",//组件布局，子组件名用逗号分隔
            pageSizes: [10, 20, 40],
          },//是否开启分页
          index:false,//显示索引序号
          indexName:"序号",
          Checkbox:false,
          selectionChangeFn:"",
          class:"",//添加自定义class
          buttons:[{name:"增加",click:"addData",icon:"el-icon-circle-plus-outline"}],
          operate:[{name:"编辑",click:"delData",type:'danger',field:"del"},{name:"编辑",click:"editData",type:'default',field:"edit"}],
          data: []
        },
        formData:{
          moreData:[
            {type:'input',title:language.name,name:"",field:"name",placeholder:language.name},
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'input',title:language.grade,grade:"",field:"grade",placeholder:language.grade},
            {type:'input',title:"test5",test5:"",field:"test5",placeholder:language.age},
            {type:'input',title:"test6",test6:"",field:"test6",placeholder:language.name},
            {type:'input',title:"test7",test7:"",field:"test7",placeholder:language.age},
            {type:'select',title:"test8",change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],test8:"",field:"test8"},
          ],
        },
        //下拉列表开始
        data:{
          value:"",
        },
        //下拉列表结束
        formData:{
          name:"form",
          data:{//弹窗表单数据唯一标识
            id:"",
            name:"",
            date:"",
            city:"",
            comment:""
          },
          rules: { //弹窗表单验证规则
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            id: [
              { required: true, message: '请选择活动编号', trigger: 'blur' }
            ],
            date: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            city: [
              { required: false, message: '请输入城市名称', trigger: 'change' }
            ]
          }
        },
      };
    },
    methods: {
      moreSearch() {//点击更多回调函数
        if (!this.more) {
          this.more = true;
          this.moreName = language.lessConditions;
        } else {
          this.more = false;
          this.moreName = language.moreConditions;
        }

        let _this=this
        setTimeout(function () {
          _this.$store.commit("sHeight", _this.$refs.searchForm.offsetHeight+13);
          console.log(_this.$refs.searchForm.offsetHeight);
        },2)

      },
      save(){
        this.searDialogVisible=false;
        console.log(this.fields);
        this.formData.data=[];
        for(let data of this.formData.moreData){
          for(let field of this.fields){
            if(field==data.field){
              this.formData.data.push(data);
            }
          }
        }
      },
      searDialogShow(){
        this.searDialogVisible=true;
      },
      dateChange(value){
      },
      //表格数据接口开始
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

      gradeChange(){//下拉列表改变回调函数
        alert("gradeChange");
      },
      selectionChange(data){
        console.log(data);
      },
      beforeCloseFn(){
        this.dialogData.show=false
      },
      //点击新增回调函数
      addData(){
        this.dialogData=true;
      },
      //点击编辑回调函数
      editData(row){
        this.formData.data=row;//通过传递形参将table中数据传递到表单中
        this.dialogData=true;//显示出dialogue
      },
    },
    operateClick(fn,data,){
      this.$parent[fn](data);
    },
    mounted: function () {
      this.getTableData();
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
  }
</script>
<style scoped>
  .tablePaging,.dialogPaging{text-align: right;margin-top: 10px}/*分页右对齐和上边界*/
  .mrcTable{height: calc(100% - 86px) !important;}/*表格高度*/
  .dialogTable{height: calc(100% - 52px) !important}/*调整dialog内部分页位置*/
</style>
