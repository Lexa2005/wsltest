<template>
  <div class="user-view">

    <UserBar/>
    <router-view/>

  </div>
</template>
<script setup >
import UserBar from "@/components/user/UserBar.vue";

</script>
<style scoped lang="scss">
.user-view {
  //display: flex;
}
</style>
