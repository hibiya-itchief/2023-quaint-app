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
    const diff = 0
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
