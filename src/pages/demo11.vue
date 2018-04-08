<template>
    <div class="contents">

        <div class="searchForm">
            <div class="searchForm--item">
                <label class="searchForm--item__label">学科名称</label>
                <div class="searchForm--item__content">
                    <el-select v-model="xkId" placeholder="请选择学科名称">
                        <el-option v-for="item in xkList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="searchForm--item">
                <label class="searchForm--item__label">教师团队</label>
                <div class="searchForm--item__content">
                    <el-select v-model="tdId" placeholder="请选择教师团队">
                        <el-option v-for="item in tdList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="searchForm--item">
                <div class="searchForm--item__content">
                    <el-input v-model="input" suffix-icon="el-icon-search" placeholder="请输入教师姓名或简拼" @click="confirm"></el-input>
                </div>
            </div>
        </div>

      <!--<hh-upload v-model="fileM" ></hh-upload>-->

{{this.uploadData}}
      <!--{{fileM}}-->
      <!--uploadTip="" :uploadFlag="true"-->
      <!--<hh-select-people ></hh-select-people>-->

      <hh-important @templateExport="templateExport"
                    v-model="uploadData"
                     :importUrl="'/sport/score/import'"></hh-important>
    </div>
</template>
<style lang="scss">
    @import '../assets/scss/_config.scss';
    @import '../assets/scss/_tools.scss';

    .currHeight {
        @include comHeight(93px);
    }
</style>

<script>
  import HhUpload from '../components/HhUpload.vue';
  import HhImportant from '../components/HhImportant.vue';
  import HhSelectPeople from '../components/HhSelectPeople.vue';
  export default {
    name: 'demo',
    data(){
        return {
            fileM:[ { "name": "8.png", "url": "ext/0/20180310/603b9b811d5d4b71906c267d80637288.png", "imgSUrl": "http://test.hhedu.cn/ext/0/20180310/603b9b811d5d4b71906c267d80637288.png" } ],
            xkList: [ // 学科列表
                {value: '1', label: '数学'},
                {value: '2', label: '英语'},
                {value: '3', label: '语文'},
                {value: '4', label: '物理'},
                {value: '5', label: '化学'},
                {value: '6', label: '体育'},
                {value: '7', label: '政治'},
                {value: '8', label: '历史'},
                {value: '9', label: '生物'},
            ],
            xkId: '', // 学科id
            tdList: [ // 团队列表
                {value: '1', label: '数学组'},
                {value: '2', label: '英语组'},
                {value: '3', label: '语文组'},
                {value: '4', label: '物理组'},
                {value: '5', label: '化学组'},
                {value: '6', label: '体育组'},
                {value: '7', label: '政治组'},
                {value: '8', label: '历史组'},
                {value: '9', label: '生物组'},
            ],
            tdId: '', // 团队id
            input: '',
            tab: '0',
            table: [
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
                {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
            ],
            dialogFormVisible: true,
            dialogFormVisible1: false,
            ruleForm: {
                name: '',
                region: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            uploadData:{epId:666}



        };
    },
    components: {
      "hh-upload": HhUpload,
      "hh-important":HhImportant,
      "hh-select-people":HhSelectPeople
    },
    computed: {},
    watch: {},
    methods: {
        confirm(){
            debugger
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                closeOnClickModal: false,
                type: 'warning'
            }).then(() => {
                this.$notify.success({message: '删除成功'});
                this.dialogFormVisible = false
            }).catch(() => {
                this.$notify.warning({message: '已取消删除'});
                this.dialogFormVisible = false
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
      templateExport: function () {
       alert("开始下载模板了")
        window.location.href = process.env.BASE_URL + this.downUrl;
      },
    },
    activated(){},
    mounted(){}
}
</script>
