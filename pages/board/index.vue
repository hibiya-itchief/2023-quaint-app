<template>
  <v-app class="ma-0">
    <v-row>
      <v-col cols="4" class="pa-0">
        <v-img class="img" src="/images/map1F.png" />
        <v-img class="img" src="/images/map2F.png" />
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-img class="img" src="/images/map3F.png" />
        <v-img class="img" src="/images/map4F.png" />
      </v-col>
      <v-col cols="4" class="pa-0"> </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InformationBoardPage',
  auth: false,
  data() {
    return {
      selectedFloor: '2F',
    }
  },
  head: {
    title: 'インフォメーションボード',
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
