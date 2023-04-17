<template>
  <v-app>
    <h1>星陵祭2023トップページ</h1>
    <p>
      このサイトは現在開発中です(公開までにはもっとかっこいいトップページを作りましょう)。バグの発見や機能の改善のために、とにかくいろいろな部分を触ってたくさん試してもらえたらと思います。
    </p>
    <p>
      現在実装されているメインの機能は<NuxtLink to="/groups">探す</NuxtLink
      >、<NuxtLink to="/tickets">整理券</NuxtLink>になります
    </p>
    <p>
      使い方に関してはドキュメントを作成予定です。これからIT委員会で分担して作るので、それができるまでは手当たり次第にいろいろ試してみてください。データは去年の物を使用しておりバックアップも取った開発用の環境なので何をしても大丈夫です。
    </p>
    <p>
      フィードバックは、<a href="https://github.com/hibiya-itchief/quaint-app"
        >GitHub</a
      >のissue、もしくは<a href="https://forms.gle/aRv81UtSCSgS2gHq8"
        >Google フォーム</a
      >に気軽にお寄せください。感想だけでも書いてくださるとすごく喜びます。IT委員会Discordに入っている方はDiscordだと反応早いかもです。
    </p>
    <p>
      本番はスペックを積んだサーバーを使う予定ですが、開発環境なので無料のサーバーを使っています。1日に1回くらいの頻度でリセットが入り、接続できるまで1分ほどかかることがあります。
    </p>
    <h2>トップページに載せる内容の構想(他にも提案おねがいします。)</h2>
    <p>今年度の星陵祭のテーマ(2022なら童話)</p>
    <p>校長先生やチーフ委員長の挨拶</p>
    <p>各クラスページへのリンク</p>
    <p>学校へのアクセス(今年は一般の方も来るので)</p>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
  auth: false,
})
</script>
