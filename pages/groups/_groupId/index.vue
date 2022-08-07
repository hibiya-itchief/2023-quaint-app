<template>
<v-app>
<v-container>
  <v-row justify="center">
  <v-col
  cols="12"
  md="8"
  lg="6"
  >
  <v-card>
  <h1>{{group.groupname}}</h1>
  <h1>{{groupId}}</h1>
  </v-card>
  </v-col>
</v-row>
</v-container>
</v-app>

</template>




<script>
export default {
  name: 'IndexPage',
  auth:false,
  data(){
    return{
        groupId:this.$route.params.groupId
    }
  },
  asyncData({params,error,$axios}){
    return $axios.get("/groups/"+params.groupId)
    .then(function (response) {
      return {group:response.data}
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))
  }
}
</script>
