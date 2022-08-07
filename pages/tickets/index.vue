<template>
    <v-app>
        <h1>
            <v-icon>mdi-ticket</v-icon>
            整理券
        </h1>
        <v-card
        outlined
        v-for="user in users"
        >      
          <v-card-title class="text-h5">
            <v-icon>mdi-account-circle</v-icon>
            username: {{user.username}}
          </v-card-title>
          <v-img src="/image/example_qrcode.png"></v-img>
        </v-card>
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
        
    </v-app>
</template>

<script>
    export default {
    data () {
      return {
        groups:[
          {
            groupname: '36R',
            title: '炎と森のカーニバル',
            description: 'string',
            page_content: 'string',
            enable_vote: true,
            twitter_url: 'https://twitter.com/HibiyaSanro',
            instagram_url: 'https://www.instagram.com/hibiyasanro/',
            stream_url: 'example.com',
            id: 'string',
            thumbnail: '/image/Top-Gun.jpg',
          },
          {
            groupname: '37R',
            title: 'アラジン',
            description: 'string',
            page_content: 'string',
            enable_vote: true,
            twitter_url: 'https://twitter.com/HibiyaSanro',
            instagram_url: 'https://www.instagram.com/hibiyasanro/',
            stream_url: 'example.com',
            id: 'string',
            thumbnail: '/image/Top-Gun.jpg',
          },
          {
            groupname: '38R',
            title: 'アナと雪の女王',
            description: 'string',
            page_content: 'string',
            enable_vote: true,
            twitter_url: 'https://twitter.com/HibiyaSanro',
            instagram_url: 'https://www.instagram.com/hibiyasanro/',
            stream_url: 'example.com',
            id: 'string',
            thumbnail: '/image/Top-Gun.jpg',
          }  
        ],
        users:[
          {
          username: 'jt_j9',
          id: 'string',
          }
        ]

      }
    },
  }
</script>