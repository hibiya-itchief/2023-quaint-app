<template>
<div>
<v-row
  justify="center" align-content="center"
  class="ma-4"
>
<v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
<v-sheet
  color="white"
  elevation="4"
  class="py-4 px-2"
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
    v-model="success_alert"
    color="success"
    elevation="2"
>
    {{success_message}}
    <template v-slot:action="{ attrs }">
        <v-btn
        color="white"
        icon
        v-bind="attrs"
        @click="success_alert = false"
        >
        <v-icon>mdi-close</v-icon>
        </v-btn>
    </template>
</v-snackbar>
<v-snackbar
    v-model="error_alert"
    color="red"
    elevation="2"
>
    {{error_message}}
    <template v-slot:action="{ attrs }">
        <v-btn
        color="white"
        icon
        v-bind="attrs"
        @click="error_alert = false"
        >
        <v-icon>mdi-close</v-icon>
        </v-btn>
    </template>
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
      logout:false,
      success_alert:false,
      error_alert:false,
      success_message:"",
      error_message:"",
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
        await this.$auth.loginWith('local', {data:params})
        location.reload()        
      } catch (e) {
        if(e.response){
          if(e.response.status==401){
            this.error_message=e.response.data.detail
            this.error_alert=true
          }
          else if(e.response.status==400){
            this.error_message=e.response.data.detail
            this.error_alert=true
            setTimeout(()=>{this.$router.push('/user/changepassword')},2500)
          }
        }
        else{
          this.error_message="予期せぬエラーが発生しました。IT部隊にお声がけください🙇‍♂️";
          this.error_alert=true;
          console.error(e.response.status)
        }
      }
    }
  }
}
</script>
