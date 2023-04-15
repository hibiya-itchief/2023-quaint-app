<template>
  <v-app>
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
        
          <h2   align="center"    class="text-h5 ma-3">   負荷テスト   </h2>
          <p    align="center"    class="text-subtitle-1">   指示があるまではどのボタンも押さないでください   </p>
          <v-divider class="my-3"></v-divider>
          
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="spectestBtn1">    ボタン１    </v-btn>
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="spectestBtn2">		ボタン２    </v-btn>
					<v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"				@click="spectestBtn3">    ボタン３    </v-btn>
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"				@click="spectestBtn4">		ボタン４    </v-btn>
					<v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="spectestBtn5">    ボタン５    </v-btn>
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="spectestBtn6">		ボタン６    </v-btn>
          <p align="center" class="text-subtitle-1">   IT委員会   </p>
          
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  auth: false,
  mounted() {},
  methods: {
    loginB2c() {
      this.$auth.loginWith('b2c')
    },
    loginAd() {
      this.$auth.loginWith('ad')
    },
    spectestBtn1()    {console.log("整理券を1人1枚取得")}
    spectestBtn2()    {console.log("整理券を1人1枚取得し、リアルタイム混雑状況も確認")}
    spectestBtn3()    {console.log("整理券を1人1枚取得し、混雑状況も確認、APIの/groupsのエンドポイントも呼ぶ")}
    spectestBtn4()    {console.log("1端末から3人分の負荷をかける")}
    spectestBtn5()    {console.log("1端末から5人分の負荷をかける")}
    spectestBtn6()    {console.log("1端末から10人分の負荷をかける")}
  },
})
</script>
