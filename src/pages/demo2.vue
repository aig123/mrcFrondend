<template>
  <div>
    <mrc-search-form v-model="formData" @search="searchClick"></mrc-search-form>
    <mrc-table v-model="tableData"></mrc-table>
    <!--<mrc-form v-model="formData"></mrc-form>-->
  </div>
</template>
<script>
  export default {
    name: 'demo',
    data(){
      return {
        tableData:{
          datad:true,
          title:[{name:"时间",value:"date"},{name:"姓名",value:"name"},{name:"地址",value:"address"}],
          data:[
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        },
        formData:{
          button:[{name:"保存",clickFn:"save"},{name:"继续保存",clickFn:"reSave"}],
          datas:[
            {type:'input',name:"name",title:"姓名",value:"",placeholder:"默认的姓名",validate:"name"},
            {type:'input',name:"name",title:"职称",value:"",placeholder:"默认的职称"},
            {type:'select',change:"alert(3)",name:"grade",title:"年级",data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],value:1},
          ],
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          }
        },

      };
    },
    methods: {
      getDatas(){
        let param = {};
        Api.getDistrictList(param).then((res) => {
          this.tableData=res.tableData;
        }).catch(err => {
          for (var i=0;i<10;i++){
            this.tableData.data.push({
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            })
          }
        });
      },
      searchClick(){
        this.getDatas();
      },
      save(){
        alert("save")
      },
      reSave(){
        alert("reSave")
      },
      gradeChange(){
        debugger
        this.formData.datas[0].value="年级变化了"
      },
      classChange(){
        alert("classChange");
      }
    },
    mounted: function () {
      // this.getDatas();
    }
  }
</script>
