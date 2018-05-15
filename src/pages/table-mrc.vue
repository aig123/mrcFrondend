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
          FullScreen:true,//是否显示全屏
          pagination: {
            switch: true,//是否显示分页
            type: "default",
            CurrentChangeFn: "getTableData",//当前页改变触发函数
            pageSize: 15,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",//	组件布局，子组件名用逗号分隔
            pageSizes: [10, 20, 40],//每页显示个数选择器的选项设置
          },//是否开启分页
          index:false,//显示索引序号
          indexName:language.index,//索引序号标题
          Checkbox:false,//是否显示复选框
          selectionChangeFn:"",//Select框变化触发方法
          class:"",//添加自定义class
          buttons:[{name:language.add,click:"addData",icon:"el-icon-circle-plus-outline"},{name:language.import,click:"",icon:"el-icon-upload"},{name:language.export,click:"",icon:"el-icon-download"}],//表格功能按钮
          operate:[{name:language.delect,click:"delData",type:'danger',field:"del"},{name:language.edit,click:"editData",type:'default',field:"edit"},{name:"查看",click:"viewData",type:'default',field:"view"}],//表格操作按钮
          title: [//表格信息
            {name: "编号", field: "sortId",width:"150",show:true,fixed:false,sortable:true},
            {name: "姓名", field: "name",width:"150",show:true,fixed:false,sortable:true},
            {name: "性别", field: "sex",width:"150",show:true,fixed:false,formatter:"sexFormatter"},//转换性别的内容
            {name: "日期", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "城市", field: "city",width:"450",show:true,fixed:false},
            {name: "备注", field: "comment",width:"",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []//表格内部数据
        },
        formSearchData:{//搜索栏数据
          labelWidth:50,//搜索栏标签宽度
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},//操作按钮
          title:[//默认显示的搜索内容
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'select',title:language.grade,change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],grade:"",field:"grade"},
    ],
          moreTitle:[//点击更多显示的搜索内容
            {type:'input',title:language.name,name:"",field:"name",placeholder:language.name},
            {type:'input',title:language.age,age:"",field:"age",placeholder:language.age},
            {type:'input',title:language.grade,grade:"",field:"grade",placeholder:language.grade},
            {type:'input',title:"test5",test5:"",field:"test5",placeholder:language.age},
            {type:'input',title:"test6",test6:"",field:"test6",placeholder:language.name},
            {type:'input',title:"test7",test7:"",field:"test7",placeholder:language.age},
            {type:'select',title:"test8",change:"gradeChange",placeholder:language.grade,datafield:{key:"name",value:"id"},data:[{id:1,name:"一年级"},{id:2,name:"二年级"}],test8:"",field:"test8"},
          ],
          data:{//绑定搜索栏数据
            age:"",
            grade:"",
            name:"",
            test5:"",
            test6:"",
            test7:"",
            test8:""
          }
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
          title:language.add,//名称
          width:"40%",//宽度设置
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
      sexFormatter(row, column){//性别文字和数字转换函数
        return row.gender == '1' ? '男' : '女';
      },
      search(){//点击搜索执行函数
        this.formData.data.value="搜索改变了这里的值";
      },
      gradeChange(){//下拉框内容改变回调函数
        alert("gradeChange");
      },
      selectionChange(data){
        console.log(data);
      },
      beforeCloseFn(){//点击编辑弹窗出现后，点击右上角×回调函数
        this.dialogData.show=false;
      },
      beforeCloseFn1(){//点击查看弹窗出现后，点击右上角×回调函数
        this.dialogView.show=false
      },
      addData(){//点击增加回调函数
        this.dialogData.show=true;
      },
      editData(row){//点击编辑回调函数
        this.formData.data=row;
        this.dialogData.show=true;
      },
      viewData(row){//点击查看回调函数
        this.formView.data=row;
        this.dialogView.show=true;
      },
      delData(row){//点击删除回调函数
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
      save(){//点击编辑保存回调函数
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
      save1(){//点击查看确定回调函数
      //this.dialogView.show=false
        this.$refs['mrcForm'].$refs[this.formView.name].validate((valid) => {
          if (valid) {
            let param = this.formView.data;
            Api.addTable(param).then((res) => {
              // this.$notify({
              //   title: '成功',
              //   message: '保存成功',
              //   type: 'success'
              // });
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
