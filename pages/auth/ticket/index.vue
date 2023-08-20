<template>
  <v-app>
    <v-container>
      <div justify="center">
        <div class="qrcode-container" :class="status">
          <v-alert v-if="error != ''" dense type="error">
            {{ error }}
          </v-alert>
          <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>

        <div>
          <v-divider></v-divider>
          <v-switch
            v-model="without_confirm"
            inset
            label="読み込まれたら自動で使用済みにする(毎回手動で「使用済みにする」ボタンを押す必要が無くなります)"
          ></v-switch>
          <div class="status">
            <div>
              <v-icon>mdi-qrcode-scan</v-icon>
            </div>
            <div>
              <v-icon>mdi-loading</v-icon>
            </div>
            <div>
              <v-icon>mdi-ticket-confirmation</v-icon>
            </div>
          </div>

          <v-btn
            :disabled="without_confirm"
            elevation="0"
            color="primary"
            small
            @click.stop=""
            >使用済みにする</v-btn
          >
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
type Data = {
  jwt: string
  error: string
  without_confirm: boolean
  status: 'ready' | 'scanned' | 'confirmed' | 'used'
}
export default Vue.extend({
  name: 'QRCodeReader',
  auth: false,
  data(): Data {
    return {
      jwt: '',
      error: '',
      without_confirm: false,
      status: 'ready',
    }
  },
  methods: {
    onDecode(decodeResult: string) {
      const ticket_id = decodeResult.split('/')[-1] // https://2023.seiryofes.com/tickets/{ticket_id}の形式
      if (this.without_confirm) {
        console.log(ticket_id)
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
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
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
.status {
  margin-top: 20px;
}

.qrcode-container {
  width: 90vw;
  height: 60vh;
}
</style>
