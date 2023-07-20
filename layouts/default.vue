<template>
  <v-app>
    <div v-if="app_env !== 'production'" class="app-env">
      <span>@{{ app_env }} </span>
      <span style="font-size: 0.5em">API:{{ api_url }} </span>
    </div>
    <div class="humbuger-box">
      <div
        class="humbugermenu"
        :class="{ active: drawerMenu }"
        @click="drawerMenu = !drawerMenu"
      >
        <div class="humbuger-btn"><span></span><span></span><span></span></div>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawerMenu"
      class="drawer-menu"
      temporary
      fixed
      style="position: fixed"
    >
      <v-list nav dense>
        <v-list-item-group active-class="light-blue--text text--accent-4">
          <v-card v-show="$auth.loggedIn" elevation="0">
            <v-card-title class="px-2 py-1"
              ><v-icon class="mr-4">mdi-account-circle</v-icon
              >{{ $auth.user?.name }}</v-card-title
            >
            <v-card-text class="px-2 py-1">
              <v-chip-group column>
                <v-chip
                  v-show="$auth.user?.groups?.includes(userGroups.admin)"
                  outlined
                >
                  👑Admin
                </v-chip>
                <v-chip
                  v-show="$auth.user?.groups?.includes(userGroups.owner)"
                  outlined
                >
                  団体代表者
                </v-chip>

                <!--
                <v-chip outlined> Entry </v-chip>
                <v-chip outlined> Authorizer </v-chip>
                <v-chip outlined> 家族用アカウント </v-chip>-->
                <v-chip
                  v-show="$auth.user?.jobTitle?.includes('Visited')"
                  outlined
                >
                  校内入場処理済み
                </v-chip>
                <v-chip v-show="$auth.$state.strategy == 'ad'" outlined>
                  生徒用アカウント
                </v-chip>
              </v-chip-group>
              <p class="ma-0 pa-0 text-caption grey--text">
                ユーザーID：{{ $auth.user?.oid ?? $auth.user?.sub }}
                <!--ADの場合ユーザーオブジェクトIDはoidに入ってる-->
              </p>
              <p 
              v-show="$auth.user?.groups?.includes(userGroups.admin)"
              class="ma-0 pa-0 text-caption grey--text">
              <a @click="revealToken()">APIトークンを表示</a>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" @click="logout()">
                ログアウト
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="!$auth.loggedIn" elevation="0">
            <v-card-title class="px-2 py-1"
              ><v-icon class="mr-4">mdi-account-circle</v-icon
              ><span class="grey--text text-caption"
                >ログインしていません</span
              ></v-card-title
            >
            <v-card-text class="px-2 py-1"> </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" to="/login"> ログイン </v-btn>
            </v-card-actions>
          </v-card>

          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
      <template #append>
        <div class="pa-0">
          <v-list nav dense>
            <v-list-item-group active-class="light-blue--text text--accent-4">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-clipboard-text</v-icon>
                </v-list-item-icon>
                <v-list-item-title
                  ><a
                    style="text-decoration: none; color: inherit"
                    href="https://forms.gle/aRv81UtSCSgS2gHq8"
                    >フィードバック</a
                  ></v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-github</v-icon>
                </v-list-item-icon>
                <v-list-item-title
                  ><a
                    style="text-decoration: none; color: inherit"
                    href="https://github.com/hibiya-itchief"
                    >GitHub</a
                  ></v-list-item-title
                >
              </v-list-item>

              <v-divider></v-divider>
              <p class="ma-0 pa-0 text-caption grey--text">
                © 2023 東京都立日比谷高等学校 IT委員会 | IT Chief | Tokyo
                Metropolitan Hibiya High School
              </p>
            </v-list-item-group>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <Nuxt class="main-content" />
    </v-main>

    <v-bottom-navigation color="light-blue" fixed app>
      <v-btn to="/">
        <span>ホーム</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/groups">
        <span>探す</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn to="/tickets">
        <span>整理券</span>
        <v-icon>mdi-ticket</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DefaultLayout',
  data() {
    return {
      drawerMenu: false,
      userGroups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
      },
      app_env: process.env.QUAINT_ENV,
      api_url: process.env.BASEURL,
    }
  },
  async fetch() {},
  mounted() {
    if (this.$auth.loggedIn && this.$auth.user?.sub === undefined) {
      const base64Url = (this.$auth.strategy as any).token.get().split('.')[1] // https://auth.nuxtjs.org/api/auth/#:~:text=Token%20and%20Refresh%20Token%20are%20available%20on%20%24auth.strategy.token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      this.$auth.setUser(JSON.parse(decodeURIComponent(window.atob(base64))))
    }
  },
  methods: {
    revealToken() {
      window.open(
        'https://jwt.io/?token=' +
          (this.$auth.strategy as any).token.get().split(' ').slice(-1)[0]
      )
    },
    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>

<style>
/* v-app-barを削除すると、v-bottom-navigationのボタンが上にずれ、背景の色が正しくならないので不本意ながらカスタムcssを追加 */
.v-item-group.v-bottom-navigation .v-btn {
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  flex: 0 1 auto;
  font-size: 0.75rem;
  height: inherit;
  max-width: 168px;
  min-width: 80px;
  position: relative;
  text-transform: none;
}

.app-env {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1500;
  padding: 0.5rem;
  background-color: #ffd900;
  border-radius: 0 0 0 5px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #f00;
  animation: blinking 1s ease-in-out infinite alternate;
}

@keyframes blinking {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.humbuger-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.humbugermenu {
  position: relative; /* ボタン内側の基点となるためrelativeを指定 */
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

/* ボタン内側 */
.humbugermenu .humbuger-btn {
  transition: all 0.6s; /* アニメーションの設定 */
  width: 50px;
  height: 50px;
}

.humbugermenu span {
  display: inline-block;
  transition: all 0.4s;
  position: absolute;
  left: 14px;
  height: 3px;
  border-radius: 2px;
  background: #05aaf4;
  width: 45%;
}

.humbugermenu span:nth-of-type(1) {
  top: 15px;
}

.humbugermenu span:nth-of-type(2) {
  top: 23px;
}

.humbugermenu span:nth-of-type(3) {
  top: 31px;
}

/* activeクラスが付与されると .openbtn-areaが360度回転し、その中の線が回転して×に */
.humbugermenu.active .humbuger-btn {
  transform: rotate(360deg);
}

.humbugermenu.active span:nth-of-type(1) {
  top: 18px;
  left: 18px;
  transform: translateY(6px) rotate(-45deg);
  width: 30%;
}

.humbugermenu.active span:nth-of-type(2) {
  opacity: 0;
}

.humbugermenu.active span:nth-of-type(3) {
  top: 30px;
  left: 18px;
  transform: translateY(-6px) rotate(45deg);
  width: 30%;
}

/* ハンバーガーメニューを開くボタンのためのスペース */
.drawer-menu {
  padding-top: 40px;
}

.main-content {
  padding-top: 40px;
}
</style>
