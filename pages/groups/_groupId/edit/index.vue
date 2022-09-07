<template>
<v-app>
<v-container>
    <v-row justify="center" class="ma-0 pa-0">
    <v-col cols="12" sm="8" md="6" class="ma-0 pa-0">
        <h2 class="mx-1 px-0"><v-icon color="blue-grey">mdi-pencil</v-icon>{{group.groupname}} <span class="grey--text text-subtitle-1">団体情報の編集</span></h2>
        
        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"><v-icon color="light-blue" class="mr-2">mdi-pound</v-icon>団体名</p>
                <v-spacer></v-spacer>
                <a class="mx-0 my-2 pa-0 text-body-2">編集できません</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1">{{group.groupname}}</span>
            </v-card-text>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-link</v-icon>
                団体ID(ページのURL)</p>
                <v-spacer></v-spacer>
                <a class="mx-0 my-2 pa-0 text-body-2">編集できません</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1"><span class="grey--text text--darken-2">https://{{hostname}}/groups/</span>{{group.id}}</span>
            </v-card-text>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-filmstrip</v-icon>
                演目名</p>
                <v-spacer></v-spacer>
                <a v-show="!change_title_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_title_form=!change_title_form">編集</a>
                <a v-show="change_title_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_title_form=!change_title_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1">{{group.title}}</span>
            </v-card-text>
            <div v-show="change_title_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-text-field
                    v-model="change_title_input"
                    label="演目名"
                    counter
                    maxlength="50"
                    filled
                    class="ma-0 pt-1 pb-0"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="ChangeTitle()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-text-box</v-icon>
                説明文</p>
                <v-spacer></v-spacer>
                <a v-show="!change_description_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_description_form=!change_description_form">編集</a>
                <a v-show="change_description_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_description_form=!change_description_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1">{{group.description}}</span>
            </v-card-text>
            <div v-show="change_description_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-textarea
                    v-model="change_description_input"
                    label="説明文"
                    filled
                    counter
                    maxlength="200"
                    class="ma-0 pt-1 pb-0"
                >
                </v-textarea>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="ChangeDescription()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-twitter</v-icon>
                Twitter URL</p>
                <v-spacer></v-spacer>
                <a v-show="!change_twitter_url_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_twitter_url_form=!change_twitter_url_form">編集</a>
                <a v-show="change_twitter_url_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_twitter_url_form=!change_twitter_url_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1">{{group.twitter_url}}</span>
            </v-card-text>
            <div v-show="change_twitter_url_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-text-field
                    v-model="change_twitter_url_input"
                    prefix="https://twitter.com/"
                    filled
                    class="ma-0 pt-1 pb-0"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    outlined
                    @click="DeleteTwitterUrl()"
                    >
                    URLを削除
                </v-btn>
                <v-btn
                    color="primary"
                    @click="ChangeTwitterUrl()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-instagram</v-icon>
                Instagram URL</p>
                <v-spacer></v-spacer>
                <a v-show="!change_instagram_url_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_instagram_url_form=!change_instagram_url_form">編集</a>
                <a v-show="change_instagram_url_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_instagram_url_form=!change_instagram_url_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1">{{group.instagram_url}}</span>
            </v-card-text>
            <div v-show="change_instagram_url_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-text-field
                    v-model="change_instagram_url_input"
                    prefix="https://instagram.com/"
                    filled
                    class="ma-0 pt-1 pb-0"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    outlined
                    @click="DeleteInstagramUrl()"
                    >
                    URLを削除
                </v-btn>
                <v-btn
                    color="primary"
                    @click="ChangeInstagramUrl()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card v-show="user_me_authority.is_admin" class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-play-box</v-icon>
                動画配信 Stream URL</p>
                <v-spacer></v-spacer>
                <a v-show="!change_stream_url_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_stream_url_form=!change_stream_url_form">編集</a>
                <a v-show="change_stream_url_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_stream_url_form=!change_stream_url_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <span class="mx-0 my-2 pa-0 text-body-1">{{group.stream_url}}</span>
            </v-card-text>
            <div v-show="change_stream_url_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-text-field
                    v-model="change_stream_url_input"
                    prefix="https://web.microsoftstream.com/video/"
                    filled
                    class="ma-0 pt-1 pb-0"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    outlined
                    @click="DeleteStreamUrl()"
                    >
                    URLを削除
                </v-btn>
                <v-btn
                    color="primary"
                    @click="ChangeStreamUrl()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-image</v-icon>
                パブリック サムネイル画像</p>
                <v-spacer></v-spacer>
                <a v-show="!change_thumbnail_image_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_thumbnail_image_form=!change_thumbnail_image_form">編集</a>
                <a v-show="change_thumbnail_image_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_thumbnail_image_form=!change_thumbnail_image_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">インターネット上の誰でも表示できることに注意してください。</p>
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">顔が写っている写真などはアップロードしないでください</p>
                <v-img :src='"data:image/jpeg;base64,"+group.thumbnail_image' contain maxHeight="300px" ></v-img>
            </v-card-text>
            <div v-show="change_thumbnail_image_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-file-input
                    v-model="change_thumbnail_image_input"
                    label="画像をアップロード"
                    filled
                    prepend-icon="mdi-image"
                ></v-file-input>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    outlined
                    @click="DeleteThumbnailImage()"
                    >
                    画像を削除
                </v-btn>
                <v-btn
                    color="primary"
                    @click="ChangeThumbnailImage()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-image</v-icon>
                プライベート サムネイル画像</p>
                <v-spacer></v-spacer>
                <a v-show="!change_cover_image_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_cover_image_form=!change_cover_image_form">編集</a>
                <a v-show="change_cover_image_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_cover_image_form=!change_cover_image_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">生徒用・保護者用のアカウントでログインした場合のみ表示されます。</p>
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">顔が写っている写真なども団体内で確認が取れればアップロードできます。</p>
                <v-img :src='"data:image/jpeg;base64,"+group.cover_image' contain maxHeight="300px" ></v-img>
            </v-card-text>
            <div v-show="change_cover_image_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-file-input
                    v-model="change_cover_image_input"
                    label="画像をアップロード"
                    filled
                    prepend-icon="mdi-image"
                ></v-file-input>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    outlined
                    @click="DeleteCoverImage()"
                    >
                    画像を削除
                </v-btn>
                <v-btn
                    color="primary"
                    @click="ChangeCoverImage()"
                    >
                    適用
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card v-show="user_me_authority.is_admin" class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-tag</v-icon>
                タグ</p>
                <v-spacer></v-spacer>
                <a v-show="!change_tags_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_tags_form=!change_tags_form">編集</a>
                <a v-show="change_tags_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_tags_form=!change_tags_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">団体を見つけやすくするためにタグをつけます</p>
                <p v-if="group_tags.length==0" class="ma-0 pa-0 text-caption grey--text text--darken-3">タグがありません</p>
                <v-chip-group
                    column
                >
                    <v-chip
                        v-for="tag in group_tags"
                    >
                        {{ tag.tagname }}
                    </v-chip>
                </v-chip-group>
            </v-card-text>
            <div v-show="change_tags_form">
            <v-card-text class="mx-0 px-0 py-2 ">
                <v-chip-group
                    column
                >
                    <v-chip
                        v-for="tag in group_tags"
                        close
                        @click:close="DeleteTag(tag)"
                    >
                        {{ tag.tagname }}
                    </v-chip>
                </v-chip-group>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-select
                    v-model="tag_selector"
                    :items=tags
                    item-text="tagname"
                    label="タグを追加"
                    filled
                    return-object
                >
                </v-select>
                <v-btn
                    color="primary"
                    @click="AddTag()"
                    >
                    追加
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
                <p class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2">
                <v-icon color="light-blue" class="mr-2">mdi-calendar</v-icon>
                公演</p>
                <v-spacer></v-spacer>
                <a v-show="!change_events_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_events_form=!change_events_form">編集</a>
                <a v-show="change_events_form" class="mx-0 my-2 pa-0 text-body-2" @click="change_events_form=!change_events_form">キャンセル</a>
            </v-card-title>
            <v-card-text class="ma-0 pa-0 ">
                <v-card v-for="event in events" class="mx-0 my-1 px-0" elevation="1">
                    <v-card-title class="text-subtitle-1 py-2 px-1">
                        {{event.timetable.timetablename}}
                        <v-spacer></v-spacer>
                        <v-icon v-show="change_events_form" @click="DeleteEvent(event)">mdi-close-circle</v-icon>
                    </v-card-title>
                    <v-card-text class="pb-2 px-1">
                        <p class="ma-0 pa-0">座席：{{event.ticket_stock}}</p>
                        <p class="ma-0 pa-0">配布時間：{{DateFormatter(event.timetable.sell_at)}} ~ {{DateFormatter(event.timetable.sell_ends)}}</p>
                        <p class="ma-0 pa-0">公演時間：{{DateFormatter(event.timetable.starts_at)}} ~ {{DateFormatter(event.timetable.ends_at)}}</p>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <div v-show="change_events_form" class="mt-2">
            <v-card-text class="mx-0 px-0 py-2 ">
                <p class="ma-0 pa-0 text-subtitle-1">公演の追加</p>
                <v-select
                    v-model="timetable_selector"
                    :items=timetable
                    item-text="timetablename"
                    item-value="sell_at"
                    label="公演の時間帯を選択"
                    filled
                    return-object
                >
                </v-select>
                <v-text-field
                    v-model="ticket_stock_input"
                    label="座席数を入力"
                    filled
                    class="ma-0 pt-1 pb-0"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions class="ma-0 px-0 py-0">
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="CreateEvent()"
                    >
                    追加
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>
        <v-dialog v-model="delete_group_dialog">
            <v-card>
            <v-card-title>本当にこの団体を削除しますか?</v-card-title>
            <v-card-text>この操作は取り消せません</v-card-text>
            <v-card-actions>
                <v-btn color="primary" outlined @click="delete_group_dialog=false">キャンセル</v-btn>
                <v-btn color="red" @click="DeleteGroup()">削除</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn
            color="red"
            outlined
            @click="delete_group_dialog=true"
            class="ma-4"
        >
        ⚠この団体を削除
        </v-btn>
    </v-col>
    </v-row>
    <v-snackbar
                v-model="success_alert"
                color="success"
                elevation="2"
            >
                {{success_message}}
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="white"
                    icon
                    v-bind="attrs"
                    @click="success_alert = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
            <v-snackbar
                v-model="error_alert"
                color="red"
                elevation="2"
            >
                {{error_message}}
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="white"
                    icon
                    v-bind="attrs"
                    @click="error_alert = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
    </v-snackbar>        
