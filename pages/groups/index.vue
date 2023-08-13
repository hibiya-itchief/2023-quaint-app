<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col class="mt-2 mb-0 py-0" cols="12">
          <v-text-field
            v-model="search_query"
            solo
            label="検索"
            prepend-inner-icon="mdi-magnify"
            @input="SearchGroups($event)"
          ></v-text-field>
          <p v-show="searchB" class="ma-0 pa-0 text-caption">
            "{{ search_query }}"の検索結果({{ search_result_number }}件)
          </p>

          <v-chip-group
            v-show="!searchB"
            v-model="tag_query"
            active-class="primary--text"
            column
            mandatory
          >
            <v-chip
              :value="'all'"
              filter
              @click="
                $router.push({ query: {} })
                selectedTag = undefined
              "
            >
              すべて
            </v-chip>
            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              :value="tag.tagname"
              filter
              @click="
                $router.push({ query: { tag: tag.tagname } })
                selectedTag = tag
              "
              >{{ tag.tagname }}</v-chip
            >
            <v-divider vertical :thickness="10" class="mx-2 px-0"></v-divider>
            <v-chip
              :value="'favorite'"
              filter
              class="ml-1"
              @click="
                $router.push({ query: { tag: 'favorite' } })
                selectedTag = null
              "
            >
              お気に入り
            </v-chip>
          </v-chip-group>
        </v-col>

        <v-col class="my-0 py-0" cols="12">
          <v-divider class="my-0 py-0"></v-divider>
          <div v-show="nowloading">
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
              <div class="px-1 text-truncate">
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
                </v-card-actions>
              </div>
            </div>
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
  nowloading: boolean
  tags: Tag[]
  groups: Group[]
  searchB: boolean
  search_query: string
  tag_query: string
  query_cache: any
  search_result_number: number
  selectedTag: Tag | undefined | null
}

export default Vue.extend({
  name: 'GroupsPage',
  auth: false,
  async asyncData({ $axios, payload }): Promise<Partial<Data>> {
    if (payload !== undefined) {
      return { nowloading: false, groups: payload.groups, tags: payload.tags }
    }
    const task = [$axios.$get('/groups'), $axios.$get('/tags')]
    const res = await Promise.all(task)
    return { nowloading: false, groups: res[0], tags: res[1] }
  },
  data(): Data {
    return {
      nowloading: true,
      tags: [],
      groups: [],
      selectedTag: undefined,
      search_result_number: 0,
      searchB: false,
      search_query: '',
      tag_query: '',
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
    this.SortGroups('id', false)

    const query = this.$route.query.tag
    if (typeof query === 'undefined') {
      this.tag_query = 'all'
      this.selectedTag = undefined
    } else if (query === 'favorite') {
      this.tag_query = 'favorite'
      this.selectedTag = null
    } else if (typeof query === 'string') {
      this.tag_query = query
      for (let i = 0; i < this.tags.length; i++) {
        if (query === this.tags[i].tagname) {
          this.selectedTag = this.tags[i]
          break
        }
      }
    }
    if (typeof this.$route.query.search === 'string') {
      this.SearchGroups(this.$route.query.search)
    }
  },

  methods: {
    SortGroups(sort: 'id' | 'groupname' | 'title', reverse: boolean) {
      this.groups.sort((x, y) => {
        return (x[sort] ?? '') > (y[sort] ?? '') ? 1 : -1
      })
      if (reverse === true) {
        this.groups.reverse()
      }
    },

    SearchGroups(input: string) {
      this.$router.push({ query: { search: input } })
      if (input === '') {
        this.searchB = false
        if (this.query_cache === undefined) {
          this.$router.push({ query: {} })
        } else if (this.query_cache === null) {
          this.$router.push({ query: { tag: 'favorite' } })
          this.query_cache = undefined
        } else {
          this.$router.push({ query: { tag: this.query_cache } })
          this.query_cache = undefined
        }
      } else {
        if (this.$route.query.tag !== undefined) {
          this.query_cache = this.$route.query.tag
        }
        this.selectedTag = undefined
        this.search_query = input
        this.searchB = true
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

    filterGroups(group: Group) {
      if (this.selectedTag === undefined) {
        if (
          !this.searchB ||
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
.text-truncate {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
