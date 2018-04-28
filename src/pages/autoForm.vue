<template>
  <div class="content">
    <div style="height: 50px;line-height: 50px;">
      <el-button type="primary" @click="addFormBase">表单基础配置</el-button>
      <el-button type="primary" @click="addData">增加表单内容</el-button>
      <el-button type="primary">增加校验规则</el-button>
      <el-button type="primary" style="float: right"  @click="getCode">显示配置代码</el-button>
    </div>
    <div style="border: 1px solid #e4e7ed;width: 100%;height: 90%;padding: 20px">
      <center v-if="code.title.length==0" style="color: #606266;font-size: 30px;margin-top: 20%;">
        配置展示区
      </center>
      <mrc-form v-model="code" ref="mrcForm" v-if="code.title.length!=0" style="max-width: 700px"> </mrc-form>
    </div>
    <mrc-dialog v-model="dialogForm">
      <el-form :model="code" label-width="140px"  ref="formd" style="width: 90%">
        <el-form-item label="表单名称">
          <el-input v-model="code.name" placeholder="英文（用于获取对象）"></el-input>
        </el-form-item>
        <el-form-item label="表单模板">
          <el-select v-model="code.ptl" placeholder="请选择表单模板" style="width: 100%">
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="lable宽度">
          <el-input v-model="code.labelWidth" placeholder="默认100px"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="button" label-width="140px"  ref="formb" style="width: 90%">
        <el-form-item label="">
          <el-button :type="button.type" size="small" v-for="button in code.buttons" :key="button.name">{{button.name}}</el-button>
        </el-form-item>
        <el-form-item label="按钮名称">
          <el-input v-model="button.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="触发方法">
          <el-input v-model="button.click" placeholder="触发方法名称"></el-input>
        </el-form-item>
        <el-form-item label="按钮类型">
          <el-input v-model="button.type" placeholder="按钮类型"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="addButton">增加button</el-button>
        </el-form-item>
      </el-form>
    </mrc-dialog>
    <mrc-dialog v-model="dialogData">
      <el-form :model="formData" label-width="140px"  ref="formd" style="width: 90%">
        <el-form-item label="表单类型">
          <el-select v-model="formData.type" placeholder="请选择表单类型" style="width: 100%">
            <el-option label="输入框" value="input"></el-option>
            <el-option label="选择框" value="select"></el-option>
            <el-option label="文本域" value="textarea"></el-option>
            <el-option label="日期选择器" value="date"></el-option>
            <el-option label="开关" value="switch"></el-option>
            <el-option label="单选框" value="radio"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="formData.type=='radio'||formData.type=='select'">
          <el-form-item label="label">
            <el-input v-model="formData.key.label" placeholder="字段名称"></el-input>
          </el-form-item>
          <el-form-item label="value">
            <el-input v-model="formData.key.value" placeholder="字段名称field"></el-input>
          </el-form-item>
          <el-form-item label="data数据源">
            <el-input  type="textarea" :rows="2" v-model="formData.data" placeholder="json格式"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="表单字段名称">
          <el-input v-model="formData.title" placeholder="字段名称"></el-input>
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
        formData:{
          type:"",
          field:"",
          title:"",
          placeholder:"",
          rule:"",
          key:{},
          data:[]
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
          title:"显示配置",//名称
          width:"60%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          saveFn:"onSubmit",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
        dialogForm:{
          show:false,//手否显示
          title:"form基础配置",//名称
          width:"40%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          saveFn:"formSubmit",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
        code:{
          name:"form",
          ptl:"1",
          labelWidth:"100",
          buttons:[{name:"保存",click:"save",type:"primary"}],
          title:[],
          data:{},
          rules: {},
        },
        codeStr:"",
        button:{
          name:"",
          click:"",
          type:"primary",
        }
      };
    },
    methods: {//开始
      addButton(){
        this.code.buttons.push(this.button);
        this.button={};
      },
      addData(){
        this.dialogData.show=true;
      },
      addFormBase(){
        this.dialogForm.show=true;
      },
      getCode(){
        this.codeStr=JSON.stringify(this.code, null, 4);
        this.dialogCode.show=true;
      },
      onSubmit(){
        if(this.formData.data){
          debugger
          this.formData.data=eval(this.formData.data);
        }
        this.code.title.push(this.formData);
        this.dialogData.show=false;
        this.formData={};
      },
      formSubmit(){
        this.dialogForm.show=false;
      }
    },
    mounted: function () {
    },
  }
</script>
