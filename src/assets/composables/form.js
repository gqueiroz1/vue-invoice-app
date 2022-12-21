import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default function useForm () {
  const router = useRouter()
  const route = useRoute()
  const isFormOpen = ref(false)

  const isCreation = computed(() => {
    return route.path.includes('new')
  })

  const openForm = () => {
    isFormOpen.value = true

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    if (route.name === 'InvoicesList') {
      router.push({ name: 'InvoicesCreate' })
    } else {
      router.push({ name: 'InvoicesEdit', params: { id: route.params.id } })
    }
  }

  const closeForm = () => {
    isFormOpen.value = false

    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')

    if (isCreation.value) {
      router.push({ name: 'InvoicesList' })
    } else {
      router.push({ name: 'InvoicesSingle', params: { id: route.params.id } })
    }
  }

  return { isCreation, isFormOpen, openForm, closeForm }
}
