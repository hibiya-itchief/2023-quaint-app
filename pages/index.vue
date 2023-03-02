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
      const base64Url = (this.$auth.strategy as any).token.get().split('.')[1] // https://auth.nuxtjs.org/api/auth/#:~:text=Token%20and%20Refresh%20Token%20are%20available%20on%20%24auth.strategy.token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      this.$auth.setUser(JSON.parse(decodeURIComponent(window.atob(base64))))
    }
  },
  methods: {},
})
</script>
