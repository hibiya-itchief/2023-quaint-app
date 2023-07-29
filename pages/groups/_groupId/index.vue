<template>
  <v-app>
    <v-btn icon fab small to="/groups/">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-container class="px-1 py-0">
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="6" lg="6">
          <!--作品情報-->
          <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
          <v-card v-if="group">
            <v-img
              v-if="group.public_thumbnail_image_url != null"
              max-height="500px"
              :src="group.public_thumbnail_image_url"
            ></v-img>
            <v-img
              v-else
              :class="HashColor(group.id ?? 'hashcolor')"
              height="180px"
            ></v-img>
            <v-card-title>{{ group.title }}</v-card-title>
            <v-card-subtitle>{{ group.groupname }}</v-card-subtitle>
            <v-card-text>
              {{ group?.description }}
            </v-card-text>
            <v-card-actions v-if="group.tags.length != 0" class="py-1">
              <v-chip-group column>
                <v-chip v-for="tag in group.tags" :key="tag.id" disabled>
                  {{ tag.tagname }}
                </v-chip>
              </v-chip-group>
            </v-card-actions>
            <v-card-actions v-if="editable == true" class="py-1">
              <v-btn
                color="blue-grey"
                dark
                outlined
                rounded
                width="100%"
                :to="'/groups/' + group?.id + '/edit'"
              >
                <v-icon>mdi-pencil</v-icon>
                団体情報を編集
              </v-btn>
            </v-card-actions>
            <v-card-actions class="mx-auto">
              <v-btn
                color="primary"
                block
                dark
                rounded
                @click="videoViewer = true"
              >
                <v-icon>mdi-play</v-icon>
                映像で鑑賞
              </v-btn>
            </v-card-actions>
            <v-card-actions class="py-1">
              <v-btn
                v-if="group.twitter_url != null"
                icon
                :href="group.twitter_url"
                target="_blank"
                ><v-icon>mdi-twitter</v-icon></v-btn
              >
              <v-btn
                v-if="group.instagram_url != null"
                icon
                :href="group.instagram_url"
                target="_blank"
                ><v-icon>mdi-instagram</v-icon></v-btn
              >
              <v-spacer></v-spacer>
              <div class="mx-2">
                <span
                  class="grey--text text--darken-2 text-caption"
                  style="display: block"
                  >過去7日間の閲覧数</span
                >
                <div style="text-align: right">
                  <v-icon>mdi-eye</v-icon>
                  <span class="text--darken-2 text-subtitle-1">{{
                    view_count
                  }}</span>
                </div>
              </div>
              <v-btn
                v-if="IsFavorite(group)"
                icon
                class="pink--text"
                @click="removeFavorite(group)"
                ><v-icon>mdi-heart</v-icon></v-btn
              >
              <v-btn v-else icon @click="addFavorite(group)"
                ><v-icon>mdi-heart-outline</v-icon></v-btn
              >
            </v-card-actions>

            <v-dialog v-model="videoViewer" fullscreen>
              <v-card dark>
                <v-toolbar dark color="primary">
                  <v-toolbar-title class="mx-auto"
                    >{{ group.title }} - {{ group.groupname }}</v-toolbar-title
                  >
                  <v-btn icon dark @click="videoViewer = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-row
                  justify="center"
                  align-content="center"
                  class="ma-0 pa-0"
                >
                  <v-col cols="12">
                    <iframe
                      v-if="group.stream_url != null"
                      class="ma-0 pa-0"
                      height="400px"
                      width="99%"
                      :src="
                        'https://web.microsoftstream.com/embed/video/' +
                        streamVideoId +
                        '?autoplay=false&showinfo=false'
                      "
                      allowfullscreen
                    ></iframe>
                    <v-card-text v-else class="pa-1 ma-0 deep-orange--text"
                      >この団体の映像はまだ公開されていません。配信開始をお楽しみに！</v-card-text
                    >
                  </v-col>
                  <v-card-text
                    >※映像鑑賞には、学校で配布されたMicrosoftアカウントへのログインが必要です。</v-card-text
                  >
                  <v-col v-if="group.stream_url != null" cols="12">
                    <v-row justify="center">
                      <v-btn
                        color="primary"
                        :href="group.stream_url"
                        target="_blank"
                        >再生できない場合（Streamで再生）＞</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <!--公演時間の選択-->

          <v-card class="pa-2">
            <v-card-title>
              <v-icon>mdi-ticket</v-icon>
              観劇予約
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-subtitle
              >現地で見たい公演の整理券を取得できます。整理券配布は開演20分前から始まります。</v-card-subtitle
            >
            <v-card-text v-show="!$auth.loggedIn" class="red--text"
              >整理券の取得には<NuxtLink to="/login">ログイン</NuxtLink
              >が必要です。</v-card-text
            >
            <v-divider class="mb-3"></v-divider>
            <!--
            <div class="ma-0 pb-4">
              
              <div class="px-3 pt-2">
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
              -->

            <v-btn class="ma-2" color="primary" @click="$nuxt.refresh()"
              ><v-icon>mdi-reload</v-icon>再読み込み</v-btn
            >
            <div v-for="(event, index) in events" :key="event.id">
              <v-card class="ma-2 d-flex" @click.stop="selectEvent(event)">
                <div>
                  <v-card-text
                    class="pt-1 pb-0 mb-0 grey--text text--darken-2 text-caption"
                  >
                    {{ dateFormatter(event.starts_at) }}
                    {{ event.eventname }}
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-title class="pt-0 pb-1 text-h5">
                    <!--必要性が低いため配布時間を非表示
                  <p class="ma-0 pa-0">
                    <v-icon>mdi-ticket-account</v-icon>配布
                    <span class="text-h5">{{
                      timeFormatter(event.sell_starts)
                    }}</span>
                    -
                    {{ timeFormatter(event.sell_ends) }}
                  </p>
                -->
                    {{ timeFormatter(event.starts_at) }}
                    <span class="caption pl-1">
                      - {{ timeFormatter(event.ends_at) }}</span
                    >
                  </v-card-title>
                </div>
                <v-spacer></v-spacer>
                <div class="my-auto mx-2">
                  <!--ここから配布ステータスの条件分岐-->
                  <v-btn
                    v-if="
                      new Date() < new Date(event.sell_starts) ||
                      new Date(event.sell_ends) < new Date()
                    "
                    color="grey"
                    outlined
                    >時間外<v-icon>mdi-cancel</v-icon></v-btn
                  >
                  <v-btn
                    v-else-if="
                      checkTakenTickets(index) / checkStock(index) < 0.8
                    "
                    color="green"
                    outlined
                    >配布中<v-icon>mdi-circle-double</v-icon></v-btn
                  >
                  <!--8割以上で黄色になる-->
                  <v-btn
                    v-else-if="
                      checkTakenTickets(index) / checkStock(index) >= 0.8 &&
                      checkTakenTickets(index) < checkStock(index)
                    "
                    color="orange"
                    outlined
                    >僅少<v-icon>mdi-triangle-outline</v-icon></v-btn
                  >
                  <v-btn
                    v-else-if="checkTakenTickets(index) >= checkStock(index)"
                    color="red"
                    outlined
                    >完売<v-icon>mdi-close</v-icon></v-btn
                  >
                  <!--ここまで配布ステータスの条件分岐-->
                </div>
              </v-card>
            </div>
            <v-dialog v-if="selected_event" v-model="dialog" max-width="500">
              <v-card class="pa-2">
                <v-card-title>この公演の整理券をとりますか？</v-card-title>

                <v-card-subtitle class="pt-5 pb-0">
                  {{ dateFormatter(selected_event.starts_at) }}
                  {{ selected_event.eventname }}</v-card-subtitle
                >
                <v-card-title class="pt-0 mb-2"
                  >{{ group?.title }}
                </v-card-title>
                <v-card-subtitle>
                  {{ group?.groupname }}
                </v-card-subtitle>
                <v-card-subtitle class="py-2">
                  <span class="text-h5"
                    ><v-icon>mdi-clock-time-nine</v-icon>
                    {{ timeFormatter(selected_event.starts_at) }}
                  </span>
                  -
                  {{ timeFormatter(selected_event.ends_at) }}
                </v-card-subtitle>

                <v-card-subtitle v-if="$auth.$state.strategy == 'ad'"
                  ><span class="text-h5"
                    ><v-icon>mdi-account-supervisor</v-icon>1</span
                  >人</v-card-subtitle
                >
                <div v-else>
                  <v-card-subtitle>
                    <v-icon>mdi-account-plus</v-icon
                    >同時に入場する人数(ご家族など)
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-slider
                      v-model="ticket_person"
                      :tick-labels="person_labels"
                      min="1"
                      max="3"
                    >
                      <template #thumb-label="props">
                        <v-icon dark>
                          {{ person_icons[props.value - 1] }}
                        </v-icon>
                      </template>
                    </v-slider>
                  </v-card-actions>
                </div>
                <v-card-actions class="px-1">
                  <v-spacer></v-spacer>

                  <v-btn color="red" text @click.stop="dialog = false">
                    いいえ
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="CreateTicket(selected_event, ticket_person)"
                  >
                    はい
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-col v-if="events.length === 0" cols="12">
              <v-card disabled>
                <v-card-title>現在選択できる公演はありません。</v-card-title>
              </v-card>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="success_alert" color="success" elevation="2">
        {{ success_message }}
        <template #action="{ attrs }">
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
      <v-snackbar v-model="error_alert" color="red" elevation="2">
        {{ error_message }}
        <template #action="{ attrs }">
          <v-btn color="white" icon v-bind="attrs" @click="error_alert = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Event, Group } from 'types/quaint'
