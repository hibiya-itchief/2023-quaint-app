<template>
  <v-app>
    <v-container>
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="8" md="6" class="ma-0 pa-0">
          <h2 class="mx-1 px-0" style="display: inline">
            <v-icon color="blue-grey">mdi-pencil</v-icon>
            <span class="grey--text text-subtitle-1">新規投稿の作成</span>
            <v-btn class="ml-auto" color="primary" @click="PrintEditor">
              投稿
            </v-btn>
          </h2>

          <p class="pa-2">
            <span class="red--text"></span>
          </p>

          <v-card class="mx-1 my-2 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
              <p
                class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
              >
                <v-icon color="light-blue" class="mr-2"
                  >mdi-eye-lock-outline</v-icon
                >公開範囲
              </p>
              <v-spacer></v-spacer>
              <a class="mx-0 my-2 pa-0 text-body-2">公開範囲とは？</a>
            </v-card-title>
            <v-row class="pa-2">
              <v-col cols="4" class=""
                ><v-card
                  ><v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h5 mb-1">
                        公開
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >インターネット上の誰でも閲覧出来ます。</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80"
                      ><v-icon size="60" color="amber"
                        >mdi-earth</v-icon
                      ></v-list-item-avatar
                    >
                  </v-list-item>
                </v-card></v-col
              >
              <v-col cols="4" class=""
                ><v-card
                  ><v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h5 mb-1">
                        生徒と保護者
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >学校から配布される生徒と保護者アカウントでログインした人のみ閲覧できます</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80"
                      ><v-icon size="60" color="amber"
                        >mdi-account-group-outline</v-icon
                      ></v-list-item-avatar
                    >
                  </v-list-item>
                </v-card></v-col
              >
              <v-col cols="4" class=""
                ><v-card
                  ><v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h5 mb-1">
                        生徒のみ
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >学校から配布される生徒アカウントでログインした人のみ閲覧できます</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80"
                      ><v-icon size="60" color="amber"
                        >mdi-lock-outline</v-icon
                      ></v-list-item-avatar
                    >
                  </v-list-item>
                </v-card></v-col
              >
            </v-row>
          </v-card>

          <v-card class="mx-1 my-2 px-2 py-2" elevation="1">
            <v-card-title class="ma-0 pa-0">
              <p
                class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
              >
                <v-icon color="light-blue" class="mr-2"
                  >mdi-note-edit-outline</v-icon
                >
                投稿本文
              </p>
              <v-spacer></v-spacer>
              <a class="mx-0 my-2 pa-0 text-body-2">投稿の作成方法</a>
            </v-card-title>
            <!-- cf https://qiita.com/teracy164/items/34831d83094cdb6cb3dd -->
            <quill-editor v-model="editor" height="500px" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Event, Group, GroupEdit, Tag } from '~/types/quaint'
type Data = {
  tags: Tag[]
  group: Group | undefined
  events: Event[]

  groupEdit: GroupEdit

  userGroups: { admin: string; owner: string }
  hostname: string
  editor: string
}

export default Vue.extend({
  name: 'NewPost',
  async asyncData({ params, $axios, payload }): Promise<Partial<Data>> {
    let group
    let tags
    let events
    if (payload !== undefined) {
      group = payload.group
      tags = payload.tags
      events = await $axios.$get('/groups/' + params.groupId + '/events')
    } else {
      const res = await Promise.all([
        $axios.$get('/tags'),
        $axios.$get('/groups/' + params.groupId),
        $axios.$get('/groups/' + params.groupId + '/events'),
      ])
      tags = res[0]
      group = res[1]
      events = res[2]
    }
    const { id, enable_vote, groupname, ...groupEdit } = group as Group
    return {
      tags,
      group,
      events,
      groupEdit,
    }
  },
  data(): Data {
    return {
      tags: [],
      group: undefined,
      events: [],
      groupEdit: {},
      userGroups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
      },
      hostname: '',
      editor: '',
    }
  },
  head() {
    return {
      title: this.group?.groupname + ' - 新規投稿',
    }
  },
  async created() {
    this.hostname = location.host // data()のreturn()内で使うとエラーになるのでここで代入
    if (
      !(this.$auth.user?.groups as string[]).includes(this.userGroups.admin)
    ) {
      if (
        (this.$auth.user?.groups as string[]).includes(this.userGroups.owner)
      ) {
        if (
          !(
            (await this.$axios.$get('/users/me/owner_of')) as string[]
          ).includes(this.$route.params.groupId)
        ) {
          this.$nuxt.error({ statusCode: 404, message: 'Not Found' })
        }
      } else {
        this.$nuxt.error({ statusCode: 404, message: 'Not Found' })
      }
    }
  },
  methods: {
    PrintEditor() {
      console.log(this.editor)
    },
  },
})
</script>
