<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col class="mt-2 mb-0 py-0" cols="12">
          <p class="my-0 py-0 text-caption">現在検索機能は未実装です</p>
          <v-text-field
            solo
            label="検索"
            prepend-inner-icon="mdi-magnify"
            @input="SearchGroups($event)"
          ></v-text-field>
          <p v-show="false" class="ma-0 pa-0 text-caption">""の検索結果( 件)</p>
          <v-chip-group
            v-show="true"
            active-class="primary--text"
            column
            mandatory
          >
            <v-chip filter @click="selectedTag = undefined"> すべて </v-chip>
            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              filter
              @click="selectedTag = tag"
            >
              {{ tag.tagname }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="my-0 py-0" cols="12">
          <v-divider class="my-0 py-0"></v-divider>
          <div v-show="nowroading">
            <p class="my-0 py-1 text-body-1 grey--text">読み込み中...</p>
            <p class="my-0 py-1 text-caption grey--text">
              時間がかかることがあります(学校のWi-Fi使用中など)
            </p>
          </div>
        </v-col>
        <v-col
          v-for="group in groups"
          v-show="filterGroups(group)"
          :key="group.id"
          cols="12"
          md="4"
          sm="6"
          class="my-0"
        >
          <!-- <class="d-flex flex-column">で，「もっと見る」が常に最下部に -->
          <v-card
            height="100%"
            class="d-flex flex-column my-1"
            :to="'/groups/' + group.id"
          >
            <v-img
              v-if="group.public_thumbnail_image_url != null"
              max-height="180px"
              :src="
                'data:image/jpeg;base64,' + group.public_thumbnail_image_url
              "
            ></v-img>
            <v-img v-else :class="HashColor(group.id)" height="180px"></v-img>
            <v-card-title class="my-1 py-1"
              >{{ group.title }}/{{ group.groupname }}</v-card-title
            >
            <v-card-text class="my-1 py-1">{{ group.description }}</v-card-text>
            <v-card-actions class="my-0 py-0">
              <v-chip-group column>
                <v-chip v-for="tag in group.tags" :key="tag.id" disabled>
                  {{ tag.tagname }}
                </v-chip>
              </v-chip-group>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Group, Tag } from 'types/quaint'
import Vue from 'vue'

type Data = {
  nowroading: boolean
  tags: Tag[]
  groups: Group[]

  selectedTag: Tag | undefined
}

export default Vue.extend({
  name: 'GroupsPage',
  auth: false,
  head: {
    title: '探す (団体一覧)',
  },
  async asyncData({ $axios, payload }): Promise<Partial<Data>> {
    if (payload !== undefined) {
      return { nowroading: false, groups: payload.groups, tags: payload.tags }
    }
    const task = [$axios.$get('/groups'), $axios.$get('/tags')]
    const res = await Promise.all(task)
    return { nowroading: false, groups: res[0], tags: res[1] }
  },
  data(): Data {
    return {
      nowroading: true,
      tags: [],
      groups: [],
      selectedTag: undefined,
    }
  },
  created() {
    // 毎回同じ順番で表示されないようにgroupsの配列をランダムな順番にする
    // 各groupが有しているtagをAPIから取得し，groups配列の中のオブジェクトに"tags"というキーを設けてgroupsとtagsの情報を結びつけている。
  },

  methods: {
    filterGroups(group: Group) {
      if (
        this.selectedTag === undefined ||
        group.tags.some((i) => i.id === this.selectedTag?.id)
      ) {
        return true
        // tag全体（{id:hogehoge, tagname:honyohonyo}の形）を用いると，tagが一致している判定がうまく行えなかったので，idを用いてtagの一致を判定している
      } else {
        return false
      }
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
    SearchGroups() {},
  },
})
</script>
