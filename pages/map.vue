<template>
  <v-app>
    <v-container>
      <h1 id="title">校内マップ</h1>
      <v-row justify="center">
        <v-btn-toggle v-model="selectedFloor" mandatory color="sairai" group>
          <v-btn value="1F">1F</v-btn>
          <v-btn value="2F">2F</v-btn>
          <v-btn value="3F">3F</v-btn>
          <v-btn value="4F">4F</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-img
            class="img"
            :src="`/images/map${selectedFloor}.png`"
            alt="1階の地図"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'MapPage',
  auth: false,
  data() {
    return {
      selectedFloor: '2F',
    }
  },
  head: {
    title: '校内マップ',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

#title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #b49656;
  font-family: serif;
  font-weight: bold;
}

.img {
  border: 9px solid #b49656;
}
</style>
