<template>
  <div style="padding: 10px;float: left">
    <mrc-full-screen >
      <div v-for="o in 4" :key="o" class="text item">
        {{'用户管理 ' + o }}
      </div>
    </mrc-full-screen>
    <mrc-full-screen >
      <div v-for="o in 4" :key="o" class="text item">
        {{'配置管理 ' + o }}
      </div>
    </mrc-full-screen>
    <mrc-full-screen >
      <div v-for="o in 4" :key="o" class="text item">
        {{'角色管理 ' + o }}
      </div>
    </mrc-full-screen>
  </div>
</template>
<style>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 480px;
  }
  .el-card__body{position:relative}
  .box-card .el-button--text{position:absolute;top:10px;right: 24px;}
</style>
