<template>
  <div class="d-flex">
    <vi-navigation v-if="isUserAuthenticated"/>
    <router-view/>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import ViNavigation from '@/components/generic/ViNavigation';

const { state, commit } = useStore()

const isUserAuthenticated = computed(() => state.auth.isUserAuthenticated)

onBeforeMount(() => {
  if (!isUserAuthenticated.value) {
    if (localStorage.getItem('user')) {
      commit('setUser', JSON.parse(localStorage.getItem('user')))
    }
  }
})
</script>
