<template>
<v-app>
<v-container>
<v-row class="ma-0 pa-0" justify="center">
    <v-col cols="12" class="ma-0 pa-0">
    <p class="text-h5">Users</p>
    <v-row justify="center" class="ma-1 pa-0">
        <v-col cols="12" md="6">
            <v-data-table
                :headers="users_table_header"
                :items="users"
                :items-per-page="10"
                class="elevation-1"
            ></v-data-table>
        </v-col>
    </v-row>
    </v-col>
</v-row>
</v-container>
</v-app>
</template>

<script>
export default {
    data(){
        return{
            users_table_header:[
                {text:"id",value:"id"},
                {text:"username",value:"username"},
                {text:"is_student",value:"is_student"},
                {text:"is_family",value:"is_family"},
                {text:"is_active",value:"is_active"},
                {text:"password_expired",value:"password_expired"}
            ]
        }
    },
    async asyncData({params,error,$axios}){
        let user_me_authority={owner_of:[],authorizer_of:[]};
        await $axios.get("/users/me/authority")
        .then((response)=>{
            user_me_authority=response.data
        })
        .catch((e)=>{})
        //権限が無い場合は404
        if(user_me_authority.is_admin!=true){
            return error({ statusCode: 404, message: "Not Found" })
        }

        let users=[];
        await Promise.all([
            $axios.get("/users")
        ])
        .then((response)=>{
            users=response[0].data
        })


        return {users}
    }
}
</script>