<template>
  <v-app>
    <v-container>
      <h1 id="title">校内マップ</h1>
      <h2>近日公開予定。</h2>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'MapPage',
  auth: false,
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
</style>
