<template>
  <div class="page-invoices py-xl bg-primary container">
    <vi-header title="Invoices" :subtitle="headerSubtitle" :filter-options="headerFilterOptions" button-label="New Invoice" :button-action="openForm" @filter="setFilter"/>
    <div v-if="invoicesList.length" class="w-100 page-invoices__list overflow-hidden">
      <TransitionGroup name="slide-fade" tag="ul" class="d-flex gap-md column" mode="out-in">
        <vi-invoice v-for="invoice in invoicesList" :data="invoice" :key="invoice.id"/>
      </TransitionGroup>
    </div>
    <div v-else class="d-flex column align-center mt-xl text-center">
      <h2 class="text-xl mt-xl text-light-gray">No money here yet!</h2>
      <fas-icon icon="fa-solid fa-face-sad-tear" class="page-invoices__empty-list-icon text-light-gray mt-xl"/>
    </div>
  </div>
  <vi-invoice-form v-model="isFormOpen" @closeForm="closeForm"/>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useForm, useScreen } from '@/assets/composables'
import viHeader from '@/components/generic/ViHeader'
import viInvoice from '@/components/invoices/ViInvoice'
import viInvoiceForm from '@/components/invoices/ViInvoiceForm'

const { isSmall } = useScreen()
const { getters, dispatch } = useStore()
const route = useRoute()
const { openForm, closeForm, isFormOpen } = useForm()

const headerSubtitle = computed(() => {
  if (!isSmall.value) {
    return `There ${invoicesList.value.length > 1 ? 'are ' : 'is '} ${invoicesList.value.length} total invoices`
  } else {
    return `${invoicesList.value.length} invoice${invoicesList.value.length > 1 ? 's' : ''}`
  }
})
const headerFilterOptions = computed(() => {
  return [
    {
      label: 'Draft',
      value: 'draft'
    },
    {
      label: 'Pending',
      value: 'pending'
    },
    {
      label: 'Paid',
      value: 'paid'
    }
  ]
})
const filter = ref('')
const setFilter = value => filter.value = value

const invoicesList = computed(() => getters.invoicesList(filter.value))

onBeforeMount(() => {
  dispatch('fetchInvoices')

  if (route.name === 'InvoicesCreate' || route.name === 'InvoicesEdit') isFormOpen.value = true
})
</script>

<style lang="scss">
.page-invoices {
  &__list {
    height: 100%;
    max-height: calc(100% - $spacing-xl * 2);
    overflow-y: scroll;
  }

  &__list::-webkit-scrollbar {
    display: none;
  }

  &__empty-list-icon {
    font-size: 10rem;
  }
}
</style>