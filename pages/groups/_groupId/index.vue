<template>
<h1>{{groupId}}</h1>
</template>
<script>
export default {
  name: 'IndexPage',
  data(){
    return{
        groupId:this.$route.params.groupId
    }
  }
}
</script>
