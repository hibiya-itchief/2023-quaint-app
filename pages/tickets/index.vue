<template>
  <v-app>
    <v-container name="ticket_container">
      <v-row justify="center" align-content="center">
        <v-col cols="12" sm="6" lg="6">
          <!--現在時刻を表示・現在時刻を取得するとv-progress-linearが正常に動作しないため非表示-->
          <!--
            <v-chip v-if="time" label class="ma-1"
              >{{ time }} <span class="text-h5">{{ seconds }} </span></v-chip
            >
            -->

          <!--再読み込みボタン-->
          <div class="text-center pa-1">
            <v-btn class="mx-1 my-1" color="primary" @click="fetchTicket()"
              ><v-icon>mdi-reload</v-icon>再読み込み</v-btn
            >
          </div>

          <!--校内への入場処理が行われていない場合に，入場処理を促すメッセージと処理用のQRコードを表示-->
          <!--ここのデザインをもうちょっと可愛く出来ないかな-->
          <v-card
            v-if="
              !(
                $auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad'
              )
            "
          >
            <v-card-title class="text-h5">🥳星陵祭へようこそ！</v-card-title>
            <v-card-subtitle class="text-h6"
              >校門でこの画面をご提示ください。</v-card-subtitle
            >
            <v-card-text
              >※日比谷生の入場手続きは不要です。そのままお待ちください。</v-card-text
            >
            <v-img
              class="mx-auto my-0"
              style="display: block"
              :src="qrcodeUrl"
              width="90%"
            />
            <!--mx-autoで画像を中央寄せに-->
            <v-card-text
              >User ID:{{ $auth.user?.oid ?? $auth.user?.sub }}</v-card-text
            >

            <!--
              ユーザIDの表示/非表示切り替えは不要と判断し以下の実装を削除
            <v-card-text class="mx-3 my-1">
              <a
                class="text-subtitle-2"
                @click="display_userid = !display_userid"
                >ユーザーIDを表示: </a
              ><span v-show="display_userid"
                >{{ $auth.user?.oid ?? $auth.user?.sub }}
                </span
              >
            
            </v-card-text>
            -->
          </v-card>

          <!--
            不要だと判断し，業務連絡を非表示
            <p class="mx-1 my-0 py-0 text-caption grey--text">
              この画面を観劇したいクラスの受付担当に見せてください
            </p>
            <p class="mx-1 my-0 py-0 text-caption grey--text">
              受付担当者は公演時間と入場人数を確認してください
            </p>
          -->

          <!--整理券未取得の場合に，「探す」タブへ誘導-->
          <v-card
            v-if="
              tickets.length == 0 &&
              ($auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad')
            "
            class="ma-1 pa-2"
          >
            <div>
              <v-card-title>まだ整理券を取得していません</v-card-title>
              <v-card-actions>
                <v-btn :href="'/groups'" block
                  >次に見たい公演を探しに行きましょう✨</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>

          <!--開場中の整理券がある場合に上部に大きく表示-->
          <div
            v-for="ticketInfo in tickets"
            :key="ticketInfo.ticket.id"
            focusable
          >
            <v-card
              v-if="
                isUpNext(
                  new Date(ticketInfo.event.starts_at),
                  new Date(ticketInfo.event.ends_at)
                )
              "
            >
              <v-card-title class="mb-2"
                ><v-icon>mdi-ticket</v-icon>整理券
                <v-spacer></v-spacer>
                <v-chip color="primary" outlined label
                  ><v-icon>mdi-theater</v-icon>開場中</v-chip
                ></v-card-title
              >
              <v-card-subtitle
                >この画面を各クラスの受付に提示してください。</v-card-subtitle
              >
              <v-divider></v-divider>

              <v-card-title class="text-h7">
                {{ ticketInfo.group.title }}
              </v-card-title>
              <v-card-subtitle class="pb-0">
                {{ ticketInfo.group.groupname }}</v-card-subtitle
              >

              <v-card-subtitle class="grey--text text--darken-2">
                <!--日付：画面がごちゃごちゃするため省略．1日目の整理券を画面収録して2日目に使う人が現れるなどしたら，実装が必要-->
                <!--
                <span class="text-h3"
                  ><v-icon>mdi-calendar</v-icon
                  >{{ dateFormatter(ticketInfo.event.starts_at) }}</span
                >
                -->
                <v-spacer></v-spacer>
                <!--上演時刻-->
                <span class="text-h3"
                  ><v-icon>mdi-clock-time-nine</v-icon
                  >{{ timeFormatter(ticketInfo.event.starts_at) }}</span
                >
                -{{ timeFormatter(ticketInfo.event.ends_at) }}
                <v-spacer></v-spacer>
                <!--入場人数-->
                <span class="text-h3"
                  ><v-icon>mdi-account-supervisor</v-icon
                  >{{ ticketInfo.ticket.person }}</span
                >人
              </v-card-subtitle>
              <v-progress-linear
                indeterminate
                height="10px"
                color="teal"
              ></v-progress-linear>
              <v-img
                v-if="ticketInfo.group.public_thumbnail_image_url != null"
                :src="ticketInfo.group.public_thumbnail_image_url"
                width="100%"
                max-height="130px"
              ></v-img>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" sm="6" lg="6">
          <!--取得した整理券一覧-->
          <v-card v-if="tickets.length !== 0">
            <v-card-title
              ><v-icon>mdi-ticket-account</v-icon>あなたの整理券</v-card-title
            >

            <v-expansion-panels>
              <v-expansion-panel
                v-for="ticketInfo in tickets"
                :key="ticketInfo.ticket.id"
                focusable
              >
                <v-expansion-panel-header class="pa-3">
                  <v-list-item>
                    <v-img
                      v-if="ticketInfo.group.public_thumbnail_image_url != null"
                      :src="ticketInfo.group.public_thumbnail_image_url"
                      max-width="100px"
                      height="165px"
                      class="mr-2"
                    ></v-img>
                    <div class="ma-2">
                      <!--取得した整理券の情報を表示-->
                      <v-list-item-subtitle
                        >{{ dateFormatter(ticketInfo.event.starts_at) }}
                        {{ ticketInfo.event.eventname }}</v-list-item-subtitle
                      >
                      <v-list-item-title class="text-h7">
                        {{ ticketInfo.group.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ ticketInfo.group.groupname }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        class="mt-2 grey--text text--darken-2"
                      >
                        <span class="text-h5"
                          ><v-icon>mdi-clock-time-nine</v-icon
                          >{{ timeFormatter(ticketInfo.event.starts_at) }}</span
                        >
                        -{{ timeFormatter(ticketInfo.event.ends_at) }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        class="mb-2 grey--text text--darken-2"
                      >
                        <span class="text-h5"
                          ><v-icon>mdi-account-supervisor</v-icon
                          >{{ ticketInfo.ticket.person }}</span
                        >人
                      </v-list-item-subtitle>

                      <!--整理券の状況を「開場前」（開演20分前まで），「開場中」（開演20分前から終演），「公演終了」（終演以降）に分けて表示-->
                      <v-chip
                        v-if="
                          isUpNext(
                            new Date(ticketInfo.event.starts_at),
                            new Date(ticketInfo.event.ends_at)
                          )
                        "
                        color="primary"
                        outlined
                        label
                        ><v-icon>mdi-theater</v-icon>開場中</v-chip
                      >
                      <v-chip
                        v-else-if="isUsed(new Date(ticketInfo.event.ends_at))"
                        color="error"
                        outlined
                        label
                        ><v-icon>mdi-check</v-icon>公演終了</v-chip
                      >
                      <v-chip v-else color="green" outlined label>
                        <v-icon>mdi-account-clock</v-icon>開場前
                      </v-chip>
                    </div>
                  </v-list-item>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pa-1">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p class="text-body-2 grey--text">
                      ID: {{ ticketInfo.ticket.id }}
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :href="'/groups/' + ticketInfo.group.id"
                      >公演詳細
                    </v-btn>
                    <v-spacer></v-spacer>

                    <!--終演時刻前の時だけ「整理券をキャンセル」ボタンを表示-->
                    <v-btn
                      v-if="!isUsed(new Date(ticketInfo.event.ends_at))"
                      color="error"
                      @click="selectCancelTicket(ticketInfo)"
                    >
                      <v-icon>mdi-close</v-icon>
                      整理券をキャンセル
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <!--整理券キャンセルの有無を問うダイアログ-->
          <v-dialog
            v-if="selectedTicket"
            v-model="cancelDialog"
            max-width="500"
          >
            <v-card>
              <v-card-title class="text-h5">
                本当にキャンセルしますか？
              </v-card-title>
              <v-card-subtitle class="pt-5 pb-0"
                >{{ dateFormatter(selectedTicket.event.starts_at) }}
                {{ selectedTicket.event.eventname }}</v-card-subtitle
              >
              <v-card-title class="pt-0">
                {{ selectedTicket.group.title }}
              </v-card-title>
              <v-card-subtitle>{{
                selectedTicket.group.groupname
              }}</v-card-subtitle>
              <v-card-text>この操作は取り消せません</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelDialog = false">いいえ</v-btn>
                <v-btn color="error" @click="CancelTicket(selectedTicket)"
                  >はい</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-snackbar v-model="success_alert" color="success" elevation="2">
        {{ success_message }}
      </v-snackbar>
      <v-snackbar v-model="error_alert" color="red" elevation="2">
        {{ error_message }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { toDataURL as getQRCodeDataUrl } from 'qrcode'
import { Event, Group, Ticket } from 'types/quaint'
import Vue from 'vue'
type TicketInfo = {
  group: Group
  event: Event
  ticket: Ticket
}
type Data = {
  groups: Group[]
  events: Event[]
  tickets: TicketInfo[]
  cancelDialog: boolean
  selectedTicket: TicketInfo | null
  // template内の実装で該当部分を削除したため不要
  // display_userid: boolean
  qrcodeUrl: string
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  time: string
  seconds: string
}
export default Vue.extend({
  name: 'UsersTicketsPage',
  async asyncData() {},
  data(): Data {
    return {
      groups: [],
      events: [],
      tickets: [],
      cancelDialog: false,
      selectedTicket: null,
      // template内の実装で該当部分を削除したため不要
      // display_userid: false,
      qrcodeUrl: '',
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      time: '',
      seconds: '',
    }
  },
  head: {
    title: '整理券',
  },
  async created() {
    this.fetchTicket()
    try {
      if (this.$auth.$state.strategy === 'ad') {
        this.qrcodeUrl = await getQRCodeDataUrl(this.$auth.user?.oid as string)
      } else {
        this.qrcodeUrl = await getQRCodeDataUrl(this.$auth.user?.sub as string)
      }
    } catch {}
    // 500msごとに現在時刻を取得
    // setInterval(this.getNow, 500)
  },

  methods: {
    // 現在時刻を取得
    // 現在時刻を取得するとv-progress-linearが正常に動作しないため非表示
    /*
    getNow: function () {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time = today.getHours() + ':' + today.getMinutes()
      const dateTime = date + ' ' + time + ':'
      const seconds = today.getSeconds()
      this.time = dateTime
      this.seconds = seconds + ''
    },
    */

    // upNext（開演X分前から終演時刻まで）かどうかを判定するmethod
    // 引数には（開演時刻，終演時刻）を代入
    isUpNext: function (start: Date, end: Date) {
      const date = new Date()
      // 現在時刻を取得
      const currentTime: Date = new Date(date.getTime())
      // 開演20分前の時刻を計算する
      const MinutesBeforeStart = new Date(start.getTime() - 1000 * 60 * 20)

      // 「 開演20分前<現在時刻」かつ「現在時刻<終演時刻」を判定
      if (MinutesBeforeStart < currentTime && currentTime < end) {
        return true
      } else {
        return false
      }
    },

    // 整理券が使用されたかどうか判定するmethod（時間だけで管理している）
    // 引数には（終演時刻）を代入
    isUsed: function (end: Date) {
      const date = new Date()
      const currentTime: Date = new Date(date.getTime())

      // 「終演時刻<現在時刻」を判定
      if (end < currentTime) {
        return true
      } else {
        return false
      }
    },
    async fetchTicket() {
      const tickets: Ticket[] = await this.$axios.$get('/users/me/tickets')

      const ticketInfos: TicketInfo[] = []
      for (const ticket of tickets) {
        const group: Group = await this.$axios.$get(
          '/groups/' + ticket.group_id
        )
        const event: Event = await this.$axios.$get(
          '/groups/' + ticket.group_id + '/events/' + ticket.event_id
        )
        const ticketInfo: TicketInfo = {
          group,
          event,
          ticket,
        }
        ticketInfos.push(ticketInfo)
      }

      ticketInfos.sort((first, second) => {
        if (
          new Date(first.event.starts_at).getTime() <
          new Date(second.event.starts_at).getTime()
        )
          return -1
        else if (
          new Date(first.event.starts_at).getTime() >
          new Date(second.event.starts_at).getTime()
        )
          return 1
        else return 0
      })
      this.tickets = ticketInfos
    },
    timeFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return (
        /*
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日 ' +
        */
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },
    dateFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return d.getMonth() + 1 + '/' + d.getDate()
    },
    selectCancelTicket(ticketInfo: TicketInfo) {
      this.cancelDialog = true
      this.selectedTicket = ticketInfo
    },
    async CancelTicket(deleteTicket: TicketInfo) {
      await this.$axios
        .delete(
          '/groups/' +
            deleteTicket.group.id +
            '/events/' +
            deleteTicket.event.id +
            '/tickets/' +
            deleteTicket.ticket.id
        )
        .then(() => {
          this.success_alert = true
          this.success_message = '整理券が正常にキャンセルされました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message = e.message
        })
      this.cancelDialog = false
      this.fetchTicket()
    },
  },
})
</script>
