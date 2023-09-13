<template>
  <v-app class="pa-0">
    <v-row>
      <v-col cols="4" class="pa-2.25 pr-0">
        <v-img class="img" src="/images/map1F.png" />
        <v-img class="img" src="/images/map2F.png" />
      </v-col>
      <v-col cols="4" class="pa-2.25 pl-0">
        <v-img class="img" src="/images/map3F.png" />
        <v-img class="img" src="/images/map4F.png" />
      </v-col>
      <v-col cols="4" class=""> </v-col>
    </v-row>
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
            v-for="group in groups"
            :key="group.id"
            :value="group.groupname"
            @click="console.log('hebeをpost')"
            >{{ group.groupname }}</v-list-item
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
            v-for="group in groups"
            :key="group.id"
            :value="group.groupname"
            @click="console.log('hebeをpost')"
            >{{ group.groupname }}</v-list-item
          >
        </v-list>
      </v-menu>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Group } from 'types/quaint'
import Vue from 'vue'
type Data = {
  groups: Group[]
  //  onAirHebe: Group | undefined
  //  upNextHebe: Group |undefined
}

export default Vue.extend({
  name: 'InformationBoardPage',
  auth: false,
  async asyncData({ $axios, payload }): Promise<Partial<Data>> {
    if (payload !== undefined) {
      return { groups: payload.groups }
    }
    const task = [$axios.$get('/groups')]
    const res = await Promise.all(task)
    return { groups: res[0] }
  },
  data(): Data {
    return {
      groups: [],
      //      onAirHebe: undefined,
      //      upNextHebe: undefined,
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
