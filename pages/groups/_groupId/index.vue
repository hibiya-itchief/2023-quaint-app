<template>
    <v-app>
        <v-btn icon fab>
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <!--作品情報-->
        <div>
            <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
            <v-card>
                <!--<v-img :src="group.thumbnail"></v-img>-->
                <div>
                    <v-card-title>{{group.title}}</v-card-title>
                    <v-card-subtitle>{{group.groupname}}</v-card-subtitle>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn color="light-blue" light>
                        <v-icon>mdi-play</v-icon>
                        <p>映像で鑑賞</p>
                    </v-btn>
                </div>
                
            </v-card>
        </div>



        <!--公演時間の選択-->
        <div>
            <p>公演を選択してください</p>
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
        group:{},
        events:[]
      }
    },
    async asyncData({params,error,$axios}){
    let res_group;
    let res_events;
    await $axios.get("/groups/"+params.groupId)
    .then(function (response) {
      console.log(response)
      res_group=response.data
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
    return {group:res_group,events:res_events}
    }
}
</script>