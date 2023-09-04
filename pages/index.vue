<template>
  <v-app>
    <div v-if="showVideo" class="splash-video">
      <div class="splash-container">
        <video
          src="/images/sairai_short2.mp4"
          webkit-playsinline
          playsinline
          autoplay
          muted
        ></video>
      </div>
    </div>
    <v-row justify="center">
      <v-col cols="12">
        <v-parallax src="/images/topBackground2.jpg" height="600">
          <v-row align="center" justify="center">
            <v-col cols="10" md="5" sm="10">
              <v-card class="text-center">
                <v-card-title class="justify-center"
                  >日比谷高校文化祭</v-card-title
                >
                <v-img src="/images/Sairai.jpeg"></v-img>
                <v-card-title class="justify-center">星陵祭2023</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>
      <v-col cols="10">
        <v-card class="pa-3">
          <v-card-title class="justify-center"
            ><v-icon>mdi-information</v-icon>開催概要</v-card-title
          >
          <v-card-title><v-icon>mdi-calendar</v-icon>2023/9/16-17</v-card-title>
          <v-card-title
            ><v-icon>mdi-map-marker</v-icon>東京都立日比谷高校</v-card-title
          >
          <v-card-text>〒100-0014 東京都千代田区永田町2-16-1</v-card-text>
          <v-card-title
            ><v-icon>mdi-account-group</v-icon
            >すべての方に御入場いただけます</v-card-title
          >
          <v-card-text
            >一般の方（中学生含む）、保護者、本校卒業生など。感染症流行状況により変更の可能性あり。</v-card-text
          >
        </v-card>
      </v-col>

      <v-col cols="10" md="5" sm="10"
        ><v-card class="my-auto" to="/groups">
          <div>
            <v-card-title><v-icon>mdi-magnify</v-icon>公演一覧</v-card-title>
          </div>
        </v-card></v-col
      >
      <v-col cols="10" md="5" sm="10"
        ><v-card class="my-auto" to="/tickets">
          <div>
            <v-card-title
              ><v-icon>mdi-ticket</v-icon>あなたの整理券</v-card-title
            >
          </div>
        </v-card></v-col
      >
      <CountDown
        v-if="$vuetify.breakpoint.xs"
        class="ma-1 justify-center"
        style="width: 100vw"
      />
      <CountDown v-else class="ma-1 justify-center" style="height: 50vh" />

      <!--チーフ会のTwitter-->
      <!--
      <v-col cols="10">
        <v-card>
          <a
            class="twitter-timeline height:200px"
            data-tweet-limit="2"
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
      -->

      <!--コピーライトとか-->
      <v-col cols="10">
        <v-btn href="https://forms.gle/aRv81UtSCSgS2gHq8" class="ma-2"
          ><v-icon>mdi-list-box</v-icon>フィードバック(Googleフォーム)</v-btn
        >
        <v-btn href="https://github.com/hibiya-itchief" class="ma-2"
          ><v-icon>mdi-github</v-icon>GitHub</v-btn
        >
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import CountDown from '~/components/CountDown.vue'
type Data = {
  showVideo: boolean
  prevRoute: Route | null
}
export default Vue.extend({
  name: 'IndexPage',
  auth: false,
  components: { CountDown },
  beforeRouteEnter(to, from, next) {
    // vue-routerの処理に割り込んで(?)リファラを取得する
    next((vm: any) => {
      vm.prevRoute = from
    })
  },
  data(): Data {
    return {
      showVideo: true,
      prevRoute: null,
    }
  },
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
  mounted() {
    // リファラが「/」なら(リンク直アクセスor他オリジンから)、最初のさいらいビデオを流す
    if (
      this.prevRoute?.fullPath !== undefined &&
      this.prevRoute?.fullPath !== null &&
      this.prevRoute?.fullPath === '/'
    ) {
      this.showVideo = true
    } else {
      this.showVideo = false
    }
  },
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

html,
body {
  height: 100%;
}

.splash-video {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  animation: fade-out linear 5.5s forwards;

  /* keyframeに対応していないブラウザで見ると一生画面が真っ白になるので、 */
  width: 0;
  height: 0;
  overflow: hidden; /* スプラッシュ背景が消えた時に、videoがはみ出さないようにする */
}

.splash-container {
  /* コンテナをスプラッシュ背景の中央に配置する */
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

video {
  max-width: 100%;
  max-height: 100%;
}

@keyframes fade-out {
  0% {
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  90% {
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  99% {
    opacity: 0;
    display: none;
    width: 100%;
    height: 100%;
    z-index: -1000;
  }

  100% {
    opacity: 0;
    display: none;
    width: 0;
    height: 0;
    z-index: -1000;
  }
}
</style>
