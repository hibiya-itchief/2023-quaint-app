<template>
  <v-app>
    <v-container>
      <h1 id="title">スケジュール</h1>
      <v-row class="mb-10" justify="center">
        <v-col cols="12" sm="6" md="6">
          <h2 class="mb-3">9月16日</h2>
          <h3 style="text-align: center; font-weight: normal">
            午前8時00分 開門<br />
            午前8時30分 受付開始<br />
            午前9時30分 公演開始<br />
            午後3時00分 受付終了<br />
            午後3時30分 公演終了<br />
            午後4時00分 公開終了
          </h3>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h2 class="mb-3">9月17日</h2>
          <h3 style="text-align: center; font-weight: normal">
            午前8時00分 開門<br />
            午前8時30分 受付開始<br />
            午前9時10分 公演開始<br />
            午後2時30分 受付終了<br />
            午後2時50分 公演終了<br />
            午後3時20分 公開終了
          </h3>
        </v-col>
      </v-row>
      <v-row class="my-10" justify="center">
        <v-col cols="12">
          <h2>整理券の配布スケジュール</h2>
          <p class="my-5">
            ※ 画像中の文字が非常に細かくなっていますので、拡大してご覧ください。
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h2>16日</h2>
          <h3>1年生・2年生</h3>
          <v-img
            class="img"
            src="/images/scheduleDay1FS.png"
            alt="1日目1,2年生の配布スケジュール"
          />
          <h3 class="mt-5">3年生</h3>
          <v-img
            class="img"
            src="/images/scheduleDay1L.png"
            alt="1日目3年生の配布スケジュール"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h2 :class="$vuetify.breakpoint.xs ? 'mt-5' : ''">17日</h2>
          <h3>1年生・2年生</h3>
          <v-img
            class="img"
            src="/images/scheduleDay2FS.png"
            alt="2日目1,2年生の配布スケジュール"
          />
          <h3 class="mt-5">3年生</h3>
          <v-img
            class="img"
            src="/images/scheduleDay2L.png"
            alt="2日目3年生の配布スケジュール"
          />
        </v-col>
      </v-row>
      <v-row class="mt-10" justify="center">
        <v-col cols="12">
          <h2>部活動のタイムテーブル</h2>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-img
            class="img"
            src="/images/scheduleTimetable.png"
            alt="部活動のタイムテーブル"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SchedulePage',
  auth: false,
  head: {
    title: 'スケジュール',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

#title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #b49656;
  font-family: serif;
  font-weight: bold;
}

.img {
  border: 9px solid #b49656;
}
</style>
