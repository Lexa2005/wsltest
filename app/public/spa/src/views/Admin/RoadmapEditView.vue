<template>
  <div class="roadmap-create">

    <div class="top">
      <v-btn href="/admin/roadmap" variant="outlined" prepend-icon="mdi-arrow-left-thick">
        Go back
      </v-btn>
      <br>

      <br>

      <div class="search-bar">

        <v-card flat>
          <v-card-title class="d-flex align-center pe-2">
            <!--            <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;-->
            <h1>Edit Roadmap</h1>

            <v-spacer></v-spacer>

            <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                label="Search"
                single-line
                flat
                hide-details
                variant="solo-filled"
            ></v-text-field>

            <v-btn style="margin-left: 30px; background: lightgreen" href="/admin/place/create" variant="outlined">
              Add new place
            </v-btn>

            <form :action="`/admin/roadmap/delete/${roadmap.id}`" method="post">
              <v-btn style="margin-left: 30px;
                     background: coral"
                     type="submit"
                     variant="outlined">
                DELETE
              </v-btn>
            </form>

          </v-card-title>

          <v-divider></v-divider>
        </v-card>

      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <v-carousel height="300" v-if="roadmap.image.length > 0" hide-delimiters>
          <v-carousel-item v-for="img in roadmap.image"
                           :key="img.id"
                           :src="img.url"
                           aspect-ratio="16/9"/>
        </v-carousel>

        <form method="POST" :action="`/admin/roadmap/edit/${roadmap.id}`" enctype="multipart/form-data">
          <v-text-field variant="outlined"
                        v-model="roadmap.id"
                        disabled
                        name="id"
                        label="id"
                        required/>

          <v-text-field variant="outlined"
                        v-model="roadmap.title"
                        name="title"
                        label="Name"
                        required/>

          <v-textarea variant="outlined"
                      v-model="roadmap.description"
                      name="description"
                      label="Description"
                      required/>

          <v-select :items="suggestion"
                    :model-value="roadmap.city_id.name"
                    variant="outlined"
                    name="city_id"
                    label="City"
                    required/>

          <v-select :items="['active', 'disable']"
                    :model-value="roadmap.status == 1 ? 'active' : 'disable'"
                    name="status"
                    variant="outlined"
                    label="Status"
                    required/>

          <v-file-input variant="outlined"
                        label="Photo"
                        type="file"
                        multiple
                        id="image"
                        name="image"
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera"/>

          <v-file-input variant="outlined"
                        label="Sound"
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera"/>

          <v-checkbox variant="outlined"
                      label="Do you agree?"
                      required/>

          <v-btn variant="outlined" type="submit" class="me-4">
            submit
          </v-btn>
          <v-btn variant="outlined">
            clear
          </v-btn>
        </form>
      </div>

      <div class="right">

        <div class="card-container">
          <v-table fixed-header>
            <thead>
            <tr>
              <th class="text-left">
                id
              </th>
              <th class="text-left">
                title
              </th>
              <th class="text-left">
                Status
              </th>
              <th class="text-left">
                Created
              </th>
              <th class="text-left">
                Edit
              </th>
              <th class="text-left">
                Delete
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="place in roadmap.places"
                :key="place.id">

              <td>{{ place.id }}</td>
              <td>{{ place.title }}</td>
              <td>{{ place.status }}</td>
              <td>{{ place.created }}</td>
              <td>
                <v-btn style="background: lightblue" :href="`/admin/place/edit/${place.id}`" variant="outlined">
                  Edit
                </v-btn>
              </td>
              <td>
                <form :action="`/admin/place/delete/${place.id}`" method="post">
                  <v-btn style="margin-left: 30px;
                     background: coral"
                         type="submit"
                         variant="outlined">
                    DELETE
                  </v-btn>
                </form>
              </td>

            </tr>
            </tbody>
          </v-table>
        </div>

      </div>
    </div>

  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";

let suggestion = ref();
let roadmap = ref(window.roadmap);

onMounted(() => {
  let val = window.suggestion;
  let response = [];
  val.forEach((item) => {
    const sug = item.name;
    response.push(sug);
  })
  console.log(response);
  suggestion.value = response;
})

</script>
<style scoped lang="scss">
.roadmap-create {
  padding: 15px;

  .bottom {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .left {
      width: 24%;
      min-width: 300px;
      max-width: 1366px;
      border: 1px solid grey;
      border-radius: 8px;
      padding: 10px;
    }

    .right {
      width: 72%;
      border: 1px solid grey;
      border-radius: 8px;
      padding: 10px;
    }
  }
}
</style>