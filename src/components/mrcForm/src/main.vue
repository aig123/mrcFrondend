<template>
  <section>
    <el-form :model="formData.data" label-width="80px" :rules="formData.rules" :ref="formData.name">
      <div style="width: 100%;height: 20px"></div>
      <el-form-item :label="config.title" :key="config.field" v-for="config in formData.title" style="width: 95%;" :prop="config.field">
        <el-input v-model="formData.data[config.field]" v-if="config.type=='input'" :placeholder="config.placeholder"  style="width: 100%"></el-input>
        <el-select v-model="formData.data[config.field]" v-if="config.type=='select'" placeholder="config.placeholder" style="width: 100%">
          <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-option>
        </el-select>
        <el-date-picker v-model="formData.data[config.field]" @change="dateChange"  v-if="config.type=='date'" style="width: 100%"></el-date-picker>
        <!--后添加的开始-->
        <el-switch v-model="formData.data[config.field]" v-if="config.type=='switch'"></el-switch>
        <el-date-picker v-model="formData.data[config.field]" v-if="config.type=='switch'" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search(item.clickFn)" v-for="item in formData.button" :key="item.name"></el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  export default {
    name: 'mrc-form',
    template:'<div><input type="text" type="text" v-model="formData"/></div>',
    data() {
      return {
        formData: {
          data: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            value6:"",
            date:""
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
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      };
    },
    props: ['columns','value'],
    methods:{
      search(data){
        this.$parent[data]();
      },
      dateChange(value){

      }
    },
    mounted: function () {
      this.formData = this.value;
    },
    computed: {
      formData: {
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
