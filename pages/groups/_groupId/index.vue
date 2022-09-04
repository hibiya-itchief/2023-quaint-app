<template>
    <v-app>
        <v-btn icon fab to="/groups/">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-conteiner>
            <v-row justify="center" class="ma-0 pa-0">
                <v-col cols="12" sm="6" lg="4" class="mx-0 my-2 px-0 py-0 px-sm-3">
                    <!--作品情報-->
                    <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
                    <v-card>
                        <v-img v-if="group.cover_image_url!=null" maxHeight="500px" :src="group.thumbnail_image_url"></v-img>
                        <v-img v-else v-bind:class="HashColor(group.id)" height="180px"></v-img>
                        <v-card-title clsss="pb-0">{{group.title}}</v-card-title>
                        <v-card-subtitle class="pb-0">{{group.groupname}}</v-card-subtitle>
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
                        <v-card-actions v-if="editable==true">
                            <v-btn
                                color="blue-grey"
                                dark
                                outlined
                                rounded
                                width="100%"
                                v-bind:to='"/groups/"+group.id+"/edit"'
                            >
                                <v-icon>mdi-pencil</v-icon>
                                団体情報を編集
                            </v-btn>
                        </v-card-actions>
                        <v-card-actions>
                            <v-btn v-if="group.twitter_url!=null" icon :href="group.twitter_url" target="_blank"><v-icon>mdi-twitter</v-icon></v-btn>
                            <v-btn v-if="group.instagram_url!=null" icon :href="group.instagram_url" target="_blank"><v-icon>mdi-instagram</v-icon></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                dark
                                @click="videoViewer=true"
                                rounded
                                >
                                <v-icon>mdi-play</v-icon>
                                映像で鑑賞
                            </v-btn>

                            </v-card-actions>

                        <v-dialog
                        v-model="videoViewer"
                        fullscreen
                        >
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
                                <v-toolbar-title>{{group.title}} - {{group.groupname}}</v-toolbar-title>
                                </v-toolbar>
                                <v-row justify="center" align-content="center" class="ma-0 pa-0">
                                    <v-col cols="12" >
                                        <iframe v-if="group.stream_url!=null" class="ma-0 pa-0" height="400px" width="99%" v-bind:src="'https://web.microsoftstream.com/embed/video/'+streamVideoId+'?autoplay=false&showinfo=false'" allowfullscreen></iframe>
                                        <v-card-text class="pa-1 ma-0 deep-orange--text" v-else>この団体の映像はまだ公開されていません。配信開始をお楽しみに！</v-card-text>
                                    </v-col>
                                    <v-card-text>※映像鑑賞には，学校で配布されたMicrosoftアカウントへのログインが必要です。</v-card-text>
                                    <v-col cols="12" v-if="group.stream_url!=null">
                                        <v-row justify="center">
                                            <v-btn color="primary" v-bind:href="group.stream_url" target="_blank">再生できない場合（Streamで再生）＞</v-btn> 
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-dialog>
                    </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="4" class="mx-0 my-2 px-0 py-0 px-sm-3">
                <!--公演時間の選択-->
                
                    <v-card>
                        <v-card-title @click="events_show=!events_show" class="ma-0 px-3 pb-2 pt-4" >
                        <v-icon>mdi-ticket</v-icon>
                        観劇予約
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>{{ events_show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        </v-card-title>
                        <v-card-text class="ma-0 px-3 py-2">現地で見たい公演の整理券を取得できます。</v-card-text>
                        
                        <v-expand-transition>
                            <div v-show="events_show" class="ma-0 pb-4 ">
                            <v-divider class="mb-3"></v-divider>
                                <div class="px-3 py-2">
                                    <span class="d-inline-flex text-caption">
                                        <v-badge color="grey" inline></v-badge>
                                        ：配布時間外
                                    </span>
                                    <span class="d-inline-flex text-caption">
                                        <v-badge color="green" inline></v-badge>
                                        ：席数に余裕あり
                                    </span>
                                    <span class="d-inline-flex text-caption">
                                        <v-badge color="amber" inline></v-badge>
                                        ：残りわずか
                                    </span>
                                    <span class="d-inline-flex text-caption">
                                        <v-badge color="red" inline></v-badge>
                                        ：在庫切れ
                                    </span>
                                </div>
                            <div v-for="event in events">
                                <v-dialog
                                v-model="event.dialog"
                                width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-row justify="center" class="ma-0 pa-0">
                                            <v-col cols="11" class="mx-0 ma-1 pa-0">
                                                <v-card @click.stop="event.dialog = true" class="ma-0">
                                                    <v-card-title class="py-2">
                                                        {{event.timetable.timetablename}}
                                                        <v-spacer></v-spacer>
                                                        <v-badge v-if="Date.now()<event.timetable.sell_at.getTime()||event.timetable.sell_ends.getTime()<Date.now()" color="grey" inline></v-badge>
                                                        <v-badge v-else-if="event.ticket_number_data.taken_tickets/event.ticket_number_data.stock<0.8" color="green" inline></v-badge>
                                                        <!--8割以上で黄色になる-->
                                                        <v-badge v-else-if="event.ticket_number_data.taken_tickets/event.ticket_number_data.stock>=0.8 && event.ticket_number_data.taken_tickets<event.ticket_number_data.stock" color="amber" inline></v-badge>
                                                        <v-badge v-else-if="event.ticket_number_data.taken_tickets>=event.ticket_number_data.stock" color="red" inline></v-badge>
                                                    </v-card-title>
                                                    <v-card-subtitle class="pb-2">
                                                        <p class="ma-0 pa-0">配布時間：{{DateFormatter(event.timetable.sell_at)}} ~ {{DateFormatter(event.timetable.sell_ends)}}</p>
                                                        <p class="ma-0 pa-0">公演時間：{{DateFormatter(event.timetable.starts_at)}} ~ {{DateFormatter(event.timetable.ends_at)}}</p>
                                                    </v-card-subtitle>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <v-card>
                                        <v-card-title>この公演を選択しますか？</v-card-title>
                                        <v-card-title>{{event.timetable.timetablename}}</v-card-title>
                                        <v-card-subtitle>（{{DateFormatter(event.timetable.starts_at)}}-{{DateFormatter(event.timetable.ends_at)}}）</v-card-subtitle>
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
                        <v-col cols="12" v-if="events.length===0">
                            <v-card disabled>
                                <v-card-title>現在選択できる公演はありません。</v-card-title>
                            </v-card>
                        </v-col>
                    </div>
                    </v-expand-transition>
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
        videoViewer: false,
        group:{},
        events:[],
        streamVideoId:[],
        tags:[],
        ticketResult:[],
        editable:false,//権限を持つユーザーがアクセスするとtrueになりページを編集できる
        events_show:true
      }
    },


    async asyncData({params,error,$axios}){
    let res_group;
    let res_streamVideoId;
    let res_events;
    let res_tags;
    let user_authority;
    let editable=false;
    
    await Promise.all([
        $axios.get("/groups/"+params.groupId),
        $axios.get("/groups/"+params.groupId+"/events"),
        $axios.get("/users/me/authority"),
        $axios.get("/groups/"+params.groupId+"/tags")
    ])
    .then((response)=>{
        res_group=response[0].data
        res_events=response[1].data
        user_authority = response[2].data
        res_tags=response[3].data
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))

    //正規表現によって，groupの中に含まれる"stream_url"の末尾のスラッシュ（/）以降の文字列を取得
    res_streamVideoId=/[^/]*$/.exec(res_group.stream_url)[0]
    //各eventの中に，"'dialog':'false'"という情報を格納することで，公演をクリックした時に，公演に対応したモーダルウィンドウが表示されるようにしている。
    for (var i=0; i < res_events.length; i++){
    res_events[i].dialog=false
    }

    if(user_authority.is_admin==true || user_authority.owner_of.includes(res_group.id)){
        editable=true;
    }



    let timetable_promise=[];
    let countticket_promise=[];
    //timetable_idからtimetableの情報取得し，,eventsの中の各eventの中にプロパティ名"timetable"として格納する。
    for (var i=0; i < res_events.length; i++){
        timetable_promise.push($axios.get("/timetable/"+res_events[i].timetable_id))
        countticket_promise.push($axios.get("/groups/"+res_group.id+"/events/"+res_events[i].id+"/tickets"))
    }
    await Promise.all(timetable_promise)
    .then((response)=>{
        for (var i = 0; i < res_events.length; i++) {
            res_events[i].timetable=response[i].data
            //Dateオブジェクトにする
            res_events[i].timetable.sell_at=new Date(res_events[i].timetable.sell_at)
            res_events[i].timetable.sell_ends=new Date(res_events[i].timetable.sell_ends)
            res_events[i].timetable.starts_at=new Date(res_events[i].timetable.starts_at)
            res_events[i].timetable.ends_at=new Date(res_events[i].timetable.ends_at)
        }
    }
    )
    await Promise.all(countticket_promise)
    .then((response)=>{
        for (var i = 0; i < res_events.length; i++) {
            res_events[i].ticket_number_data=response[i].data
        }
    })

    // 配布時間中の公演(公演開始の早い順)→配布時間外の公演(公演開始の早い順) という並び順になるようにする
    let available_events=[];
    let unavailable_events=[];
    for (let i = 0; i < res_events.length; i++) {
        if(res_events[i].timetable.sell_at.getTime()<=Date.now() && Date.now()<=res_events[i].timetable.sell_ends.getTime()){
            available_events.push(res_events[i])
        }
        else{
            unavailable_events.push(res_events[i])
        }
    }
    available_events.sort((first,second)=>{
        if(first.timetable.starts_at.getTime()<second.timetable.starts_at.getTime()) return -1
        else if (first.timetable.starts_at.getTime()>second.timetable.starts_at.getTime()) return 1
        else return 0
    })
    unavailable_events.sort((first,second)=>{
        if(first.timetable.starts_at.getTime()<second.timetable.starts_at.getTime()) return -1
        else if (first.timetable.starts_at.getTime()>second.timetable.starts_at.getTime()) return 1
        else return 0
    })
    let events=available_events.concat(unavailable_events)

    return {group:res_group,events:events,streamVideoId:res_streamVideoId,tags:res_tags,editable:editable}
    },

    methods:{
        DateFormatter(input_date){
            return (input_date.getMonth()+1)+"月"+(input_date.getDate())+"日 "+input_date.getHours().toString().padStart(2, "0")+":"+input_date.getMinutes().toString().padStart(2, "0")
        },
        HashColor(text){//group.idを色数で割った余りでデフォルトの色を決定
            const colors=["blue-grey","brown","deep-orange","amber","lime","light-green","teal","cyan","light-blue","indigo","pink"]
            let index=0;
            for (let i = 0; i < text.length; i++) {//文字列をUnicodeの和に変換
                index+=text.codePointAt(i)
            }
            console.log(text+":"+index)
            index=index%colors.length
            return colors[index]
        },
        CreateTicket(event){

        }
    }
}
</script>