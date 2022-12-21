<template>
  <div class="page-authentication bg-primary d-flex justify-center flex-wrap align-center w-100 h-100vh">
    <div>
      <h1 class="w-100 page-authentication__title text-xl mb-lg text-white">Vue Invoices App</h1>
      <div>
        <Transition name="slide-fade" mode="out-in">
          <div v-if="isLogin" class="page-authentication__login-box pa-xl bg-primary-contrast border-sm">
            <h2 class="text-center mb-lg text-lg text-white">Login</h2>
            <div class="page-authentication__input-wrapper d-flex flex-wrap mb-md">
              <label for="email" class="w-100 mb-xs text-white text-bold text-sm">Email</label>
              <input type="email" name="email" class="pa-md w-100 border-sm text-primary" v-model="email">
            </div>
            <div class="page-authentication__input-wrapper d-flex flex-wrap mb-md">
              <label for="password" class="w-100 mb-xs text-white text-bold text-sm">Password</label>
              <input type="password" name="password" class="pa-md w-100 border-sm text-primary" v-model="password">
            </div>
            <div class="text-white">
              Don't have an account yet? <a class="text-underline text-secondary" @click="toggleAuthStep">Sign up here</a>
            </div>
            <div>
              <vi-button class="py-md mt-lg border-xl w-100 text-white text-bold" bg-color="primary" flat label="Login" @click.stop="handleAuthentication('login')"/>
            </div>
          </div>
          
          <div v-else class="page-authentication__register-box pa-xl bg-primary-contrast border-sm">
            <h2 class="text-center mb-lg text-lg text-white">Register</h2>
            <div class="page-authentication__input-wrapper d-flex flex-wrap mb-md">
              <label for="email" class="w-100 mb-xs text-white text-bold text-sm">Email</label>
              <input type="email" name="email" class="pa-md w-100 border-sm text-primary" v-model="email">
            </div>
            <div class="page-authentication__input-wrapper d-flex flex-wrap mb-md">
              <label for="password" class="w-100 mb-xs text-white text-bold text-sm">Password</label>
              <input type="password" name="password" class="pa-md w-100 border-sm text-primary" v-model="password">
            </div>
            <div>
              <vi-button class="py-md mt-lg border-xl w-100 text-white text-bold" bg-color="primary" flat label="Register" @click.stop="handleAuthentication('register')"/>
            </div>
            <div class="text-center mt-md">
              <a class="text-underline text-white" @click="toggleAuthStep">Back to Login</a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ViButton from '@/components/generic/ViButton'

const router = useRouter()
const store = useStore()

//authentication
const email = ref('')
const password = ref('')
const authenticationStep = ref('Login')

const isLogin = computed(() => {
  return authenticationStep.value === 'Login'
})
function toggleAuthStep () {
  if (authenticationStep.value === 'Login') {
    authenticationStep.value = 'Register'
    return
  }

  authenticationStep.value = 'Login'
  return
}
async function handleAuthentication (type) {
  store.dispatch('authenticateUser', { email: email.value, password: password.value, type }).then(response => {
    if (response) {
      router.push({ name: 'InvoicesList' })
    }
  }).catch(e => {
    console.log(e)
  })
}

</script>

<style lang="scss">

</style>