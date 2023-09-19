<template>
  <canvas id="countdowncanvas" height="1022" width="728"></canvas>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    const canvas = document.getElementById('countdowncanvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = '/images/countdown.jpg'
    const yay = new Date('2024-09-14T00:00:00+09:00')
    const diff = Math.ceil(
      (yay.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ) // ミリ秒を日に変換
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      ctx.font = 'bold 160px serif'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.fillText(diff, 225, 345)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#666'
      ctx.strokeText(diff, 225, 345)
    }
  },
})
</script>
