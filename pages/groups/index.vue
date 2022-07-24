<template>
<v-app >
<v-container>
<v-layout>
<v-flex xs12 sm6 md8 lg6 xl6 >
<p>{{message}}</p>
  <v-card
    class="ma-2 justify-center"
    width="300"
    v-for="group in groups"
  >
    <v-card-text>
      <div v-for="tag in tags">
      </div>
      <p class="text-h4 text--primary">
        {{group.title}}
      </p>
      <p class="text-h5 text--primary">
        {{group.groupname}}
      </p>
      <div class="text--primary">
        {{group.description}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="light-blue accent-4"
      >
        もっと見る
      </v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</v-layout>
</v-container>
</v-app>
</template>

<script>
import axios from 'axios';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';

export default {
  name: 'IndexPage',
  asyncData({ params, error }) {
    return axios.get("http://localhost:8000/groups")
      .then((res) => {
        return { groups: res.data }
      })
      //エラー処理
      .catch((e => {
        error({ message: e.message })
      }))
  }
}
</script>
