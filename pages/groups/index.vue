<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col class="mt-2 mb-0 py-0" cols="12" sm="8" md="8">
          <v-text-field
            v-model="search_query"
            solo
            label="検索"
            color="sairai"
            prepend-inner-icon="mdi-magnify"
            @input="SearchGroups()"
            @blur="
              const search_query_q =
                search_query === '' ? undefined : search_query
              PushQuery(search_query_q, null, null, null, null)
            "
          >
          </v-text-field>
        </v-col>
        <v-col class="mt-2 mb-5 py-0" cols="12" sm="8" md="8">
          <p v-show="search_query !== ''" class="ma-0 pa-0 text-caption">
            "{{ search_query }}"の検索結果({{ search_result_number }}件)
          </p>

          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                :disabled="search_query !== ''"
                depressed
                max-width="135"
                class="text-subtitle-2 text-capitalize"
                v-bind="attrs"
                v-on="on"
                >{{ selectedTag?.tagname ?? 'すべて' }}<v-spacer /><v-icon
                  >mdi-chevron-down</v-icon
                ></v-btn
              >
            </template>
            <v-list>
              <v-list-item
                @click="
                  PushQuery(null, undefined, null, null, null)
                  selectedTag = undefined
                "
                >すべて</v-list-item
              >
              <v-list-item
                v-for="tag in tags"
                :key="tag.id"
                :value="tag.tagname"
                @click="
                  PushQuery(null, tag.tagname, null, null, null)
                  selectedTag = tag
                "
                >{{ tag.tagname }}</v-list-item
              >
            </v-list>
          </v-menu>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                depressed
                max-width="150"
                class="text-subtitle-2 text-capitalize"
                v-bind="attrs"
                v-on="on"
                >{{ sort_displayname }} <v-spacer /><v-icon
                  >mdi-chevron-down</v-icon
                ></v-btn
              >
            </template>
            <v-list>
              <v-list-item @click="SortGroups('id')">デフォルト順</v-list-item>
              <v-list-item @click="SortGroups('groupname')"
                >団体名順</v-list-item
              >
              <v-list-item @click="SortGroups('title')">演目名順</v-list-item>
            </v-list>
          </v-menu>
          <div v-if="!nowloading" style="display: inline">
            <v-icon
              v-show="display_bookmarks"
              color="sairai"
              @click="
                display_bookmarks = false
                PushQuery(null, null, undefined, null, null)
              "
              >mdi-bookmark-multiple</v-icon
            >
            <v-icon
              v-show="!display_bookmarks"
              @click="
                display_bookmarks = true
                PushQuery(null, null, true, null, null)
              "
              >mdi-bookmark-multiple-outline</v-icon
            >
            <v-icon
              v-show="$route.query.r == 'true'"
              class="arrow-rotate"
              @click="ReverseGroups()"
              >mdi-arrow-up</v-icon
            >
            <v-icon
              v-show="$route.query.r != 'true'"
              class="arrow-rotate"
              @click="ReverseGroups()"
              >mdi-arrow-down</v-icon
            >
          </div>
        </v-col>

        <v-col class="my-0 py-0" cols="12">
          <v-divider class="my-0 py-0"></v-divider>
          <!--
            現状ほぼnowloading文を見ることがないこと、
            開発環境ではレンダリング中にlocalStorageが使えないことから
            一旦無効にする
          <div v-show="nowloading">
            <p class="my-0 py-1 text-body-1 grey--text">読み込み中...</p>
            <p class="my-0 py-1 text-caption grey--text">
              時間がかかることがあります(学校のWi-Fi使用中など)
            </p>
          </div>
          -->
        </v-col>

        <v-col
          v-for="group in groups"
          v-show="FilterGroups(group)"
          :key="group.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="my-0 py-2"
        >
          <!-- <class="d-flex flex-column">で，「もっと見る」が常に最下部に -->
          <v-card
            height="100%"
            class="d-flex flex-column ma-0 pa-2"
            :to="'/groups/' + group.id"
          >
            <div v-if="!$vuetify.breakpoint.xs">
              <v-img
                v-if="group.public_thumbnail_image_url != null"
                height="180px"
                aspect-ratio="4/3"
                contain
                :src="group.public_thumbnail_image_url"
              ></v-img>
              <v-img
                v-else
                :class="HashColor(group.id)"
                height="180px"
                aspect-ratio="4/3"
                contain
              ></v-img>
            </div>
            <div class="d-flex flex-no-wrap">
              <div v-if="$vuetify.breakpoint.xs">
                <!--<v-avatar v-if="$vuetify.breakpoint.xs" size="100" rounded="0">-->
                <v-img
                  v-if="group.public_thumbnail_image_url != null"
                  height="120px"
                  width="90px"
                  contain
                  :src="group.public_thumbnail_image_url"
                ></v-img>
                <v-img
                  v-else
                  :class="HashColor(group.id)"
                  height="120px"
                  width="90px"
                ></v-img>
                <!--</v-avatar>-->
              </div>
              <div class="px-1 text-truncate" style="width: 100%">
                <v-card-title class="pb-2 text-truncate">
                  {{ group.title }}
                </v-card-title>
                <v-card-subtitle class="pb-0 text-truncate">
                  {{ group.groupname }}
                </v-card-subtitle>
                <v-card-text
                  class="my-0 py-0 text-caption grey--text text-truncate"
                >
                  {{ group.description }}
                </v-card-text>
                <v-card-actions class="py-0">
                  <v-chip-group column>
                    <v-chip
                      v-for="tag in group.tags"
                      :key="tag.id"
                      disabled
                      small
                    >
                      {{ tag.tagname }}
                    </v-chip>
                  </v-chip-group>
                  <v-spacer />
                  <v-icon v-if="FilterBookmarks(group.id)" color="sairai"
                    >mdi-bookmark</v-icon
                  >
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <p
        v-show="!nowloading && display_bookmarks"
        class="mt-10"
        style="text-align: center"
      >
        団体の詳細ページでブックマークを追加することができます。
      </p>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import { Group, Tag } from 'types/quaint'
