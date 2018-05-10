<template>
  <div class="content">
    <div class="searchForm" style="margin-bottom: 8px">
      <div class="searchForm--item" v-if="!more" v-for="(data,index) in formSearchData.title" :key="index"><!--更少条件-->
        <label class="searchForm--item__label" style="text-align: right;width: 50px">{{data.title}}</label><!--修改标签宽度-->
        <div class="searchForm--item__content">
          <el-input class="search-input" v-model="data[data.field]" v-if="data.type=='input'" :placeholder="data.placeholder"
                    size="small"></el-input>
          <el-select class="search-input" v-model="data[data.field]" v-if="data.type=='select'"
                     :placeholder="data.placeholder" @change="change(data.change)" size="small">
            <el-option :label="item[data.datafield.key]" :value="item[data.datafield.value]" :key="item[data.datafield.value]"
                       v-for="item in data.data"></el-option>
          </el-select>
          <el-date-picker class="search-input" type="date" placeholder="选择日期" v-model="data[data.field]"
                          v-if="data.type=='date'" size="small"></el-date-picker>
          <el-date-picker v-model="data[data.field]" v-if="data.type=='daterange'" :type="data.type" :range-separator="data.rangeseparator" :start-placeholder="data.startPlaceholder" :end-placeholder="data.endPlaceholder" style="width: 100%;margin-top:-2px" size="small"></el-date-picker>
        </div>
      </div>
      <div class="searchForm--item" v-if="more" v-for="(data,index) in formSearchData.moreTitle" :key="index"><!--更多条件-->
        <label class="searchForm--item__label" style="text-align: right;width: 50px">{{data.title}}</label><!--修改标签宽度-->
        <div class="searchForm--item__content">
          <el-input class="search-input" v-model="data[data.field]" v-if="data.type=='input'" :placeholder="data.placeholder"
                    size="small"></el-input>
          <el-select class="search-input" v-model="data[data.field]" v-if="data.type=='select'"
                     :placeholder="data.placeholder" @change="change(data.change)" size="small">
            <el-option :label="item[data.datafield.key]" :value="item[data.datafield.value]" :key="item[data.datafield.value]"
                       v-for="item in data.data"></el-option>
          </el-select>
          <el-date-picker class="search-input" type="date" placeholder="选择日期" v-model="data[data.field]"
                          v-if="data.type=='date'" size="small"></el-date-picker>
          <el-date-picker v-model="data[data.field]" v-if="data.type=='daterange'" :type="data.type" :range-separator="data.rangeseparator" :start-placeholder="data.startPlaceholder" :end-placeholder="data.endPlaceholder" style="width: 100%;margin-top:-2px" size="small"></el-date-picker>
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
    <section  id="outer" :style="'height:'+ '-webkit-calc(100% - '+sHeight+'px)'+';'+'height:'+ 'calc(100% - '+sHeight+'px)' ">
      <!--表格功能按钮-->
      <div id="user" v-show="!this.tableData.hideToolbar">{{tableData.description}}</div>
      <div id="floatR" v-show="!this.tableData.hideToolbar">
        <el-button type="text" icon="el-icon-rank" @click="dialogTableVisible=true" v-if="tableData.FullScreen">{{fullScreenName}}</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="dialogData=true">增加</el-button>
        <el-button type="text" icon="el-icon-upload" @click="">导入</el-button>
        <el-button type="text" icon="el-icon-download" @click="">导出</el-button>
        <!--小按钮开始-->
        <div class="show-set" style="margin-left:8px">
          <span class="el-icon-setting" @click="tableDialogVisible=true"></span>
        </div>
        <!--小按钮结束-->
      </div>
      <el-table
        :data="tableData.data"
        :span-method="SpanMethod"
        :empty-text="tableData.emptyText"
        border
        @selection-change="handleSelectionChange"
        height="80%" style="width: 99%;margin: 0 auto;"
        class="mrcTable"
      >
        <el-table-column
          type="selection"
          v-if="tableData.Checkbox"
          width="60"
        >
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
          <el-table-column v-for="(da,index) in data.children" v-if="data.children"
                           :key="index"
                           :prop="da.field"
                           :label="da.name"
                           :width="da.width"
                           :fixed="da.fixed"
                           :sortable="da.sortable"
                           :show-overflow-tooltip="da.showOverflowTooltip"
                           :align="da.align"
                           :headerAlign="da.headerAlign"
          >
            <el-table-column v-for="(d,index) in da.children" v-if="da.children"
                             :key="index"
                             :prop="d.field"
                             :label="d.name"
                             :width="d.width"
                             :fixed="d.fixed"
                             :sortable="d.sortable"
                             :show-overflow-tooltip="d.showOverflowTooltip"
                             :align="d.align"
                             :headerAlign="d.headerAlign"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>


        <!--操作栏-->
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="delData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <el-pagination
        v-if="tableData.pagination&&tableData.pagination.switch"
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
              <!--<el-button @click="operateClick(data.click,scope.row)" :disabled="!scope.row[data.field]" size="mini" type="text"  v-for="data in tableData.operate" :key="data.name" v-if="data.type=='default'"> {{data.name}}</el-button>-->
              <!--<el-button @click="operateClick(data.click,scope.row)"  :disabled="!scope.row[data.field]" type="text" size="mini"   v-for="data in tableData.operate" :key="data.name" v-if="data.type=='danger'">{{data.name}}</el-button>-->
              <el-button>12341</el-button>
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
      <!--设置表格列显示隐藏和顺序-->
      <el-dialog
        title="设置表格"
        :visible.sync="tableDialogVisible"
        width="30%">
      <span>
        <el-checkbox-group v-model="tableFields" style="margin-top: 10px">
          <el-checkbox class="mode"  v-dragging="{ item: data, list: tableData.title, group: 'data'}" v-for="(data,index) in tableData.title" :label="data.field" :key="data.field">{{data.name}}</el-checkbox>
        </el-checkbox-group>
      </span>
        <span slot="footer" class="dialog-footer">
           <el-button @click="tableDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="saveTable">确 定</el-button>
      </span>
      </el-dialog>
      <!--设置表格列显示隐藏和顺序-->
    </section>
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
                         :show-overflow-tooltip="true"
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
        background
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


    <!--修改searchForm显示内容和顺序-->
    <el-dialog
      title="更多设置"
      :visible.sync="searDialogVisible"
      width="30%">
      <span>
        <el-checkbox-group v-model="fields" style="margin-top: 10px" >
            <el-checkbox class="mode" v-dragging="{ item: data, list: formSearchData.moreTitle, group: 'data'}" v-for="(data,index) in formSearchData.moreTitle" :label="data.field" :key="data.field">{{data.title}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
           <el-button @click="searDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="saveSearch">确 定</el-button>
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
        fullScreenName:language.fullScreen,//显示全屏名称
        dialogData:false,//点击新增弹出表单
        dialogTableVisible:false,//全屏dialing默认返回值
        searDialogVisible:false,//点击弹窗编辑更多和拖拽顺序
        tableDialogVisible:false,//设置表格顺序和显示隐藏
        fields:[],//搜索包含内容数组
        tableFields:[],//改变表格列顺序和显示隐藏
        tableData:{
          description:"用户列表",//表单左上角显示的文字
          FullScreen:true,//是否显示全屏按钮
          dragSort:true,//是否显示拖拽列
          pagination: {//分页配置
            switch: true,//是否显示分页
            type: "default",
            CurrentChangeFn: "getTableData",//当前页改变触发函数·
            pageSize: 15,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",//	组件布局，子组件名用逗号分隔
            pageSizes: [10, 20, 40],//每页显示个数选择器的选项设置
          },//是否开启分页
          index:false,//显示索引序号
          indexName:language.index,//索引序号标题
          Checkbox:false,//是否显示复选框
          selectionChangeFn:"",//Select框变化触发方法
          class:"",//添加自定义class
          buttons:[{name:language.add,click:"addData",icon:"el-icon-circle-plus-outline"},{name:language.import,click:"",icon:"el-icon-upload"},{name:language.export,click:"",icon:"el-icon-download"}],
          title: [//表格信息
            {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"",show:true,fixed:false,sortable:true,formatter:"sexFormatter"},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:true},
            {name: "备注", field: "comment",width:"150",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []
        },
        formSearchData:{//搜索栏数据
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},//操作按钮
          title:[//默认显示的搜索内容
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'select',title:language.grade,change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],grade:"",field:"grade"},
          ],
          moreTitle:[//点击更多显示的搜索内容
            {type:'input',title:language.name,name:"",field:"name",placeholder:language.name},
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'input',title:language.grade,grade:"",field:"grade",placeholder:language.grade},
            {type:'input',title:"test5",test5:"",field:"test5",placeholder:language.age},
            {type:'input',title:"test6",test6:"",field:"test6",placeholder:language.name},
            {type:'input',title:"test7",test7:"",field:"test7",placeholder:language.age},
            {type:'select',title:"test8",change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],test8:"",field:"test8"},
          ],
          data:{//绑定搜索栏数据
            age:"",
            grade:"",
            name:"",
            test5:"",
            test6:"",
            test7:"",
            test8:""
          }
        },
        formData:{//点击弹出表单数据
          name:"form",
          data:{//绑定表单内容
            id:"",
            name:"",
            date:"",
            city:"",
            comment:""
          },
          rules: { //表单验证规则
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
      sexFormatter(row, column){//性别文字和数字转换函数
        return row.gender == '1' ? '男' : '女';
      },
      //合并单元格
      SpanMethod({ row, column, rowIndex, columnIndex }){
        if(this.tableData.arraySpanMethodFn&&this.tableData.arraySpanMethodFn!="") {
          return this.$parent[this.tableData.arraySpanMethodFn]({ row, column, rowIndex, columnIndex });
        }
      },
      sHeight() {//根据实际情况设置表格高度
        if(this.tableData.hideToolbar){
          return 5
        }else {
          return this.$store.getters.sHeight;
        }
      },
      saveSearch(){//searchForm点击保存执行函数
        this.searDialogVisible=false;
        console.log(this.fields);
        this.formSearchData.title=[];
        for(let data of this.formSearchData.moreTitle){
          for(let field of this.fields){
            if(field==data.field){
              this.formSearchData.title.push(data);
            }
          }
        }
      },
      saveTable(){//表格列显示内容和顺序回调函数
        this.tableDialogVisible=false;
        console.log(this.tableFields);
        for(let showFalse of this.tableData.title){
          showFalse.show=false
        }
        for(let data of this.tableData.title){
          for(let field of this.tableFields){
            if(field==data.field){
              data.show=true
            }
          }
        }
      },
      moreSearch() {//点击更多条件回调函数
        if (!this.more) {
          this.more = true;
          this.moreName = language.lessConditions;
        } else {
          this.more = false;
          this.moreName = language.moreConditions;
        }
      },
      searDialogShow(){//点击搜索表单右侧按钮弹出
        this.searDialogVisible=true;
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
          this[this.tableData.selectionChangeFn](val);
        }
      },
      //当前页变化触发方法
      handleCurrentChange(val) {
        this.tableData.pagination.pageIndex = val;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          this[this.tableData.pagination.CurrentChangeFn](val);
        }
      },
      //当前页显示条数变化 触发方法
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          this[this.tableData.pagination.CurrentChangeFn](val);
        }
      },
      change(){//下拉列表框内容改变回调函数
        alert("gradeChange")
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
      //表格内删除回调函数
      delData(row){
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.delTable(row).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTableData();
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      save(formName){//弹出框点击保存回调
        this.$refs[this.formData.name].validate((valid) => {
          if (valid) {
            let param = this.formData.data;
            Api.addTable(param).then((res) => {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
              this.dialogData.show=false;
              this.getTableData();
            })
          } else {
            return false;
          }
        });
      },
    },
    mounted: function () {
      //搜索内容默认选中
      this.fields=[];
      for(let data of this.formSearchData.title){
        this.fields.push(data.field);
      }
      //获取表格数据
      this.getTableData();
      //表格列内容默认选中
      this.tableFields=[];
      for(let data of this.tableData.title){
        if(data.show==true){
          this.tableFields.push(data.field);
        }
      }
    },
    computed: {
      // tableData: {
      //   // 动态计算currentValue的值
      //   get: function () {
      //     return this.value;
      //   },
      //   set: function (val) {
      //     this.$emit('input', val);
      //   }
      // }
    },
  }
</script>
<style scoped>
  .tablePaging,.dialogPaging{text-align: right;margin-top: 10px}/*分页右对齐和上边界*/
  .mrcTable{height: calc(100% - 78px) !important;}/*表格高度*/
  .dialogTable{height: calc(100% - 52px) !important}/*调整dialog内部分页位置*/
  .search-input {
    width: 180px;
    margin-bottom: 5px;}
  .searchForm--item{margin-bottom: -2px}
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
  .dialogTable{height: calc(100% - 43px) !important}/*调整dialog内部分页位置*/
  .mode:first-child {/*调整弹窗内部复选框对齐*/
    margin-left: 30px!important;
  }
</style>
