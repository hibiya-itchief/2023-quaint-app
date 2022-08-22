<template>
    <v-app>
        <v-btn icon fab to="/groups/">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-conteiner>
            <v-row justify="center">
                <v-col cols="10" sm="5">
                    <!--作品情報-->
                    <div>
                        
                        <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
                        <v-card>
                            <!--<v-img :src="group.thumbnail"></v-img>-->
                            <div>
                                <v-card-title>{{group.title}}</v-card-title>
                                <v-card-subtitle>{{group.groupname}}</v-card-subtitle>
                                <!--
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn> -->
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
                            </div>
                        </v-card>
                    </div>
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
                                    v-model="dialog"
                                    width="500">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-row justify="center">
                                                <v-col cols="11">
                                                    <v-card @click.stop="dialog = true">   
                                                        <v-card-title>{{event.title}}({{event.starts_at}}-{{event.ends_at}})</v-card-title>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
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
                       </v-card>
                       
                </v-col>
            </v-row>
        </v-conteiner>



        
    </v-app>
</template>

<script>
export default {
    data () {
      return {
        dialog: false,
        videoViewer: false,
        group:{},
        events:[],
        streamVideoId:[]
        
      }
    },
    async asyncData({params,error,$axios}){
    let res_group;
    let res_streamVideoId;
    let res_events;
    await $axios.get("/groups/"+params.groupId)
    .then(function (response) {
      console.log(response)
      res_group=response.data
      res_streamVideoId=/[^/]*$/.exec(response.data.stream_url)[0]
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))
  
    await $axios.get("/groups/"+params.groupId+"/events")
    .then(function (response) {
      console.log(response)
      res_events=response.data
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))
    return {group:res_group,events:res_events,streamVideoId:res_streamVideoId}
    }
}
</script>