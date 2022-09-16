<template>
  <v-app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-title>【重要なお知らせ】生徒用整理券は紙で配布します</v-card-title>
              <v-card-subtitle>2022/09/17 0:00更新</v-card-subtitle>
              <v-card-text>新しい試みであったオンライン整理券ですが，技術上の理由から運用は困難と判断し，今年度の星陵祭における生徒の観劇では全クラス紙の整理券を使用します。保護者用整理券に変更はありません。詳細は以下の通りです。</v-card-text>
            </v-card>
            <v-col></v-col>
            <v-card>
            <v-card-title>【生徒用・紙の整理券配布について】</v-card-title> 
            <v-card-title>● スケジュール(整理券配布時間)</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        公演\日付
                      </th>
                      <th class="text-left">
                        9/17（土）
                      </th>
                      <th class="text-left">
                          9/18（日）
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="i in schedule"
                    >
                      <td>第{{i.timetable}}公演</td>
                      <td>{{ i.dayOne }}</td>
                      <td>{{ i.dayTwo }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-title>● 配布場所</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        配布対象クラス
                      </th>
                      <th class="text-left">
                        配布場所
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11~14R・21~24R・31~34R</td>
                      <td>理科ホール（1階:地学室前）</td>
                    </tr>
                    <tr>
                      <td>15~18R・25~28R・35~38R</td>
                      <td>社会科ホール（3階:社会科職員室隣）</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-title>● 注意点</v-card-title>
            <v-card-text>
              ・先着順ですが、校内で慌てて行動すると大変危険ですので落ち着いて受け取りに来てください。<br>
              ・三年生の公演では保護者が各家庭２名まで来校されるので、生徒席が少ない分、整理券配布枚数も少なくなります。あらかじめご了承ください。
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-title>● 受付の方へ</v-card-title>
            <v-card-text>整理券サイトの運用の際にお伝えしたQRコードは一律中止、紙の整理券を見せてもらってから入場させるようにお願いします。</v-card-text>
            <v-spacer></v-spacer>
            <v-card-title>● 最後に</v-card-title>
            <v-card-text>
              この整理券サイトには至らぬ点も多くありました。しかし，本年度の経験，そして皆様からいただいたご意見は大切に受け止め，最大限に活かして参ります。これまでいただいた皆様のご協力に感謝します。
              これからも「みんなの使いやすい」を実現すべく，我々は善処して参ります。これからのIT部隊の活動に，ご理解・ご協力，並びにご期待をいただけると幸せます。<br>
              星陵祭，オンライン配信，後夜祭，片付け，全て楽しんでいきましょう！
            </v-card-text>
            <v-card-text>
              星陵祭IT部隊
            </v-card-text>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>

<script>
  export default {
  name: 'ByeBye,Quaint',
  auth:false,
  data(){
    return {
      schedule:[
        {
          timetable: 1,
          dayOne: '配布なし',
          dayTwo: '8:00-8:40'
        },
        {
          timetable: 2,
          dayOne: '配布なし',
          dayTwo: '8:00-9:50'
        },
        {
          timetable: 3,
          dayOne: '9:40-11:00',
          dayTwo: '9:40-11:00'
        },
        {
          timetable: 4,
          dayOne: '10:50-12:35',
          dayTwo: '10:50-12:35'
        },
        {
          timetable: 6,
          dayOne: '13:35-14:55',
          dayTwo: '13:35-14:55'
        }
      ],
    }
  }
}
</script>