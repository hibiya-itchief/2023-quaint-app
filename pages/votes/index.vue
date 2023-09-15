<template>
  <v-app>
    <v-container name="vote-container">
      <v-row justify="center" align-content="center">
        <v-col cols="12" sm="6" lg="6">
          <!--再読み込みボタン-->
          <div class="text-center pa-1">
            <v-btn class="mx-1 my-1" color="primary" @click="getOption()"
              ><v-icon>mdi-reload</v-icon>再読み込み</v-btn
            >
          </div>

          <!--公演未観覧の場合-->
          <v-card
            v-if="
              tickets[0].length + tickets[1].length == 0 &&
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

          <!--時間切れの場合-->
          <v-card
            v-if="
              !whileVote &&
              ($auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad')
            "
            class="ma-1 pa-2"
          >
            <div>
              <v-card-title>投票期間は終了しました。</v-card-title>
              <v-card-actions>
                <v-btn :href="'/groups'" block
                  >アーカイブ公演を探しに行きましょう✨</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>

          <!--投票済みの場合-->
          <v-card
            v-if="
              tickets[0].length + tickets[1].length !== 0 &&
              isVoted &&
              whileVote &&
              ($auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad')
            "
            class="ma-1 pa-2"
          >
            <div>
              <v-card-title>既に投票済みです</v-card-title>
              <v-card-actions>
                <v-btn :href="'/'" block>トップページに戻る</v-btn>
              </v-card-actions>
            </div>
          </v-card>

          <v-card
            v-if="
              tickets[0].length + tickets[1].length !== 0 &&
              !isVoted &&
              whileVote &&
              ($auth.user?.jobTitle?.includes('Visited') ||
                $auth.$state.strategy === 'ad')
            "
          >
            <v-card-title>優秀クラス劇投票</v-card-title>

            <form>
              <div>1年生</div>
              <v-list v-model="voteclass1">
                <v-list-item value="">投票しない</v-list-item>
                <v-list-item
                  v-for="ticketInfo in tickets[0]"
                  :key="ticketInfo.group.id"
                  :value="ticketInfo.group.id"
                >
                  {{ ticketInfo.group.name }} - {{ ticketInfo.event.title }}
                </v-list-item>
              </v-list>
              <div>2年生</div>
              <!--select v-model="voteclass2">
                <option value="">投票しない</option>
                <option
                  v-for="ticketInfo in tickets[1]"
                  :key="ticketInfo.group.id"
                  :value="ticketInfo.group.id"
                >
                  {{ ticketInfo.group.name }} - {{ ticketInfo.event.title }}
                </option>
              </select-->
              <v-list v-model="voteclass2">
                <v-list-item value="">投票しない</v-list-item>
                <v-list-item
                  v-for="ticketInfo in tickets[1]"
                  :key="ticketInfo.group.id"
                  :value="ticketInfo.group.id"
                >
                  {{ ticketInfo.group.name }} - {{ ticketInfo.event.title }}
                </v-list-item>
              </v-list>
              <v-btn
                @click="
                  selectedVoteClass = [voteclass1, voteclass2]
                  voteDialog = true
                "
                >投票！</v-btn
              >
            </form>
          </v-card>

          <!--投票確定ダイアログ-->
          <v-dialog v-model="voteDialog" max-width="500">
            <v-card>
              <v-card-title class="text-h5">
                投票を確定しますか？
              </v-card-title>
              <v-card-text>この操作は取り消せません</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="
                    voteDialog = false
                    selectedVoteClass = []
                  "
                  >いいえ</v-btn
                >
                <v-btn @click="vote(selectedVoteClass)">はい</v-btn>
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
import { Event, Group, Ticket, Tag } from 'types/quaint'
import Vue from 'vue'
type TicketInfo = {
  group: Group
  event: Event
  ticket: Ticket
}
type Data = {
  groups: Group[]
  events: Event[]
  tickets: TicketInfo[][]
  voteDialog: boolean
  selectedVoteClass: string[]
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  time: string
  seconds: string
  isVoted: boolean
  whileVote: boolean
}
export default Vue.extend({
  name: 'UsersVotePage',
  async asyncData() {},
  data(): Data {
    return {
      groups: [],
      events: [],
      tickets: [[], []],
      voteDialog: false,
      selectedVoteClass: [],
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      time: '',
      seconds: '',
      isVoted: false,
      whileVote: false,
    }
  },
  head: {
    title: '投票',
  },
  created() {
    // initだと思う
    this.getOption()
    // 500msごとに現在時刻を取得
    // setInterval(this.getNow, 500)
  },

  methods: {
    // 整理券が使用されたかどうか判定するmethod（時間だけで管理している）
    // 引数には（終演時刻）を代入
    // isUsed: function (end: Date) {
    isUsed(end: Date) {
      const date = new Date()
      const currentTime: Date = new Date(date.getTime())

      // 「終演時刻<現在時刻」を判定
      if (end < currentTime) {
        return true
      } else {
        return false
      }
    },
    isFinish() {
      // 2023/9/17 15:20より前ならTrue
      const date = new Date()
      const currentTime: Date = new Date(date.getTime())
      return currentTime - 1694931600000 < 0
    },
    searchTag(g_tags: Tag[], data: string) {
      let ii = false
      g_tags.forEach((tag: Tag) => {
        if (tag.tagname === data) {
          ii = true
        }
      })
      return ii
    },
    async getOption() {
      const tickets: Ticket[] = await this.$axios.$get('/users/me/tickets')
      await this.$axios
        .$get('/users/me/votes')
        .then(() => {
          this.error_alert = true
          this.error_message = '既に投票済みです。'
        })
        .catch((e) => {
          if (e.message !== '404') {
            this.error_alert = true
            this.error_message = e.message
          } else {
            this.Normal(tickets)
          }
        })
    },
    Normal(tickets: Ticket[]) {
      this.isVoted = false
      this.whileVote = isFinish()

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

      // ticketを1年、2年のみにする
      const ticketsInfor: TicketInfo[][] = [[], []]
      ticketInfos.forEach((ticketInfo) => {
        if (this.isUsed(new Date(ticketInfo.event.ends_at))) {
          if (this.searchTag(ticketInfo.group.tags, '1年生')) {
            ticketsInfor[0].push(ticketInfo)
          } else if (this.searchTag(ticketInfo.group.tags, '2年生')) {
            ticketsInfor[1].push(ticketInfo)
          }
        }
      })
      this.tickets = ticketsInfor
    },
    async vote(ids: string[]) {
      if (isFinish() !== true) {
        this.error_alert = true
        this.error_message = '投票可能時間は終了しました。'
      } else {
        await this.$axios
          .$post('/votes/' + ids[0] + '/' + ids[1])
          .then(() => {
            this.success_alert = true
            this.success_message = '投票が完了しました'
          })
          .catch((e) => {
            this.error_alert = true
            this.error_message = e.message
          })
        this.voteDialog = false
        this.getOption()
      }
    },
  },
})
</script>
