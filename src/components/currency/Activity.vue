<template>
  <div class="activity">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'Activity'
  };
</script>
<style scoped lang="scss">
  @import '@css/style.scss';

  .activity {
    max-height: px2rem(160);
    position: relative;
    z-index: 2;
  }
</style>
