<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="9">
        <v-card flat>
          <v-row justify="center">
            <v-col cols="3">
              <v-img src="/images/hibiyaLogo.jpg"></v-img>
            </v-col>
            <v-col cols="6">
              <v-card-subtitle>東京都立日比谷高等学校</v-card-subtitle>
              <v-card-title>第48回 星陵祭</v-card-title>
            </v-col>
          </v-row>
        </v-card>
        <v-card flat>
          <v-img src="/images/sairai.jpeg"></v-img>
          <v-card-title class="justify-center">忘るまじ日比谷の夏</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card>
          <!--ここに案内の文章-->
          <v-card-title>9/16,17</v-card-title>
          <v-card-subtitle>みんな入れるよ</v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="5"
        ><v-card class="my-auto">
          <div>
            <v-card-title><v-icon>mdi-magnify</v-icon>公演を探す</v-card-title>
          </div>
        </v-card></v-col
      >
      <v-col cols="5"
        ><v-card class="my-auto">
          <div>
            <v-card-title
              ><v-icon>mdi-ticket</v-icon>取得した整理券</v-card-title
            >
          </div>
        </v-card></v-col
      >

      <CountDown
        class="ma-1"
        v-if="$vuetify.breakpoint.xs"
        style="width: 100vw"
      />
      <CountDown class="ma-1" v-else style="height: 50vh" />
      <v-col cols="10">
        <v-card max-height="200px">
          <a
            class="twitter-timeline height:200px"
            href="https://twitter.com/HibiyaSeiryoFes?ref_src=twsrc%5Etfw"
            >Tweets by HibiyaSeiryoFes</a
          >
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </v-card>
      </v-col>
      <!--チーフ会のTwitter-->
      <!--コピーライトとか-->
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import CountDown from '~/components/CountDown.vue'
export default Vue.extend({
  name: 'IndexPage',
  auth: false,
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'google-site-verification',
        content: 'kWJ2xUbgwAHnCg34_SgnJlN3oUPoUUpIlGf-9oEYFqA',
      },
      {
        name: 'viewport',
        content: 'width=device-width',
      },
      {
        name: 'description',
        content: 'Seiryofes 2023 official website',
      },
      {
        name: 'keywords',
        content:
          'Seiryofes,星陵祭,日比谷高校,文化祭,公式,星稜祭,日比谷,星陵祭公式,日比谷高校文化祭,IT委員会,日比谷IT',
      },
    ],
    title: '日比谷高校星陵祭2023公式サイト',
    titleTemplate: '',
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,100&display=swap',
      },
    ],
    script: [
      {
        type: 'module',
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
      },
      {
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
      },
    ],
  },
  components: { CountDown },
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.dot {
  color: #f6bd60;
}

.coming-soon {
  display: block;
  margin: 0;
  padding: 0;
  font-size: 7vw;
  font-family: 'Josefin Sans', sans-serif;
}

.feedback {
  display: block;
  font-size: 11px;
  margin-top: 50px;
}

ion-icon {
  display: block;
  margin: 3vw 0;
  font-size: 4vw;
  text-decoration: none;
  color: #000;
}
</style>
