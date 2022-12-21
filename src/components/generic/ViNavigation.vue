<template>
  <div class="vi-navigation bg-primary-contrast overflow-hidden d-flex justify-between">
    <router-link to="/invoices" class="vi-navigation__item-link px-md py-lg bg-secondary d-flex justify-center align-center">
      <fas-icon icon="fa-solid fa-file-invoice-dollar" class="text-lg text-white cursor-pointer"/>
    </router-link>
    <div class="vi-navigation__settings">
      <div class="d-flex justify-center align-center py-lg px-md" @click="signOut">
        <fas-icon icon="fa-solid fa-right-from-bracket" class="text-lg text-white cursor-pointer"/>
      </div>
      <div class="d-flex justify-center align-center py-lg px-md" @click="openProfilePictureInput">
        <fas-icon v-if="!userProfileImage" icon="fa-solid fa-circle-user" class="text-white cursor-pointer text-xl"/>
        <div v-else class="vi-navigation__profile cursor-pointer round" :style="'background-image: url(' + userProfileImage + ')'" />
      </div>
      <input id="userProfilePictureInput" class="d-none" type="file" name="userProfilePictureInput" @input="sendProfilePicture">
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getStorage, ref as firestoreRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const router = useRouter()
const store = useStore()

let userProfileImage = ref('')

const openProfilePictureInput = () => {
  document.getElementById('userProfilePictureInput').click()
}

const sendProfilePicture = e => {
  const file = e.target.files[0]
  const storage = getStorage()
  const userUid = JSON.parse(localStorage.getItem('user')).uid
  const storageRef = firestoreRef(storage, `userImages/${userUid}/${file.name}`)

  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then(url => {
      store.dispatch('updateUser', { key: 'photoURL', value: url })
      userProfileImage.value = url
    })
  })
}

const signOut = async () => {
  const response = await store.dispatch('signOut')

  if (response) {
    router.push({ name: 'Authentication' })
  }
}

onBeforeMount(() => {
  userProfileImage.value = JSON.parse(localStorage.getItem('user')).photoURL
})
</script>

<style lang="scss">
.vi-navigation {
  position: fixed;
  z-index: 2;
  border-radius: 0 $border-lg $border-lg 0;
  height: 100vh;
  flex-direction: column;

  &__item-link {
    width: 90px;
  }

  &__profile {
    width: 50px;
    height: 50px;
    background-position: 0 0;
    background-size: cover;
  }
}

@media (max-width: 1140px) {
  .vi-navigation {
    width: 100vw;
    height: auto;
    flex-direction: row;
    bottom: 0;
    border-radius: $border-lg $border-lg 0 0;
  
    &__settings {
      display: flex;
    }
  }
}
</style>