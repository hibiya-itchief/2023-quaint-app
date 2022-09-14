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
        <h2 align="center" class="text-h5 ma-3">パスワードを変更</h2>
        <p v-show="!required" align="center" class="mb-1 text-caption">seiryofes.comのアカウントのパスワードを変更します。</p>
        <p v-show="required" align="center" class="mb-1 text-caption red--text">パスワードの変更が必要です</p>
        <p align="center" class="mt-1 text-caption grey--text">※パスワードがわからなくなった生徒はIT部隊にお声がけください</p>
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
          label="現在のパスワード"
          @click:append="pw_visible = !pw_visible"
          class="my-3"
        ></v-text-field>

        <v-text-field
          v-model="login.new_password"
          :append-icon="new_pw_visible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="new_pw_visible ? 'text' : 'password'"
          label="新しいパスワード"
          @click:append="new_pw_visible = !new_pw_visible"
          class="my-3"
        ></v-text-field>
        <v-btn
          class="light-blue darken-4 my-3"
          @click="changePassword()"
          dark
        >
          パスワードを変更
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
      name: 'ChangePasswordPage',
      auth: false,
      data() {
        return {
          login: {
            username: '',
            password: '',
            new_password: ''
          },
          username:"",
          password:"",
          pw_visible:false,
          new_pw_visible:false,
          loginerror:false,
          success_alert:false,
          error_alert:false,
          success_message:"",
          error_message:"",
          required:false
        }
      },
      mounted(){
            if(typeof this.$route.query.required != 'undefined'){
            this.required=true
            }
        }, 
      methods: {
        async changePassword() {
            await this.$axios.put("/users/me/password",this.login)
            .then((response)=>{
                this.success_message="パスワードが正しく変更されました。新しいパスワードでログインしてください"
                this.success_alert=true
                setTimeout(()=>{this.$router.push('/login')},2500)
            })
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    this.error_alert=true
                }
                else{
                    this.error_message="予期せぬエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                    this.error_alert=true
                }
            })
        }
      }
    }
    </script>
    