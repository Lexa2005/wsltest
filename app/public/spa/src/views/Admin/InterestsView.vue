<template>
  <div class="city">
    <div class="search-bar">

      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-map-marker"></v-icon> &nbsp;
          Find a place

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

          <v-btn style="margin-left: 30px" href="/admin/interests/create" variant="outlined">
            Create
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>
      </v-card>

    </div>
    <div class="card-container">
      <v-table
          fixed-header
      >
        <thead>
        <tr>
          <th class="text-left">
            id
          </th>
          <th class="text-left">
            admin_id
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            city
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
            v-for="place in interests"
            :key="place.id">

          <td>{{ place.id }}</td>
          <td>{{ place.admin_id }}</td>
          <td>{{ place.title }}</td>
          <td>{{ place.city_id.name }}</td>
          <td>{{ place.status }}</td>
          <td>{{ place.created }}</td>
          <td>
            <v-btn :href="`/admin/interests/edit/${place.id}`" variant="outlined">
              Edit
            </v-btn>
          </td>
          <td>
            <form :action="`/admin/interests/delete/${place.id}`" method="post">
              <v-btn type="submit" variant="outlined">
                Delete
              </v-btn>
            </form>
          </td>

        </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
const interests = ref(window.interests);


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