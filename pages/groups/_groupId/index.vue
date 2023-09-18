<template>
  <v-app>
    <v-container class="px-1 py-0">
      <client-only>
        <v-row justify="center" class="ma-0 pa-0">
          <v-col cols="12" sm="6" lg="6">
            <!--作品情報-->
            <!--タイトル，団体，お気に入り，映像で鑑賞ボタン-->
            <v-btn icon fab small @click="$router.go(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-card v-if="group">
              <v-img
                v-if="group.public_thumbnail_image_url != null"
                max-height="500px"
                contain
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
              <v-card-actions>
                <div v-for="link in links" :key="link.id" style="width: 100%">
                  <v-btn
                    color="sairai"
                    dark
                    outlined
                    rounded
                    width="100%"
                    :href="link.linktext"
                  >
                    <v-icon>mdi-link</v-icon>
                    {{ link.name }}
                  </v-btn>
                </div>
              </v-card-actions>
              <v-divider></v-divider>
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
              <v-card-actions
                v-if="editable == true && !IsNotClassroom(group)"
                class="py-1"
              >
                <v-btn
                  color="blue-grey"
                  dark
                  outlined
                  rounded
                  width="100%"
                  :to="'/groups/' + group?.id + '/data'"
                >
                  <v-icon>mdi-ticket-confirmation</v-icon>
                  残席情報を確認
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
                  v-if="is_bookmarked"
                  icon
                  color="sairai"
                  @click="removeBookmark(group.id)"
                  ><v-icon>mdi-bookmark</v-icon></v-btn
                >
                <v-btn v-else icon @click="addBookmark(group.id)"
                  ><v-icon>mdi-bookmark-outline</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <!--公演時間の選択-->
            <v-card v-if="!IsNotClassroom(group)" class="pa-2">
              <v-card-title>
                <v-icon>mdi-ticket</v-icon>
                観劇予約
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-subtitle
                >現地で見たい公演の整理券を取得できます。詳しい時間帯は<NuxtLink
                  to="/schedule"
                  >配布スケジュール</NuxtLink
                >やパンフレットをご覧ください。</v-card-subtitle
              >
              <v-card-subtitle v-if="!$auth.loggedIn"
                ><v-btn depressed color="primary" class="mr-1" :href="'/login'"
                  >ログイン</v-btn
                >すると整理券を取得できます。</v-card-subtitle
              >
              <v-divider class="mb-3"></v-divider>

              <v-btn class="ma-2" color="primary" @click="$nuxt.refresh()"
                ><v-icon class="mr-1">mdi-reload</v-icon>再読み込み</v-btn
              >
              <div v-for="(event, index) in suitableEvents()" :key="event.id">
                <v-card
                  class="ma-2 d-flex"
                  :disabled="
                    !isAvailable(event) ||
                    listTakenTickets[index] >= listStock[index]
                  "
                  @click.stop="selectEvent(event)"
                >
                  <div>
                    <v-card-text
                      class="pt-1 pb-0 mb-0 grey--text text--darken-2 text-caption"
                    >
                      {{ dateFormatter(event.starts_at) }}
                      {{ event.eventname }}
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-title class="pt-0 pb-1 text-h5">
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
                      v-if="!isAvailable(event)"
                      color="grey"
                      outlined
                      style="font-weight: bold"
                      >時間外<v-icon>mdi-cancel</v-icon></v-btn
                    >
                    <v-btn
                      v-else-if="
                        listTakenTickets[index] / listStock[index] < 0.5
                      "
                      color="green"
                      outlined
                      style="font-weight: bold"
                      >配布中<v-icon>mdi-circle-double</v-icon></v-btn
                    >
                    <!--5割以上で黄色になる-->
                    <v-btn
                      v-else-if="
                        listTakenTickets[index] / listStock[index] >= 0.5 &&
                        listTakenTickets[index] < listStock[index]
                      "
                      color="orange"
                      outlined
                      style="font-size: 80%; font-weight: bold"
                      >残りわずか<v-icon>mdi-triangle-outline</v-icon></v-btn
                    >
                    <v-btn
                      v-else-if="listTakenTickets[index] >= listStock[index]"
                      color="red"
                      outlined
                      style="font-weight: bold"
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

                  <v-card-subtitle v-if="$quaintUserRole('school', $auth.user)"
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

              <!--suitableEventsの長さが0の（表示する公演が無い）時，以下のメッセージを表示-->
              <v-col v-if="suitableEvents().length === 0" cols="12">
                <v-card class="pa-2">
                  <span class="grey--text text-h5"
                    >現在選択できる公演はありません。</span
                  >
                </v-card>
              </v-col>
            </v-card>
            <v-card v-else class="pa-2">
              <v-card-title>
                <v-icon>mdi-ticket-confirmation</v-icon>
                観劇について
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-subtitle
                >この団体では整理券が取得できません。<br />
                詳しい時間帯は<NuxtLink to="/schedule"
                  >部活動のタイムテーブル</NuxtLink
                >やパンフレットをご覧ください。</v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar v-model="success_alert" color="success" elevation="2">
          {{ success_message }}
          <a
            v-show="success_snackbar_link"
            :href="success_snackbar_link"
            class="link-snackbar"
          >
            取得した整理券を表示
          </a>
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
          <a
            v-show="error_snackbar_link"
            :href="error_snackbar_link"
            class="link-snackbar"
          >
            ログイン
          </a>
          <template #action="{ attrs }">
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
      </client-only>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Event, Group, GroupLink } from 'types/quaint'