import Vue from 'vue'

type Data = {
  nowloading: boolean
  tags: Tag[]
  groups: Group[]
  search_query: string
  sort_displayname: string
  query_cache: any
  search_result_number: number
  display_bookmarks: boolean
  selectedTag: Tag | undefined
}

export default Vue.extend({
  name: 'GroupsPage',
  auth: false,
  async asyncData({ $axios, payload }): Promise<Partial<Data>> {
    if (payload !== undefined) {
      return { groups: payload.groups, tags: payload.tags }
    }
    const task = [$axios.$get('/groups'), $axios.$get('/tags')]
    const res = await Promise.all(task)
    return { groups: res[0], tags: res[1] }
  },
  data(): Data {
    return {
      nowloading: true,
      tags: [],
      groups: [],
      selectedTag: undefined,
      search_result_number: 0,
      search_query: '',
      sort_displayname: 'デフォルト順',
      display_bookmarks: false,
      query_cache: undefined,
    }
  },
  head() {
    return {
      title: '探す (団体一覧)',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: '参加団体一覧 - 日比谷高校星陵祭公式サイト',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '参加団体一覧 - 日比谷高校星陵祭公式サイト 各クラスが長い時間をかけて準備した演劇や個性豊かな有志団体の発表など、次に見たい公演を探すことが出来ます。',
        },
      ],
    }
  },
  created() {
    // クエリパラメータを見て検索バー内の文字列を再現など
    if (typeof this.$route.query.q === 'string') {
      this.search_query = this.$route.query.q
      // 検索中はタグ選択ができないため、created時もtを削除
      if (this.$route.query.t !== undefined) {
        this.PushQuery(null, undefined, null, null, null)
      }
      this.SearchGroups()
    }
    if (
      this.$route.query.s === 'groupname' ||
      this.$route.query.s === 'title'
    ) {
      const query_s = this.$route.query.s
      if (query_s === 'groupname') {
        this.sort_displayname = '団体名順'
      } else if (query_s === 'title') {
        this.sort_displayname = '演目名順'
      }
      this.groups.sort((x, y) => {
        return (x[query_s] ?? '') > (y[query_s] ?? '') ? 1 : -1
      })
    }
    if (this.$route.query.r === 'true') {
      this.groups.reverse()
    }

    if (this.$route.query.b === 'true') this.display_bookmarks = true

    const query_t = this.$route.query.t // query_tは見やすくするためだけに定義
    // クエリパラメータを見てselectedTagを再現
    if (query_t === undefined) {
      this.selectedTag = undefined
    } else if (typeof query_t === 'string') {
      for (let i = 0; i < this.tags.length; i++) {
        if (query_t === this.tags[i].tagname) {
          this.selectedTag = this.tags[i]
          break
        }
      }
    }
  },
  mounted() {
    this.nowloading = false
  },

  methods: {
    // それぞれ、Qは検索バーの内容、Tはタグ、Bはブックマーク、Sはソート(並び替え)、Rは昇順/降順の切り替え(ReverseのR)
    PushQuery(Q: any, T: any, B: any, S: any, R: any) {
      Q = Q === null ? this.$route.query.q : Q
      T = T === null ? this.$route.query.t : T
      B = B === null ? this.$route.query.b : B
      S = S === null ? this.$route.query.s : S
      R = R === null ? this.$route.query.r : R
      this.$router.push({ query: { q: Q, t: T, b: B, s: S, r: R } }) // nullは「現在のクエリを維持」と同義
    },
    SortGroups(sort: 'id' | 'groupname' | 'title') {
      if (sort === 'groupname') {
        this.sort_displayname = '団体名順'
      } else if (sort === 'title') {
        this.sort_displayname = '演目名順'
      } else {
        this.sort_displayname = 'デフォルト順'
      }
      this.groups.sort((x, y) => {
        return (x[sort] ?? '') > (y[sort] ?? '') ? 1 : -1
      })
      if (this.$route.query.r === 'true') {
        this.groups.reverse()
      }
      const sort_query = sort === 'id' ? undefined : sort
      this.PushQuery(null, null, null, sort_query, null)
    },
    ReverseGroups() {
      this.SortGroups(
        this.$route.query.s === 'groupname' || this.$route.query.s === 'title'
          ? this.$route.query.s
          : 'id'
      )
      this.groups.reverse()
      if (this.$route.query.r === 'true') {
        this.PushQuery(null, null, null, null, undefined)
      } else {
        this.PushQuery(null, null, null, null, 'true')
      }
    },

    SearchGroups() {
      if (this.search_query === '') {
        this.selectedTag = this.query_cache
        this.query_cache = undefined
        if (this.selectedTag === undefined) {
          this.PushQuery(undefined, undefined, null, null, null)
        } else if (this.selectedTag === null) {
          this.PushQuery(undefined, 'favorite', null, null, null)
        } else {
          this.PushQuery(undefined, this.selectedTag.tagname, null, null, null)
        }
      } else {
        if (this.selectedTag !== undefined) {
          this.query_cache = this.selectedTag
          this.selectedTag = undefined
          this.PushQuery(null, undefined, null, null, null)
        }
        this.search_result_number = 0
        for (let i = 0; i < this.groups.length; i++) {
          if (
            this.groups[i].id.includes(this.search_query.toLowerCase()) ||
            this.groups[i].groupname
              .toLowerCase()
              .includes(this.search_query.toLowerCase()) ||
            this.groups[i].title
              ?.toLowerCase()
              .includes(this.search_query.toLowerCase()) ||
            this.groups[i].description
              ?.toLowerCase()
              .includes(this.search_query.toLowerCase())
          ) {
            this.search_result_number += 1
          }
        }
      }
    },

    FilterGroups(group: Group) {
      if (this.nowloading === true) return false
      if (
        this.display_bookmarks === true &&
        this.FilterBookmarks(group.id) === false
      )
        return false
      if (this.selectedTag === undefined) {
        if (
          this.search_query === '' ||
          group.id.toLowerCase().includes(this.search_query.toLowerCase()) ||
          group.groupname
            .toLowerCase()
            .includes(this.search_query.toLowerCase()) ||
          group.title
            ?.toLowerCase()
            .includes(this.search_query.toLowerCase()) ||
          group.description
            ?.toLowerCase()
            .includes(this.search_query.toLowerCase())
        ) {
          return true
        }
      } else if (
        this.selectedTag === null &&
        localStorage.getItem('seiryofes.groups.favorite.' + group.id) !== null
      ) {
        return true
      } else if (group.tags.some((i) => i.id === this.selectedTag?.id)) {
        return true
      } else {
        return false
      }
    }, // tag全体（{id:hogehoge, tagname:honyohonyo}の形）を用いると，tagが一致している判定がうまく行えなかったので，idを用いてtagの一致を判定している

    FilterBookmarks(id: string) {
      // お気に入りならtrue
      if (this.nowloading === true) return false
      for (let i = 0; i < localStorage.length; i++) {
        if ('seiryofes.groups.favorite.' + id === localStorage.key(i)) {
          return true
        }
      }
      return false
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
.arrow-rotate:active {
  transform: rotate(180deg);
}

.text-truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
