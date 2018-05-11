<template>
  <div class="content" style="background: #efeeee7d;">
   <div style="width: 100%;height: 50px;line-height: 50px">
     <div style="float: left;margin-left: 20px;font-size: 17px;color: #82848a;">我的首页</div>
     <div  style="float: right;margin-right: 20px;cursor: pointer" v-show="!editMode" @click="customClick"><i class="el-icon-setting"></i> 自定义</div>
     <div  style="float: right;margin-right: 20px" v-show="editMode"> <el-button @click="saveClick"  type="primary" size="small">保存</el-button></div>
   </div>
    <div style="padding: 5px;width: 100%">
      <div class="area" v-for="(area,index) in areas" :class="editArea" >

        <div v-if="area.type==2" class="area">
          <div class="eidtIcon" v-if="editMode" style="top: -25px;right: -25px;" @click="areas.splice(index,1)"><i
            class="el-icon-remove"></i></div>
          <div class="two" v-for="template in area.templates">
            <drop @drop="handleDrop(template, ...arguments)" v-if="editMode">
              <drag
                :transfer-data="template">
                <div class="eidtIcon" v-if="editMode&&(template.template!=''&&template.template)"
                     @click="delTemplate(template)"><i class="el-icon-remove"></i></div>
                <div class="emptyT" v-if="editMode&&(!template.template||template.template=='')">
                  <i class="el-icon-plus emptyIcon" @click="openDialogVisibleT(template)"></i>
                  <div class="emptyFont">添加应用{{template.template}}</div>
                </div>
                <div class="templateC" v-if="template.template!=''">
                  <component :is='template.template'></component>
                </div>
              </drag>
            </drop>
            <div v-else>
              <div class="eidtIcon" v-if="editMode&&(template.template!=''&&template.template)"
                   @click="delTemplate(template)"><i class="el-icon-remove"></i></div>
              <div class="emptyT" v-if="editMode&&(!template.template||template.template=='')">
                <i class="el-icon-plus emptyIcon" @click="openDialogVisibleT(template)"></i>
                <div class="emptyFont">添加应用{{template.template}}</div>
              </div>
              <div class="templateC" v-if="template.template!=''">
                <component :is='template.template'></component>
              </div>
            </div>
          </div>
        </div>
            <div v-if="area.type==3"class="area">
              <div class="eidtIcon"  v-if="editMode" style="top: -25px;right: -25px;"  @click="areas.splice(index,1)"><i class="el-icon-remove" ></i></div>
              <div class="three" v-for="template in area.templates">
                <drop @drop="handleDrop(template, ...arguments)" v-if="editMode">
                  <drag
                    :transfer-data="template">
                    <div class="eidtIcon" v-if="editMode&&(template.template!=''&&template.template)"
                         @click="delTemplate(template)"><i class="el-icon-remove"></i></div>
                    <div class="emptyT" v-if="editMode&&(!template.template||template.template=='')">
                      <i class="el-icon-plus emptyIcon" @click="openDialogVisibleT(template)"></i>
                      <div class="emptyFont">添加应用{{template.template}}</div>
                    </div>
                    <div class="templateC" v-if="template.template!=''">
                      <component :is='template.template'></component>
                    </div>
                  </drag>
                </drop>
                <div v-else>
                  <div class="eidtIcon" v-if="editMode&&(template.template!=''&&template.template)"
                       @click="delTemplate(template)"><i class="el-icon-remove"></i></div>
                  <div class="emptyT" v-if="editMode&&(!template.template||template.template=='')">
                    <i class="el-icon-plus emptyIcon" @click="openDialogVisibleT(template)"></i>
                    <div class="emptyFont">添加应用{{template.template}}</div>
                  </div>
                  <div class="templateC" v-if="template.template!=''">
                    <component :is='template.template'></component>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="area.type==4" class="area">
              <div class="eidtIcon"  v-if="editMode" style="top: -25px;right: -25px;"  @click="areas.splice(index,1)"><i class="el-icon-remove" ></i></div>
              <div class="four" v-for="template in area.templates">
                <drop @drop="handleDrop(template, ...arguments)" v-if="editMode">
                  <drag
                    :transfer-data="template">
                    <div class="eidtIcon" v-if="editMode&&(template.template!=''&&template.template)"
                         @click="delTemplate(template)"><i class="el-icon-remove"></i></div>
                    <div class="emptyT" v-if="editMode&&(!template.template||template.template=='')">
                      <i class="el-icon-plus emptyIcon" @click="openDialogVisibleT(template)"></i>
                      <div class="emptyFont">添加应用{{template.template}}</div>
                    </div>
                    <div class="templateC" v-if="template.template!=''">
                      <component :is='template.template'></component>
                    </div>
                  </drag>
                </drop>
                <div v-else>
                  <div class="eidtIcon" v-if="editMode&&(template.template!=''&&template.template)"
                       @click="delTemplate(template)"><i class="el-icon-remove"></i></div>
                  <div class="emptyT" v-if="editMode&&(!template.template||template.template=='')">
                    <i class="el-icon-plus emptyIcon" @click="openDialogVisibleT(template)"></i>
                    <div class="emptyFont">添加应用{{template.template}}</div>
                  </div>
                  <div class="templateC" v-if="template.template!=''">
                    <component :is='template.template'></component>
                  </div>
                </div>
              </div>
            </div>


      </div>
      <div class="addT" v-show="editMode" @click="dialogVisible=true">添加模板类型</div>
    </div>
    <el-dialog
      title="请选择模版类型"
      :visible.sync="dialogVisible"
      width="30%"
     >
      <span>
         <el-radio-group v-model="type">
            <el-radio :label="2">一行两个模块</el-radio>
            <el-radio :label="3">一行三个模块</el-radio>
            <el-radio :label="4">一行四个模块</el-radio>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTemplateType">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="请选择模版"
      :visible.sync="dialogVisibleT"
      width="30%"
    >
      <span>
         <el-radio-group v-model="template">
            <el-radio label="template1" border>模块1</el-radio>
            <el-radio label="template2" border>模块2</el-radio>
            <el-radio label="template3" border>模块3</el-radio>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleT = false">取 消</el-button>
    <el-button type="primary" @click="addTemplate">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    data(){
      return {
        editMode: false,
        dialogVisible: false,
        dialogVisibleT:false,
        type:2,
        template:'template1',
        areas:[{type:2,templates:[{type:2,template:"template1"},{type:2}]}],
        currentTemplate:{},
        editArea:""
      };
    },
    methods: {
      handleDrop(toList, data) {
        debugger
        if(toList.type==data.type){
          let _toList=Object.assign({}, toList);
          let _data=Object.assign({}, data);
          toList.template=_data.template;
          data.template=_toList.template
        }else {
          this.$message({
            message: '不同模板类型不能拖拽互换位置',
            type: 'warning'
          });
        }


      },
      open(){
        this.dialogVisible=true;
      },
      customClick(){
        this.editMode=true;
        this.editArea="editArea"
      },
      saveClick(){
        this.editMode=false;
        this.editArea=""
      },
      addTemplateType(){
        if(this.type==2){
          this.areas.push({type:this.type,templates:[{type:2},{type:2}]})
        }else if(this.type==3){
          this.areas.push({type:this.type,templates:[{type:3},{type:3},{type:3}]})
        }else if(this.type==4){
          this.areas.push({type:this.type,templates:[{type:4},{type:4},{type:4},{type:4}]})
        }

        this.dialogVisible=false;
      },
      addTemplate(){
        this.dialogVisibleT=false;
       // this.currentTemplate.template=this.template;
        this.$set(this.currentTemplate, "template",this.template);
      },
      openDialogVisibleT(data){
        this.dialogVisibleT=true;
        this.currentTemplate=data;
      },
      delTemplate(data){
        data.template='';
      }
    },
    mounted: function () {
    },
    components:{
      "template1": {
        template: '<div style="background: #0d99e9;color: white;border-radius:10px ">模板1----</div>',
      },
      "template2": {
        template: '<div style="background: #e91b24;color: white;border-radius:10px">模板2----</div>',
      },
      "template3": {
        template: '<div style="background: #06e915;color: white;border-radius:10px">模板3----</div>',
      }
    },
  }
