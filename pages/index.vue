<template>
  <v-carousel v-model="model">
    <v-carousel-item
      v-for="slide in slides"
      :key="slide"
    >
      <p>{{id}}</p>
      <v-img :src='"/home/slide"+slide.id+".png"' :alt="slide.alt" width="100%" height="100%">
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'IndexPage',
  auth:false,
  data: () => ({
      model: 0,
      slides: [
      { id:1, alt: "星陵祭メインビジュアル"},
      { id:2, alt: "星陵祭紹介とは？"},
      { id:3, alt: "今年度のテーマは'童話'"}
      ],
    })
}
</script>
