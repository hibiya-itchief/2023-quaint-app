<template>
  <v-app>
    <h1>管理者用画面</h1>
    <p>
      一応現段階でも<a :href="apiUrl + 'docs'">{{ apiUrl }}docs</a
      >にアクセスするとすべての機能にアクセスできるが、使いづらい
    </p>
    <h2>この画面でできるようにしたいこと</h2>
    <p>新規団体の追加</p>
    <p>ユーザーの権限管理</p>
    <p>
      チーフ会やIT委員会が、複数の団体の複数の公演を条件に合わせて一括で処理できるようにする。例)全クラスの第一公演の開始時刻を一括で15分遅らせる
    </p>
    <p>チーフ会・IT委員会のみが確認できる情報にアクセスする。例)投票数</p>

    <v-btn color="primary" @click="updateFrontend"
      >フロントエンドをビルドして最新の状態に更新</v-btn
    >
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      apiUrl: process.env.BASEURL,
    }
  },
  methods: {
    async updateFrontend() {
      await this.$axios.$post('/admin/update_frontend')
    },
  },
}
</script>
