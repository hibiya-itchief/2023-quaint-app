<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col class="mt-2 mb-0 py-0" cols="12">
          <v-text-field
            solo
            label="検索"
            prepend-inner-icon="mdi-magnify"
            @input="SearchGroups($event)"
          ></v-text-field>
          <p v-show="search_result" class="ma-0 pa-0 text-caption">
            "{{ search_query }}"の検索結果({{ search_result_number }}件)
          </p>
          <v-chip-group
            v-show="tag_selector"
            active-class="primary--text"
            column
            mandatory
          >
            <v-chip filter @click="selectedTag = ''"> すべて </v-chip>
            <v-chip v-for="tag in tags" filter @click="selectedTag = tag">
              {{ tag.tagname }}
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
              v-if="group.cover_image != null"
              max-height="180px"
              :src="'data:image/jpeg;base64,' + group.cover_image"
            ></v-img>
            <v-img
              v-else-if="group.thumbnail_image != null"
              max-height="180px"
              :src="'data:image/jpeg;base64,' + group.thumbnail_image"
            ></v-img>
            <v-img v-else :class="HashColor(group.id)" height="180px"></v-img>
            <v-card-title class="my-1 py-1"
              >{{ group.title }}/{{ group.groupname }}</v-card-title
            >
            <v-card-text class="my-1 py-1">{{ group.description }}</v-card-text>
            <v-card-actions class="my-0 py-0">
              <v-chip-group column>
                <v-chip v-for="tag in group.tags" disabled>
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

<script>
export default {
  name: 'GroupsPage',
  auth: false,
  asyncData({ error, $axios }) {},
  data() {
    return {
      tags: [],
      groups: [],
      all_groups: [],
      selectedTag: '',
      search_query: '',
      search_result_number: 0,
      search_result: false,
      tag_selector: true,
      nowloading: true,
    }
  },
  created() {
    let res_tags
    let res_groups
    Promise.all([this.$axios.get('/tags'), this.$axios.get('/groups')])
      .then((response) => {
        res_tags = response[0].data
        res_groups = response[1].data

        // 毎回同じ順番で表示されないようにgroupsの配列をランダムな順番にする
        const shuffleArray = (array) => {
          const cloneArray = [...array]
          for (let i = cloneArray.length - 1; i >= 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1))
            // 配列の要素の順番を入れ替える
            const tmpStorage = cloneArray[i]
            cloneArray[i] = cloneArray[rand]
            cloneArray[rand] = tmpStorage
          }
          return cloneArray
        }
        this.groups = shuffleArray(res_groups)
        this.all_groups = this.groups

        const tag_promise = []
        // 各groupが有しているtagをAPIから取得し，groups配列の中のオブジェクトに"tags"というキーを設けてgroupsとtagsの情報を結びつけている。
        for (let i = 0; i < this.groups.length; i++) {
          tag_promise.push(
            this.$axios.get('/groups/' + this.groups[i].id + '/tags')
          )
        }
        Promise.all(tag_promise)
          .then((response) => {
            for (let i = 0; i < this.groups.length; i++) {
              this.groups[i].tags = response[i].data
              this.all_groups[i].tags = response[i].data
            }
            this.tags = res_tags
            this.nowloading = false
          })
          .catch((e) => {
            console.error(e.message)
            this.$nuxt.error({ message: e.message })
          })
      })
      .catch((e) => {
        console.error(e.message)
        this.nuxt.error({ message: e.message })
      })
  },

  methods: {
    filterGroups(group) {
      if (
        this.selectedTag === '' ||
        (typeof group.tags !== 'undefined' &&
          group.tags.some((i) => i.id === this.selectedTag.id))
      ) {
        return true
        // tag全体（{id:hogehoge, tagname:honyohonyo}の形）を用いると，tagが一致している判定がうまく行えなかったので，idを用いてtagの一致を判定している
      } else {
        return false
      }
    },
    HashColor(text) {
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
        index += text.codePointAt(i)
      }
      index = index % colors.length
      return colors[index]
    },
    SearchGroups(input) {
      if (input == '') {
        this.tag_selector = true
        this.search_result = false
        this.groups = this.all_groups
      } else {
        this.selectedTag = ''
        this.tag_selector = false
        this.search_query = input
        this.search_result = true
        this.$axios
          .get('/search?q=' + input)
          .then((response) => {
            let res_groups = []
            res_groups = response.data
            const tag_promise = []
            // 各groupが有しているtagをAPIから取得し，groups配列の中のオブジェクトに"tags"というキーを設けてgroupsとtagsの情報を結びつけている。
            for (let i = 0; i < res_groups.length; i++) {
              tag_promise.push(
                this.$axios.get('/groups/' + res_groups[i].id + '/tags')
              )
            }
            Promise.all(tag_promise)
              .then((response) => {
                for (let i = 0; i < res_groups.length; i++) {
                  res_groups[i].tags = response[i].data
                }
                this.groups = res_groups
                this.search_result_number = this.groups.length
              })
              .catch((e) => {
                console.error(e)
              })
          })
          .catch((e) => {
            console.error(e)
          })
      }
    },
  },
}
</script>