import Vue from 'vue'
type Data = {
  group: Group | undefined
  events: Event[]
  selected_event: Event | null
  userGroups: { admin: string; owner: string }
  videoViewer: boolean
  streamVideoId: string
  editable: boolean
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  dialog: boolean

  ticket_person: number
  person_labels: any[]
  person_icons: any[]
  displayFavorite: number
  listStock: number[]
  listTakenTickets: number[]
  view_count: number | string
}
export default Vue.extend({
  name: 'IndivisualGroupPage',
  auth: false,
  async asyncData({ params, $axios, payload }): Promise<Partial<Data>> {
    const events = await $axios.$get('/groups/' + params.groupId + '/events')
    if (payload !== undefined) {
      return { group: payload, events }
    }
    const group = await $axios.$get('/groups/' + params.groupId)
    return { group, events }
  },
  data(): Data {
    return {
      userGroups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
      },
      videoViewer: false,
      group: undefined,
      events: [],
      selected_event: null,
      streamVideoId: '',
      editable: false, // 権限を持つユーザーがアクセスするとtrueになりページを編集できる

      ticket_person: 1,
      person_labels: ['1人', '2人', '3人'],
      person_icons: [
        'mdi-account',
        'mdi-account-multiple',
        'mdi-account-group',
      ],
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      dialog: false,
      displayFavorite: 0,
      listStock: [],
      listTakenTickets: [],
      view_count: '...',
    }
  },
  head() {
    return {
      title: this.group?.groupname,
    }
  },
  created() {
    if (this.events.length !== 0) {
      const getTicketsInfo = []
      for (let i = 0; i < this.events.length; i++) {
        getTicketsInfo.push(
          this.$axios.$get(
            '/groups/' +
              this.group?.id +
              '/events/' +
              this.events[i].id +
              '/tickets'
          )
        )
      }
      Promise.all(getTicketsInfo).then((ticketsInfo) => {
        for (let i = 0; i < ticketsInfo.length; i++) {
          this.listStock.push(ticketsInfo[i].stock)
          this.listTakenTickets.push(ticketsInfo[i].taken_tickets)
        }
      })
    }
    // admin権限を持つ もしくは この団体にowner権限を持つユーザーがアクセスするとtrueになりページを編集できる
    // 実際に編集できるかどうかはAPIがJWTで認証するのでここはあくまでフロント側の制御
    if (this.$auth.user?.groups && Array.isArray(this.$auth.user?.groups)) {
      if (this.$auth.user?.groups.includes(this.userGroups.admin)) {
        this.editable = true
      } else if (this.$auth.user?.groups.includes(this.userGroups.owner)) {
        this.$axios.$get('/users/me/owner_of').then((res: string[]) => {
          if (res.includes(this.group?.id as string)) {
            this.editable = true
          }
        })
      }
    }
    this.$axios
      .$get(
        '/ga/screenpageview?start_date=7daysAgo&end_date=today&page_path=' +
          this.$route.path
      )
      .then((res) => {
        this.view_count = res.view
      })
      .catch(() => {
        this.view_count = 'エラー'
      })
  },

  methods: {
    IsFavorite(group: Group) {
      if (this.displayFavorite === 0) {
        this.displayFavorite = 1
        return false
      }
      if (this.displayFavorite === 2) {
        return false
      }
      if (this.displayFavorite === 3) {
        return true
      }
      for (let i = 0; i < localStorage.length; i++) {
        if ('seiryofes.groups.favorite.' + group?.id === localStorage.key(i)) {
          return true
        }
      }
      return false
    },
    addFavorite(group: Group) {
      localStorage.setItem('seiryofes.groups.favorite.' + group?.id, group?.id)
      this.displayFavorite = 3
    },
    removeFavorite(group: Group) {
      localStorage.removeItem('seiryofes.groups.favorite.' + group?.id)
      this.displayFavorite = 2
    },
    checkStock(index: number) {
      return this.listStock[index]
    },
    checkTakenTickets(index: number) {
      return this.listTakenTickets[index]
    },

    // 配布日or公演日が今日かどうか判断するmethod
    // isTodayで整理券の表示を切り替えると，v-if="events.length === 0"が機能しなくなるので却下
    // 使い方：v-if="isToday(event.sell_starts, event.sell_ends, event.starts_at)"
    /*
    isToday(
      inputSellStarts: string,
      inputSellEnds: string,
      inputStarts: string
    ) {
      const today = new Date().toDateString()
      const sellStartsDate = new Date(inputSellStarts).toDateString()
      const sellEndsDate = new Date(inputSellEnds).toDateString()
      const startDate = new Date(inputStarts).toDateString()
      if (startDate === today) {
        return true
      } else if (sellStartsDate < today && today < sellEndsDate) {
        return true
      } else {
        return false
      }
    },
    */
    dateFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return d.getMonth() + 1 + '/' + d.getDate()
    },
    timeFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return (
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },
    HashColor(text: string) {
      // group.idを色数で割った余りでデフォルトの色を決定
      const colors = [
        'blue-grey',
        'brown',
        'deep-orange',
        'amber',
        'lime',
        'light-green',
        'teal',
        'cyan',
        'light-blue',
        'indigo',
        'pink',
      ]
      let index = 0
      for (let i = 0; i < text.length; i++) {
        // 文字列をUnicodeの和に変換
        index += text.codePointAt(i) ?? 1
      }
      index = index % colors.length
      return colors[index]
    },
    async CreateTicket(event: Event, person: number) {
      if (!this.$auth.loggedIn) {
        this.error_message = '整理券の取得にはログインが必要です'
        this.error_alert = true
        return 1
      }
      this.dialog = false
      if (this.$auth.$state.strategy === 'ad') person = 1
      await this.$axios
        .post(
          '/groups/' +
            event.group_id +
            '/events/' +
            event.id +
            '/tickets?person=' +
            person
        )
        .then(() => {
          this.success_message =
            '整理券を取得できました！「整理券」タブから確認してください'
          this.success_alert = true
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
          } else {
            this.error_message =
              '予期せぬエラーが発生しました。IT部隊にお声がけください🙇‍♂️'
          }
          this.error_alert = true
        })
    },
    selectEvent(event: Event) {
      if (
        new Date() < new Date(event.sell_starts) ||
        new Date(event.sell_ends) < new Date()
      ) {
        this.error_message = '配布時間外です'
        this.error_alert = true
      } else if (!this.$auth.loggedIn) {
        this.error_message = '整理券の取得にはログインが必要です'
        this.error_alert = true
      } else {
        this.selected_event = event
        this.dialog = true
        this.error_alert = false
      }
    },
  },
})
</script>
