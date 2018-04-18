<template>
  <div class="LR">
    <el-row :gutter="0">
      <el-col :span="10">
        <div class="cl" :style="{height:cHeight +'px'}">
          <div class="all">
            <el-checkbox :indeterminate="false" :disabled="leftDisabled" v-model="leftCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
          </div>
          <div class="ck">
            <el-checkbox-group v-model="thisDataSelect" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in thisData" :title="item[cName]" :label="item[cKey]" :key="item[cKey]">{{item[cName]}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="cl op" :style="{height:cHeight +'px'}">
          <div>
            <div>
              <el-button @click="rightHandle" class="btn">增加</el-button>
            </div>
            <div>
              <el-button @click="leftHandle" class="btn">删除</el-button>
            </div>
          </div>
          <!--<a href="javascript:void(0)" @click="leftAllHandle">&lt;&lt;</a>
          <a href="javascript:void(0)" @click="leftHandle">&lt;</a>
          <a href="javascript:void(0)" @click="rightHandle">&gt;</a>
          <a href="javascript:void(0)" @click="rightAllHandle">&gt;&gt;</a>-->
        </div>
      </el-col>
      <el-col :span="10">
        <div class="cl last" :style="{height:cHeight +'px'}">
          <div class="all">
            <el-checkbox :indeterminate="false" :disabled="rightDisabled" v-model="rightCheckAll" @change="rightHandleCheckAllChange">全选</el-checkbox>
          </div>
          <div class="ck">
            <el-checkbox-group v-model="thisDataSelectRight" @change="righthandleCheckedCitiesChange">
              <el-checkbox v-for="item in thisDataRight" :title="item[cName]" :label="item[cKey]" :key="item[cKey]" >{{item[cName]}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .LR .ck .el-checkbox .el-checkbox__label{
    display: inline-block;
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: sub;
  }
</style>
<style scoped>

  .LR .all{
    background-color: #eef1f6;
    padding: 10px 0 10px 10px;
  }
  .LR .el-checkbox{
    width: 50%;
    margin: 10px 0 0 0;
  }
  .LR .cl{
    border-left: 1px #e2e7ed solid;
    border-top: 1px #e2e7ed solid;
    border-bottom: 1px #e2e7ed solid;
    overflow-y: auto;
  }
  .LR .cl .ck{
    padding-left: 10px;
  }
  .LR .cl.last{
    border-right: 1px #e2e7ed solid;
  }
  .LR .op{
    box-sizing: border-box;
    text-align: center;
    position: relative;
  }
  .LR .op > div{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -46px;
  }
  .LR .op > div > div{
    margin-top: 10px;
  }
</style>
<script>
  export default {
    name: "hh-lr-screen",
    data(){
      return {
        cKey: this.skey,//"teaId",
        cName: this.sName,//"teaName",
        cHeight: this.height,
        //判断是否全部选中
        leftCheckAll: true,
        rightCheckAll: true,
        //样式
        leftDisabled: true,
        rightDisabled: true,
        //leftIsIndeterminate: true,
        //rightIsIndeterminate: true,
        //右侧已选择
        thisDataSelectRight: [],
        //右侧所有
        thisDataRight: [],
        //左侧已选择
        thisDataSelect: [],
        //左侧所有
        thisData: []
      }
    },
    props:["allData", "skey", "sName", "height", "filters"],
    //方法
    methods:{
      submitHandle: function(){
        this.$emit("getData", Object.assign([], this.thisDataRight));
      },
      rightHandle: function(){
        if(this.thisDataSelect <= 0)return;
        var i = 0;
        while(i != -1){
          if(!this.addHandle(i, this.thisData, this.thisDataSelect, this.thisDataRight)){
            i = -1;
          }
        };
        if(this.thisData.length <= 0){
          //this.leftIsIndeterminate = false;
        }
      },
      leftHandle: function(){
        if(this.thisDataSelectRight <= 0)return;
        var i = 0;
        while(i != -1){
          if(!this.addHandle(i, this.thisDataRight, this.thisDataSelectRight, this.thisData, "delete")){
            i = -1;
          }
        }
      },
      addHandle:function(i, thisData, thisDataSelect, thatData, type){
        var that = this;
        var bool = true;
        var obj = thisData.filter(function(element){
          return element[that.cKey] == thisDataSelect[i];
        });
        //删除选择DATA
        thisDataSelect.splice(thisDataSelect.indexOf(obj[0][this.cKey]), 1);
        //删除DATA
        thisData.splice(thisData.indexOf(obj[0]), 1);
        //右侧DATA
        //根据筛选条件判断，删除项是否左移
        var _delete = false;
        if(type && type == "delete"){
          if(this.filters && typeof(this.filters) == "object"){
            var _key = (Object.keys(this.filters).length > 0) ? Object.keys(this.filters) : [];
            if(_key.length > 0){
              var _bool = true;
              for(var i = 0; i < _key.length; i++){
                var _thisKey = _key[i];
                if(!obj[0].hasOwnProperty(_thisKey)){
                  //console.info("hasOwnProperty");
                  _bool = true;
                  break;
                };
                if(obj[0][_thisKey] != this.filters[_thisKey]){
                  //console.info("_thisKey");
                  _bool = false;
                  break;
                };
              }
              if(_bool){_delete = true;};
            }else {_delete = true;};
          }else {_delete = true;};
        }else {_delete = true;};
        if(_delete) {
          thatData.push(obj[0]);
        }
        if(thisDataSelect.length == 0){
          bool = false;
        }
        return bool;
      },
      getNameArr(arr){
        var _a  = [];
        for(var i = 0; i< arr.length; i++){
          _a.push(arr[i][this.cKey]);
        }
        return _a;
      },
      //全选
      handleCheckAllChange(event) {
        this.thisDataSelect = event.target.checked ? this.getNameArr(this.thisData) : [];
        //this.leftIsIndeterminate = false;
      },
      //点击每个
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.leftCheckAll = checkedCount === this.thisData.length;
        //this.leftIsIndeterminate = checkedCount > 0 && checkedCount < this.thisData.length;
      },
      //右侧全选
      rightHandleCheckAllChange(event){
        this.thisDataSelectRight = event.target.checked ? this.getNameArr(this.thisDataRight) : [];
        //this.rightIsIndeterminate = false;
      },
      //右侧点击每个
      righthandleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.rightCheckAll = checkedCount === this.thisDataRight.length;
        //this.rightIsIndeterminate = checkedCount > 0 && checkedCount < this.thisDataRight.length;
      },
      duRemove(_key, _arr1, _arr2){
        var _arr = [];
        for(var i = 0; i < _arr2.length; i++){
          var obj = _arr2[i];
          var num = obj[_key];
          var isExist = false;
          for(var j = 0; j < _arr1.length; j++){
            var aj = _arr1[j];
            var n = aj[_key];
            if(n == num){
              isExist = true;
              break;
            }
          }
          if(!isExist){
            _arr.push(obj);
          }
        }
        return _arr;
      }
      /*
       leftAllHandle(){
       var _arr = this.getNameArr(this.thisData);
       this.thisData = Array.prototype.concat([], this.thisData, this.thisDataRight);
       this.thisDataSelectRight = [];
       this.thisDataRight = [];
       },
       rightAllHandle(){
       var _arr = this.getNameArr(this.thisData);
       this.thisDataRight = Array.prototype.concat([], this.thisData, this.thisDataRight);
       this.thisDataSelect = [];
       this.thisData = [];
       }*/
    },

    watch:{
      allData(val){
        //重置所有数据
        this.thisDataSelect = [];
        if(val.hasOwnProperty("reset") && val.reset){
          this.thisDataSelectRight = [];
          if(val.hasOwnProperty("cData") && val.cData.length > 0){
            this.thisDataRight = val.cData;
          }else{
            this.thisDataRight = [];
          };
          if(val.hasOwnProperty("data") && val.data.length > 0){
            this.$set(this.$data, "thisData",  Object.assign([], this.duRemove(this.cKey, this.thisDataRight, val.data)));
          }else{
            this.thisData = [];
          }
        }else{
          if(val.hasOwnProperty("data") && val.data.length > 0){
            this.$set(this.$data, "thisData",  Object.assign([], this.duRemove(this.cKey, this.thisDataRight, val.data)));
          }else{
            this.thisData = [];
          }
        }
      },
      /*skey(val){
       this.$set(this.$data, "cKey", val);
       },*/
      thisDataSelect(val){
        //console.log(this.thisDataSelect);
      },
      //左侧全选样式
      thisData(val){
        if(this.thisData.length > 0){
          if(this.thisData.length == this.thisDataSelect.length){
            this.leftCheckAll = true;
          }else {
            this.leftCheckAll = false;
          }
          this.leftDisabled = false;
        }else{
          this.leftCheckAll = false;
          this.leftDisabled = true;
        }
      },
      //右侧全选样式
      thisDataRight(val){
        if(this.thisDataRight.length > 0){
          if(this.thisDataRight.length == this.thisDataSelectRight.length){
            this.rightCheckAll = true;
          }else {
            this.rightCheckAll = false;
          }
          this.rightDisabled = false;
        }else{
          this.rightCheckAll = false;
          this.rightDisabled = true;
        }
      }
    },
    mounted(){
    }
  }
</script>
