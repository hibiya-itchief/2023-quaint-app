<template>
  <v-app dark>
    <div id="error-page">
      <div v-if="$vuetify.breakpoint.xs">
        <h1 class="status-code-xs">404</h1>
        <h1 class="error-message-xs">Not Found</h1>
      </div>
      <div v-else>
        <h1 class="status-code">404</h1>
        <h1 class="error-message">Not Found</h1>
      </div>
      <p>お探しのページは見つかりません。</p>
      <p>指定したURLが正しいかご確認の上、再読み込みをお試しください。</p>
      <v-btn
        nuxt-link
        outlined
        to="/help"
        color="sairai"
        style="font-weight: bold"
        >ヘルプページ</v-btn
      >
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'EmptyLayout',
  auth: false,
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: {
    title: 'エラー',
  },
})
</script>

<style>
#error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: auto;
  width: 75%;
  height: 50%;
}

.status-code {
  text-align: center;
  font-family: serif;
  font-size: 1500%;
  color: #b49656;
  height: 60%;
}

.status-code-xs {
  text-align: center;
  font-family: serif;
  font-size: 1000%;
  color: #b49656;
  height: 60%;
}

.error-message {
  text-align: center;
  font-size: 300%;
  color: #b49656;
}

.error-message-xs {
  text-align: center;
  font-size: 200%;
  color: #b49656;
}
</style>
