<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar fixed color="light-blue" dark app elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title
          ><NuxtLink to="/" class="ma-0 pa-0" tag="span">星陵祭2023</NuxtLink>
          <span v-if="app_env !== 'production'"
            >@ {{ app_env }}</span
          ></v-toolbar-title
        >
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" temporary fixed height="100vh">
      <v-list nav dense>
        <v-list-item-group active-class="light-blue--text text--accent-4">
          <v-card v-if="$auth.loggedIn" elevation="0">
            <v-card-title class="px-2 py-1"
              ><v-icon class="mr-4">mdi-account-circle</v-icon
              >{{ $auth.user?.name }}</v-card-title
            >
            <v-card-text class="px-2 py-1">
              <v-chip-group column>
                <v-chip
                  v-if="$auth.user?.groups?.includes(userGroups.admin)"
                  outlined
                >
                  👑Admin
                </v-chip>
                <!--
                <v-chip outlined> Entry </v-chip>
                <v-chip outlined> Owner </v-chip>
                <v-chip outlined> Authorizer </v-chip>
                <v-chip outlined> 家族用アカウント </v-chip>-->
                <v-chip
                  v-if="$auth.user?.jobTitle?.includes('Visited')"
                  outlined
                >
                  校内入場処理済み
                </v-chip>
                <v-chip v-if="$auth.$state.strategy == 'ad'" outlined>
                  生徒用アカウント
                </v-chip>
              </v-chip-group>
              <p class="ma-0 pa-0 text-caption grey--text">
                ユーザーID：{{ $auth.user?.oid ?? $auth.user?.sub }}
                <!--ADの場合ユーザーオブジェクトIDはoidに入ってる-->
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" @click="logout()">
                ログアウト
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-else elevation="0">
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

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-form-textbox-password</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><NuxtLink
                style="text-decoration: none; color: inherit"
                to="/user/changepassword"
                >パスワードを変更</NuxtLink
              ></v-list-item-title
            >
          </v-list-item>

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
                © 2023 東京都立日比谷高校 星陵祭チーフ会 IT部隊 | SeiryoFes IT
                Chief Tokyo Metropolitan Hibiya High School
              </p>
            </v-list-item-group>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
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

      <v-btn to="/scan/entry">
        <span>QR</span>
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>

      <v-btn to="/admin">
        <span>👑Admin</span>
        <v-icon>mdi-crown</v-icon>
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
      drawer: false,
      userGroups: { admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string },
      app_env: process.env.QUAINT_ENV,
    }
  },
  async fetch() {},
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>
