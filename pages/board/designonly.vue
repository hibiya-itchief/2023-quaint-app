<template>
  <v-app class="pa-0">
    <v-row>
      <v-col cols="4" class="pa-2.25 pr-0">
        <v-img class="img" src="/images/map1F.png">
          <table border="1">
            <thead>
              <tr>
                <th colspan="2" style="font-size: 200%; font-weight: bold">
                  1F
                </th>
                <th>オンライン</th>
                <th>紙</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2">11R</th>
                <th>次</th>
                <td>
                  <v-icon color="grey">mdi-cancel</v-icon>
                </td>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
              </tr>
              <tr>
                <th>次の次</th>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
              </tr>
              <tr>
                <th rowspan="2">12R</th>
                <th>次</th>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
              </tr>
              <tr>
                <th>次の次</th>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
                <td><v-icon color="grey">mdi-cancel</v-icon></td>
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
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

table {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-collapse: collapse;
  text-align: center;
  align-content: center;
  font-weight: normal;
}

th {
  font-weight: normal;
  width: 75px;
  height: 45px;
}

td {
  width: 100px;
  height: 45px;
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
