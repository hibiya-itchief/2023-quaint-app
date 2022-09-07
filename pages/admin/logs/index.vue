<template>
<v-app>
<v-container>
<v-row class="ma-0 pa-0" justify="center">
    <v-col cols="12" class="ma-0 pa-0">
    <p class="text-h5">Logs</p>
    <v-row justify="center" class="ma-1 pa-0">
        <v-col cols="12" md="6">
            <v-data-table
                :headers="logs_table_header"
                :items="logs"
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
            logs_table_header:[
                {text:"id",value:"id"},
                {text:"timestamp",value:"timestamp"},
                {text:"user",value:"user"},
                {text:"object",value:"object"},
                {text:"operation",value:"operation"},
                {text:"result",value:"result"},
                {text:"detail",value:"detail"}
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

        let logs=[];
        await Promise.all([
            $axios.get("/admin/logs")
        ])
        .then((response)=>{
            logs=response[0].data
        })


        return {logs}
    }
}
</script>