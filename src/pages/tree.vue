<template>
  <div class="content">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="data6"
      ref="tree2"
      show-checkbox
      node-key="id"
      :filter-node-method="filterNode"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
    </el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        filterText:"",
        data6: [
          {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
          {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
          {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        },
          {
            id: 4,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2',
              children: [{
                id: 11,
                label: '三级 3-2-1'
              }, {
                id: 12,
                label: '三级 3-2-2'
              }, {
                id: 13,
                label: '三级 3-2-3'
              }]
            }]
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode) {
        return dropNode.data.label !== '二级 3-1';
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
  };
</script>
<style scoped>
  .content{padding: 20px;}
</style>