</v-container>
</v-app>
</template>

<script>
export default {
    name:"IndivisualGroupPageEditer",
    data(){
        return{
            hostname:location.host,
            success_alert:false,
            error_alert:false,
            success_message:"",
            error_message:"",

            change_title_form:false,
            change_title_input:"",
            change_description_form:false,
            change_description_input:"",
            change_twitter_url_form:false,
            change_twitter_url_input:"",
            change_instagram_url_form:false,
            change_instagram_url_input:"",
            change_stream_url_form:false,
            change_stream_url_input:"",
            change_thumbnail_image_form:false,
            change_thumbnail_image_input:null,
            change_cover_image_form:false,
            change_cover_image_input:null,
            change_tags_form:false,
            tag_selector:null,
            change_events_form:false,
            timetable_selector:null,
            ticket_stock_input:24,
            delete_group_dialog:false
        }
    },
    async asyncData({params,error,$axios}){
        let group={};
        let user_me={};
        let user_me_authority={owner_of:[],authorizer_of:[]};
        let group_tags=[];
        let tags=[];
        let events=[];
        let timetable=[];
        await Promise.all([
            $axios.get("/groups/"+params.groupId),
            $axios.get("/users/me/authority"),
        ])
        .then((response)=>{
            group=response[0].data
            user_me_authority=response[1].data
        })
        .catch((e)=>{})
        //権限が無い場合は404
        if(user_me_authority.is_admin!=true&& !user_me_authority.owner_of.includes(group.id)){
            return error({ statusCode: 404, message: "Not Found" })
        }
        await Promise.all([
            $axios.get("/groups/"+group.id+"/tags"),
            $axios.get("tags"),
            $axios.get("/groups/"+group.id+"/events"),
            $axios.get("/timetable")
        ])
        .then((response)=>{
            group_tags=response[0].data
            tags=response[1].data
            events=response[2].data
            timetable=response[3].data
        })
        .catch((e)=>{})
        let events_timetable_promise=[];
        events.forEach(e => {
            events_timetable_promise.push($axios.get("/timetable/"+e.timetable_id))
        });
        await Promise.all(events_timetable_promise)
        .then((response)=>{
            for (let i = 0; i < events.length; i++) {
                events[i].timetable=response[i].data
                //Dateオブジェクトにする
                events[i].timetable.sell_at=new Date(events[i].timetable.sell_at)
                events[i].timetable.sell_ends=new Date(events[i].timetable.sell_ends)
                events[i].timetable.starts_at=new Date(events[i].timetable.starts_at)
                events[i].timetable.ends_at=new Date(events[i].timetable.ends_at)
            }
        })
        .catch((e)=>{})


        return {group,user_me_authority,group_tags,tags,events,timetable}
    },
    methods:{
        DateFormatter(input_date){
            return (input_date.getMonth()+1)+"月"+(input_date.getDate())+"日 "+input_date.getHours().toString().padStart(2, "0")+":"+input_date.getMinutes().toString().padStart(2, "0")
        },
        ChangeTitle(){
            this.$axios.put("/groups/"+this.group.id+"/title?title="+this.change_title_input)
            .then((response=>{
                this.success_message="演目名 が更新されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        ChangeDescription(){
            this.$axios.put("/groups/"+this.group.id+"/description?description="+this.change_description_input)
            .then((response=>{
                this.success_message="説明文 が更新されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        ChangeTwitterUrl(){
            this.$axios.put("/groups/"+this.group.id+"/twitter_url?twitter_url="+"https://twitter.com/"+this.change_twitter_url_input)
            .then((response=>{
                this.success_message="Twitter URL が更新されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        DeleteTwitterUrl(){
            this.$axios.put("/groups/"+this.group.id+"/twitter_url")
            .then((response=>{
                this.success_message="Twitter URL が削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        ChangeInstagramUrl(){
            this.$axios.put("/groups/"+this.group.id+"/instagram_url?instagram_url="+"https://instagram.com/"+this.change_instagram_url_input)
            .then((response=>{
                this.success_message="Instagram URL が更新されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        DeleteInstagramUrl(){
            this.$axios.put("/groups/"+this.group.id+"/instagram_url")
            .then((response=>{
                this.success_message="Instagram URL が削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        ChangeStreamUrl(){
            this.$axios.put("/groups/"+this.group.id+"/stream_url?stream_url="+"https://web.microsoftstream.com/video"+this.change_stream_url_input)
            .then((response=>{
                this.success_message="Stream URL が更新されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        DeleteStreamUrl(){
            this.$axios.put("/groups/"+this.group.id+"/stream_url")
            .then((response=>{
                this.success_message="Stream URL が削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            }))
            .catch((e)=>{
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            })
        },
        ChangeThumbnailImage(){
            var params = new FormData();
            params.append('file', this.change_thumbnail_image_input);
            this.$axios.put("/groups/"+this.group.id+"/thumbnail_image", params,{headers:{'content-type': 'multipart/form-data',},
            })
            .then((response)=> {
                this.success_message="サムネイル画像が変更されました"
                this.success_alert=true
                this.$nuxt.refresh()
            })
            .catch((e)=> {
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            });
        },
        DeleteThumbnailImage(){
            this.$axios.put("/groups/"+this.group.id+"/thumbnail_image")
            .then((response)=> {
                this.success_message="サムネイル画像が削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            })
            .catch((e)=> {
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            });
        },
        ChangeCoverImage(){
            var params = new FormData();
            params.append('file', this.change_cover_image_input);
            this.$axios.put("/groups/"+this.group.id+"/cover_image", params,{headers:{'content-type': 'multipart/form-data',},
            })
            .then((response)=> {
                this.success_message="カバー画像が変更されました"
                this.success_alert=true
                this.$nuxt.refresh()
            })
            .catch((e)=> {
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            });
        },
        DeleteCoverImage(){
            this.$axios.put("/groups/"+this.group.id+"/cover_image")
            .then((response)=> {
                this.success_message="カバー画像が削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            })
            .catch((e)=> {
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            });
        },
        DeleteTag(tag){
            this.$axios.delete("/groups/"+this.group.id+"/tags/"+tag.id)
            .then((response)=> {
                this.success_message="タグが削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            })
            .catch((e)=> {
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            });
        },
        AddTag(){
            if(this.tag_selector!=null){
                this.$axios.put("/groups/"+this.group.id+"/tags",{"tag_id":this.tag_selector.id})
                .then((response)=> {
                    this.success_message="タグが追加されました"
                    this.success_alert=true
                    this.$nuxt.refresh()
                })
                .catch((e)=> {
                    if(e.response){
                        this.error_message=e.response.data.detail
                        if(e.response.status==422){
                            this.error_message="入力された値の形式が不適切です"
                        }
                    }
                    else{
                        this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                    }
                    this.error_alert=true
                    this.$nuxt.refresh()
                });
            }
        },
        DeleteEvent(event){
            this.$axios.delete("/groups/"+this.group.id+"/events/"+event.id)
            .then((response)=> {
                this.success_message="公演が削除されました"
                this.success_alert=true
                this.$nuxt.refresh()
            })
            .catch((e)=> {
                if(e.response){
                    this.error_message=e.response.data.detail
                    if(e.response.status==422){
                        this.error_message="入力された値の形式が不適切です"
                    }
                }
                else{
                    this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                }
                this.error_alert=true
                this.$nuxt.refresh()
            });
        },
        CreateEvent(){
            if(this.timetable_selector!=null&& Number.isInteger(Number(this.ticket_stock_input))){
                this.$axios.post("/groups/"+this.group.id+"/events",
                [{
                    "timetable_id":this.timetable_selector.id,
                    "ticket_stock":Number(this.ticket_stock_input),
                    "lottery":false
                }])
                .then((response)=> {
                    this.success_message="公演が追加されました"
                    this.success_alert=true
                    this.$nuxt.refresh()
                })
                .catch((e)=> {
                    if(e.response){
                        this.error_message=e.response.data.detail
                        if(e.response.status==422){
                            this.error_message="入力された値の形式が不適切です"
                        }
                    }
                    else{
                        this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                    }
                    this.error_alert=true
                    this.$nuxt.refresh()
                });

            }
            else if(!Number.isInteger(Number(this.ticket_stock_input))){
                this.error_message="座席数には整数を入力してください"
                this.error_alert=true
            }
        },
        DeleteGroup(){
            this.$axios.delete("/groups/"+this.group.id)
            .then((response)=> {
                    this.success_message="団体が削除されました"
                    this.success_alert=true
                    this.$router.push("/groups")
                })
                .catch((e)=> {
                    if(e.response){
                        this.error_message=e.response.data.detail
                        if(e.response.status==422){
                            this.error_message="入力された値の形式が不適切です"
                        }
                    }
                    else{
                        this.error_message="予期しないエラーが発生しました。IT部隊にお声がけください🙇‍♂️"
                    }
                    this.error_alert=true
                    this.$nuxt.refresh()
                });
        }
    }
}
</script>
        