</script>
<style scoped>
  .two {
    background: white;
    width: 48%;
    height: 200px;
    float: left;
    border-radius: 10px;
    margin-left: 2%;
    position: relative;

  }
  .three{
    background: white;
    width: 31%;
    height: 200px;
    float: left;
    border-radius: 10px;
    margin-left: 2%;
    position: relative;

  }
  .four{
    background: white;
    width: 23%;
    height: 200px;
    float: left;
    border-radius: 10px;
    margin-left: 2%;
    position: relative;

  }
  .area{
    width: 100%;
    float: left;
    margin-bottom: 20px;
    position: relative;
    padding: 15px;
    padding-bottom: 0;
  }
  .editArea{
    border: 1px solid #dd6161;
  }
  .eidtIcon {
    position: absolute;
    top: -10px;
    right: -8px;
    border-radius: 25px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
  }
  .eidtIcon i{
    color: #00529c;font-size: 22px
  }

  .addT {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    background: white;
    float: left;
    cursor: pointer;
  }
  .emptyT{
    width: 100%;height: 200px;background: rgb(216, 216, 216);text-align: center; border-radius: 10px;
  }
  .emptyIcon{
    font-size: 50px;margin-top: 60px;color: white;cursor: pointer;
  }
  .emptyFont{
    color: white;margin-top: 10px
  }
  .templateC{
    width: 100%;
    height: 200px;
  }
</style>
