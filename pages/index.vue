<template>
  <v-app>
    <h1>星陵祭2023トップページ</h1>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
  auth: false,
  mounted() {
    if (this.$auth.loggedIn && this.$auth.user?.sub === undefined) {
      const base64Url = this.$auth.strategy.token.get().split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      this.$auth.setUser(JSON.parse(decodeURIComponent(window.atob(base64))))
    }
  },
  methods: {},
})
</script>
