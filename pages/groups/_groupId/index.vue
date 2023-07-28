<template>
  <v-app>
    <v-container class="px-1 py-0">
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="6" lg="6" class="mx-0 my-2 px-0 py-0 px-sm-3">
          <!--作品情報-->
          <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
          <v-btn icon fab small to="/groups/">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
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
            <v-card-title clsss="pb-0">{{ group.title }}</v-card-title>
            <v-card-subtitle class="pb-0">{{
              group.groupname
            }}</v-card-subtitle>
            <!--
                        お気に入り機能は未実装
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn> -->

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
            <v-card-actions class="py-1">
              <v-btn color="primary" dark rounded @click="videoViewer = true">
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
                  <v-btn icon dark @click="videoViewer = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    >{{ group.title }} - {{ group.groupname }}</v-toolbar-title
                  >
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
                    >※映像鑑賞には，学校で配布されたMicrosoftアカウントへのログインが必要です。</v-card-text
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

          <v-card class="mb-4">
            <v-card-text>
              {{ group?.description }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="4" class="mx-0 my-2 px-0 py-0 px-sm-3">
          <!--公演時間の選択-->

          <v-card class="mb-4">
            <v-card-title
              class="ma-0 px-3 pb-2 pt-4"
              @click="events_show = !events_show"
            >
              <v-icon>mdi-ticket</v-icon>
              観劇予約
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>{{
                  events_show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="ma-0 px-3 py-1"
              >現地で見たい公演の整理券を取得できます。</v-card-text
            >
            <v-card-text
              v-show="!$auth.loggedIn"
              class="red--text ma-0 px-3 py-1"
              >整理券の取得には<NuxtLink to="/login">ログイン</NuxtLink
              >が必要です。</v-card-text
            >

            <v-expand-transition>
              <div v-show="events_show" class="ma-0 pb-4">
                <v-divider class="mb-3"></v-divider>
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
                <a class="px-3 pb-1" @click="$nuxt.refresh()"
                  >最新の状態に更新</a
                >
                <div v-for="(event, index) in events" :key="event.id">
                  <v-card class="mx-2 my-1" @click.stop="selectEvent(event)">
                    <v-card-title class="py-2">
                      {{ event.eventname }}
                      <v-spacer></v-spacer>
                      <v-badge
                        v-if="
                          new Date() < new Date(event.sell_starts) ||
                          new Date(event.sell_ends) < new Date()
                        "
                        color="grey"
                        inline
                      ></v-badge>
                      <v-badge
                        v-else-if="
                          checkTakenTickets(index) / checkStock(index) < 0.8
                        "
                        color="green"
                        inline
                      ></v-badge>
                      <!--8割以上で黄色になる-->
                      <v-badge
                        v-else-if="
                          checkTakenTickets(index) / checkStock(index) >= 0.8 &&
                          checkTakenTickets(index) < checkStock(index)
                        "
                        color="amber"
                        inline
                      ></v-badge>
                      <v-badge
                        v-else-if="
                          checkTakenTickets(index) >= checkStock(index)
                        "
                        color="red"
                        inline
                      ></v-badge>
                    </v-card-title>
                    <v-card-subtitle class="pb-2">
                      <p class="ma-0 pa-0">
                        配布時間：{{ DateFormatter(event.sell_starts) }}
                        ~
                        {{ DateFormatter(event.sell_ends) }}
                      </p>
                      <p class="ma-0 pa-0">
                        公演時間：{{ DateFormatter(event.starts_at) }} ~
                        {{ DateFormatter(event.ends_at) }}
                      </p>
                    </v-card-subtitle>
                  </v-card>
                </div>
                <v-dialog v-if="selected_event" v-model="dialog" width="100%">
                  <v-card class="pa-2">
                    <v-card-title class="px-1"
                      >{{ group?.title }} / {{ group?.groupname }} -
                      {{ selected_event.eventname }}</v-card-title
                    >
                    <v-card-subtitle class="px-1">
                      <p class="ma-0 pa-0">この公演の整理券をとりますか？</p>
                      <p class="ma-0 pa-0">
                        公演時間：{{ DateFormatter(selected_event.starts_at) }}
                        ~
                        {{ DateFormatter(selected_event.ends_at) }}
                      </p>
                    </v-card-subtitle>
                    <div class="px-1">
                      <p
                        v-if="$auth.$state.strategy == 'ad'"
                        class="ma-0 pa-0 text-subtitle-2"
                      >
                        席数：1席
                      </p>
                      <p v-else class="ma-0 pa-0 text-subtitle-2">
                        <v-icon>mdi-account-plus</v-icon
                        >同時に入場する人数(ご家族など)
                      </p>
                      <v-slider
                        v-if="$auth.$state.strategy != 'ad'"
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
                    <v-card-title
                      >現在選択できる公演はありません。</v-card-title
                    >
                  </v-card>
                </v-col>
              </div>
            </v-expand-transition>
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
  events_show: boolean
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
      events_show: true,
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
    DateFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日 ' +
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
