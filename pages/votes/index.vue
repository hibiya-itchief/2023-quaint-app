<template>
  <v-app>
    <v-container name="vote-container">
      <v-row justify="center" align-content="center">
        <v-col cols="12" sm="6" lg="6">
          <!--再読み込みボタン-->
          <div class="text-center pa-1">
            <v-btn class="mx-1 my-1" color="primary" @click="fetchTicket()"
              ><v-icon>mdi-reload</v-icon>再読み込み</v-btn
            >
          </div>

          <!--公演未観覧の場合-->
          <v-card
            v-if="
              usedticket.length == 0 &&
              ($auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad')
            "
            class="ma-1 pa-2"
          >
            <div>
              <v-card-title>まだ投票可能な劇を観覧していません</v-card-title>
              <v-card-actions>
                <v-btn :href="'/groups'" block
                  >次に見たい公演を探しに行きましょう✨</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>

          <!--投票済みの場合-->
          <v-card
            v-if="
              ($auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad' ||
                $auth.$state.voted === true )
            "
            class="ma-1 pa-2"
          >
            <div>
              <v-card-title>既に投票済みです</v-card-title>
              <v-card-actions>
                <v-btn :href="'/'" block
                  >トップページに戻る</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>

          <v-card v-if="watched.length !== 0 && $auth.$state.voted === false">
            <v-card-title>優秀クラス劇投票</v-card-title>

            <form>
              <select v-model="voteclass">
                <option v-for="watched in wathceds" v-bind:key="watched">{{ watched }}</option>
              </select>
              <v-btn @click="vote(voteclass)">投票！</v-btn>
            </form>
          </v-card>
          
          <!--投票確定ダイアログ-->
          <v-dialog
            v-if="selectedVoteClass"
            v-model="voteDialog"
            max-width="500"
          >
            <v-card>
              <v-card-title class="text-h5">
                {{ selectedVoteClass }}で投票を確定しますか？
              </v-card-title>
              <v-card-text>この操作は取り消せません</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="voteDialog = false">いいえ</v-btn>
                <v-btn @click="TrueVote(selectedVoteClass)"
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
import { Event, Group, Vote } from 'types/quaint'
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
  voteDialog: boolean
  selectedVoteClass: TicketInfo | null
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  time: string
  seconds: string
}
export default Vue.extend({
  name: 'UsersVotePage',
  async asyncData() {},
  data(): Data {
    return {
      groups: [],
      events: [],
      tickets: [],
      voteDialog: false,
      selectedVoteClass: null,
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      time: '',
      seconds: '',
    }
  },
  head: {
    title: '投票',
  },
  async created() {
    # initだと思う
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
