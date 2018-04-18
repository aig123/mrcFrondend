<template>
  <section>
    <el-form :model="formData.data" label-width="80px" :rules="formData.rules" :ref="formData.name">
      <div style="width: 100%;height: 20px"></div>
      <el-form-item :label="config.title" :key="config.field" v-for="config in formData.title" style="width: 95%;" :prop="config.field">
        <el-input v-model="formData.data[config.field]" v-if="config.type=='input'" :placeholder="config.placeholder"  style="width: 100%"></el-input>
        <el-select v-model="formData.data[config.field]" v-if="config.type=='select'" placeholder="config.placeholder" style="width: 100%">
          <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-option>
        </el-select>
        <el-date-picker type="date" placeholder="选择日期" v-model="formData.data[config.field]" @change="dateChange"  v-if="config.type=='date'" style="width: 100%"></el-date-picker>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search(item.clickFn)" v-for="item in formData.button" :key="item.name">{{item.name}}</el-button>
      </el-form-item>
    </el-form>
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
