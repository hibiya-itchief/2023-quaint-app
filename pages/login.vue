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
          <!--p align="center" class="text-caption">
            アカウントをお持ちでない方も上のボタンを押していただき、指示に従って作成してください。当日入場する際に再ログインが求められる可能性があるため、パスワードを必ず記憶してください。
          </p-->
          <p align="center" class="text-caption">
            <span style="color: #f00"
              >今年度は一般向けのオンライン整理券は実施しません。</span
            ><br />下記の「一般向け整理券配布方法」をご覧ください。
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
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
          <h2 align="center" class="text-h5 ma-3">一般向け整理券配布方法</h2>
          <p align="center" class="">3年生クラス劇の配布&emsp;＠サブアリーナ</p>
          <p align="center" class="text-caption">
            3年生のクラス劇の整理券配布は、体育館棟1階サブアリーナで行います。配布開始は1つ前の公演が始まってからです。<br />
            また、配布開始前の規定時間から、同じくサブアリーナ付近で待機列を設けます。
            時間について、詳しくは下記の表をご覧ください。
          </p>
          <p align="center" class="">1日目（3年生）</p>
          <table align="center">
            <tbody>
              <tr>
                <td>公演</td>
                <td>第1公演</td>
                <td>第2公演</td>
                <td>第3公演</td>
                <td>第4公演</td>
                <td>第5公演</td>
              </tr>
              <tr>
                <td>待機開始</td>
                <td>--</td>
                <td>8:50</td>
                <td>9:30</td>
                <td>10:40</td>
                <td>12:00</td>
              </tr>
              <tr>
                <td>配布開始</td>
                <td>8:50</td>
                <td>9:30</td>
                <td>10:40</td>
                <td>12:00</td>
                <td>13:10</td>
              </tr>
            </tbody>
          </table>
          <p align="center" class="">2日目（3年生）</p>
          <table align="center">
            <tbody>
              <tr>
                <td>公演</td>
                <td>第1公演</td>
                <td>第2公演</td>
                <td>第3公演</td>
                <td>第4公演</td>
                <td>第5公演</td>
              </tr>
              <tr>
                <td>待機開始</td>
                <td>--</td>
                <td>8:30</td>
                <td>9:10</td>
                <td>10:20</td>
                <td>11:30</td>
              </tr>
              <tr>
                <td>配布開始</td>
                <td>8:30</td>
                <td>9:10</td>
                <td>10:20</td>
                <td>11:30</td>
                <td>12:50</td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <p align="center" class="">1、2年生クラス劇の配布&emsp;＠剣道場</p>
          <p align="center" class="text-caption">
            1、2年生のクラス劇の整理券配布は、体育館棟3階の剣道場で行います。ただし、入り口は1階アーケードからです。<br />
            配布開始は1つ前及び2つ前の公演が始まってからです。また、3年生と異なり、待機列の設定は行いません。
            時間について、詳しくは下記の表をご覧ください。
          </p>
          <p align="center" class="">1日目（1、2年生）</p>
          <table align="center">
            <tbody>
              <tr>
                <td>公演</td>
                <td>第1公演</td>
                <td>第2公演</td>
                <td>第3公演</td>
                <td>第4公演</td>
                <td>第5公演</td>
              </tr>
              <tr>
                <td>配布開始</td>
                <td colspan="2">8:50</td>
                <td>9:30</td>
                <td colspan="2">12:00</td>
              </tr>
            </tbody>
          </table>
          <p align="center" class="">2日目（1、2年生）</p>
          <table align="center">
            <tbody>
              <tr>
                <td>公演</td>
                <td>第1公演</td>
                <td>第2公演</td>
                <td>第3公演</td>
                <td>第4公演</td>
                <td>第5公演</td>
              </tr>
              <tr>
                <td>配布開始</td>
                <td colspan="2">8:30</td>
                <td>9:10</td>
                <td>10:20</td>
                <td>12:50</td>
              </tr>
            </tbody>
          </table>
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
    loginAd() {
      this.$auth.loginWith('ad')
    },
    errorLogin() {
      this.error_alert = true
    },
  },
})
</script>
