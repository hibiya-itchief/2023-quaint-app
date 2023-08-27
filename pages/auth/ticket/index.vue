<template>
  <v-app>
    <v-container>
      <div justify="center">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <div class="qrcode-container" :class="status">
              <v-alert v-if="error != ''" dense type="error">
                {{ error }}
              </v-alert>
              <qrcode-stream @decode="onDecode" @init="onInit" />
            </div>

            <div>
              <v-divider></v-divider>
              <div class="status">
                <v-card>
                  <v-card-title class="blue--text">
                    <v-icon color="blue">mdi-qrcode-scan</v-icon>
                    <span>準備完了</span>
                  </v-card-title>
                  <v-card-subtitle
                    >QRコードをかざして読みこんでください。</v-card-subtitle
                  >
                  <v-card-text>
                    <v-switch
                      v-model="confirm"
                      inset
                      class="my-0"
                      label="確認してから使用済みにする"
                    ></v-switch>
                  </v-card-text>
                </v-card>
                <v-card>
                  <v-card-title class="green--text">
                    <v-icon color="green">mdi-check-circle-outline</v-icon>
                    <span>有効</span>
                  </v-card-title>
                  <v-card-subtitle
                    >このQRコードは正当な整理券であることが検証出来ました。「使用済みにする」ボタンを押して入場処理を完了してください。</v-card-subtitle
                  >
                  <v-card-actions
                    ><v-btn
                      :disabled="!confirm"
                      elevation="0"
                      color="primary"
                      small
                      @click.stop=""
                      >使用済みにする</v-btn
                    ></v-card-actions
                  >
                </v-card>
                <v-card>
                  <v-card-title class="orange--text">
                    <v-icon color="orange">mdi-ticket-confirmation</v-icon>
                    <span>使用済み</span>
                  </v-card-title>
                  <v-card-subtitle
                    >この整理券を使用済みにしました。</v-card-subtitle
                  >
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Ticket } from '~/types/quaint'
type Data = {
  jwt: string
  error: string
  confirm: boolean
  status: 'ready' | 'scanned' | 'confirmed' | 'used'
  selectedTicket: Ticket | null
}
export default Vue.extend({
  name: 'QRCodeReader',
  data(): Data {
    return {
      jwt: '',
      error: '',
      confirm: true,
      status: 'ready',
      selectedTicket: null,
    }
  },
  created() {
    if (
      !(
        this.$auth.loggedIn &&
        (this.$quaintUserRole('school', this.$auth.user) ||
          this.$quaintUserRole('admin', this.$auth.user))
      )
    ) {
      this.$router.push('/login')
    }
  },
  methods: {
    onDecode(decodeResult: string) {
      const ticket_id = decodeResult.split('/')[-1] // https://2023.seiryofes.com/tickets/{ticket_id}の形式
      if (this.confirm) {
        this.$axios.$put('/tickets/' + ticket_id)
        this.status = 'confirmed'
      } else {
        this.status = 'used'
      }
      /* $axios.post("/auth/ticket", {jwt: decodeResult})
        .then((result) => {
          this.events = result.data
        })
        .catch((e => {
          error({ message: e.message })
        })) */
    },
    useTicket() {
      /* var event = this.events[index]
      var endPoint = "/groups/" + event.group_id + "/events/" + event.event_id + "/tickets/" + event.id + "is_used"
      $axios.put(endPoint, {})
        .then((result) => {
          this.events[index].is_used = true
        })
        .catch((e => {
          error({ message: e.message })
        })) */
    },
    async onInit(promise: any) {
      try {
        await promise
      } catch (error: any) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error =
            'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
          this.error = `ERROR: Camera error (${error.name})`
        }
      }
    },
  },
  /* asyncData({ params, error,$axios }) {
    return $axios.get("/groups")
      .then((res) => {
        return { groups: res.data }
      })
      //エラー処理
      .catch((e => {
        error({ message: e.message })
      }))
  } */
})
</script>

<style>
.qrcode-container {
  height: 60vh;
}
</style>
