<template>
  <section >
    <div style="padding: 20px;max-width: 700px">
    <el-form :model="formData.data" label-width="120px" :rules="formData.rules" :ref="formData.name">
      <el-form-item :label="config.title" :key="config.field" v-for="config in formData.title" style="width: 100%;" :prop="config.field">
        <el-input v-model="formData.data[config.field]" v-if="config.type=='input'" :placeholder="config.placeholder"  style="width: 100%"></el-input>
        <el-select v-model="formData.data[config.field]" v-if="config.type=='select'" :placeholder="config.placeholder" style="width: 100%">
          <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-option>
        </el-select>
        <el-date-picker v-model="formData.data[config.field]" @change="dateChange"  v-if="config.type=='date'" :placeholder="config.placeholder" style="width: 100%"></el-date-picker>
        <el-date-picker v-model="formData.data[config.field]" v-if="config.type=='daterange'" :type="config.type" :range-separator="config.rangeseparator" :start-placeholder="config.startPlaceholder" :end-placeholder="config.endPlaceholder" style="width: 100%"></el-date-picker>
        <el-upload v-model="formData.data[config.field]" v-if="config.type=='uploadFile'"
                   :action="config.action"
                   :limit="config.limit"
                   :on-preview="uploadFn(config.onPreviewFn)"
                   :on-remove="uploadFn(config.onRemoveFn)"
                   :before-remove="uploadFn(config.onRemoveFn)"
                   :multiple="config.multiple"
                   :accept="config.accept"
                   :file-list="config.fileList.data"
                    >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb1</div>
        </el-upload>
        <el-switch v-model="formData.data[config.field]" v-if="config.type=='switch'"></el-switch>
        <el-checkbox-group v-model="formData.data[config.field]" v-if="config.type=='checkbox'">
          <el-checkbox :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-model="formData.data[config.field]" v-if="config.type=='radio'">
          <el-radio :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-radio>
        </el-radio-group>
        <el-input  v-model="formData.data[config.field]" v-if="config.type=='textarea'" :type="config.type"></el-input>
      </el-form-item>
      <el-form-item :model="formData.buttons" label-width="120px" :ref="formData.name" >
        <el-button type="primary" @click="uploadFn(config.click)"   v-for="(config,index) in formData.buttons" :key="index">{{config.name}}</el-button>
      </el-form-item>
    </el-form>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'mrc-table',
    template:'<div><input type="text" type="text" v-model="formData"/></div>',
    data() {
      return {
        rules: {}
      };
    },
    props: ['columns','value'],
    methods:{
      uploadFn(data){
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
