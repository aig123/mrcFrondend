n<template>
  <section>

    <div class="searchForm" style="margin-bottom: 10px">
      <div class="searchForm--item"v-for="data in formData.data">
        <label class="searchForm--item__label">{{data.title}}</label>
        <div class="searchForm--item__content">
          <el-input v-model="data.value" v-if="data.type=='input'" :placeholder="data.placeholder" size="small"></el-input>
          <el-select v-model="data.value" v-if="data.type=='select'" placeholder="data.placeholder" @change="change(data.change)" size="small">
            <el-option :label="item[data.key.label]" :value="item[data.key.value]" v-for="item in data.data"></el-option>
          </el-select>
          <el-date-picker type="date" placeholder="选择日期" v-model="data.value" v-if="data.type=='date'" size="small"></el-date-picker>
        </div>
      </div>
      <div class="searchForm--button" v-if="formData.buttons&&formData.buttons.dataRight">
        <el-button type="primary" @click="search(button.click)" size="small" v-for="button in formData.buttons.dataRight">{{button.name}}</el-button>
      </div>
      <div  class="searchForm--item" style="margin-left: 10px" v-if="formData.buttons&&formData.buttons.dataLeft">
        <el-button type="primary" @click="search(button.click)" size="small" v-for="button in formData.buttons.dataLeft">{{button.name}}</el-button>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'mrc-table',
    template:'<div><input type="text" type="text" v-model="formData"/></div>',
    data() {
      return {
      };
    },
    props: ['columns','value'],
    methods:{
      search(data){
        this.$parent[data]();
      },
      change(data){
        this.$parent[data]();
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
