import { ref } from 'vue'

export default function useScreen () {
  const isSmall = ref(false)

  isSmall.value = window.innerWidth <= 768 && true

  window.addEventListener('resize', e => {
    if (e.target.innerWidth <= 768) isSmall.value = true
    else isSmall.value = false
  })

  return { isSmall }
}
