<template>
  <v-app>
      <h1>
          <v-icon>mdi-magnify</v-icon>
          探す
      </h1>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-chip-group
              active-class="primary--text"
              column
              mandatory
            >
              <v-chip 
                @click="selectedTag=''"
                filter
              >
                すべて
              </v-chip>
              <v-chip
                v-for="tag in tags"
                @click="selectedTag=tag"
                filter
              >
                {{ tag.tagname }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col
          cols="12"
          md="4"
          sm="6"
          class="my-1"
          v-for="group in groups"
          v-show="filterGroups(group)"
          >
            <!-- <class="d-flex flex-column">で，「もっと見る」が常に最下部に -->
            <v-card height="100%"  class="d-flex flex-column" v-bind:to="'/groups/' + group.id">
              <v-img
                height="180px"
                v-bind:src="group.thumbnail_image_url"
                v-bind:class="HashColor(group.id)"
              ></v-img>
              <v-card-title>{{group.title}}/{{group.groupname}}</v-card-title>
              <v-card-text>{{group.description}}</v-card-text>
              <v-card-actions>
                <v-chip-group column>
                  <v-chip v-for="tag in group.tags" disabled>
                    {{tag.tagname}}
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
  name: 'IndexPage',
  auth:false,
  data(){
    return {
      tags:[],
      groups:[],
      selectedTag:""
    }
  },

  async asyncData({error,$axios}){
  let res_tags;
  let res_groups;
  await $axios.get("/tags/")
  .then(function (response) {
    res_tags=response.data
  })
  .catch((e => {
      error({ statusCode:404,message: e.message })
  }))
  
  await $axios.get("/groups/")
  .then(function (response) {
    res_groups=response.data
  })
  .catch((e => {
      error({ statusCode:404,message: e.message })
  }))

  //各groupが有しているtagをAPIから取得し，groups配列の中のオブジェクトに"tags"というキーを設けてgroupsとtagsの情報を結びつけている。
  for (var i = 0; i < res_groups.length; i++){
    await $axios.get("/groups/"+res_groups[i].id+"/tags")
    .then(function (response) {
      res_groups[i].tags=response.data
    })
    .catch((e => {
        error({ statusCode:404,message: e.message })
    }))
  }
  
  return {tags:res_tags,groups:res_groups}
  },


  methods:{
    filterGroups(group){
      if (this.selectedTag==='' || group.tags.some(i => i.id === this.selectedTag.id)){
        return true;
      //tag全体（{id:hogehoge, tagname:honyohonyo}の形）を用いると，tagが一致している判定がうまく行えなかったので，idを用いてtagの一致を判定している
      }else{
      return false;
      }
    },
    HashColor(text){//group.idを色数で割った余りでデフォルトの色を決定
      const colors=["blue-grey","brown","deep-orange","amber","lime","light-green","teal","cyan","light-blue","indigo","pink"]
      let index=0;
      for (let i = 0; i < text.length; i++) {//文字列をUnicodeの和に変換
        index+=text.codePointAt(i)
      }
      index=index%colors.length
      return colors[index]
    }
  }
}
</script>

