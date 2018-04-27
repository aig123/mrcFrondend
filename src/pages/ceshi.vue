<template>
  <div class="content">
    <mrc-search-form v-model="formSearchData"></mrc-search-form>
    <mrc-table v-model="tableData"></mrc-table>
    <mrc-dialog v-model="dialogData">
      <mrc-form v-model="formData" ref="mrcForm">
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
          description:"操作日志",
          FullScreen:false,
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 30,
            pageIndex: 1,
            layout: "prev, pager, next, jumper, total",
            pageSizes: [10, 20, 40],
          },//是否开启分页
          index:false,//显示索引序号
          indexName:language.index,
          Checkbox:false,
          selectionChangeFn:"",
          class:"",//添加自定义class
          buttons:[{name:language.export,click:"",icon:"el-icon-upload"}],
          operate:[{name:"chakan",click:"editData",type:'default',field:"edit"}],
          title: [
            {name: "访问者IP", field: "id",width:"",show:true,fixed:false,sortable:true},
            {name: "日志信息", field: "name",width:"",show:true,fixed:false,sortable:true},
            {name: "登陆用户名", field: "sex",width:"",show:false,fixed:false,sortable:true},
            {name: "请求时间", field: "date",width:"150",show:true,fixed:false,sortable:true},
            {name: "请求路径", field: "city",width:"",show:true,fixed:false,sortable:true},
            {name: "请求方法", field: "city",width:"",show:true,fixed:false,sortable:true},
            {name: "请求数据", field: "city",width:"",show:true,fixed:false,sortable:true},
            //{name: "备注", field: "comment",width:"150",show:true,fixed:false,sortable:false,showOverflowTooltip:true,align:"left",headerAlign:"center"},
          ],
          data: []
        },
        formSearchData:{
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},//操作按钮
          data:[
            {type:'input',title:"关键字",age:"",field:"keyword",placeholder:"",labelWidth:"108px"},
            {type: 'daterange',title: "活动时间范围",startPlaceholder: "开始日期",endPlaceholder: "结束日期",rangeseparator:"-",value: "",field: "value6",placeholder: "请输入活动时间范围",labelWidth:"108px"}
          ],
          moreData:[

            {type:'input',title:"关键字",age:"",field:"keyword",placeholder:"",labelWidth:"108px"},
            {type:'input',title:"登陆用户名",age:"",field:"logname",placeholder:"",labelWidth:"108px"},
            {type:'input',title:"请求路径",age:"",field:"path",placeholder:"",labelWidth:"108px"},
            {type:'input',title:"请求方法",age:"",field:"method",placeholder:"",labelWidth:"108px"},
            {type:'input',title:"请求数据",age:"",field:"data",placeholder:"",labelWidth:"108px"},
            {type: 'daterange',title: "活动时间范围",startPlaceholder: "开始日期",endPlaceholder: "结束日期",rangeseparator:"-",value: "",field: "value6",placeholder: "请输入活动时间范围",labelWidth:"108px"}
          ],
        },
        formData:{
          name:"form",
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[{name:language.add,click:"getDatas"}]},
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
          title:language.add,//名称
          width:"40%",//宽度设置
          closeOnClickModal:true,//是否可以通过点击 modal 关闭 Dialog
          beforeCloseFn:"beforeCloseFn",//关闭前的回调，会暂停 Dialog 的关闭
          saveFn:"save",//确定触发的方法
          confirmButtonText:language.save, //确定名称
          cancelButtonText:language.cancel   //取消名称
        },
      };
    },
    methods: {
      getTableData() {
        debugger
        // let param = ["dbsqlx/operation?name=log_operation", {page: 0, pageItems: 0, pageSize: 20, sort: "", sortasc: ""}]
        let param = ["dbsqlx/operation?name=log_operation", {page: 0, pageItems: 0, pageSize: 20, sort: "", sortasc: ""}]
        // Api.getTableData(param).then((res) => {
        //   this.tableData.data = res.data.data.content;
        //   this.tableData.pagination.total = res.data.data.totalPages;
        // })
        $OA.NordNeige.Core.Web.HttpHandlers.BaseHandler.GridBind(param, function (ref) {
          if (ref.success) {
            alert(111);
          } else {
            alert(ref.m);
          }
        });
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
      },
      fullScreen(){//点击全屏函数

        dialogTableVisible=true;

      }
    },
    mounted: function () {

      this.getTableData();
    },
  }
</script>
