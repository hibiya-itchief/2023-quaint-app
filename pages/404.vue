<template>
  <v-app dark>
    <div id="error-page">
      <h1 v-if="$vuetify.breakpoint.xs" class="status-code-xs">404</h1>
      <h1 v-else class="status-code">404</h1>
      <p>お探しのページは見つかりません。</p>
      <p>指定したURLが正しいかご確認の上、再読み込みをお試しください。</p>
      <!-- フィードバックに類するものを用意する、
          「それでもダメな場合は」みたいな
          <a href="https://forms.gle/aRv81UtSCSgS2gHq8"
            >フィードバックを送信(GoogleForm)</a
          >
          -->
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
  justify-content: end;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: auto;
  width: 75%;
  height: 50%;
}

.status-code {
  font-family: serif;
  font-size: 1500%;
  color: #b49656;
}

.status-code-xs {
  font-family: serif;
  font-size: 1000%;
  color: #b49656;
}
</style>
