<template>
  <v-app>
    <v-container>
      <h1 id="title">整理券制度</h1>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="6">
          <h2>保護者の皆様</h2>
          <br />
          <p>①保護者優先権</p>
          <v-col cols="11.5" style="margin-left: auto; margin-right: 0">
            <p>
              事前に配布した家族用優先券を利用して、お子様のクラス劇を優先的に見ることができます。ただし、事前アンケートにより、優先券は
              1枚につき1公演のみの観劇となります。指定された公演の際にお持ちいただき、クラスの受付係にご提示ください。<br />
              【注意点】<br />
              ・優先券を利用しての投票はできませんのでご了承ください。<br />
              ・忘れたり、失くしたりした場合は、クラス劇を観られない可能性があります。
            </p>
          </v-col>
          <p>②オンライン整理券</p>
          <v-col cols="11.5" style="margin-left: auto; margin-right: 0">
            <p>
              事前に配布した保護者用アカウントを利用してのオンライン上での整理券取得ができます。1家庭につき保護者用アカウント2個を配布しております。1個につき3枚まで取得が可能です。ただし取得できるのは当日のみです。各公演の整理券が取得できる時間帯は、紙整理券と同じ時間帯なので、詳しい時間帯はパンフレットをご覧ください。<br />
              【注意点】<br />
              ・オンライン整理券は先着順です。取れない可能性がございますので、ご了承ください。<br />
              ・オンライン上での投票が可能です。観劇したクラスのうち最も良かったものを各学年につき1クラス投票してください。
            </p>
          </v-col>
          <p>③紙整理券</p>
          <v-col cols="11.5" style="margin-left: auto; margin-right: 0">
            <p>
              当日、一般来場者と同じように体育棟内に並ぶことで、整理券を取得できます。詳しくはパンフレットをご覧ください。
            </p>
          </v-col>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <h2>一般の皆様</h2>
          <br />
          <p>〇紙整理券</p>
          <v-col cols="11.5" style="margin-left: auto; margin-right: 0">
            <p>
              当日、体育棟内に並ぶことで、整理券を取得できます。詳しくはパンフレットをご覧ください。<br />
              【注意点】<br />
              ・体育棟内では、ブルーシート保護のため、ハイヒールをお履きの方は、チーフ会員が配布しているスリッパにお履き替え下さい。また、出口で回収も行っています。<br />
              ・整理券は無くなり次第、配布終了です。<br />
              ・一度にお渡しできる整理券はおひとり様1枚のみなので、必ず観劇された方全員でお並びください。代理の方が受け取ることも出来ません。<br />
              ・整理券を紛失した場合の再発行は致しかねますのでご了承ください。<br />
              ・取得の際、長蛇の列ができる可能性が大いにあります。ご了承ください。
            </p>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AboutPage',
  auth: false,
  head: {
    title: '整理券制度',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

#title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #b49656;
  font-family: serif;
  font-weight: bold;
}
</style>
