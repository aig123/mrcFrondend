<template>
  <section style="margin: 10px;height: 100%">
    <el-button type="primary" @click="dialogVisible = true">选择人员</el-button>
    <el-row style="margin-top: 20px">
      <el-tag v-for="person in selectPeople" style="margin-left: 5px;margin-bottom: 5px;">{{person.name}}</el-tag>
    </el-row>
    <el-dialog
      title="选择人员"
      :visible.sync="dialogVisible"
     >
      <span>
        <el-checkbox-group v-model="checkList">
    <el-checkbox :label="data.id" v-for="data in datas" :key="data.id" style="padding: 15px">{{data.name}}</el-checkbox>
  </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>


  </section>
</template>
<style>
  .el-checkbox+.el-checkbox{margin-left:0px!important;}
</style>
<script>

  export default {
    name: 'hh-select-people',
    template:'<div><input type="text" type="text" v-model="selectPeople"/></div>',
    data() {
      return {
        loadingTip: false,
        dialogVisible:false,
        checkList:[],
        selectPeople:[],
        datas:[
            {id:1,name:"zhangsan"},{id:2,name:"zhangsan2"},{id:3,name:"zhangsan3"},{id:4,name:"zhangsan4"},{id:5,name:"zhangsan5"},
          {id:11,name:"zhangsan"},{id:12,name:"zhangsan2"},{id:13,name:"zhangsan3"},{id:14,name:"zhangsan4"},{id:15,name:"zhangsan5"},
          {id:21,name:"zhangsan"},{id:22,name:"zhangsan2"},{id:23,name:"zhangsan3"},{id:24,name:"zhangsan4"},{id:25,name:"zhangsan5"},
        ]
      };
    },
    props: ['downUrl', 'importUrl','uploadData'],
//    props: {
//      value:Array,
//    },
    methods: {
       save(){
         this.selectPeople=[];
         for(let check of this.checkList){
           for(let data of this.datas){
                if(check==data.id){
                  this.selectPeople.push(data)
                }
           }
         }
           this.dialogVisible = false
       }

    },
    mounted: function () {
      this.fileList = this.value;
    },
    computed: {
      selectPeople: {
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
