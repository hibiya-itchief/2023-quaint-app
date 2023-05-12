<template>
    <h1>ログインしています...</h1>
  </template>
  <script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    created(){
        if( this.$route.query.error !== undefined){
            this.$router.push(`/login?error=loginerror`)
    }
    }
  })
  </script>
  
