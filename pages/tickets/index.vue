<template>
    <v-app>
        <v-container name="ticket_container" class="px-1">
          <v-row justify="center" align-content="center">
            <v-col col="6" md="6" sm="12">
              <v-card
              outlined
              v-if="user.is_active==false"
              >      
                <v-card-title class="ma-3 pa-0 red--text  text-subtitle-1">
                  <v-icon color="red">mdi-alert-circle</v-icon>
                  未アクティベートなアカウント
                </v-card-title>
                <p class="caption mx-3 my-1 grey--text text--darken-1">整理券を取得・使用するには校内への入場処理が必要です。以下のQRコードまたはユーザーIDを校門にいるチーフ会の生徒に提示してください</p>
                <p class="caption mx-3 my-1 grey--text text--darken-1">※本校生徒のアカウントは開場と同時にアクティベートされます</p>
                <img class="mx-1 my-0" style="display:block" v-bind:src=userdata_qr />
                <div class="mx-3 my-1">
                <a class="text-subtitle-2" @click="display_userid = !display_userid">ユーザーIDを表示：</a><span v-show="display_userid">{{user.id}}</span>
                </div>
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
                    <div v-for="unused_ticket in unused_tickets">
                      <v-card 
                        class="mx-auto"
                        maxWidth="100%"
                        outlined
                        rounded
                        elevation="2"
                      >
                        <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title  class="text-h7 mb-1">{{unused_ticket.group.title}} - {{unused_ticket.group.groupname}}</v-list-item-title>
                              <v-list-item-subtitle>{{unused_ticket.timetable.timetablename}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-card-actions>                        

                            <v-btn
                              icon
                              @click="unused_ticket.detail_show = !unused_ticket.detail_show"
                            >
                              <v-icon>{{ unused_ticket.detail_show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-list-item>
                        <v-expand-transition>
                            <div v-show="unused_ticket.detail_show" class="pa-1">
                              <v-divider></v-divider>
                              <v-card-text class="pa-1">
                                <a class="text-body-2 mx-0 my-0 pa-0" v-bind:href="'/groups/' + unused_ticket.group.id">{{unused_ticket.group.groupname}}の団体紹介ページ</a>
                                <p class="text-body-2 mx-0 my-0 pa-0"><v-icon>mdi-clock-time-nine</v-icon><span class="grey--text text--darken-2">開幕時刻：</span>{{DateFormatter(unused_ticket.timetable.starts_at)}} ~ {{DateFormatter(unused_ticket.timetable.ends_at)}}</p>
                                <p class="text-body-2 mx-0 my-0 pa-0"><v-icon>mdi-account-supervisor</v-icon><span class="grey--text text--darken-2">同時入場人数：</span>{{unused_ticket.ticket.person}}</p>
                                <p class="text-body-2 mx-0 my-0 pa-0"><span class="grey--text text--darken-2">ID：</span>{{unused_ticket.ticket.id}}</p>
                                <v-btn @click="cancel_dialog=true">
                                  <v-icon>mdi-close</v-icon>
                                  <p class="pa-0 ma-0">このチケットをキャンセル</p>
                                </v-btn>
                              </v-card-text>
                            </div>
                          </v-expand-transition>
                          <v-dialog v-model="cancel_dialog" max-width="300">
                            <v-card>
                              <v-card-title class="text-h5">{{unused_ticket.group.title}} - {{unused_ticket.group.groupname}}の整理券をキャンセルしてもよろしいですか？</v-card-title>
                              <v-card-text>このアクションは取り消せません</v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="cancel_dialog = false">いいえ</v-btn>
                                <v-btn color="primary" @click="CancelTicket(unused_ticket)">はい</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                      </v-card>
                      <div class="my-2"/>
                    </div>
                    <div class="pa-3" v-if="unused_tickets.length==0">
                    <p>ここに表示するものはありません</p>
                    <a href="/groups" class="amber--text text--darken-4">次に見たい公演を探しに行きましょう✨</a>
                    </div>
                  </v-tab-item>
                  <!--使用済み-->
                  <v-tab-item>
                    <div v-for="used_ticket in used_tickets">
                      <v-card 
                        class="mx-auto"
                        maxWidth="100%"
                        outlined
                        rounded
                        elevation="2"
                      >
                        <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title  class="text-h7 mb-1">{{used_ticket.group.title}} - {{used_ticket.group.groupname}}</v-list-item-title>
                              <v-list-item-subtitle>{{used_ticket.timetable.timetablename}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-card-action>                        
                            <v-btn to="/vote" v-show="used_ticket.group.enable_vote">
                              <v-icon>mdi-vote</v-icon>
                              <v-text>投票</v-text>
                            </v-btn>
                            <v-btn
                              icon
                              @click="used_ticket.detail_show = !used_ticket.detail_show"
                            >
                              <v-icon>{{ used_ticket.detail_show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                          </v-card-action>
                        </v-list-item>
                        <v-expand-transition>
                            <div v-show="used_ticket.detail_show" class="pa-1">
                              <v-divider></v-divider>
                              <v-card-text class="pa-1">
                                <a class="text-body-2 mx-0 my-0 pa-0" v-bind:href="'/groups/' + used_ticket.group.id">{{used_ticket.group.groupname}}の団体紹介ページ</a>
                                <p class="text-body-2 mx-0 my-0 pa-0"><v-icon>mdi-clock-time-nine</v-icon><span class="grey--text text--darken-2">開幕時刻：</span>{{DateFormatter(used_ticket.timetable.starts_at)}} ~ {{DateFormatter(used_ticket.timetable.ends_at)}}</p>
                                <p class="text-body-2 mx-0 my-0 pa-0"><v-icon>mdi-account-supervisor</v-icon><span class="grey--text text--darken-2">同時入場人数：</span>{{used_ticket.ticket.person}}</p>
                                <p class="text-body-2 mx-0 my-0 pa-0"><span class="grey--text text--darken-2">チケットID:</span>{{used_ticket.ticket.id}}</p>
                                
                              </v-card-text>
                            </div>
                          </v-expand-transition>
                      </v-card>
                      <div class="my-2"/>
                    </div>
                    <div class="pa-3" v-if="used_tickets.length==0">
                    <p>ここに表示するものはありません</p>
                    <a href="/groups" class="amber--text text--darken-4">次に見たい公演を探しに行きましょう✨</a>
                    </div>
                  </v-tab-item>
                </v-tabs>
            </v-col>
          </v-row>
          <v-snackbar
            v-model="success_alert"
            color="success"
            elevation="2"
          >
            {{success_message}}
          </v-snackbar>
          <v-snackbar
            v-model="error_alert"
            color="red"
            elevation="2"
          >
            {{error_message}}
          </v-snackbar>
        </v-container>
        
        
        
    </v-app>
</template>

<script>
export default {
  name:"UsersTicketsPage",
  data(){
    return {
      user:{},
      userdata_qr:"",
      unused_tickets:[],
      used_tickets:[],

      display_userid:false,
      cancel_dialog:false,
      success_alert:false,
      error_alert:false,
      success_message:"",
      error_message:""
    }
    },
    async asyncData({ params, error,$axios }) {
      let user;
      await $axios.get("/users/me")
        .then((res) => {
          user = res.data
        })
        .catch((e => {
          error({ message: e.message })
        }))

      let userdata_qr="";
      if(user.is_active==false){
        let userdata='{"user_id":user.id}'
        await QRCode.toDataURL(userdata,{width:250})
          .then(code => {
            userdata_qr=code
          })
          .catch(err =>{
            console.error(err)
          })
      }

      let res_tickets=[];
      let unused_tickets=[];
      let used_tickets=[];
      await $axios.get("/users/me/tickets")
        .then((res) => {
          res_tickets = res.data
        })
        .catch((e => {
          error({ message: e.message })
        }))
      
      
      for (const ticket of res_tickets) {
        let ticket_info;
        let group;
        let event;
        let timetable;
        await $axios.get("/groups/"+ticket.group_id)
          .then((res) => {
            group = res.data
          })
          .catch((e => {
            error({ message: e.message })
          }))

        await $axios.get("/groups/"+ticket.group_id+"/events/"+ticket.event_id)
          .then((res) => {
            event = res.data
          })
          .catch((e => {
            error({ message: e.message })
          }))

        await $axios.get("/timetable/"+event.timetable_id)
          .then((res) => {
            timetable = res.data
          })
          .catch((e => {
            error({ message: e.message })
          }))
        timetable.sell_at=new Date(timetable.sell_at)
        timetable.sell_ends=new Date(timetable.sell_ends)
        timetable.starts_at=new Date(timetable.starts_at)
        timetable.ends_at=new Date(timetable.ends_at)
        
        ticket_info={"group":group,"event":event,"ticket":ticket,"timetable":timetable,"detail_show":false};
        if (Date.now()<=timetable.starts_at.getTime()+10*60*1000){
          unused_tickets.push(ticket_info)
        }
        else{
          used_tickets.push(ticket_info)
        }
        
      }
      
      unused_tickets.sort((first,second)=>{
        if(first.timetable.starts_at.getTime()<second.timetable.starts_at.getTime()) return -1
        else if (first.timetable.starts_at.getTime()>second.timetable.starts_at.getTime()) return 1
        else return 0
      })
      used_tickets.sort((first,second)=>{
        if(first.timetable.starts_at.getTime()<second.timetable.starts_at.getTime()) return -1
        else if (first.timetable.starts_at.getTime()>second.timetable.starts_at.getTime()) return 1
        else return 0
      })
      return {user:user,userdata_qr:userdata_qr,unused_tickets:unused_tickets,used_tickets:used_tickets}
    },
    methods:{
      DateFormatter(input_date){
        return (input_date.getMonth()+1)+"月"+(input_date.getDate())+"日 "+input_date.getHours().toString().padStart(2, "0")+":"+input_date.getMinutes().toString().padStart(2, "0")
      },
      async CancelTicket(ticket){
        await this.$axios.delete("/groups/"+ticket.group.id+"/events/"+ticket.event.id+"/tickets/"+ticket.ticket.id)
          .then((res) => {
            this.success_alert=true
            this.success_message="整理券が正常にキャンセルされました"
          })
          .catch((e => {
            this.error_alert=true
            this.error_message=e.message
          }))
        this.cancel_dialog=false;
        this.$nuxt.refresh()
      }
    }
  }
</script>