<template>
  <v-app class="pa-0">
    <v-row>
      <v-col cols="4" class="pa-2.25 pr-0">
        <v-img class="img" src="/images/map1F.png">
          <table border="1" cellpadding="6" cellspacing="0">
            <thead>
              <tr>
                <th colspan="2"></th>
                <th>オンライン</th>
                <th>紙整理券</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2">11R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[0].sell_starts_1st,
                        rooms[0].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[0].taken_tickets_1st / rooms[0].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[0].taken_tickets_1st / rooms[0].stock_1st >= 0.5 &&
                      rooms[0].taken_tickets_1st < rooms[0].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[0].taken_tickets_1st >= rooms[0].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
                <td>o</td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>x</td>
                <td>o</td>
              </tr>
              <tr>
                <th rowspan="2">12R</th>
                <th>次</th>
                <td>x</td>
                <td>o</td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>x</td>
                <td>o</td>
              </tr>
            </tbody>
          </table></v-img
        >
        <v-img class="img" src="/images/map2F.png" />
      </v-col>
      <v-col cols="4" class="pa-2.25 pl-0">
        <v-img class="img" src="/images/map3F.png" />
        <v-img class="img" src="/images/map4F.png" />
      </v-col>
      <v-col cols="4" class=""> </v-col>
    </v-row>

    <!--
      <v-row class="mt-30" justify="center">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              depressed
              class="text-subtitle-2 text-capitalize"
              v-bind="attrs"
              v-on="on"
              >{{ 'nowplayingのhebe' ?? '未設定' }}<v-spacer /><v-icon
                >mdi-chevron-down</v-icon
              ></v-btn
            >
          </template>
          <v-list>
            <v-list-item
              v-for="hebe in hebes"
              :key="hebe.id"
              :value="hebe.groupname"
              @click="console.log('hebeをpost')"
              >{{ hebe.groupname }}</v-list-item
            >
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              depressed
              class="text-subtitle-2 text-capitalize"
              v-bind="attrs"
              v-on="on"
              >{{ 'upnextのhebe' ?? '未設定' }}<v-spacer /><v-icon
                >mdi-chevron-down</v-icon
              ></v-btn
            >
          </template>
          <v-list>
            <v-list-item
              v-for="hebe in hebes"
              :key="hebe.id"
              :value="hebe.groupname"
              @click="console.log('hebeをpost')"
              >{{ hebe.groupname }}</v-list-item
            >
          </v-list>
        </v-menu>
      </v-row>
    -->
  </v-app>
</template>

<script lang="ts">
import { Group, Event } from 'types/quaint'
import Vue from 'vue'
type RoomData = {
  group_id: string
  event_id_1st: string
  event_id_2nd: string
  starts_at_1st: string
  starts_at_2nd: string
  ends_at_1st: string
  ends_at_2nd: string
  sell_starts_1st: string
  sell_starts_2nd: string
  sell_ends_1st: string
  sell_ends_2nd: string
  taken_tickets_1st: number
  taken_tickets_2nd: number
  stock_1st: number
  stock_2nd: number
}
type Data = {
  hebes: Group[]
  events: Event[]
  rooms: RoomData[]
}

export default Vue.extend({
  name: 'InformationBoardPage',
  auth: false,
  async asyncData({ $axios }): Promise<Partial<Data>> {
    // 公演がある前提なので、ないと必ずエラーが出る

    // ここでクラス劇オンリーのgroupsを作成(R_groups)
    const rooms_promises = []
    for (let i = 0; i < 24; i++) {
      const room_num =
        ((i + 1) % 8 === 0 ? 8 : (i + 1) % 8) + 10 * (((i / 8) | 0) + 1)
      // 11~38までの24個
      rooms_promises.push($axios.$get(`/groups/${room_num}r`))
    }
    const R_groups: Group[] = await Promise.all(rooms_promises)

    // 完成品の受け皿を作成
    // templateで使う際は、rooms[i]のiにあたる数字は11Rから38Rまでを順番に並べたときをイメージ
    const rooms: RoomData[] = []

    // 全クラスの必要な内容をroomsに詰める
    for (let i = 0; i < R_groups.length; i++) {
      // ここで各クラスのsort済みeventsを作成、使うのは１つ目と２つ目だけ
      const events: Event[] = await $axios.$get(
        `/groups/${R_groups[i].id}/events`
      )
      events.sort((i: Event) => {
        return i.target === 'paper' ? 1 : -1
      })
      events.sort((x: Event, y: Event) => {
        return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
      })
      events.sort((i: Event) => {
        return new Date() > new Date(i.sell_starts) &&
          new Date(i.sell_ends) > new Date()
          ? -1
          : 1
      })

      // １つ目と２つ目の公演の残席状況を入手
      const tickets_info: any[] = await Promise.all([
        $axios.$get(`/groups/${R_groups[i].id}/events/${events[0].id}/tickets`),
        $axios.$get(`/groups/${R_groups[i].id}/events/${events[1].id}/tickets`),
      ])
      rooms.push({
        group_id: R_groups[i].id,
        event_id_1st: events[0].id,
        event_id_2nd: events[1].id,
        starts_at_1st: events[0].starts_at,
        starts_at_2nd: events[1].starts_at,
        ends_at_1st: events[0].ends_at,
        ends_at_2nd: events[1].ends_at,
        sell_starts_1st: events[0].sell_starts,
        sell_starts_2nd: events[1].sell_starts,
        sell_ends_1st: events[0].sell_ends,
        sell_ends_2nd: events[1].sell_ends,
        taken_tickets_1st: tickets_info[0].taken_tickets,
        taken_tickets_2nd: tickets_info[1].taken_tickets,
        stock_1st: tickets_info[0].stock,
        stock_2nd: tickets_info[1].stock,
      })
    }

    return { rooms }
  },
  data(): Data {
    return {
      hebes: [],
      events: [],
      rooms: [],
    }
  },
  head: {
    title: 'インフォメーションボード',
  },
  methods: {
    // isAvailable: 整理券が配布時間内であればtrue，それ以外はfalseを返すmethod
    isAvailable(sell_starts: string, sell_ends: string) {
      if (
        new Date() > new Date(sell_starts) &&
        new Date(sell_ends) > new Date()
      ) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

table {
  background-color: #fff;
}

#title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #b49656;
  font-family: serif;
  font-weight: bold;
}

.img {
  border: 9px solid #b49656;
}
</style>
