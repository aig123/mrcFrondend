<template>
  <div style="padding: 10px;float: left" class="fullscreen">
    <mrc-full-screen class="content">
      <div v-for="o in 4" :key="o" class="text item">
        {{'用户管理 ' + o }}
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
  .content{position:relative}
</style>
