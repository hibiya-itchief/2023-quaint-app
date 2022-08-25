<template>
    <v-app>
        <v-btn icon fab to="/groups/">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-container>
            <v-row justify="center">
                <v-col cols="10" sm="5">
                    <!--作品情報-->
                    <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
                    <v-card>
                        <!--<v-img :src="group.thumbnail"></v-img>-->
                        <v-card-title>{{group.title}}</v-card-title>
                        <v-card-subtitle>{{group.groupname}}</v-card-subtitle>
                        <!--
                        お気に入り機能は未実装
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn> -->

                        <v-card-actions>
                            <v-chip-group column>
                            <v-chip v-for="tag in tags" disabled>
                                {{tag.tagname}}
                            </v-chip>
                            </v-chip-group>  
                        </v-card-actions>
                        <v-card-actions>
                            <v-btn icon :href="group.twitter_url" target="_blank"><v-icon>mdi-twitter</v-icon></v-btn>
                            <v-btn icon :href="group.instagram_url" target="_blank"><v-icon>mdi-instagram</v-icon></v-btn>
                        </v-card-actions>

                        <v-card-actions class="text-center">
                                <v-dialog
                                v-model="videoViewer"
                                fullscreen
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-row justify="center">
                                    <v-col>
                                        <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        rounded
                                        >
                                        <v-icon>mdi-play</v-icon>
                                        映像で鑑賞
                                        </v-btn>
                                    </v-col>
                                    </v-row>
                                </template>
                                <v-card dark>
                                    <v-toolbar
                                    dark
                                    color="primary"
                                    >
                                    <v-btn
                                        icon
                                        dark
                                        @click="videoViewer = false"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>{{group.title}}/{{group.groupname}}</v-toolbar-title>
                                    </v-toolbar>
                                    <v-row justify="center" align-content="center">
                                        <v-col cols="12">
                                            <iframe height="400px" width="100%" v-bind:src="'https://web.microsoftstream.com/embed/video/'+streamVideoId+'?autoplay=false&showinfo=false'" allowfullscreen></iframe>
                                        </v-col>
                                        <v-card-text>※映像鑑賞には，学校で配布されたMicrosoftアカウントへのログインが必要です。</v-card-text>
                                        <v-col cols="12">
                                            <v-row justify="center">
                                                <v-btn color="primary" v-bind:href="group.stream_url" target="_blank">再生できない場合（Streamで再生）＞</v-btn> 
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                </v-dialog>
                        </v-card-actions>
                    </v-card>
            </v-col>
            <v-col cols="10" sm="5">
                <!--公演時間の選択-->
                    <v-card>
                        <v-card-title>
                        <v-icon>mdi-ticket</v-icon>
                        観劇予約
                        </v-card-title>
                        <v-card-text>現地で見たい公演の整理券を取得できます。</v-card-text>
                        <div v-for="event in events">
                                <v-dialog
                                v-model="event.dialog"
                                width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-row justify="center">
                                            <v-col cols="11">
                                                <v-card @click.stop="event.dialog = true">   
                                                    <v-card-title>{{event.timetable.timetablename}}</v-card-title>
                                                    <v-card-subtitle>{{event.timetable.starts_at}}-{{event.timetable.ends_at}}</v-card-subtitle>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <v-card>
                                        <v-card-title>この公演を選択しますか？</v-card-title>
                                        <v-card-title>{{event.timetable.timetablename}}</v-card-title>
                                        <v-card-subtitle>（{{event.timetable.starts_at}}-{{event.timetable.ends_at}}）</v-card-subtitle>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            
                                            <v-btn
                                                color="primary"
                                                text
                                                @click="event.dialog=false"
                                            >
                                                はい
                                            </v-btn>
                                            <v-btn
                                                color="red"
                                                text
                                                @click="event.dialog = false"
                                            >
                                                いいえ
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                        </div>
                        <v-col cols="11" v-if="events.length===0">
                            <v-card disabled>
                                <v-card-title>現在選択できる公演はありません。</v-card-title>
                            </v-card>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    data () {
      return {
        videoViewer: false,
        group:{},
        events:[],
        streamVideoId:[],
        tags:[],
        ticketResult:[]
      }
    },

    
    methods:{
        /*
        3パターン試したがどれもダメだった(2022/08/25)
        createTicket:async function(event){
           try{
               const res=await axios.post("/groups/"+this.$route.params.groupId+"/events/"+event.id+"/tickets",{person: 1});
               this.ticketResult=res.data;
           }catch(err){
               console.log(err.response);
           }
        }
        */

       /*
       422エラーを返される。原因不明なので諦めた。
        async createTicket(event) {
            await this.$axios.$post("/groups/"+this.$route.params.groupId+"/events/"+event.id+"/tickets",{
                person: parseInt(1)
            })
            
            .then(function (response) {
                this.ticketResult=response.data
            })
            .catch((e => {
                error({ statusCode:404,message: e.message })
            }))
        }
        */

       /*
        async createTicket(event) {
            const res = await this.$axios.$post("/groups/"+this.$route.params.groupId+"/events/"+event.id+"/tickets",{
                person: parseInt(1)
            })
            this.ticketResult = res
            
        },
        */
        
    },
    

    async asyncData({params,error,$axios}){
    let res_group;
    let res_streamVideoId;
    let res_events;
    let res_tags;
    await $axios.get("/groups/"+params.groupId)
    .then(function (response) {
      console.log(response)
      res_group=response.data

      //正規表現によって，groupの中に含まれる"stream_url"の末尾のスラッシュ（/）以降の文字列を取得
      res_streamVideoId=/[^/]*$/.exec(response.data.stream_url)[0]
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))
  
     await $axios.get("/groups/"+params.groupId+"/events")
    .then(function (response) {
      console.log(response)
      res_events=response.data
      //各eventの中に，"'dialog':'false'"という情報を格納することで，公演をクリックした時に，公演に対応したモーダルウィンドウが表示されるようにしている。
      for (var i=0; i < res_events.length; i++){
        res_events[i].dialog=false
      }
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))

    //timetable_idからtimetableの情報取得し，,eventsの中の各eventの中にプロパティ名"timetable"として格納する。
    for (var i=0; i < res_events.length; i++){
        await $axios.get("/timetable/"+res_events[i].timetable_id)
        .then(function (response) {
        console.log(response)
        res_events[i].timetable=response.data
        })
        .catch((e => {
            error({ statusCode:404,message: e.message })
        }))
    }
        
    //groupと結びついたTagを取得
    await $axios.get("/groups/"+params.groupId+"/tags")
    .then(function (response) {
      console.log(response)
      res_tags=response.data
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))

    return {group:res_group,events:res_events,streamVideoId:res_streamVideoId,tags:res_tags}
    },
}
</script>