<template>
  <div class="admin-drawer">

    <v-navigation-drawer :width="300"
                         theme="dark"
                         permanent
                         :elevation="2">
      <v-list-item style="height: 64px;"
                   prepend-avatar="/favicon/android-chrome-192x192.png"
                   title="Kantolina | Kanto"
                   subtitle="Admin panel" :elevation="2">

      </v-list-item>

<!--      <v-divider></v-divider>-->
<!--      <v-responsive height="90" class="justify-center align-center">-->
<!--        <v-text-field label="Search"-->
<!--                      density="compact"-->
<!--                      style="margin: 0 10px;"-->
<!--                      append-inner-icon="mdi-magnify"-->
<!--                      variant="outlined"/>-->
<!--      </v-responsive>-->

      <v-divider/>

      <v-list density="compact" nav>

        <v-list-item href="/admin/configuration" prepend-icon="mdi-tune" title="Configuration" value="Configuration"/>
        <v-list-item href="/admin/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" value="Dashboard"/>
        <v-list-item href="/admin/roadmap" prepend-icon="mdi-earth" title="Roadmaps" value="Roadmaps"/>
        <v-list-item prepend-icon="mdi-translate" title="Language" value="Language"/>
        <v-list-item href="/admin/interests" prepend-icon="mdi-map-marker" title="Interests" value="Interests"/>
        <v-list-item prepend-icon="mdi-cog" title="Settings" value="Settings"/>
        <v-list-item prepend-icon="mdi-account-tie" title="Admins" value="Admins"/>
        <v-list-item prepend-icon="mdi-account-group" title="Users" value="Users"/>
        <v-list-item href="/admin/city" prepend-icon="mdi-city-variant-outline" title="City" value="City"/>
        <v-list-item prepend-icon="mdi-gavel" title="FAQ" value="FAQ"/>

      </v-list>


    </v-navigation-drawer>

  </div>
</template>
<script setup >

</script>
<style scoped lang="scss">
.admin-drawer {

}
</style>