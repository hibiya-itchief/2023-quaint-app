<template>
<div>
<v-row
  justify="center" align-content="center"
  class="ma-4"
>
<v-col cols="11" md="6" lg="4">
<v-sheet
  color="white"
  elevation="4"
  class="pa-4"
>
 <form>
    <h2 align="center" class="text-h5 ma-3">ログイン</h2>
    <p align="center" class="text-caption">事前配布されたseiryofes.comのアカウントでログイン</p>
    <v-text-field
      v-model="login.username"
      label="ユーザー名"
      required
      class="my-3"
    ></v-text-field>
    <v-text-field
      v-model="login.password"
      :append-icon="pw_visible ? 'mdi-eye' : 'mdi-eye-off'"
      :type="pw_visible ? 'text' : 'password'"
      label="パスワード"
      @click:append="pw_visible = !pw_visible"
      class="my-3"
    ></v-text-field>
    <v-btn
      class="light-blue darken-4 my-3"
      @click="userLogin"
      dark
    >
      ログイン
    </v-btn>
  </form>
</v-sheet>
</v-col>
</v-row>
<v-snackbar
  v-model="loginerror"
>
  ユーザー名またはパスワードが違います。
</v-snackbar>
<v-snackbar
  v-model="logout"
>
  ログアウトしました。
</v-snackbar>
</div>
</template>

<script>
export default {
  name: 'SignInPage',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      username:"",
      password:"",
      pw_visible:false,
      loginerror:false,
      logout:false
    }
  },
  mounted(){
    if(typeof this.$route.query.logout != 'undefined'){
      this.logout=true
    }
  }, 
  methods: {
    async userLogin() {
      let params = new URLSearchParams();
      params.append('username', this.login.username);
      params.append('password', this.login.password);
      try {
        let response = await this.$auth.loginWith('local', {data:params})
        if (typeof this.$route.query.to !== 'undefined') {
          this.$router.push(this.$route.to)
        }
        else{
          this.$router.push("/")
        }
        
      } catch (err) {
        this.loginerror=true
      }
    }
  }
}
</script>
