<template>
  <div class="city-create">

    <!--    <div class="left">-->

    <!--    </div>-->
    <v-btn @click="$router.push(`/admin/city`)" variant="outlined" prepend-icon="mdi-arrow-left-thick">
      Go back
    </v-btn>
    <br>

    <h1>Create a new City</h1>
    <br>

    <div class="right">


      <form method="post" action="/admin/city/create" enctype="multipart/form-data">
        <v-text-field variant="outlined"
                      name="name"
                      label="Name"
                      required/>

        <v-textarea variant="outlined"
                    name="description"
                    label="Description"
                    required/>

        <v-select :items="['active', 'disable']"
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

</script>
<style scoped lang="scss">
.city-create {
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