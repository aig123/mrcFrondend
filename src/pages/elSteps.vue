<template>
  <div class="content">
    <el-steps direction="vertical" :active="1">
      <el-step title="今天">  </el-step>
      <el-step title="明天"></el-step>
      <el-step title="后天" description="这是一段很长很长很长的描述性文字"> </el-step>
    </el-steps>
  </div>
</template>
<style scoped>
  .content{height:500px;margin-left: 400px}
</style>
