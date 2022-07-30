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
      <v-toolbar-title to="/">seiryofes.com</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logOut()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
        <span>マイチケット</span>
        <v-icon>mdi-ticket</v-icon>
      </v-btn>

      <v-btn to="/staff">
        <span>スタッフ</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods:{
    async logOut(){
      await this.$auth.logout()
    }
  }
}
</script>
