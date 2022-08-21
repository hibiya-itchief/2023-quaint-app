<template>
    <v-app>
        <h1>
            <v-icon>mdi-ticket</v-icon>
            整理券
        </h1>
        <p>{{usersMeTickets}}</p>
        <p>{{group}}</p>
        <v-conteiner>
          <v-row>
            <v-col col="6" md="6" sm="12">
              <v-card
              outlined
              v-for="user in users"
              >      
                <v-card-title class="text-h5">
                  <v-icon>mdi-account-circle</v-icon>
                  username: {{user.username}}
                </v-card-title>
                <v-avatar tile color="primary" size="300"></v-avatar>
              </v-card>
            </v-col>
            <v-col col="6" md="6" sm="12">
              <div class="my-3"/>
                <v-tabs
                centered>
                  <v-tab>
                    未使用
                  </v-tab>
                  <v-tab>
                    使用済み（投票券）
                  </v-tab>
                  
                  <div class="my-2"/>
                  <!--未使用整理券-->
                  <v-tab-item>
                    <div v-for="group in groups">
                      <v-card 
                        class="mx-auto"
                        maxwidth="100%"
                        outlined
                        rounded
                        elevation="2"
                      >
                        <v-list-item two-line>
                            <v-img  
                              :src="group.thumbnail" 
                              max-width="40"
                              style="margin: 6px"></v-img>
                            <v-list-item-content>
                              <v-list-item-title  class="text-h7 mb-1">{{group.title}}</v-list-item-title>
                              <v-list-item-subtitle>{{group.groupname}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn>
                              <v-icon>mdi-close</v-icon>
                              <v-text>取消</v-text>
                            </v-btn>
                        </v-list-item>
                      </v-card>
                      <div class="my-2"/>
                    </div>
                  </v-tab-item>
                  <v-tab-item>
                    <div v-for="group in groups">
                      <v-card 
                        class="mx-auto"
                        maxwidth="100%"
                        outlined
                        rounded
                        elevation="2"
                      >
                        <v-list-item two-line>
                            <v-img  
                              :src="group.thumbnail" 
                              max-width="40"
                              style="margin: 6px"></v-img>
                            <v-list-item-content >
                              <v-list-item-title  class="text-h7 mb-1">{{group.title}}</v-list-item-title>
                              <v-list-item-subtitle>{{group.groupname}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-btn>
                              <v-icon>mdi-vote</v-icon>
                              <v-text>投票</v-text>
                            </v-btn>
                        </v-list-item>
                      </v-card>
                      <div class="my-2"/>
                    </div>
                  </v-tab-item>
                </v-tabs>
            </v-col>
          </v-row>
        </v-conteiner>
        
        
        
    </v-app>
</template>

<script>
    export default {
   data(){
    return {
      usersMeTickets:{},
      group:{},
    }
    },
    asyncData({ params, error,$axios }) {
      return $axios.get("/users/me/tickets")
        .then((res) => {
          return { usersMeTickets: res.data }
        })
        //エラー処理
        .catch((e => {
          error({ message: e.message })
        }))
    },
    asyncData({ params, error,$axios }) {
      return $axios.get("/group")
        .then((res) => {
          return { group: res.data }
        })
        //エラー処理
        .catch((e => {
          error({ message: e.message })
        }))
    },
    
  }
</script>