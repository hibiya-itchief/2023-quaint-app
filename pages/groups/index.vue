<template>
<v-app>
  <v-card
    class="mx-auto"
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
</v-app>
</template>

<script>
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:8000';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
