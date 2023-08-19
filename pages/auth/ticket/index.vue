<template>
  <v-app>
    <v-container>
      <div justify="center">
        <div>
          <v-btn
            v-if="!readCode"
            elevation="0"
            class="mb-6 mt-3"
            @click="openCodeReader"
            >QR コードを読み取る</v-btn
          >
        </div>
        <div v-if="readCode">
          <v-alert v-if="error != ''" dense type="error">
            {{ error }}
          </v-alert>
          <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>

        <div v-if="!readCode">
          <v-divider></v-divider>
          <v-subheader>操作可能なチケットリスト</v-subheader>
          <v-list-item v-for="(event, i) in events" :key="event.id">
            <v-list-item-content
              >{{ event.group_name }} -
              {{ event.event_name }}</v-list-item-content
            >
            <v-list-item-action>
              <v-btn
                :disabled="event.is_used"
                elevation="0"
                color="primary"
                small
                @click="selected_item = i"
                @click.stop="dialog = true"
                >使用済みにする</v-btn
              >
            </v-list-item-action>
          </v-list-item>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="text-h5"
                >{{
                  selected_item
                }}を使用済みにしてもよろしいですか？</v-card-title
              >
              <v-card-text>このアクションは取り消せません</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">キャンセル</v-btn>
                <v-btn
                  color="primary"
                  :loading="use_ticket_loading"
                  text
                  @click="useTicket(selected_item)"
                  >使用済みにする</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'QRCodeReader',
  auth: false,
  data() {
    return {
      readCode: false,
      jwt: '',
      error: '',
      events: [],
      dialog: false,
      selected_item: 0,
      use_ticket_loading: false,
    }
  },
  methods: {
    openCodeReader() {
      this.readCode = true
    },
    onDecode(decodeResult) {
      this.jwt = decodeResult
      this.readCode = false
      this.events = []
      for (let i = 0; i < 4 + Math.floor(Math.random() * 3); i++) {
        this.events.push({
          event_id: 'event_id' + String(i),
          event_name: '第 ' + String(Math.floor(Math.random() * 4)) + ' 公演',
          owner_id: 'owner_id',
          is_family_ticket: false,
          person: 1,
          id: 'id' + String(i),
          group_id: 'group_id' + String(i),
          group_name: String(11 + Math.floor(Math.random() * 27)) + 'R',
          created_at: '2022-08-11T08:20:58.1167',
          is_used: Math.random() > 0.5,
        })
      }
      /* $axios.post("/auth/ticket", {jwt: decodeResult})
        .then((result) => {
          this.events = result.data
        })
        .catch((e => {
          error({ message: e.message })
        })) */
    },
    useTicket(index) {
      this.events[index].is_used = true
      this.use_ticket_loading = true

      // axios demo
      setTimeout(() => {
        this.dialog = false
        this.use_ticket_loading = false
      }, '1000')
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
}
</script>

<style>
.group-title {
  height: 1.3em;
  padding: auto 0;
}

.group-description {
  clear: both;
  height: 100px;
}
</style>
