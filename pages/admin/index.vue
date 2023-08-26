<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <h1>管理者用画面</h1>
        <h3>
          <a :href="apiUrl + 'docs'">{{ apiUrl }}docs</a>
        </h3>
        <p>quaint-apiのAPIドキュメント、およびSwagger-ui</p>
        <h3>
          <a
            href="https://analytics.google.com/analytics/web/?authuser=1#/p332029403/reports/reportinghub"
            >Google Analytics</a
          >
        </h3>
        <p>
          サイトのアクセス解析。Googleアカウントでログインすると、アクセス解析が見れるようになります。
        </p>
        <h3>
          <a href="https://portal.azure.com/signin/index/@seiryofes.com"
            >Azure ディレクトリ - @seiryofes.com(Azure AD)</a
          >
        </h3>
        <p>
          quaintのユーザーを管理しているAzure
          ADのディレクトリ。学校から配布されているアカウントをインポートして用いたり、IT委員会側から配布するアカウントを管理したりしている。
        </p>
        <h3>
          <a
            href="https://portal.azure.com/signin/index/@seiryofesb2c.onmicrosoft.com"
            >Azure ディレクトリ - @seiryofesb2c.onmicrosoft.com(Azure B2C)</a
          >
        </h3>
        <p>
          quaintのユーザーを管理しているAzure
          B2Cのディレクトリ。一般客が自分のメールアドレスでサインアップするアカウントを管理している。
        </p>

        <v-btn color="primary" @click="updateFrontend"
          >フロントエンドをビルドして最新の状態に更新</v-btn
        >
      </v-col>
    </v-row>
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
