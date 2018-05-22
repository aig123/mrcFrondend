<template>
  <div class="content">
    <div class="block">
      <span class="demonstration">显示值带部门</span>
      <el-cascader
        placeholder="试试搜索：艾光"
        :options="options"
        filterable
        multiple
      ></el-cascader>
    </div>
    <div class="block">
      <span class="demonstration">显示值不带部门</span>
      <el-cascader
        placeholder="试试搜索：艾光3"
        :show-all-levels="false"
        :options="options"
        filterable
      ></el-cascader>
    </div>
    <div>
      <el-transfer v-model="value1" :data="data"></el-transfer>
    </div>
    <div>
      <el-tag style="margin-left: 10px" v-for="peo in multipleSelectDatas.data" :key="peo.id">{{peo.label}}</el-tag>
      <mrc-multiple-select v-model="multipleSelectDatas" @getTableData="getTableData">
        <el-form :inline="true" :model="multipleSelectDatas.formData" class="demo-form-inline" style="margin-top: 0px;margin-bottom: -20px">
          <el-form-item label="" style="margin-left: 3px">
            <el-input v-model="multipleSelectDatas.formData.user" placeholder="" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="" size="small">搜索</el-button>
          </el-form-item>
        </el-form>
      </mrc-multiple-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `王 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        options: [
          {
            value: 'zhinan',
            label: '中国',
            children: [{
              value: 'shejiyuanze',
              label: '微软',
              children: [{
                value: 'yizhi',
                label: '张三'
              }, {
                value: 'fankui',
                label: '李四'
              }, {
                value: 'xiaolv',
                label: '赵武'
              }, {
                value: 'kekong',
                label: '马六'
              }]
            }, {
              value: 'daohang',
              label: '一起大众',
              children: [{
                value: 'cexiangdaohang',
                label: '刘能'
              }, {
                value: 'dingbudaohang',
                label: '王大'
              }]
            }]
          },
          {
            value: 'zujian',
            label: '研发部',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: '丈八'
              }, {
                value: 'color',
                label: '丈9'
              }]
            }, {
              value: 'form',
              label: '产品部',
              children: [{
                value: 'radio',
                label: '艾光'
              }, {
                value: 'checkbox',
                label: '孙丹'
              }, {
                value: 'input',
                label: '孙德'
              }]
            },
              {
                value: 'data',
                label: 'Data',
                children: [{
                  value: 'table',
                  label: 'Table 表格'
                }, {
                  value: 'tag',
                  label: 'Tag 标签'
                }, {
                  value: 'progress',
                  label: 'Progress 进度条'
                }, {
                  value: 'tree',
                  label: 'Tree 树形控件'
                }, {
                  value: 'pagination',
                  label: 'Pagination 分页'
                }, {
                  value: 'badge',
                  label: 'Badge 标记'
                }]
              }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                  value: 'alert',
                  label: 'Alert 警告'
                }, {
                  value: 'loading',
                  label: 'Loading 加载'
                }, {
                  value: 'message',
                  label: 'Message 消息提示'
                }, {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                }, {
                  value: 'notification',
                  label: 'Notification 通知'
                }]
              }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                }, {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                }, {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                }, {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                }, {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }]
              }, {
                value: 'others',
                label: 'Others',
                children: [{
                  value: 'dialog',
                  label: 'Dialog 对话框'
                }, {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                }, {
                  value: 'popover',
                  label: 'Popover 弹出框'
                }, {
                  value: 'card',
                  label: 'Card 卡片'
                }, {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                }, {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }]
              }]
          },
          {
            value: 'ziyuan',
            label: '资源部',
            children: [{
              value: 'axure',
              label: '超哥'
            }, {
              value: 'sketch',
              label: '李哥'
            }, {
              value: 'jiaohu',
              label: '王哥'
            }]
          }],
        data: generateData(),
        value1: [1, 4],
        selectD: [
          //
          {
            id: 9,
            label: "组织与流程科"
          },
          {
            id: 10,
            label: "产品与综合业务开发科"
          },
          {
            id: 5,
            label: "安全保障部"
          },
          {
            id: 6,
            label: "人员服务部"
          }
        ],
        treeD:[
          {
            id: 1,
            label: "一汽大众有限责任公司成都分公司",
            children: [
              {
                id: 4,
                label: "管理服务部",
                children: [
                  {
                    id: 9,
                    label: "组织与流程科"
                  },
                  {
                    id: 10,
                    label: "产品与综合业务开发科"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "一汽大众有限责任公司佛山分公司",
            children: [
              {
                id: 5,
                label: "安全保障部"
              },
              {
                id: 6,
                label: "人员服务部"
              }
            ]
          }
        ],
        tableD:{
          name: "multipleTable",
          pagination: {
            switch: true, //是否显示分页
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15, //每页显示条目个数
            pageIndex: 1, //当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40]
          }, //是否开启分页
          Checkbox: true, //是否显示复选框
          selectionChangeFn: "selectionChange", //Select框变化触发方法
          title: [
            {
              name: "工号",
              field: "id",
              width: "120",
              show: true,
              showOverflowTooltip: true,
              align: "center",
              headerAlign: "left"
            },
            {
              name: "部门名称",
              field: "label",
              width: "",
              show: true,
              showOverflowTooltip: true,
              align: "left",
              headerAlign: "left"
            },
            {
              name: "人员",
              field: "label",
              width: "",
              show: true,
              showOverflowTooltip: true,
              align: "left",
              headerAlign: "left"
            }
          ],
          data: [
            {
              id: 9,
              label: "组织与流程科"
            },
            {
              id: 10,
              label: "产品与综合业务开发科"
            },
            {
              id: 5,
              label: "安全保障部"
            },
            {
              id: 6,
              label: "人员服务部"
            }
          ]
        },
        people:[],
        formInline: {
          user: "",
          region: ""
        },
        multipleSelectDatas:{
          treeD:{
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            nodeKey:"id",
            data:[
              {
                id: 1,
                label: "一汽大众有限责任公司成都分公司",
                children: [
                  {
                    id: 4,
                    label: "管理服务部",
                    children: [
                      {
                        id: 9,
                        label: "组织与流程科"
                      },
                      {
                        id: 10,
                        label: "产品与综合业务开发科"
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                label: "一汽大众有限责任公司佛山分公司",
                children: [
                  {
                    id: 5,
                    label: "安全保障部"
                  },
                  {
                    id: 6,
                    label: "人员服务部"
                  }
                ]
              }
            ]
          },
          selectD:{
            keyField:{key:'id',name:'label'},
            data:[
              //
              {
                id: 9,
                label: "组织与流程科"
              },
              {
                id: 10,
                label: "产品与综合业务开发科"
              },
              {
                id: 5,
                label: "安全保障部"
              },
              {
                id: 6,
                label: "人员服务部"
              }
            ]
          },
          formData:{
            title:[
              {type:'input',title:"关键字",user:"",field:"user",placeholder:"关键字"},
            ],
            buttons:{name:"搜索",click:"search"},
            data:{
              user: "",
            }
          },
          tableData:{
            name: "multipleTable",
            pagination: {
              switch: true, //是否显示分页
              type: "default",
              CurrentChangeFn: "getTableData",
              pageSize: 15, //每页显示条目个数
              pageIndex: 1, //当前页数
              layout: "total, sizes, prev, pager, next, jumper",
              pageSizes: [10, 20, 40]
            }, //是否开启分页
            Checkbox: true, //是否显示复选框
            selectionChangeFn: "selectionChange", //Select框变化触发方法
            title: [
              {
                name: "工号",
                field: "id",
                width: "120",
                show: true,
                showOverflowTooltip: true,
                align: "center",
                headerAlign: "left"
              },
              {
                name: "部门名称",
                field: "label",
                width: "",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              },
              {
                name: "人员",
                field: "label",
                width: "",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              }
            ],
            data: [
              {
                id: 9,
                label: "组织与流程科"
              },
              {
                id: 10,
                label: "产品与综合业务开发科"
              },
              {
                id: 5,
                label: "安全保障部"
              },
              {
                id: 6,
                label: "人员服务部"
              }
            ]
          },
          data:[],
          firstTab:true,
          secondTab:true,
        }
      }
    }
  };
</script>
<style scoped>
  .block{
    float: left;
    margin-right: 36px;
  }
  .content{
    padding: 20px;
  }
</style>
