<template>
    <div class="content">
      <mrc-search-form v-model="formSearchData"></mrc-search-form>
      <mrc-table v-model="tableData"></mrc-table>
      <mrc-dialog v-model="dialogData">
        <mrc-form v-model="formData" ref="mrcForm"></mrc-form>
      </mrc-dialog>
    </div>
</template>
<script>
  import * as Api from "../api/api";
  export default {
    data(){
        return {
          tableData:{
            pagination: {
              switch: true,
              type: "default",
              CurrentChangeFn: "getTableData",
              pageSize: 10,
              pageIndex: 1,
              layout: "prev, pager, next, jumper, total",
              pageSizes: [10, 20, 40],

            },//是否开启分页
            index:false,//显示索引序号
            indexName:"序号",
            Checkbox:true,
            selectionChangeFn:"",
            class:"",//添加自定义class
            buttons:[{name:"删除",click:"delData",type:'danger',field:"del"},{name:"编辑",click:"editData",type:'default',field:"edit"}],
            title: [
              {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
              {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:false},
              {name: "性别", field: "sex",width:"",show:false,fixed:false,sortable:false},
              {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
              {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:false},
              {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
            ],
            data: []
          },
          formSearchData:{
            buttons:{dataLeft:[{name:"搜索",click:"search"}],dataRight:[{name:"增加",click:"addData"}]},//操作按钮
            data:[
              {type:'input',title:"姓名",value:"aiguang",placeholder:"默认的姓名"},
              {type:'input',title:"年龄",value:"12",placeholder:"请输入年龄"},
              {type:'select',title:"年级",change:"gradeChange",key:{label:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],value:1},
            ]
          },
          formData:{
            name:"form",
            buttons:{dataLeft:[{name:"搜索",click:"search"}],dataRight:[{name:"增加",click:"getDatas"}]},
            title:[
              {type:'input',title:"编号",value:"",field: "id",placeholder:"请填写编号"},
              {type:'input',title:"姓名",value:"",field: "name",placeholder:"请输入姓名"},
              {type:'date',title:"日期",value:"",field: "date",placeholder:"请输入日期"},
              {type:'input',title:"城市",value:"",field: "city",placeholder:"请输入城市"},
              {type:'input',title:"备注",value:"",field: "comment",placeholder:"请输入备注"},
            ],
            data:{
              id:"",
              name:"",
              date:"",
              city:"",
              comment:""
            },
            rules: {       //验证规则
              name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              id: [
                { required: true, message: '请选择活动编号', trigger: 'change' }
              ],
              date: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
              ],
              city: [
                { required: true, message: '请输入城市名称', trigger: 'change' }
              ]
            }
          },
          dialogData:{
            show:false,//手否显示
            title:"增加",//名称
            width:"40%",//宽度设置
            closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
            beforeCloseFn:"beforeCloseFn",//关闭前的回调，会暂停 Dialog 的关闭
            saveFn:"save",//确定触发的方法
            confirmButtonText:"保存", //确定名称
            cancelButtonText:"取消"   //取消名称
          }
        };
    },
    methods: {
      getTableData() {
        let param = {
          pageIndex: this.tableData.pagination.pageIndex,
          searchData:{},
          sort:"",//排序字段
          sortasc:"",// asc desc
          pageSize: this.tableData.pagination.pageSize
        };
        Api.getTableData(param).then((res) => {
          this.tableData.data = res.data.data.content;
          this.tableData.pagination.total = res.data.data.totalPages;
        })
      },
      search(){
        this.formData.data[0].value="搜索改变了这里的值";
      },
      gradeChange(){
        alert("gradeChange");
      },
      selectionChange(data){
        console.log(data);
      },
      beforeCloseFn(){
        this.dialogData.show=false
      },
      addData(){
        this.dialogData.show=true;
      },
      editData(row){
        this.formData.data=row;
        this.dialogData.show=true;
      },
      delData(row){
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.delTable(row).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTableData();
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      save(){
        this.$refs['mrcForm'].$refs[this.formData.name].validate((valid) => {
          if (valid) {
            let param = this.formData.data;
            Api.addTable(param).then((res) => {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
              this.dialogData.show=false;
              this.getTableData();
            })
          } else {
            return false;
          }
        });
      }
    },
    mounted: function () {
     this.getTableData();
    },
}
</script>

