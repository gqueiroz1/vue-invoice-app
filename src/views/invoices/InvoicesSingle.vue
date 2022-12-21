<template>
  <div class="page-invoices-single py-xl bg-primary container">
    <div class="text-white text-bold mb-xl">
      <fas-icon icon="fa-solid fa-arrow-left" class="mr-md cursor-pointer text-secondary" @click="redirectToInvoicesList"/>Go back
    </div>
    <div class="bg-primary-contrast pa-lg border-lg w-100 d-flex justify-between align-center">
      <div class="d-flex align-center">
        <span class="text-light-gray text-bold text-sm mr-md">Status</span>
        <vi-badge :label="getInvoiceStateLabel" :color="getInvoiceStateColor"/>
      </div>
      <div class="d-flex align-center">
        <vi-button-group :buttons-data="buttonsData"/>
      </div>
    </div>
    <div class="bg-primary-contrast pa-xl border-lg w-100 mt-lg">
      <div class="d-flex justify-between align-center">
        <div class="d-flex column">
          <span class="text-lg text-white mb-sm">{{ singleInvoice.code }}</span>
          <span class="text-light-gray text-sm">{{ singleInvoice.projectDescription }}</span>
        </div>
        <div class="d-flex column text-right text-sm text-light-gray">
          <span class="mb-xs">{{ singleInvoice.streetAddress }}</span>
          <span class="mb-xs">{{ singleInvoice.city }}</span>
          <span class="mb-xs">{{ singleInvoice.postalCode }}</span>
          <span>{{ singleInvoice.country }}</span>
        </div>
      </div>
      <div :class="isSmall && 'flex-wrap'" class="d-flex gap-xl mt-xl">
        <div :class="dataBoxClasses" class="text-light-gray d-flex gap-lg w-100">
          <div class="d-flex column">
            <span class="text-bold text-sm mb-sm">Invoice Date</span>
            <span class="text-sm">{{ humanizeDate(singleInvoice.invoiceDate) }}</span>
          </div>
          <div class="d-flex column">
            <span class="text-bold text-sm mb-sm">Payment Date</span>
            <span class="text-sm">{{ addDaysToDate(singleInvoice.invoiceDate, singleInvoice.paymentTerms) }}</span>
          </div>
        </div>
        <div :class="dataBoxClasses" class="text-light-gray d-flex gap-lg w-100">
          <div class="d-flex column">
            <span class="text-bold text-sm mb-sm">Bill To</span>
            <span class="text-sm">{{ singleInvoice.clientName }}</span>
          </div>
          <div class="d-flex column mt-lg">
            <span class="text-sm mb-xs">{{ singleInvoice.clientStreetAddress }}</span>
            <span class="text-sm mb-xs">{{ singleInvoice.clientCity }}</span>
            <span class="text-sm mb-xs">{{ singleInvoice.clientPostalCode }}</span>
            <span class="text-sm mb-xs">{{ singleInvoice.clientCountry }}</span>
          </div>
        </div>
        <div class="d-flex column text-light-gray">
          <span class="text-bold text-sm mb-sm">Sent To</span>
          <span class="text-sm">{{ singleInvoice.clientEmail }}</span>
        </div>
      </div>
      <div class="page-invoices-single__items-list-box mt-xl border-lg">
        <div class="pa-xl text-sm">
          <div class="d-flex justify-between text-light-gray">
            <div class="d-flex column">
              <span class="mb-lg text-bold">Item name</span>
              <span class="mb-md" v-for="item in singleInvoice.itemsList">{{ item.itemName }}</span>
            </div>
            <div class="d-flex gap-xl">
              <div class="d-flex column text-left">
                <span class="mb-lg text-bold">QTY</span>
                <span class="mb-md" v-for="item in singleInvoice.itemsList">{{ item.quantity }}</span>
              </div>
              <div class="d-flex column text-left">
                <span class="mb-lg text-bold">Price</span>
                <span class="mb-md" v-for="item in singleInvoice.itemsList">{{ formatCurrency(item.price) }}</span>
              </div>
              <div class="d-flex column text-left">
                <span class="mb-lg text-bold">Total</span>
                <span class="mb-md" v-for="item in singleInvoice.itemsList">{{ getItemTotal(item) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="page-invoices-single__items-list-total bg-primary text-light-gray d-flex justify-between pa-xl">
          <div class="text-sm">Amount Due</div>
          <div>{{ getInvoiceTotalValue(singleInvoice.itemsList) }}</div>
        </div>
      </div>
    </div>
  </div>
  <vi-invoice-form v-model="isFormOpen" @closeForm="closeForm"/>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { 
  states,
  getItemTotal, 
  addDaysToDate, 
  formatCurrency, 
  getInvoiceTotalValue, 
  humanizeDate 
} from '@/assets/helpers';
import { useForm, useScreen } from '@/assets/composables'
import ViBadge from '@/components/generic/ViBadge.vue'
import ViButtonGroup from '@/components/generic/ViButtonGroup'
import ViInvoiceForm from '@/components/invoices/ViInvoiceForm'

const route = useRoute()
const router = useRouter()
const { getters, dispatch } = useStore()
const { openForm, closeForm, isFormOpen } = useForm()
const { isSmall } = useScreen()

const redirectToInvoicesList = () => {
  router.push({ name: 'InvoicesList' })
}

const singleInvoice = computed(() => {
  return getters.getInvoiceById(route.params.id) || {}
})
const getInvoiceStateLabel = computed(() => {
  return states[singleInvoice.value.state]?.label
})
const getInvoiceStateColor = computed(() => {
  return states[singleInvoice.value.state]?.color
})
const deleteInvoice = async () => {
  const response = await dispatch('deleteInvoice', singleInvoice.value.id)

  if (response) redirectToInvoicesList()
}
const setInvoiceState = async (state) => {
  await dispatch('setInvoiceState', { id: singleInvoice.value.id, state })
}
const buttonsData = computed(() => {
  return [
    {
      label: 'Edit',
      flat: true,
      bgColor: 'dark-gray',
      textColor: 'white',
      action: () => openForm()
    },
    {
      label: 'Delete',
      flat: true,
      bgColor: 'negative',
      textColor: 'white',
      action: () => deleteInvoice()
    },
    {
      label: `${singleInvoice.value.state === 'paid' ? 'Mark as pending' : 'Mark as paid'}`,
      flat: true,
      bgColor: `${singleInvoice.value.state === 'paid' ? 'warning' : 'positive'}`,
      textColor: 'white',
      action: () => setInvoiceState(`${singleInvoice.value.state === 'paid' ? 'pending' : 'paid'}`)
    }
  ]
})

const dataBoxClasses = computed(() => {
  return {
    'row': isSmall.value,
    'column': !isSmall.value
  }
})

onMounted(async () => {
  if (!getters.getInvoiceById(route.params.id)) {
    await dispatch('fetchInvoiceById', route.params.id)
  }
})
</script>

<style lang="scss">
.page-invoices-single {
  &__items-list-box {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &__items-list-total {
    border-radius: 0 0 $border-lg $border-lg;
  }
}
</style>