<template>
    <v-app>
        <v-btn icon fab>
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <!--作品情報-->
        <div>
            <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
            <v-card>
                <v-img :src="group.thumbnail"></v-img>
                <div>
                    <v-card-title>{{group.title}}</v-card-title>
                    <v-card-subtitle>{{group.groupname}}</v-card-subtitle>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn color="light-blue" light>
                        <v-icon>mdi-play</v-icon>
                        <v-text>映像で鑑賞</v-text>
                    </v-btn>
                </div>
                
            </v-card>
        </div>



        <!--公演時間の選択-->
        <div>
            <v-text>公演を選択してください</v-text>
            <div v-for="event in events">
               <v-dialog
                v-model="dialog"
                width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-card @click.stop="dialog = true">   
                        <v-card-title>{{event.title}}({{event.starts_at}}-{{event.ends_at}})</v-card-title>
                    </v-card>
                    </template>
                    <v-card>
                        <v-card-title>この公演を選択しますか？</v-card-title>
                        <v-card-text>選択した公演:{{event.title}}({{event.starts_at}}-{{event.ends_at}})</v-card-text>
                       <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                はい
                            </v-btn>
                            <v-btn
                                color="red"
                                text
                                @click="dialog = false"
                            >
                                いいえ
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    
               </v-dialog>

            </div>
        </div>
    </v-app>
</template>

<script>
    export default {
    data () {
      return {
        dialog: false,
        group:{
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
          events:{
            event_id_1:{
                title: '第1公演',
                starts_at: '10:00',
                ends_at: '10:45'
            }
          }
      }
    },
  }
</script>