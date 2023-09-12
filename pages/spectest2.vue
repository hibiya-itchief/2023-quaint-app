<template>
  <v-app>
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
          <h2 align="center" class="text-h5 ma-3">負荷テスト</h2>
          <p align="center" class="text-subtitle-1">
            指示があるまではどのボタンも押さないでください
          </p>
          <v-divider class="my-3"></v-divider>

          <v-btn
            class="light-blue darken-4 my-8"
            block
            rounded="xl"
            dark
            @click="spectestBtn1"
          >
            ボタン１
          </v-btn>
          <v-btn
            class="light-blue darken-4 my-8"
            block
            rounded="xl"
            dark
            @click="spectestBtn2"
          >
            ボタン２
          </v-btn>
          <v-btn
            class="light-blue darken-4 my-8"
            block
            rounded="xl"
            dark
            @click="spectestBtn3"
          >
            ボタン３
          </v-btn>
          <v-btn
            class="light-blue darken-4 my-8"
            block
            rounded="xl"
            dark
            @click="spectestBtn4"
          >
            ボタン４
          </v-btn>
          <v-btn
            class="light-blue darken-4 my-8"
            block
            rounded="xl"
            dark
            @click="spectestBtn5"
          >
            ボタン５
          </v-btn>
          <v-btn
            class="light-blue darken-4 my-8"
            block
            rounded="xl"
            dark
            @click="spectestBtn6"
          >
            ボタン６
          </v-btn>
          <p align="center" class="text-subtitle-1">IT委員会</p>
        </v-sheet>
      </v-col>
    </v-row>
    <v-snackbar v-model="success_alert" color="success" elevation="2">
      {{ success_message }}
      <template #action="{ attrs }">
        <v-btn color="white" icon v-bind="attrs" @click="success_alert = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error_alert" color="red" elevation="2">
      {{ error_message }}
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
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      dialog: false,
    }
  },
  head: {
    title: '負荷テスト',
  },
  mounted() {},
  methods: {
    async spectestBtn1() {
      const promises = []
      for (let i = 0; i < 3; i++) {
        promises.push(this.$axios.$post('/spectest/tickets'))
      }
      await Promise.all(promises)
        .then(() => {
          this.success_alert = true
          this.success_message = '成功しました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message =
            'エラーが発生しました お近くのIT委員をお呼びください'
          console.log(e)
        })
    },
    async spectestBtn2() {
      const promises = []
      for (let i = 0; i < 5; i++) {
        promises.push(this.$axios.$post('/spectest/tickets'))
      }
      await Promise.all(promises)
        .then(() => {
          this.success_alert = true
          this.success_message = '成功しました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message =
            'エラーが発生しました お近くのIT委員をお呼びください'
          console.log(e)
        })
    },
    async spectestBtn3() {
      await this.$axios
        .$get('/groups')
        .then(() => {
          this.success_alert = true
          this.success_message = '成功しました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message =
            'エラーが発生しました お近くのIT委員をお呼びください'
          console.log(e)
        })
    },
    async spectestBtn4() {
      const promises = []
      for (let i = 0; i < 10; i++) {
        promises.push(this.$axios.$post('/spectest/tickets'))
      }
      await Promise.all(promises)
        .then(() => {
          this.success_alert = true
          this.success_message = '成功しました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message =
            'エラーが発生しました お近くのIT委員をお呼びください'
          console.log(e)
        })
    },
    async spectestBtn5() {
      const promises = []
      for (let i = 0; i < 20; i++) {
        promises.push(this.$axios.$post('/spectest/tickets'))
      }
      await Promise.all(promises)
        .then(() => {
          this.success_alert = true
          this.success_message = '成功しました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message =
            'エラーが発生しました お近くのIT委員をお呼びください'
          console.log(e)
        })
    },
    async spectestBtn6() {
      const promises = []
      for (let i = 0; i < 50; i++) {
        promises.push(this.$axios.$post('/spectest/tickets'))
      }
      await Promise.all(promises)
        .then(() => {
          this.success_alert = true
          this.success_message = '成功しました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message =
            'エラーが発生しました お近くのIT委員をお呼びください'
          console.log(e)
        })
    },
  },
})
</script>
