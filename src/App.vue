<template>
  <RouterView />
  <NavBar v-if="state.isShowNav" />
</template>

<script setup>
import { reactive } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
const router = useRouter()
const needNavList = ['home','category','cart','user'] //需要导航的页面
const state = reactive({
  isShowNav:true
})

router.beforeEach((to, from) => {
  if(needNavList.includes(to.name)) {
    state.isShowNav = true
  } else {
    state.isShowNav = false
  }
})
</script>
<style lang="less">
@import './common/style/mixin';
</style>

<style lang="less">
html, body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>