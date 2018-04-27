<template>
  <el-dialog
    :title="dialogData.title"
    :visible.sync="dialogData.show"
    :width="dialogData.width"
    :close-on-click-modal="dialogData.closeOnClickModal"
    :before-close="beforeClose"
    >
    <slot></slot>
    <!--<slot name="CPU">这儿插你的CPU</slot>-->
    <!--<slot name="GPU">这儿插你的显卡</slot>-->
    <!--<slot name="Memory">这儿插你的内存</slot>-->
    <!--<slot name="Hard-drive">这儿插你的硬盘</slot>-->

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogData.show = false">{{dialogData.cancelButtonText}}</el-button>
    <el-button type="primary" @click="save"> {{dialogData.confirmButtonText}}</el-button>
  </span>
  </el-dialog>
</template>
<script>

  export default {
    name: 'mrc-dialog',
    template:'<div><input type="text" type="text" v-model="dialogData"/></div>',
    data() {
      return {
        rules: {}
      };
    },
    props: ['columns','value'],
    methods:{
      beforeClose(){
        if(this.dialogData.beforeCloseFn){
          this.$parent[this.dialogData.beforeCloseFn]();
        }else {
          this.dialogData.show=false
        }
      },
      save(){
        this.$parent[this.dialogData.saveFn]();
      }
    },
    mounted: function () {
      this.dialogData = this.value;
      if(!this.dialogData.cancelButtonText||this.dialogData.cancelButtonText==""){
        if(!this.dialogData.cancelButtonText){
          this.$set(this.dialogData,"cancelButtonText","取消")
        }else {
          this.dialogData.cancelButtonText="取消"
        }
      }
      if(!this.dialogData.confirmButtonText||this.dialogData.confirmButtonText==""){
        if(!this.dialogData.confirmButtonText){
          this.$set(this.dialogData,"confirmButtonText","确定")
        }else {
          this.dialogData.confirmButtonText="确定"
        }
      }
    },
    computed: {
      dialogData: {
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
