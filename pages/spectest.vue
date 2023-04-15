<template>
  <v-app>
    <h1 align="center">
      負荷テスト
    </h1>
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
          <h2 align="center" class="text-h5 ma-3">空きテナント１</h2>
          <p align="center" class="">
            空きテナント２
          </p>
          <v-divider class="my-3"></v-divider>
          <v-chip
            class="light-blue darken-4 my-3"
            block
            dark
            @click="loginB2c()"
          >
            ぼたん１
          </v-chip>
          <v-divider class="my-3"></v-divider>
          <v-chip
            class="light-blue darken-4 my-3"
            block
            dark
            @click="loginB2c()"
          >
            ぼたん２
          </v-chip>
          <v-chip
            class="light-blue darken-4 my-8"
            block
            dark
            @click="loginB2c()"
          >
            ぼたん３
          </v-chip>
          <v-divider class="my-3"></v-divider>
          <v-chip variant="elevated"
            class="light-blue darken-4 my-3"
            block
            dark
            @click="loginB2c()"
          >
            ぼたん４
          </v-chip>
          <v-divider class="my-3"></v-divider>
          <v-chip class="light-blue darken-4 my-3" block dark @click="loginAd()">
            簡単なぼたん５
          </v-chip>

          <p align="center" class="text-caption">
            事前に配布された「空きテナント６」
          </p>
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
