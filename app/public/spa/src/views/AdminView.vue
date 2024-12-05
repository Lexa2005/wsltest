<template>
    <div class="admin-view">

      <div class="left" v-if="drawer">
        <AdminDrawer />
      </div>

      <div class="right">
        <AdminBar @toggleDrawer="toggleDrawer"/>
        <router-view/>
      </div>

    </div>
</template>
<script setup>
import AdminBar from "@/components/AdminBar.vue";
import AdminDrawer from "@/components/admin/AdminDrawer.vue";
import {ref} from "vue";

let drawer = ref(true)

const toggleDrawer = () => {
  drawer.value = !drawer.value;
}

</script>
<style scoped lang="scss">
.admin-view {

}
</style>