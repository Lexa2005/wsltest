<template>
  <div class="configuration">
    <h1>Configuration</h1>
    <div class="d-flex flex-row">
      <v-tabs
          v-model="tab"
          direction="vertical"
          color="primary"
      >
        <v-tab value="option-1">
          <v-icon start>
            mdi-account
          </v-icon>
          Version
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-lock
          </v-icon>
          App links
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            mdi-access-point
          </v-icon>
          Other
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <form action="">
            <v-text-field label="Version"
                          name="version"
                          v-model="configuration.version"
                          disabled
                          variant="outlined"/>

            <v-text-field label="Api version"
                          name="api_version"
                          v-model="configuration.api_version"
                          disabled
                          variant="outlined"/>
          </form>
        </v-window-item>
        <v-window-item value="option-2">
          <form action="/admin/configuration" method="post">
            <v-text-field label="Android_app_link"
                          name="android_app_link"
                          v-model="configuration.android_app_link"
                          variant="outlined"/>

            <v-text-field label="Ios_app_link"
                          name="ios_app_link"
                          v-model="configuration.ios_app_link"
                          variant="outlined"/>

            <v-text-field label="Web_app_link"
                          name="web_app_link"
                          v-model="configuration.web_app_link"
                          variant="outlined"/>
            <v-btn type="submit" variant="outlined">
              Update
            </v-btn>
          </form>
        </v-window-item>
        <v-window-item value="option-3">
          <form action="">

          </form>
        </v-window-item>
      </v-window>
    </div>
    {{ configuration }}
  </div>
</template>
<script setup>
import {ref} from "vue";

const configuration = ref(window.configuration);
let tab = ref();

</script>
<style scoped lang="scss">
.configuration {

  h1 {
    margin: 10px 0px;
  }

  form {
    min-width: 330px;
    padding: 15px;
  }
}
</style>