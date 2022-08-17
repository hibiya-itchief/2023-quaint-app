<template>
<v-app >
  <v-container>
    <div justify="center">
      <div>
        <v-btn elevation="0" v-if="!readCode" @click="openCodeReader" class="mb-6 mt-3">QR コードを読み取る</v-btn>
      </div>
      <div v-if="readCode">
        <v-alert v-if="error!=''" dense type="error">
           {{ error }}
        </v-alert>
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>

      <div v-if="!readCode">
        <v-divider></v-divider>
        <v-subheader>操作可能なチケットリスト</v-subheader>
        <v-list-item v-for="(event, i) in events" :key="event.id">
          <v-list-item-content>{{ event.group_id }} - {{ event.event_id }}</v-list-item-content>
          <v-list-item-action>
            <v-btn v-bind:disabled="event.is_used" elevation="0" color="primary" small @click="useTicket(i)">使用済みにする</v-btn>
          </v-list-item-action>
        </v-list-item>
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
      events: []
    }
  },
  methods: {
    openCodeReader () {
      this.readCode = true
    },
    onDecode (decodeResult) {
      this.jwt = decodeResult
      this.readCode = false
      this.events = []
      for (let i = 0; i < 4 + Math.floor(Math.random() * 3); i++) {
        this.events.push({
          /*event_id: "event id" + String(i),*/ 
          event_id: "第 " + String(Math.floor(Math.random() * 4)) + " 公演",
          owner_id: "owner_id",
          is_family_ticket: false,
          person: 1,
          id: "id" + String(i),
          /*group_id: "groupd_id" + String(i),*/
          group_id: String(11 + Math.floor(Math.random() * 27)) + "R",
          created_at: "2022-08-11T08:20:58.1167",
          is_used: Math.random() > 0.5 ? true : false
        })
      }
      /*$axios.post("/auth/ticket", {jwt: decodeResult})
        .then((result) => {
          this.events = result.data
        })
        .catch((e => {
          error({ message: e.message })
        }))*/
    },
    useTicket (index) {
      alert('using index: ' + String(index))
      this.events[index].is_used = true
      var event = this.events[index]
      /*var endPoint = "/groups/" + event.group_id + "/events/" + event.event_id + "/tickets/" + event.id + "is_used"
      $axios.put(endPoint, {})
        .then((result) => {
          this.events[index].is_used = true
        })
        .catch((e => {
          error({ message: e.message })
        }))*/
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
  }
  /*asyncData({ params, error,$axios }) {
    return $axios.get("/groups")
      .then((res) => {
        return { groups: res.data }
      })
      //エラー処理
      .catch((e => {
        error({ message: e.message })
      }))
  }*/
}
</script>

<style>
.group-title{
  height:1.3em;
  padding:auto 0;
}
.group-description{
  clear:both;
  height:100px;
}

</style>
