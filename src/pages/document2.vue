<template>
  <div id="example" style="padding: 30px">
    {{ message }}
    <br><br><br>
    <input v-model="message"/>

    <!--<hello :message="message" ></hello>-->
    <!--<mrc-search-form v-model="formData"></mrc-search-form>-->
    <!--<div id="app-3">-->
      <!--<p v-if="seen">现在你看到我了</p>-->
    <!--</div>-->

    <!--<button @click="changeSeen">changeSeen</button>-->

    <!--<div id="app-4">-->
      <!--<ol>-->
        <!--<li v-for="todo in todos">-->
          <!--{{ todo.text }}-->
        <!--</li>-->
      <!--</ol>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    name: 'demo',
    data(){
      return {
        message: 'Hello World!',
        formData:{
          buttons:{dataLeft:[{name:"搜索",click:"search"}],dataRight:[{name:"增加",click:"add"}]},
          data:[
            {type:'input',title:"姓名",value:"aiguang",placeholder:"默认的姓名"},
            {type:'input',title:"年龄",value:"12",placeholder:"请输入年龄"},
            {type:'select',title:"年级",change:"alert(3)",key:{label:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],value:1},
          ]
        },
        seen:false,
        todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
        ]
      };
    },
    methods: {
      changeSeen(){
        if(this.seen){
          this.seen=false;
        }else {
          this.seen=true;
        }

      }
    },
    components:{
      "hello": {
        template: '<div> 这是个组件 -----{{message}}</div>',
        props:["message"],
      },

    },
    mounted: function () {
    }
  }
</script>
<style scoped>

</style>
