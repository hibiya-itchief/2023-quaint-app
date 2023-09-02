<template>
  <v-app dark>
    <v-row justify="center" align-content="center">
      <p style="font-size: 150%">ログイン中…</p>
    </v-row>
    <v-row justify="center">
      <v-progress-circular
        v-if="$vuetify.breakpoint.xs"
        indeterminate
        color="sairai"
        size="100"
        width="8"
      >
      </v-progress-circular>
      <v-progress-circular
        v-else
        indeterminate
        color="sairai"
        size="150"
        width="10"
      >
      </v-progress-circular>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    if (this.$route.query.error !== undefined) {
      this.$router.push(`/login?error=loginerror`)
    }
  },
})
</script>
