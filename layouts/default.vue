<template>
  <v-app>
    <v-card class="overflow-hidden">
    <v-app-bar
      fixed
      color="light-blue"
      dark
      app
      elevate-on-scroll
    >
      <v-app-bar-nav-icon  @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title><NuxtLink to="/" class="ma-0 pa-0" tag="div">星陵祭2022</NuxtLink></v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn icon>
        <a style="text-decoration: none;color:inherit" href="https://docs.seiryofes.com">
          <v-icon>
            mdi-help-circle-outline
          </v-icon>
        </a>
      </v-btn>
    </v-app-bar>
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      height="100vh"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="light-blue--text text--accent-4"
        >
          <v-card v-show="logged_in" elevation="0">
            <v-card-title class="px-2 py-1"><v-icon class="mr-4">mdi-account-circle</v-icon>{{user_me.username}}</v-card-title>
            <v-card-text class="px-2 py-1">
              <v-chip-group column >
                <v-chip
                  v-show="user_me_authority.is_admin"
                  outlined
                >
                  👑Admin
                </v-chip>
                <v-chip
                  v-show="user_me_authority.is_Entry"
                  outlined
                >
                  Entry
                </v-chip>
                <v-chip
                  v-show="user_me_authority.owner_of.length!=0"
                  outlined
                >
                  Owner
                </v-chip>
                <v-chip
                  v-show="user_me_authority.authorizer_of.length!=0"
                  outlined
                >
                  Authorizer
                </v-chip>
                <v-chip 
                  v-show="user_me.is_student"
                  outlined
                >
                  生徒用アカウント
                </v-chip>
                <v-chip
                  v-show="user_me.is_family"
                  outlined
                >
                  家族用アカウント
                </v-chip>
                <v-chip 
                  v-show="user_me.is_active"
                  outlined
                >
                  校内入場処理済み
                </v-chip>
              </v-chip-group>
              <p class="ma-0 pa-0 text-caption grey--text">ユーザーID：{{user_me.id}}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" @click="logOut()">
                ログアウト
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="!logged_in" elevation="0">
            <v-card-title class="px-2 py-1"><v-icon class="mr-4">mdi-account-circle</v-icon><span class="grey--text text-caption">ログインしていません</span></v-card-title>
            <v-card-text class="px-2 py-1">
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" to="/login">
                ログイン
              </v-btn>
            </v-card-actions>
          </v-card>
          
          <v-divider></v-divider>
          
          

        </v-list-item-group>
      </v-list>
      <template v-slot:append>
            <div class="pa-0">
              <v-list
                nav
                dense
              >
              <v-list-item-group
                active-class="light-blue--text text--accent-4"
              >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-file-document</v-icon>
                </v-list-item-icon>
                <v-list-item-title><a style="text-decoration: none;color:inherit" href="https://docs.seiryofes.com" >このサイトの使い方</a></v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-github</v-icon>
                </v-list-item-icon>
                <v-list-item-title><a style="text-decoration: none;color:inherit" href="https://github.com/hibiya-itchief" >GitHub</a></v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>
              <p class="ma-0 pa-0 text-caption grey--text">© 2022 東京都立日比谷高校 星陵祭チーフ会 IT部隊 | SeiryoFes IT Chief Tokyo Metropolitan Hibiya High School</p>
              </v-list-item-group>
              </v-list>
            </div>
          </template>
    </v-navigation-drawer>

    <v-main>
    <Nuxt />
    </v-main>
    
    
    <v-bottom-navigation
    color="light-blue"
    fixed
    app
    >
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

      <v-btn v-show="user_me_authority.is_entry" to="/scan/entry">
        <span>QR</span>
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>

      <v-btn v-show="user_me_authority.is_admin" to="/admin">
        <span>👑Admin</span>
        <v-icon>mdi-crown</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: null,
      user_me:{},
      user_me_authority:{owner_of:[],authorizer_of:[]},
      logged_in:false
    }
  },
  async fetch(){
    let user_me=[];
    let logged_in=false;
    await Promise.all([
      this.$axios.get("/users/me"),
      this.$axios.get("/users/me/authority")
    ])
    .then((response)=>{
      this.user_me=response[0].data;
      this.user_me_authority=response[1].data;
      this.logged_in=true;
    })
    .catch(()=>{
      logged_in=false
    })
  },
  methods:{
    async logOut(){
      await this.$auth.logout()
      location.reload()
    }
  }
}
</script>
