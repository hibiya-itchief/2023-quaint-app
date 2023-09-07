<template>
  <v-app>
    <div v-if="showVideo" class="splash-video">
      <video
        src="/images/sairai_short2.mp4"
        webkit-playsinline
        playsinline
        autoplay
        muted
      ></video>
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
        <h1 class="info-title">開催概要</h1>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <h2 class="info-subtitle">令和5年度</h2>
            <h2 class="info-subtitle">9月16日(土)ー17日(日)</h2>
            <br />
            <h2 class="info-subtitle">第48回 星陵祭</h2>
            <h1
              class="info-subtitle"
              style="font-family: serif; font-weight: bold; color: #b49656"
            >
              「祭徠」
            </h1>
            <br />
            <h2 class="info-subtitle">東京都立日比谷高等学校</h2>
            <p class="info-caption">〒100-0014 東京都千代田区永田町2-16-1</p>
            <br />
            <h2 class="info-subtitle">すべての方に</h2>
            <h2 class="info-subtitle">ご入場いただけます。</h2>
            <!-- 日比谷公式からこの記述が消えたので一旦消去
              <p class="info-caption">感染症の流行状況により変更の可能性があります。</p>
              -->
            <br />
            <br />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <h2 class="info-subtitle">9月16日</h2>
            <br />
            <h3 class="info-subtitle">8時30分 受付開始</h3>
            <h3 class="info-subtitle">16時00分 公開終了</h3>
            <br />
            <br />
            <h2 class="info-subtitle">9月17日</h2>
            <br />
            <h3 class="info-subtitle">8時30分 受付開始</h3>
            <h3 class="info-subtitle">15時20分 公開終了</h3>
            <br />
            <br />
            <h3 class="info-subtitle">詳しくは追って掲載します。</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div style="margin-top: 30px; width: 100%; background-color: #b49656">
      <v-row justify="center" class="pb-10">
        <v-col cols="10">
          <h1 class="pages-title">ご案内</h1>
          <v-row justify="center">
            <v-col
              v-for="page in pages"
              :key="page.icon"
              cols="6"
              sm="4"
              md="3"
              class="my-0 py-2"
              :class="$vuetify.breakpoint.xs ? 'pages-xs' : 'pages-else'"
            >
              <v-card class="pa-1" outlined :to="page.link">
                <v-icon size="100" color="sairai" style="display: flex">{{
                  page.icon
                }}</v-icon>
                <p class="pages-text">{{ page.text }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center" class="pt-6">
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
              ><v-icon x-large color="sairai">mdi-ticket</v-icon
              >あなたの整理券</v-card-title
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
  pages: object
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
      pages: [
        { icon: 'mdi-hexagon-outline', text: '星陵祭とは', link: '/about' },
        {
          icon: 'mdi-ticket-confirmation',
          text: '整理券制度',
          link: '/system',
        },
        { icon: 'mdi-train', text: 'アクセス', link: '/access' },
        { icon: 'mdi-map', text: '校内マップ', link: '/map' },
        { icon: 'mdi-clock', text: 'スケジュール', link: '/schedule' },
        {
          icon: 'mdi-tooltip-question-outline',
          text: 'ヘルプ',
          link: '/help',
        },
      ],
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
          'Seiryofes,星陵祭,日比谷高校,文化祭,公式,星稜祭,日比谷,星陵祭公式,日比谷高校文化祭,IT委員会,日比谷IT,祭徠',
      },
    ],
    title: '日比谷高校星陵祭2023「祭徠」公式サイト',
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

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.info-title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #b49656;
  font-family: serif;
  font-weight: bold;
}

.info-subtitle {
  text-align: center;
  font-weight: normal;
}

.info-caption {
  text-align: center;
  font-weight: normal;
  color: #666;
}

.pages-title {
  margin-top: 10px;
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #fff;
  font-family: serif;
  font-weight: bold;
  color: #fff;
}

.pages-xs {
  font-size: 20px;
}

.pages-else {
  font-size: 30px;
}

.pages-else:hover {
  transform: scale(1.1, 1.1);
}

.pages-text {
  text-align: center;
  font-family: serif;
  font-weight: bold;
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

video {
  max-width: 100%;
  max-height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
