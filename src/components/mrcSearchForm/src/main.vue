<template>
  <section>
    <div class="searchForm" style="margin-bottom: 10px">
      <div class="searchForm--item" v-if="!more" v-for="(data,index) in formData.data" :key="index">
        <label class="searchForm--item__label" style="">{{data.title}}</label><!--修改标签宽度-->
        <div class="searchForm--item__content">
          <el-input class="search-input" v-model="data[data.field]" v-if="data.type=='input'" :placeholder="data.placeholder"
                    size="small"></el-input>
          <el-select class="search-input" v-model="data[data.field]" v-if="data.type=='select'"
                     :placeholder="data.placeholder" @change="change(data.change)" size="small">
            <el-option :label="item[data.key.label]" :value="item[data.key.value]" :key="item[data.key.value]"
                       v-for="item in data.data"></el-option>
          </el-select>
          <el-date-picker class="search-input" type="date" placeholder="选择日期" v-model="data[data.field]"
                          v-if="data.type=='date'" size="small"></el-date-picker>
        </div>
      </div>
      <div class="searchForm--item" v-if="more" v-for="(data,index) in formData.moreData" :key="index">
        <label class="searchForm--item__label">{{data.title}}</label>
        <div class="searchForm--item__content">
          <el-input class="search-input" v-model="data.value" v-if="data.type=='input'" :placeholder="data.placeholder"
                    size="small"></el-input>
          <el-select class="search-input" v-model="data.value" v-if="data.type=='select'"
                     :placeholder="data.placeholder" @change="change(data.change)" size="small">
            <el-option :label="item[data.key.label]" :value="item[data.key.value]" :key="item[data.key.value]"
                       v-for="item in data.data"></el-option>
          </el-select>
          <el-date-picker class="search-input" type="date" placeholder="选择日期" v-model="data.value"
                          v-if="data.type=='date'" size="small"></el-date-picker>
        </div>
      </div>
      <div class="searchForm--button" v-if="formData.buttons&&formData.buttons.dataRight">
        <el-button type="primary" @click="search(button.click)" size="small"
                   v-for="(button,index) in formData.buttons.dataRight" :key="index">{{button.name}}
        </el-button>
      </div>
      <div class="searchForm--item" style="margin-left: 10px" v-if="formData.buttons&&formData.buttons.dataLeft">
        <el-button type="primary" @click="search(button.click,button.name)" size="small"
                   v-for="(button,index) in formData.buttons.dataLeft" :key="index">{{button.name}}
        </el-button>
      </div>
      <div class="searchForm--item" style="margin-left: 10px">
        <el-button type="primary" @click="moreSearch()" size="small">{{moreName}}</el-button>
      </div>
      <div class="show-set">
        <span class="el-icon-setting" @click="searDialogShow"></span>
      </div>
    </div>

    <el-dialog
      title="更多设置"
      :visible.sync="searDialogVisible"
      width="30%">
      <span>
        <el-checkbox-group v-model="fields" style="margin-top: 10px">
            <el-checkbox  v-dragging="{ item: data, list: formData.moreData, group: 'data'}" v-for="(data,index) in formData.moreData" :label="data.field" :key="data.field">{{data.title}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
           <el-button @click="searDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>

  </section>
</template>
<script>
  import language from "../../language/language";
  export default {
    name: 'mrc-table',
    template: '<div><input type="text" type="text" v-model="formData"/></div>',
    data() {
      return {
        more: false,
        moreName: language.moreConditions,
        checkList: ['选中且禁用','复选框 A'],
        searDialogVisible:false,
        fields:[]
      };
    },
    props: ['columns', 'value'],
    methods: {
      search(data, name) {
        if (data) {
          this.$parent[data]();
        }
      },
      searDialogShow(){
        this.searDialogVisible=true;
      },
      save(){
        this.searDialogVisible=false;
        console.log(this.fields);
        this.formData.data=[];
        for(let data of this.formData.moreData){
          for(let field of this.fields){
            if(field==data.field){
              this.formData.data.push(data);
            }
          }
        }
      },
      moreSearch() {
        if (!this.more) {
          this.more = true;
          this.moreName = language.lessConditions;
        } else {
          this.more = false;
          this.moreName = language.moreConditions;
        }

        let _this=this
        setTimeout(function () {
          _this.$store.commit("sHeight", _this.$refs.searchForm.offsetHeight+13);
          console.log(_this.$refs.searchForm.offsetHeight);
        },2)

      },
      change(data) {
        this.$parent[data]();
      }
    },
    mounted: function () {
      this.formData = this.value;
      this.fields=[];
      for(let data of this.formData.data){
        this.fields.push(data.field);
      }
    },
    computed: {
      formData: {
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
<style scoped>
  .el-checkbox:first-child {
    margin-left: 30px!important;
  }
  .search-input {
    width: 180px;
    margin-bottom: 5px;}
  .searchForm--item{margin-bottom: -22px}
</style>
