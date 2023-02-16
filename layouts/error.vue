<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> ホーム </NuxtLink>
    <a href="https://forms.gle/aRv81UtSCSgS2gHq8"
      >フィードバックを送信(GoogleForm)</a
    >
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound:
        '404 お探しのページは見つかりません。指定したURLがあっているか確認の上再読み込みをお試しください',
      otherError:
        '不明なエラーが発生しました。ブラウザのリロードボタンを押して再読み込みをお試しください。それでも直らない場合はIT部隊にお声がけください🙇‍♂️',
    }
  },
  head() {
    const title = 'Error'
    return {
      title,
    }
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
