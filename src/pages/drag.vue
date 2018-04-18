<template>
  <section>
  <span>
      <el-button :type="btn.btnType"  v-dragging="{ item: btn, list: btns, group: 'data'}"  :key="btn.field" v-for="btn in btns">{{btn.btnValue}}</el-button>
  </span>
  </section>
</template>
<script>
  import language from "../language/language";
  export default {
    // name: 'mrc-drag',
    data() {
      return {
        btns:[
          { btnType:"",btnValue:"我是可按顺序拖拽的按钮1",field:"a"},
          { btnType:"primary",btnValue:"我是可按顺序拖拽的按钮2",field:"b"},
          { btnType:"success",btnValue:"我是可按顺序拖拽的按钮3",field:"c"},
          { btnType:"info",btnValue:"我是可按顺序拖拽的按钮4",field:"d"},
          { btnType:"warning",btnValue:"我是可按顺序拖拽的按钮5",field:"e"},
          { btnType:"danger",btnValue:"我是可按顺序拖拽的按钮6",field:"f"},
        ]
      };
    },
    props: [],
    methods: {
      openFull(){
        this.dialogFullVisible=true;
        this.dialog=true;
      },
      closeDia(){
        this.dialog=false;
      }
    },
    mounted: function () {},
  };
</script>
