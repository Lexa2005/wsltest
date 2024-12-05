<template>
  <div class="city">
    <div class="search-bar">

      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-city-variant-outline"></v-icon> &nbsp;
          Find a city

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

          <v-btn style="margin-left: 30px" @click="$router.push(`/admin/city/create`)" variant="outlined">
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
            v-for="city in citys"
            :key="city.id">

          <td>{{ city.id }}</td>
          <td>{{ city.admin_id }}</td>
          <td>{{ city.name }}</td>
          <td>{{ city.status }}</td>
          <td>{{ city.created }}</td>
          <td>
            <v-btn :href="`/admin/city/edit/${city.id}`" variant="outlined">
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
import {ref} from "vue";
const citys = ref(window.city);


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