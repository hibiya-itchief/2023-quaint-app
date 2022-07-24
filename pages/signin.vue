<template>
<v-row
  justify="center" align-content="center"
>
<v-col cols="11" md="6" lg="4">
<v-sheet
  color="white"
  elevation="4"
  class="pa-3"
>
 <form>
    <p class="text-subtitle-1">事前に配布されたseiryofes.comのアカウントでサインイン</p>
    <v-text-field
      v-model="login.username"
      label="ユーザー名"
      required
    ></v-text-field>
    <v-text-field
      v-model="login.password"
      :append-icon="pw_visible ? 'mdi-eye' : 'mdi-eye-off'"
      :type="pw_visible ? 'text' : 'password'"
      label="パスワード"
      @click:append="pw_visible = !pw_visible"
    ></v-text-field>
    <v-btn
      @click="userLogin"
    >
      ログイン
    </v-btn>
  </form>
</v-sheet>
</v-col>
</v-row>
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
      pw_visible:false
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
        
      }
    }
  }
}
</script>