import Vue from 'vue'
type Data = {
  userGroups: {
    admin: string
    entry: string
    owner: string
    parents: string
    students: string
    teachers: string
    chief: string
  }
  group: Group | undefined
  events: Event[]
  links: GroupLink[]
  filteredEvents: Event[] //  ユーザ属性（e,g.students, parents）に合致する整理券のみが格納される配列
  selected_event: Event | null
  editable: boolean
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  dialog: boolean
  success_snackbar_link: string | undefined
  error_snackbar_link: string | undefined

  ticket_person: number
  person_labels: any[]
  person_icons: any[]
  nowloading: boolean
  is_bookmarked: boolean
  listStock: number[]
  listTakenTickets: number[]
  view_count: number | string
}
export default Vue.extend({
  name: 'IndivisualGroupPage',
  auth: false,
  async asyncData({ params, $axios, payload }): Promise<Partial<Data>> {
    const events = await $axios.$get('/groups/' + params.groupId + '/events')
    events.sort((i: Event) => {
      return i.target === 'paper' ? 1 : -1
    })
    events.sort((x: Event, y: Event) => {
      return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
    })
    // 下はisAvailableと同じ処理
    events.sort((i: Event) => {
      return new Date() > new Date(i.sell_starts) &&
        new Date(i.sell_ends) > new Date()
        ? -1
        : 1
    })

    // nuxt generate時はpayloadを代入
    const group = payload ?? (await $axios.$get('/groups/' + params.groupId))

    // 各ticketsを取得
    if (events.length !== 0) {
      const getTicketsInfo = []
      for (let i = 0; i < events.length; i++) {
        getTicketsInfo.push(
          $axios.$get(`/groups/${group.id}/events/${events[i].id}/tickets`)
        )
      }
      const listStock: number[] = []
      const listTakenTickets: number[] = []
      Promise.all(getTicketsInfo).then((ticketsInfo) => {
        for (let i = 0; i < ticketsInfo.length; i++) {
          listStock.push(ticketsInfo[i].stock)
          listTakenTickets.push(ticketsInfo[i].taken_tickets)
        }
      })
      const links: GroupLink[] = await $axios.$get(
        '/groups/' + params.groupId + '/links'
      )
      return { group, events, links, listStock, listTakenTickets }
    } else {
      return { group, events }
    }
  },
  data(): Data {
    return {
      userGroups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        entry: process.env.AZURE_AD_GROUPS_QUAINT_ENTRY as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
        parents: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS as string,
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
        teachers: process.env.AZURE_AD_GROUPS_QUAINT_TEACHERS as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
      group: undefined,
      events: [],
      links: [],
      filteredEvents: [],
      selected_event: null,
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
      success_snackbar_link: undefined,
      error_snackbar_link: undefined,
      nowloading: true,
      is_bookmarked: false,
      listStock: [],
      listTakenTickets: [],
      view_count: '...',
    }
  },
  head() {
    return {
      title: this.group?.groupname + ' 「' + this.group?.title + '」',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.group?.groupname +
            ' 「' +
            this.group?.title +
            '」' +
            ' - 日比谷高校星陵祭公式サイト',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.group?.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.group?.public_thumbnail_image_url,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.group?.public_thumbnail_image_url,
        },
      ],
    }
  },
  created() {
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

    //  全ての公演（events）から，ログイン中のユーザ属性（e.g.students,parents）に合致する公演のみがfilteredEventsに格納される
    //  '&& this.isToday(val.sell_starts, val.sell_ends, val.starts_at)'を付け加えれば，当日の整理券のみが表示されるようになる
    this.filteredEvents = this.events.filter((val: Event) => {
      return this.$quaintUserRole(val.target, this.$auth.user)
    })
  },

  mounted() {
    for (let i = 0; i < localStorage.length; i++) {
      if (
        'seiryofes.groups.favorite.' + this.group?.id ===
        localStorage.key(i)
      ) {
        // お気に入りならtrue
        this.is_bookmarked = true
        break
      }
    }
    this.nowloading = false
  },

  methods: {
    addBookmark(id: string) {
      localStorage.setItem('seiryofes.groups.favorite.' + id, id)
      this.is_bookmarked = true
    },
    removeBookmark(id: string) {
      localStorage.removeItem('seiryofes.groups.favorite.' + id)
      this.is_bookmarked = false
    },
    IsNotClassroom(group: Group) {
      for (let i = 0; i < group.tags.length; i++) {
        if (
          group.tags[i].tagname === 'Hebe' ||
          group.tags[i].tagname === '外部団体' ||
          group.tags[i].tagname === '部活動'
        ) {
          return true
        }
      }
      return false
    },

    //  未ログイン状態では全ての公演，ログインしている状態ではユーザ属性に合った公演のみが表示されるようにするmethod
    suitableEvents() {
      if (!this.$auth.loggedIn) {
        return this.events
      } else {
        return this.filteredEvents
      }
    },

    // 配布日or公演日が今日かどうか判断するmethod
    // 使い方：isToday(event.sell_starts, event.sell_ends, event.starts_at)"
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

    // isAvailable: 整理券が配布時間内であればtrue，それ以外はfalseを返すmethod
    isAvailable(event: Event) {
      if (
        new Date() > new Date(event.sell_starts) &&
        new Date(event.sell_ends) > new Date()
      ) {
        return true
      } else {
        return false
      }
    },
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
        this.error_message = '整理券の取得には'
        this.error_snackbar_link = '/login'
        this.error_alert = true
        return 1
      }
      this.dialog = false
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
          this.success_message = '整理券を取得できました！'
          this.success_snackbar_link = '/tickets'
          this.success_alert = true
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
          } else {
            this.error_message =
              '予期せぬエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_snackbar_link = undefined
          this.error_alert = true
        })
    },
    selectEvent(event: Event) {
      if (
        new Date() < new Date(event.sell_starts) ||
        new Date(event.sell_ends) < new Date()
      ) {
        this.error_message = '配布時間外です'
        this.error_snackbar_link = undefined
        this.error_alert = true
      } else if (!this.$auth.loggedIn) {
        this.error_message = '整理券の取得には'
        this.error_snackbar_link = '/login'
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
<style>
a.link-snackbar {
  color: white;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: white;
}
</style>
