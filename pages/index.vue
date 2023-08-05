<template>
  <v-app>
    <div id="main">
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-img src="/images/sairai.jpeg"></v-img>
            <v-card-title class="justify-center"
              >忘るまじ日比谷の夏</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>

      <v-img
        v-if="$vuetify.breakpoint.xs"
        src="/images/mainvisual.png"
        style="width: 100%"
        contain
      ></v-img>
      <v-img
        v-else
        src="/images/mainvisual.png"
        style="width: 80%"
        contain
      ></v-img>

      <!--ここに案内の文章-->

      <CountDown
        class="ma-1"
        v-if="$vuetify.breakpoint.xs"
        style="width: 100vw"
      />
      <CountDown class="ma-1" v-else style="height: 50vh" />
      <!--チーフ会のTwitter-->
      <!--コピーライトとか-->
    </div>
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

#main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: auto;
  width: 100%;
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
