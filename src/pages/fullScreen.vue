<template>
  <div class="fullscreen">
    <mrc-full-screen class="content">
      <div v-for="o in 4" :key="o" class="text item">
        {{'用户管理' + o }}
      </div>
    </mrc-full-screen>
    <mrc-full-screen class="content">
      <div v-for="o in 4" :key="o" class="text item">
        {{'配置管理 ' + o }}
      </div>
    </mrc-full-screen>
    <mrc-full-screen class="content">
      <div v-for="o in 4" :key="o" class="text item">
        {{'角色管理 ' + o }}
      </div>
    </mrc-full-screen>
  </div>
</template>
<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .fullscreen .content{width: 480px;}
  .fullscreen{padding: 10px;float: left}
  .content{position:relative}

</style>
<style>
  .fullscreen .content .el-dialog__body{height: calc(100% - 41px);}
</style>
