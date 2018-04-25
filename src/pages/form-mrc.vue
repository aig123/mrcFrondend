<template>
  <div style="padding: 20px;max-width: 700px">
    <mrc-form v-model="formData"></mrc-form>
  </div>
</template>

<script>
  import language  from "../language/language";
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value6:"",
          date:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date:[
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        formData:{
          name:"form",
          buttons:[{name:language.save,click:"save"},{name:language.save,click:"save2"}],
          title:[
            {type: 'input', title: "活动名称", value: "", field: "name", placeholder: "请填写活动名称"},
            {type: 'date', title: "开始时间", value: "", field: "date", placeholder: "请输入开始时间"},
            {
              type: 'daterange',
              title: "活动时间范围",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期",
              rangeseparator:"至",
              value: "",
              field: "value6",
              placeholder: "请输入活动时间范围"
            },
            {
              type: 'uploadFile',
              title: "上传附件",
              value: "",
              field: "comment",
              placeholder: "请输入备注",
              fileList:{
                key: {name: "name", url: "url"},
                data: [{
                  name: 'food.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]
              },
              action: "https://jsonplaceholder.typicode.com/posts/",
              onPreviewFn: "handlePreview",
              onRemoveFn: "handleRemove",
              beforeRemoveFn: "beforeRemove",
              multiple: false,
              limit: 3,
              onExceedFn: "handleExceed",
              accept:""
            },
            {
              type: 'select',
              title: "活动区域",
              value: "",
              field: "region",
              placeholder: "请选择活动区域",
              key: {label: "name", value: "id"},
              data: [{id: 1, name: "区域一"}, {id: 2, name: "区域二"}]
            },

            {type: 'switch', title: "即时配送", value: "", field: "delivery"},
            //后添加的开始
            {type: 'checkbox', title: "活动性质", value: "", field: "type",key: {label: "name", value: "id"},data: [{id: 1, name: "美食/餐厅线上活动"}, {id: 2, name: "地推活动"},{id: 3, name: "线下主题活动"}]},
            {type: 'radio', title: "特殊资源", value: "", field: "resource",placeholder: "请选择活动区域",key: {label: "name", value: "id"},data: [{id: 1, name: "线上品牌商赞助"}, {id: 2, name: "线下场地免费"}]},
            {type: 'textarea', title: "活动形式", value: "", field: "desc"},
            {type: 'btn', title: "活动形式", value: "", field: "desc2"},
          ],
          data:{
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            value6:"",
            date:"",
            source:"",
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          },
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
