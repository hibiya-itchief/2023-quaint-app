<template>
  <v-app dark>
    <div id="error-page">
      <div v-if="$vuetify.breakpoint.xs">
        <h1 class="status-code-xs">{{ error.statusCode }}</h1>
        <h1 class="error-message-xs">{{ error.message }}</h1>
      </div>
      <div v-else>
        <h1 class="status-code">{{ error.statusCode }}</h1>
        <h1 class="error-message">{{ error.message }}</h1>
      </div>
      <p>{{ error_description }}</p>
      <div v-if="error_description_display">
        <p>ブラウザのリロードボタンを押し、再読み込みをお試しください。</p>
        <p>それでも直らない場合は、IT委員にお声がけください。</p>
      </div>
      <div v-else>
        <p>指定したURLが正しいかご確認の上、再読み込みをお試しください。</p>
      </div>
      <v-btn outlined href="https://forms.gle/aRv81UtSCSgS2gHq8" align="center"
        ><v-icon>mdi-clipboard-text</v-icon>お問い合わせフォーム</v-btn
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
  data() {
    return {
      error_description: '',
      error_description_display: true,
    }
  },

  head: {
    title: 'エラー',
  },
  created() {
    if (this.error.statusCode === 403) {
      this.error_description = 'このページへのアクセスが許可されていません。'
      this.error_description_display = false
    } else if (this.error.statusCode === 404) {
      this.error_description = 'お探しのページは見つかりません。'
      this.error_description_display = false
    } else if (this.error.statusCode === 500) {
      this.error_description = 'サーバー内部でエラーが発生しました。'
    } else {
      this.error_description = 'エラーが発生しました。'
    }
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
