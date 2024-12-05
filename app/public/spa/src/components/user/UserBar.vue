<template>

  <div class="user-bar">
    <v-app-bar :elevation="0">
      <template v-slot:append>

        <v-app-bar-nav-icon @click="drawer = !drawer"/>
      </template>

      <img src="/favicon/logoXl.png" width="196">

      <v-app-bar-title/>

      <template v-slot:prepend>
        <v-menu v-model="menu"
                :close-on-content-click="false"
                location="end">

          <v-card min-width="100">

            <v-card-actions>
              <v-spacer></v-spacer>


              <v-btn style="background: coral"
                     type="submit"
                     variant="outlined"
                     @click="menu = false">
                Exit
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-menu>

      </template>
    </v-app-bar>


    <v-navigation-drawer v-model="drawer"
                         location="right"
                         temporary
    >
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
                   title="John Leider"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard"
                     title="Home"
                     value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum"
                     title="About"
                     value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>

</template>
<script setup>
import {ref} from "vue";

let menu = ref();
const drawer = ref(false);


</script>
<style scoped lang="scss">
</style>