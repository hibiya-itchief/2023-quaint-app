<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <div style="height: 220px"></div>
          <div v-if="$vuetify.breakpoint.xs" class="container">
            <h3 id="title">第48回星陵祭は終了しました。</h3>
            <h3 id="title">お越しいただき、本当にありがとうございました。</h3>
          </div>
          <div v-else class="container">
            <h2 id="title">第48回星陵祭は終了しました。</h2>
            <h2 id="title">お越しいただき、本当にありがとうございました。</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
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
  now_loading: boolean
  userGroups: {
    admin: string
    entry: string
    owner: string
    parents: string
    students: string
    teachers: string
    chief: string
  }
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
      now_loading: true,
      userGroups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        entry: process.env.AZURE_AD_GROUPS_QUAINT_ENTRY as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
        parents: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS as string,
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
        teachers: process.env.AZURE_AD_GROUPS_QUAINT_TEACHERS as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
    }
  },
  head: {
    title: '整理券',
  },
  async created() {
    // 静的サイトにするにあたって全て削除
    /*
    this.fetchTicket()
    try {
      if (this.$auth.$state.strategy === 'ad') {
        this.qrcodeUrl = await getQRCodeDataUrl(this.$auth.user?.oid as string)
      } else {
        this.qrcodeUrl = await getQRCodeDataUrl(this.$auth.user?.sub as string)
      }
    } catch {}
    */
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
        if (ticket.status === 'active') {
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
      this.now_loading = false
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
  },
})
</script>
<style>
#title {
  text-align: center;
  font-family: serif;
  font-weight: bold;
}

.text-truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chochin {
  animation: flap ease 2s infinite;
  width: 60px;
  height: 60px;
  margin-top: auto;
}

@keyframes flap {
  0% {
    transform: translateY(0);
  }

  10% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-10px);
  }

  30% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px) rotate(10deg);
  }

  50% {
    transform: translateY(0);
  }
}
</style>
