<template>
  <div class="city">
    <div class="search-bar">

      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-earth"></v-icon> &nbsp;
          Find a roadmap

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

          <v-btn style="margin-left: 30px" href="/admin/place/create" variant="outlined">
            Create new place
          </v-btn>

          <v-btn style="margin-left: 30px" href="/admin/roadmap/create" variant="outlined">
            Create new roadmap
          </v-btn>


        </v-card-title>

        <v-divider></v-divider>
      </v-card>

    </div>
    <div class="card-container">
      <v-table fixed-header>
        <thead>
        <tr>
          <th class="text-left">
            id
          </th>
          <th class="text-left">
            admin_id
          </th>
          <th class="text-left">
            title
          </th>
          <th class="text-left">
            city_id
          </th>
          <th class="text-left">
            city_name
          </th>
          <th class="text-left">
            places
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
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="roadmap in roadmaps"
            :key="roadmap.id">

          <td>{{ roadmap.id }}</td>
          <td>{{ roadmap.admin_id }}</td>
          <td>{{ roadmap.title }}</td>
          <td>{{ roadmap.city_id.id }}</td>
          <td>{{ roadmap.city_id.name }}</td>
          <td>{{ roadmap.places.length }}</td>
          <td>{{ roadmap.status }}</td>
          <td>{{ roadmap.created }}</td>
          <td>
            <v-btn :href="`/admin/roadmap/edit/${roadmap.id}`" variant="outlined">
              Edit
            </v-btn>
          </td>

        </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
const roadmaps = ref(window.roadmap);

onMounted(() => {
  console.log(roadmaps.value)
})
</script>
<style scoped lang="scss">
.city {
  padding: 10px;

  .search-bar {

  }

  .card-container {

  }
}
</style>