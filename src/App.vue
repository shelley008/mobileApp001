<template>
  <div id="app">
    <router-view/>
    
    <!-- 通用底部 -->
    <!-- <footer-global></footer-global> -->
  </div>
</template>




<script>
import FooterGlobal from '@/components/footer'


export default {
  name: 'App',
  components:{
    FooterGlobal
  }
}
</script>
