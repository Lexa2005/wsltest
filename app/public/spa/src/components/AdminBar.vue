<template>

  <div class="admin-bar">

    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="$emit(`toggleDrawer`)"/>
      </template>

      <v-app-bar-title/>

      <template v-slot:append>

        <v-btn icon="mdi-magnify"></v-btn>

        <v-list>
          <v-list-item prepend-avatar="/favicon/android-chrome-192x192.png"
                       title="M9M9Ra"
                       subtitle="vasa4g@gmail.com"
          ></v-list-item>
        </v-list>

        <v-menu v-model="menu"
                :close-on-content-click="false"
                location="end">
          <template v-slot:activator="{ props }">

            <v-btn v-bind="props" icon="mdi-dots-vertical"/>

          </template>

          <v-card min-width="100">

            <v-list>
              <v-list-item>
                <v-switch v-model="message"
                          color="purple"
                          label="Enable messages"
                          hide-details
                ></v-switch>
              </v-list-item>

              <v-list-item>
                <v-switch v-model="hints"
                          color="purple"
                          label="Enable hints"
                          hide-details
                ></v-switch>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

<!--              <v-btn variant="outlined"-->
<!--                     @click="menu = false">-->
<!--                Save-->
<!--              </v-btn>-->

              <form action="/admin/logout" method="post">
                <v-btn style="background: coral"
                       type="submit"
                       variant="outlined"
                       @click="menu = false">
                  Exit
                </v-btn>
              </form>

            </v-card-actions>
          </v-card>
        </v-menu>

      </template>
    </v-app-bar>

  </div>

</template>
<script setup>
import {ref} from "vue";

let menu = ref();


</script>
<style scoped lang="scss">
.admin-bar {

}
</style>