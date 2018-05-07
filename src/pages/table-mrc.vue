<template>
  <div class="content">
    <mrc-search-form v-model="formSearchData"></mrc-search-form>
    <mrc-table v-model="tableData"></mrc-table>
    <mrc-dialog v-model="dialogData">
      <mrc-form v-model="formData" ref="mrcForm">
      </mrc-form>
    </mrc-dialog>
    <mrc-dialog v-model="dialogView">
      <mrc-form v-model="formView" ref="mrcForm">
      </mrc-form>
    </mrc-dialog>
  </div>
</template>
<script>
  import * as Api from "../api/api";
  import language  from "../language/language";
  export default {
    data(){
      return {
        tableData:{
          description:"用户列表",//表单左上角显示的文字
          FullScreen:true,
          dragSort:true,
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,
            pageIndex: 1,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },//是否开启分页
          index:false,//显示索引序号
          indexName:language.index,
          Checkbox:false,
          selectionChangeFn:"",
          class:"",//添加自定义class
          buttons:[{name:language.add,click:"addData",icon:"el-icon-circle-plus-outline"},{name:language.import,click:"",icon:"el-icon-upload"},{name:language.export,click:"",icon:"el-icon-download"}],
          operate:[{name:language.delect,click:"delData",type:'danger',field:"del"},{name:language.edit,click:"editData",type:'default',field:"edit"},{name:"查看",click:"viewData",type:'default',field:"view"}],
          title: [
            {name: "编号", field: "id",width:"",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"",show:false,fixed:false,sortable:true},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"",show:true,fixed:false,sortable:true},
            {name: "备注", field: "comment",width:"150",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []
        },
        formSearchData:{
          labelWidth:50,
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},//操作按钮
          title:[
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'select',title:language.grade,change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],grade:"",field:"grade"},
            //{type: 'daterange',title: "活动时间范围",startPlaceholder: "开始日期",endPlaceholder: "结束日期",rangeseparator:"至",value: "",field: "value6",placeholder: "请输入活动时间范围",labelWidth:"80px"}
    ],
          moreTitle:[
            {type:'input',title:language.name,name:"",field:"name",placeholder:language.name},
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'input',title:language.grade,grade:"",field:"grade",placeholder:language.grade},
            {type:'input',title:"test5",test5:"",field:"test5",placeholder:language.age},
            {type:'input',title:"test6",test6:"",field:"test6",placeholder:language.name},
            {type:'input',title:"test7",test7:"",field:"test7",placeholder:language.age},
            {type:'select',title:"test8",change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],test8:"",field:"test8"},
          ],
          data:{
            age:"",
            grade:"",
            name:"",
            test5:"",
            test6:"",
            test7:"",
            test8:""
          }
        },
        formData:{
          name:"form",
         // buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[{name:language.add,click:"getDatas"}]},
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
        formView:{
          name:"form",
          title:[
            {type:'span',title:"编号",value:"",field: "id",placeholder:"请填写编号"},
            {type:'span',title:"姓名",value:"",field: "name",placeholder:"请输入姓名"},
            {type:'span',title:"日期",value:"",field: "date",placeholder:"请输入日期"},
            {type:'span',title:"城市",value:"",field: "city",placeholder:"请输入城市"},
            {type:'span',title:"备注",value:"",field: "comment",placeholder:"请输入备注"},
          ],
          data:{
            id:"",
            name:"",
            date:"",
            city:"",
            comment:""
          },
        },
        dialogData:{
          show:false,//手否显示
          title:language.add,//名称
          width:"40%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          beforeCloseFn:"beforeCloseFn",//关闭前的回调，会暂停 Dialog 的关闭
          saveFn:"save",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
        dialogView:{
          show:false,//手否显示
          title:language.add,//名称
          width:"40%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          beforeCloseFn:"beforeCloseFn1",//关闭前的回调，会暂停 Dialog 的关闭
          saveFn:"save1",//确定触发的方法
          confirmButtonText:"确定", //确定名称
          cancelButtonText:language.cancel,   //取消名称
          showConfirmButton:false
        },
      };
    },
    methods: {//开始
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
      beforeCloseFn1(){
        this.dialogView.show=false
      },
      addData(){
        this.dialogData.show=true;
      },
      editData(row){
        this.formData.data=row;
        this.dialogData.show=true;
      },
      // viewData(row){//查看表格数据
      //   this.formData.rules={};
      //   this.formData.data=row;
      //   for(let data of this.formData.title){
      //     data.type="span"
      //   }
      //   this.dialogData.title="查看数据"
      //   this.dialogData.show=true;
      // },
      viewData(row){
        debugger;
        //this.formData.data=this.formSpan.data;
        this.formView.data=row;
        this.dialogView.show=true;
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
      },
      save1(){
      //this.dialogView.show=false
        this.$refs['mrcForm'].$refs[this.formView.name].validate((valid) => {
          if (valid) {
            let param = this.formView.data;
            Api.addTable(param).then((res) => {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
              this.dialogView.show=false;
              this.getTableData();
            })
          } else {
            return false;
          }
        });



      },
    },//开始
    mounted: function () {

      this.getTableData();
    },
  }
</script>
