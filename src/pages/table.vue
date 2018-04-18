<template>
    <div>
        <div class="searchForm">
            <div class="searchForm--item">
                <label class="searchForm--item__label">学科名称</label>
                <div class="searchForm--item__content">
                    <el-select v-model="xkId" placeholder="请选择学科名称" size="small">
                        <el-option v-for="item in xkList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="searchForm--item">
                <label class="searchForm--item__label">教师团队</label>
                <div class="searchForm--item__content">
                    <el-select v-model="tdId" placeholder="请选择教师团队" size="small">
                        <el-option v-for="item in tdList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="searchForm--item">
                <el-button type="primary" @click="dialogFormVisible = true" size="small">搜索</el-button>
            </div>
        </div>
        <div class="currHeight" style="margin-top: 10px">
            <el-table :data="table" height="300px" style="height: 100%" border>
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址" class-name="left"></el-table-column>
                <el-table-column label="操作" width="190">
                    <template slot-scope="scope">
                        <el-button  size="mini">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
          <el-pagination
            style="float: right;margin-top: 10px"
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>

        <el-dialog title="dialog" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')" size="small">确定</el-button>
                <el-button @click="confirm" size="small">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'demo',
    data(){
        return {
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
            dialogFormVisible: false,
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
            }
        };
    },
    methods: {
        confirm(){
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
    },
}
</script>
