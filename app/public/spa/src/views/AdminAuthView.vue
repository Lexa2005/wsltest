<template>
  <div class="admin-auth">
    <form :action="login ? `/admin/login` : `/admin/auth`" method="post" style="width: 340px">
<!--            <v-img class="mx-auto my-6" max-width="228"-->
<!--                   src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>-->

      <v-card class="mx-auto pa-12 pb-8"
              elevation="8"
              max-width="448"
              rounded="lg">
        <div style="display: flex; justify-content: start">
          <v-img class="mx-auto my-6"
                 max-width="100"
                 src="/favicon/android-chrome-192x192.png"/>
        </div>

        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field density="compact"
                      name="phone"
                      placeholder="89996663355"
                      prepend-inner-icon="mdi-cellphone"
                      variant="outlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field v-if="login" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      density="compact"
                      name="password"
                      placeholder="Enter your password"
                      prepend-inner-icon="mdi-lock-outline"
                      variant="outlined"
                      @click:append-inner="visible = !visible"></v-text-field>

        <div v-if="login" class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Confirm password
        </div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      density="compact"
                      name="confirm_password"
                      placeholder="Enter your password"
                      prepend-inner-icon="mdi-lock-outline"
                      variant="outlined"
                      @click:append-inner="visible = !visible"></v-text-field>

        <v-btn block
               type="submit"
               class="mb-8"
               color="blue"
               size="large"
               variant="outlined">
          {{!login ? "Log In" : "Sign Up"}}
        </v-btn>

        <v-card-text class="text-center" @click="login = !login">
          <a class="text-blue text-decoration-none" rel="noopener noreferrer" target="_blank">
            {{login ? "Log in" : "Sign up now"}}
            <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </form>
  </div>
</template>
<script setup>
import {ref} from "vue";

let visible = ref();
let login = ref(false);


</script>
<style scoped lang="scss">
.admin-auth {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>