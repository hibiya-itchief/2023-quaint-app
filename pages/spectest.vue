<template>
  <v-app>
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
        
          <h2   align="center"    class="text-h5 ma-3">   負荷テスト   </h2>
          <p    align="center"    class="text-caption">   指示があるまではどのボタンも押さないでください   </p>
          <v-divider class="my-3"></v-divider>
          
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="loginB2c()">    ボタン１    </v-btn>
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="loginB2c()">		ボタン２		</v-btn>
					<v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="loginB2c()">    ボタン３    </v-btn>
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="loginB2c()">		ボタン４    </v-btn>
					<v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="loginB2c()">    ボタン５    </v-btn>
          <v-btn		class="light-blue darken-4 my-8"		block		rounded="xl"		dark		@click="loginB2c()">		ボタン６    </v-btn>
          <p align="center" class="text-caption">   IT委員会   </p>
          
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
  },
})
</script>
