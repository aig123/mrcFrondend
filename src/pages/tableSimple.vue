<template>
  <div class="content">
    <mrc-table-simple v-model="tableData"></mrc-table-simple>
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
          hideToolbar:true,
          pagination: {
            switch: false,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },
          index:false,//显示索引序号
          indexName:language.index,//索引序号标题
          Checkbox:false,//是否显示复选框
          selectionChangeFn:"",//Select框变化触发方法
          class:"",//添加自定义class
          buttons:[],//表格功能按钮
          operate:[{name:language.delect,click:"delData",type:'danger',field:"del"},{name:language.edit,click:"editData",type:'default',field:"edit"},{name:"查看",click:"viewData",type:'default',field:"view"}],//表格操作按钮
          title: [//表格信息
            {name: "编号", field: "sortId",width:"150",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"150",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"150",show:true,fixed:false},
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"450",show:true,fixed:false},
            {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []//表格内部数据
        },
        formData:{//点击编辑弹出表单数据
          name:"form",
          title:[//弹出表单内容
            {type:'input',title:"编号",value:"",field: "id",placeholder:"请填写编号"},
            {type:'input',title:"姓名",value:"",field: "name",placeholder:"请输入姓名"},
            {type:'date',title:"日期",value:"",field: "date",placeholder:"请输入日期"},
            {type:'input',title:"城市",value:"",field: "city",placeholder:"请输入城市"},
            {type:'input',title:"备注",value:"",field: "comment",placeholder:"请输入备注"},
          ],
          data:{//绑定弹出表单内容
            id:"",
            name:"",
            date:"",
            city:"",
            comment:""
          },
          rules: {//编辑表单验证规则
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
        formView:{//点击查看弹出表单数据
          name:"form",
          title:[
            {type:'span',title:"编号",value:"",field: "id",placeholder:"请填写编号"},
            {type:'span',title:"姓名",value:"",field: "name",placeholder:"请输入姓名"},
            {type:'span',title:"日期",value:"",field: "date",placeholder:"请输入日期"},
            {type:'span',title:"城市",value:"",field: "city",placeholder:"请输入城市"},
            {type:'span',title:"备注",value:"",field: "comment",placeholder:"请输入备注"},
          ],
          data:{//绑定弹出表单内容
            id:"",
            name:"",
            date:"",
            city:"",
            comment:""
          },
        },
        dialogData:{//点击编辑弹出层数据
          show:false,//手否显示
          title:language.add,//名称
          width:"40%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          beforeCloseFn:"beforeCloseFn",//关闭前的回调，会暂停 Dialog 的关闭
          saveFn:"save",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
        dialogView:{//点击查看弹出层数据
          show:false,//手否显示
          fullscreen:true,
          title:language.add,//名称
          width:"100%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          beforeCloseFn:"beforeCloseFn1",//关闭前的回调，会暂停 Dialog 的关闭
          saveFn:"save1",//确定触发的方法
          confirmButtonText:"确定", //确定名称
          cancelButtonText:language.cancel,   //取消名称
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
      search(){//点击搜索执行函数
        this.formData.data.value="搜索改变了这里的值";
      },
      selectionChange(data){
        //console.log(data);
      },
      beforeCloseFn(){
        this.dialogData.show=false;
      },
      beforeCloseFn1(){
        this.dialogView.show=false
      },
      editData(row){
        this.formData.data=row;
        this.dialogData.show=true;
      },
      viewData(row){
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
        this.$refs['mrcForm'].$refs[this.formView.name].validate((valid) => {
          if (valid) {
            let param = this.formView.data;
            Api.addTable(param).then((res) => {
              this.dialogView.show=false;
              this.getTableData();
            })
          } else {
            return false;
          }
        });
      },
    },
    mounted: function () {
      this.getTableData();
    },
  }
</script>
