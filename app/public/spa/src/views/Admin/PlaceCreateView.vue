<template>
  <div class="roadmap-create">

    <!--    <div class="left">-->

    <!--    </div>-->
    <v-btn href="/admin/roadmap" variant="outlined" prepend-icon="mdi-arrow-left-thick">
      Go back
    </v-btn>
    <br>

    <h1>Create a new place</h1>
    <br>

    <div class="right">


      <form method="post" action="/admin/place/create" enctype="multipart/form-data">
        <v-text-field variant="outlined"
                      name="title"
                      label="Name"
                      required/>

        <v-textarea variant="outlined"
                    name="description"
                    label="Description"
                    required/>

        <v-select :items="suggestion"
                  item-value="item-value"
                  variant="outlined"
                  name="roadmap_id"
                  label="Roadmap"
                  required/>

        <v-select :items="['active', 'disable']"
                  name="status"
                  variant="outlined"
                  label="Status"
                  required/>

        <v-text-field variant="outlined"
                    name="latitude"
                    label="latitude"
                    required/>

        <v-text-field variant="outlined"
                    name="longitude"
                    label="longitude"
                    required/>


        <v-file-input variant="outlined"
                      label="Photo"
                      type="file"
                      id="image"
                      name="image"
                      show-size
                      counter
                      multiple
                      accept=".png, .jpg, .jpeg"
                      prepend-icon=""
                      prepend-inner-icon="mdi-camera"/>

        <v-file-input variant="outlined"
                      label="Sound"
                      name="sound"
                      id="sound"
                      show-size
                      accept=".mp3"
                      prepend-icon=""
                      prepend-inner-icon="mdi-music-box"/>

        <v-checkbox variant="outlined"
                    label="Do you agree?"
                    required/>

        <v-btn type="submit" class="me-4">
          submit
        </v-btn>
        <v-btn>
          clear
        </v-btn>
      </form>
    </div>

  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";

let suggestion = ref();

onMounted(() => {
  let val = window.suggestion;
  let response = [];
  val.forEach((item) => {
    const sug = item.title;
    response.push(sug);
  })
  console.log(response);
  suggestion.value = response;
})

</script>
<style scoped lang="scss">
.roadmap-create {
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
  padding: 50px;


  .left {
    width: 30%;
    background: #0dcaf0;
  }

  .right {
    //width: 60%;
    max-width: 1366px;
    border: 1px solid grey;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
  }
}
</style>