<template>
  <v-app>
    <v-container name="ticket_container" class="ma-0 pa-0">
      <v-row class="ma-0 pa-0" justify="center" align-content="center">
        <v-col class="ma-0 pa-0" col="6" md="6" sm="12">
          <v-card
            v-if="
              !(
                $auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad'
              )
            "
            outlined
          >
            <v-card-title class="ma-3 pa-0 red--text text-subtitle-1">
              <v-icon color="red">mdi-alert-circle</v-icon>
              未アクティベートなアカウント
            </v-card-title>
            <p class="caption mx-3 my-1 grey--text text--darken-1">
              整理券を取得・使用するには校内への入場処理が必要です。以下のQRコードまたはユーザーIDを校門にいるチーフ会の生徒に提示してください
            </p>
            <p class="caption mx-3 my-1 grey--text text--darken-1">
              ※本校生徒のアカウントは開場と同時にアクティベートされます
            </p>
            <img class="mx-1 my-0" style="display: block" :src="qrcodeUrl" />
            <div class="mx-3 my-1">
              <a
                class="text-subtitle-2"
                @click="display_userid = !display_userid"
                >ユーザーIDを表示：</a
              ><span v-show="display_userid"
                >{{ $auth.user?.oid ?? $auth.user?.sub }}
                <!--ADの場合ユーザーオブジェクトIDはoidに入ってる--></span
              >
            </div>
          </v-card>
          <div class="my-3" />
          <p class="mx-1 my-0 py-0 text-caption grey--text">
            この画面を観劇したいクラスの受付担当に見せてください
          </p>
          <p class="mx-1 my-0 py-0 text-caption grey--text">
            受付担当者は公演時間と入場人数を確認してください
          </p>
          <div
            v-for="ticketInfo in tickets"
            :key="ticketInfo.ticket.id"
            class="my-2"
          >
            <v-card
              class="mx-auto"
              max-width="100%"
              outlined
              rounded
              elevation="2"
            >
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h7 mb-1"
                    >{{ ticketInfo.group.title }} -
                    {{ ticketInfo.group.groupname }}</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    ticketInfo.event.eventname
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-card-actions>
                  <v-btn
                    icon
                    @click="ticketInfo.detailShow = !ticketInfo.detailShow"
                  >
                    <v-icon>{{
                      ticketInfo.detailShow
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    }}</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-list-item>
              <v-expand-transition>
                <div v-show="ticketInfo.detailShow" class="pa-1">
                  <v-divider></v-divider>
                  <v-card-text class="pa-1">
                    <a
                      class="text-body-2 mx-0 my-0 pa-0"
                      :href="'/groups/' + ticketInfo.group.id"
                      >{{ ticketInfo.group.groupname }}の団体紹介ページ</a
                    >
                    <p class="text-body-2 mx-0 my-0 pa-0">
                      <v-icon>mdi-clock-time-nine</v-icon
                      ><span class="grey--text text--darken-2">開幕時刻：</span
                      >{{ DateFormatter(ticketInfo.event.starts_at) }} ~
                      {{ DateFormatter(ticketInfo.event.ends_at) }}
                    </p>
                    <p class="text-body-2 mx-0 my-0 pa-0">
                      <v-icon>mdi-account-supervisor</v-icon
                      ><span class="grey--text text--darken-2"
                        >同時入場人数：</span
                      >{{ ticketInfo.ticket.person }}
                    </p>
                    <p class="text-body-2 mx-0 my-0 pa-0">
                      <span class="grey--text text--darken-2">ID：</span
                      >{{ ticketInfo.ticket.id }}
                    </p>
                    <v-btn @click="selectCancelTicket(ticketInfo)">
                      <v-icon>mdi-close</v-icon>
                      <p class="pa-0 ma-0">このチケットをキャンセル</p>
                    </v-btn>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
          <v-dialog
            v-if="selectedTicket"
            v-model="cancelDialog"
            max-width="300"
          >
            <v-card>
              <v-card-title class="text-h5"
                >{{ selectedTicket.group.title }} -
                {{
                  selectedTicket.group.groupname
                }}の整理券をキャンセルしてもよろしいですか？</v-card-title
              >
              <v-card-text>このアクションは取り消せません</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelDialog = false">いいえ</v-btn>
                <v-btn color="primary" @click="CancelTicket(selectedTicket)"
                  >はい</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div v-if="tickets.length == 0" class="pa-3">
            <p>ここに表示するものはありません</p>
            <a href="/groups" class="amber--text text--darken-4"
              >次に見たい公演を探しに行きましょう✨</a
            >
          </div>
          <v-btn class="mx-1 my-3" color="primary" @click="fetchTicket()"
            >再読み込み</v-btn
          >
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
  detailShow: boolean
}
type Data = {
  groups: Group[]
  events: Event[]
  tickets: TicketInfo[]
  cancelDialog: boolean
  selectedTicket: TicketInfo | null
  display_userid: boolean
  qrcodeUrl: string
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
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
      display_userid: false,
      qrcodeUrl: '',
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
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
  },
  methods: {
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
          detailShow: false,
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
