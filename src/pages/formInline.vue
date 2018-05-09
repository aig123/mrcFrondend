<template>
  <mrc-form v-model="formData" ref="form">
    <!--<el-form-item label="自定义内容" >-->
      <!--<el-input v-model="formData.data.name" placeholder="这里是外部自定义输入内容"></el-input>-->
    <!--</el-form-item>-->
  </mrc-form>
</template>
<script>
  import language  from "../language/language";
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          stime: '',
          etime: '',
          zone: '',
          property: "",
          source: "",
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          stime: [
            { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          etime:[
            { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ],
          zone: [
            {required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          property: [
            {required: true, message: '请选择活动性质', trigger: 'change' }
          ],
          source: [
            {required: true, message: '请选择特殊资源', trigger: 'change' }
          ]
        },
        formData:{
          name:"form",
          inline:true,//判断是否表单元素为行内元素
          buttons:[{name:"立即创建",click:"submitForm",type:"primary"},{name:"重置",click:"resetForm",type:""}],
          title:[
            {type: 'input', title: "活动名称", value: "", field: "name", placeholder: "请填写活动名称",showTip:false,tipText:"输入活动名称"},
            {type: 'date', title: "开始时间", value: "", field:  "stime", placeholder: "请输入开始时间",showTip:false,tipText:"输入开始时间"},
            {type: 'date', title: "结束时间", value: "", field: "etime", placeholder: "请输入结束时间",showTip:false,tipText:"输入结束时间"},
            {type: 'select',title: "活动区域",value: "",field: "zone",placeholder: "请选择活动区域",datafield: {key: "name", value: "id"},data: [{id: 1, name: "区域一"}, {id: 2, name: "区域二"}],showTip:false,tipText:"1235"},
            {type: 'select',title: "活动性质",value: "",field: "property",placeholder: "请选择活动区域",datafield: {key: "name", value: "id"},data: [{id: 1, name: "性质一"}, {id: 2, name: "性质二"}],showTip:false,tipText:"1235"},
            {type: 'select',title: "特殊资源",value: "",field: "source",placeholder: "请选择活动区域",datafield: {key: "name", value: "id"},data: [{id: 1, name: "资源一"}, {id: 2, name: "资源二"}],showTip:false,tipText:"1235"},

          ],
          data:{
            name: '',
            stime: '',
            etime: '',
            date2: '',
            zone: "",
            property: "",
            source: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            stime: [
              { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            etime:[
              { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
            ],
            zone: [
              {required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            property: [
              {required: true, message: '请选择活动性质', trigger: 'change' }
            ],
            source: [
              {required: true, message: '请选择特殊资源', trigger: 'change' }
            ]
          },
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs['form'].$refs[this.formData.name].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs['form'].$refs[this.formData.name].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
