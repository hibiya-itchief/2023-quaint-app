<template>
<v-app>
<v-conteiner>
    <v-row justify="center" class="ma-0 pa-0">
    <v-col cols="12" sm="8" md="6">
        <h2><v-icon color="blue-grey">mdi-pencil</v-icon>{{}}</h2>
        <v-card>
        <v-card-title>団体名</v-card-title>
        </v-card>
    </v-col>
    </v-row>           
</v-conteiner>
</v-app>
</template>

<script>
export default {
    name:"IndivisualGroupPageEditer",
    data(){
        
    },
    async asyncData({params,error,$axios}){
        
    }
}
</script>
        