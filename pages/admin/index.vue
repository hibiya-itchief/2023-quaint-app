<template>
<v-app>
<v-container>
<v-row class="ma-0 pa-0" justify="center">
    <v-col cols="12" md="8" lg="6" class="ma-0 pa-0">
    <p class="text-h5"><v-icon color="amber">mdi-crown</v-icon>Admin Settings</p>
    <NuxtLink to="/admin/logs">ログの表示</NuxtLink>
    <NuxtLink to="/admin/users">ユーザー</NuxtLink>
    </v-col>
</v-row>
</v-container>
</v-app>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    async asyncData({params,error,$axios}){
        let user_me={};
        let user_me_authority={owner_of:[],authorizer_of:[]};
        await Promise.all([
            $axios.get("/users/me/authority"),
        ])
        .then((response)=>{
            user_me_authority=response[0].data
        })
        .catch((e)=>{})
        //権限が無い場合は404
        if(user_me_authority.is_admin!=true){
            return error({ statusCode: 404, message: "Not Found" })
        }
    }
}
</script>