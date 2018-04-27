<template>
  <div class="content">
    <div style="height: 50px;line-height: 50px;">
      <el-input v-model="code.name" placeholder="表单名称（英文）" style="width: 150px"></el-input>
      <el-button type="primary">增加校验规则</el-button>
      <el-button type="primary">增加button</el-button>
    </div>
    <mrc-table v-model="tableData"></mrc-table>
    <mrc-dialog v-model="dialogData">
      <el-form :model="formData" label-width="140px"  ref="formd" style="width: 90%">
        <el-form-item label="表单类型">
          <el-select v-model="formData.type" placeholder="请选择表单类型" style="width: 100%">
            <el-option label="输入框" value="input"></el-option>
            <el-option label="选择框" value="select"></el-option>
            <el-option label="文本域" value="textarea"></el-option>
            <el-option label="日期选择器" value="datePicker"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单字段名称">
          <el-input v-model="formData.name" placeholder="字段名称"></el-input>
        </el-form-item>
        <el-form-item label="表单字段field">
          <el-input v-model="formData.field" placeholder="字段名称field"></el-input>
        </el-form-item>
        <el-form-item label="默认提示信息">
          <el-input v-model="formData.placeholder" placeholder="默认提示信息placeholder"></el-input>
        </el-form-item>
        <el-form-item label="是否开启校验">
          <el-input v-model="formData.rule" placeholder="开启校验"></el-input>
        </el-form-item>
        {{this.formData}}
      </el-form>
    </mrc-dialog>
    <mrc-dialog v-model="dialogCode">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="codeStr">
      </el-input>
    </mrc-dialog>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  import language  from "../language/language";
  export default {
    data(){
      return {
        tableData:{
          description:"自动化表单",//表单左上角显示的文字
          FullScreen:{showFullScreen:true,FullScreenText:language.fullScreen},
          pagination: {
            switch: false,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,
            pageIndex: 1,
            layout: "prev, pager, next, jumper, total",
            pageSizes: [10, 20, 40],
          },//是否开启分页
          index:true,//显示索引序号
          indexName:language.index,
          Checkbox:false,
          selectionChangeFn:"",
          class:"",//添加自定义class
          buttons:[{name:language.add,click:"addData",icon:"el-icon-circle-plus-outline"},{name:"源码",click:"getCode",icon:"el-icon-tickets"}],
          operate:[],
          title: [
            {name: "类型", field: "type",width:"",show:true,fixed:false,sortable:false},
            {name: "名称", field: "name",width:"",show:true,fixed:false,sortable:false},
            {name: "字段", field: "field",width:"",show:false,fixed:false,sortable:false},
            {name: "提示信息", field: "placeholder",width:"",show:true,fixed:false,sortable:false},
            {name: "校验", field: "rule",width:"150",show:true},
          ],
          data: [],

        },
        formData:{
          type:"",
          field:"",
          name:"",
          placeholder:"",
          rule:""
        },
        rules:[],
        dialogData:{
          show:false,//手否显示
          title:language.add,//名称
          width:"40%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          saveFn:"onSubmit",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
        dialogCode:{
          show:false,//手否显示
          title:"数据配置",//名称
          width:"60%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          saveFn:"onSubmit",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
        code:{
          name:"",
          buttons:[],
          title:[],
          data:{},
          rules: {},
        },
        codeStr:""
      };
    },
    methods: {//开始
      addData(){
        this.dialogData.show=true;
      },
      getCode(){
        this.codeStr=JSON.stringify(this.code, null, 4);
        this.dialogCode.show=true;
      },
      onSubmit(){
        this.tableData.data.push(this.formData);
        this.dialogData.show=false;
        this.formData={};
        this.code.title=this.tableData.data;
      }
    },//开始
    mounted: function () {
    },
  }
</script>
