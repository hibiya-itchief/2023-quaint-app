<template>
  <v-app>
    <v-container>
      <h1 id="title">ヘルプ</h1>
      <v-row justify="center">
        <v-col cols="12">
          <div style="border-left: 5px solid #b49656; padding: 2px 8px">
            <h2>
              オンライン整理券の<br />
              使い方ガイド
            </h2>
            <br />

            <div>
              <v-card flat :ripple="false" @click="g1 = !g1">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>ログインの方法</h3>
                </div>
              </v-card>
              <p v-show="g1" class="pl-5 pt-2 fade-in">
                画面左上の<span style="color: #b49656"> ≡ </span
                >（三本線のメニュー）をタップし、「ログイン」をタップするとログイン画面が表示されます。ご自身のアカウント名とパスワードを入力してください。<br />
                <br />
                【生徒の方へ】<br />
                学校のアカウント(〜@metro.ed.jpで終わるアカウント)を使ってログインしてください。<br />
                <br />
                【保護者の方へ】<br />
                各ご家庭にアカウントを2つ配布しています。一方のアカウントで取得した整理券はもう一方のアカウントには反映されません。別のアカウントとして区別して利用するようお願いいたします。<br />
                <br />
                【一般の方へ】<br />
                <span style="font-weight: bold; color: #b49656"
                  >今年度はオンライン整理券をご利用いただけません</span
                >。つきましては、当サイトはログインをせずにご利用ください。観劇の際には体育棟にて配布している紙の整理券をご利用ください。<br />
                詳しくは<NuxtLink to="/system">整理券制度</NuxtLink
                >のページをご覧ください。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="g2 = !g2">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>｢探す｣ページの使い方</h3>
                </div>
              </v-card>
              <p v-show="g2" class="pl-5 pt-2 fade-in">
                ｢探す｣ページでは、全クラス劇、Hebe、部活動、外部団体が紹介されています。<br />
                <br />
                ・ページ上部の検索ボックスに、劇名や説明文に含まれる語句を入力すると、該当する団体のみ表示されます。<br />
                ・検索ボックス下の各ボタンで、タグによる絞り込み、並び順の変更、昇順・降順の切り替えができます。<br />
                ・旗マークを選択するとブックマークした団体のみを表示します。ブックマークは各団体の詳細ページ内の旗マークをタップすると登録できます。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="g3 = !g3">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>整理券取得の方法</h3>
                </div>
              </v-card>
              <p v-show="g3" class="pl-5 pt-2 fade-in">
                【生徒、保護者の方】<br />
                配布されているアカウントでログインしてください。 <br />
                下のバーの｢探す｣ページの中から観劇したい劇をタップし、表示されている公演を選択すると確認の画面が表示されます。よく確認してから｢はい｣を押してください。<br />
                その後｢整理券｣ページに該当の整理券が表示されていれば取得できています。整理券取得後は必ずご確認ください。<br />
                (ここに｢配布中｣などの表示の説明を入れたい) 詳しくは<NuxtLink
                  to="/system"
                  >整理券制度</NuxtLink
                >のページをご覧ください。<br />
                <br />
                【一般の方】<br />
                <span style="font-weight: bold; color: #b49656"
                  >今年度はオンライン整理券をご利用いただけません</span
                >。観劇の際には体育棟にて配布している紙の整理券をご利用ください。<br />
                詳しくは<NuxtLink to="/system">整理券制度</NuxtLink
                >のページをご覧ください。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="g4 = !g4">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>一度取得した整理券をキャンセルしたい</h3>
                </div>
              </v-card>
              <p v-show="g4" class="pl-5 pt-2 fade-in">
                サイト下部の「整理券」を押すと、取得している整理券の一覧が表示されます。<br />
                該当するチケットをタップすると「キャンセル」ボタンが出てきますので、タップしていただくとキャンセルができます。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="g5 = !g5">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>クラス劇の投票の方法</h3>
                </div>
              </v-card>
              <p v-show="g5" class="pl-5 pt-2 fade-in">
                【生徒、保護者の方へ】<br />
                投票は当サイトにて行います。<br />
                システムは現在調整中です。詳細は後日更新いたします。<br />
                <br />
                【一般の方へ】<br />
                観劇の際に使用した紙整理券が投票券となります。詳しくは当日配布のパンフレットをご覧下さい。<br />
                <br />
                ※ クラTコンテストの投票には当サイトではなく Google Forms
                を利用します。校内のクラT展示場所に設置しているQRコードを読み取ってください。
              </p>
              <v-divider />
            </div>
          </div>
          <div
            class="my-10"
            style="border-left: 5px solid #b49656; padding: 2px 8px"
          >
            <h2>よくあるトラブル、質問</h2>

            <div>
              <v-card flat :ripple="false" @click="q1 = !q1">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>アカウント名/パスワードを忘れた</h3>
                </div>
              </v-card>
              <p v-show="q1" class="pl-5 pt-2 fade-in">
                IT委員が個別で対応いたしますので、お手数ですが2F大職員室横のIT質問ブースまでお越しください。<br />
                第1公演の整理券配布開始の10分前から第5公演終了の10分後まで受け付けております。<br />
                <!--<NuxtLink to="/map">校内マップ</NuxtLink><br />-->
                <NuxtLink to="/schedule">配布スケジュール</NuxtLink><br />
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q2 = !q2">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>ログインしているかどうか確認したい</h3>
                </div>
              </v-card>
              <p v-show="q2" class="pl-5 pt-2 fade-in">
                画面左上の<span style="color: #b49656"> ≡ </span
                >(三本線のメニュー)をタップしてください。<br />
                ログイン中であればアカウント名が表示されます。<br />
                <v-img
                  class="img"
                  max-width="300"
                  src="/images/helpLogin.png"
                  alt="ログイン時の表示"
                />
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q3 = !q3">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>ログインしているのに整理券が取れない</h3>
                </div>
              </v-card>
              <p v-show="q3" class="pl-5 pt-2 fade-in">
                整理券は公演ごとに配布時間が決まっています。配布時間外に整理券を取ることはできません。<br />
                また、既に取得している整理券と同じ時間の整理券を取る事はできません。<br />
                <br />
                詳しくは<NuxtLink to="/system">整理券制度</NuxtLink
                >のページをご覧ください
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q4 = !q4">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>「探す」ページで劇の一覧が表示されない</h3>
                </div>
              </v-card>
              <p v-show="q4" class="pl-5 pt-2 fade-in">
                ブックマークだけを表示する設定になっている可能性があります。<br />
                ページ上部の旗のマークに色がついていないことを確認してください。<br />
                <v-img
                  class="img"
                  max-width="300"
                  src="/images/helpBookmark.png"
                  alt="ブックマーク表示時の画像"
                />
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q5 = !q5">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>ページが表示されない、重くて動かない</h3>
                </div>
              </v-card>
              <p v-show="q5" class="pl-5 pt-2 fade-in">
                お使いの端末で通信の速度制限がかかっている場合、読み込みが遅くなる場合があります。ご了承ください。<br />
                <br />
                また、人が密集しているとその付近のモバイルデータ通信の回線が混み合う可能性があります。屋外、もしくは窓や建物入口の付近では繋がりやすくなることがありますので場所を変えてお試しください。<br />
                <br />
                他にも、お使いの端末の設定から3Gに切り替えていただくと繋がりやすくなることがありますのでお試しください。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q6 = !q6">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>校内マップがよく分からない</h3>
                </div>
              </v-card>
              <p v-show="q6" class="pl-5 pt-2 fade-in">
                お近くの日比谷生にお声がけください。<br />
                <br />
                また、<NuxtLink to="/map">校内マップ</NuxtLink
                >のページもご覧ください。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q7 = !q7">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>取得したはずの整理券が表示されない</h3>
                </div>
              </v-card>
              <p v-show="q7" class="pl-5 pt-2 fade-in">
                自分がログインしているかどうかご確認ください。<br />
                ログインしていない場合、整理券は表示されません。<br />
                ログインしていても整理券が表示されない場合は、整理券が取得できていませんのでもう一度お試しください。<br />
                <br />
                【保護者の方へ】<br />
                配布している2つのアカウントのうち一方のアカウントで取得した整理券は、もう一方のアカウントには反映されません。<br />
                両方のアカウントにログインしてお確かめください。<br />
                詳しくは<NuxtLink to="/system">整理券制度</NuxtLink
                >のページをご覧ください。
              </p>
              <v-divider />
            </div>

            <div>
              <v-card flat :ripple="false" @click="q8 = !q8">
                <div class="pa-5 questions-box">
                  <v-icon large color="sairai">mdi-exclamation-thick</v-icon>
                  <h3>このページを見ても解決しなかったトラブルや質問がある</h3>
                </div>
              </v-card>
              <p v-show="q8" class="pl-5 pt-2 fade-in">
                そのような場合は、2F大職員室横のIT質問ブースまでお越しください。<br />
                第1公演の整理券配布開始の10分前から第5公演終了の10分後まで受け付けております。<br />
                <!--<NuxtLink to="/map">校内マップ</NuxtLink><br />-->
                <NuxtLink to="/schedule">配布スケジュール</NuxtLink>
              </p>
              <v-divider />
            </div>
          </div>

          <h3 class="my-10">
            オンライン整理券システム・当サイトに関して、<br />
            IT委員に相談したいことがある場合は2F大職員室横のIT質問ブースまでお越しください。<br />
            第1公演の整理券配布開始の10分前から第5公演終了の10分後まで受け付けております。<br />
            <!--<NuxtLink to="/map">校内マップ</NuxtLink><br />-->
            <NuxtLink to="/schedule">配布スケジュール</NuxtLink>
          </h3>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HelpPage',
  auth: false,
  data() {
    return {
      g1: false,
      g2: false,
      g3: false,
      g4: false,
      g5: false,
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
      q6: false,
      q7: false,
      q8: false,
    }
  },
  head: {
    title: 'ヘルプ',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

h3 {
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

.questions-box {
  display: flex;
  justify-content: start;
  align-items: center;
}

.questions-mark {
  font-weight: bold;
  color: #b49656;
}

.fade-in {
  animation-name: fade-in-name;
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes fade-in-name {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.img {
  border: 9px solid #b49656;
}
</style>
