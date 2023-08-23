<template>
  <v-app>
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
          <h2 align="center" class="text-h5 ma-3">ログイン</h2>
          <p align="center" class="">
            整理券の取得にはログインが必要となります。
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn class="light-blue darken-4 my-3" block disabled>
            一般の方はこちらから
          </v-btn>
          <p align="center" class="text-caption">
            アカウントをお持ちでない方も上のボタンを押していただき、指示に従って作成してください。当日入場する際に再ログインが求められる可能性があるため、パスワードを必ず記憶してください。
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn class="light-blue darken-4 my-3" block dark @click="loginAd()">
            本校生徒・先生方はこちらから
          </v-btn>
          <p align="center" class="text-caption">
            学校から配布されているMicrosoftアカウント(「@metro.ed.jp」で終わるもの)でログインしてください
          </p>
        </v-sheet>
      </v-col>
    </v-row>
    <v-snackbar v-model="error_alert" color="red" elevation="2">
      ログイン失敗 もう一度お試しください
      <template #action="{ attrs }">
        <v-btn color="white" icon v-bind="attrs" @click="error_alert = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      error_alert: false,
    }
  },
  head: {
    title: 'ログイン',
  },
  mounted() {},
  created() {
    if (this.$route.query.error !== undefined) this.errorLogin()
  },
  methods: {
    loginB2c() {
      this.$auth.loginWith('b2c')
    },
    loginAd() {
      this.$auth.loginWith('ad')
    },
    errorLogin() {
      this.error_alert = true
    },
  },
})
</script>
