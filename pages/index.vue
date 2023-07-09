<template>
  <v-app>
    <div id="main">
      <h1 class="js-resize-text top-title">
        seiryofes<span class="dot">.</span>com
      </h1>
      <p class="coming-soon">coming soon...</p>
      <a href="https://github.com/hibiya-itchief"
        ><ion-icon name="logo-github"></ion-icon
      ></a>
      <a href="https://forms.gle/aRv81UtSCSgS2gHq8" class="feedback"
        >フィードバック(Googleフォーム)</a
      >
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
  auth: false,
  head: {
    title: '星陵祭2023',
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,100&display=swap',
      },
    ],
    meta: [
      name: "google-site-verification",
      content: "kWJ2xUbgwAHnCg34_SgnJlN3oUPoUUpIlGf-9oEYFqA",
    ],
    script: [
      {
        type: 'module',
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
      },
      {
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
      },
    ],
  },
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: auto;
  width: 100%;
  height: 100vh;
}

.top-title {
  font-family: 'Bebas Neue', cursive;
  font-size: 15vw;
  color: #0b3142;
  display: block;
  text-align: center;
  margin: 0;
  padding: 0;
}

.dot {
  color: #f6bd60;
}

.coming-soon {
  display: block;
  margin: 0;
  padding: 0;
  font-size: 7vw;
  font-family: 'Josefin Sans', sans-serif;
}

.feedback {
  display: block;
  font-size: 11px;
  margin-top: 50px;
}

ion-icon {
  display: block;
  margin: 3vw 0;
  font-size: 4vw;
  text-decoration: none;
  color: #000;
}
</style>
