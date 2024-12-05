<template>
  <div class="roadmap-create">

    <!--    <div class="left">-->

    <!--    </div>-->
    <v-btn href="/admin/city" variant="outlined" prepend-icon="mdi-arrow-left-thick">
      Go back
    </v-btn>
    <br>

    <h1>Edit city</h1>

    <br>

    <div class="right">


      <form method="post" :action="`/admin/city/edit/${city.id}`" enctype="multipart/form-data">
        <v-text-field v-model="city.name"
                      variant="outlined"
                      name="name"
                      label="Name"
                      required/>

        <v-textarea v-model="city.description"
                    variant="outlined"
                    name="description"
                    label="Description"
                    required/>

        <v-select :items="['active', 'disable']"
                  :model-value="city.status == 1 ? 'active' : 'disable'"
                  name="status"
                  variant="outlined"
                  label="Status"
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
                      show-size
                      accept=".mp3"
                      prepend-icon=""
                      prepend-inner-icon="mdi-music-box"/>

        <form :action="`/admin/city/delete/${city.id}`" method="post">
          <v-checkbox variant="outlined"
                      label="Delete ?"
                      required/>

          <v-btn @click.stop
                 type="submit"
                 variant="outlined"
                 prepend-icon="mdi-delete">
            DELETE
          </v-btn>
        </form>

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
import {ref} from "vue";
let city = ref(window.city);


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