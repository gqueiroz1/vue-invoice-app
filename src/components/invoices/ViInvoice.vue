<template>
  <div v-bind="$attrs" class="vi-invoice shadow-sm cursor-pointer border-sm pa-lg w-100 bg-primary-contrast d-flex justify-between" :class="!isSmall && 'align-center'" @click="goToInvoiceSingle">
    <div :class="isSmall && 'd-flex column'">
      <span :class="isSmall && 'mb-lg'" class="mr-xl text-white text-bold">{{ data.code }}</span>
      <span :class="isSmall && 'mb-lg'" class="mr-xl text-light-gray">Due {{ humanizeDate(data.invoiceDate) }}</span>
      <span class="text-light-gray">{{ data.clientName }}</span>
    </div>
    <div :class="isSmall ? 'd-flex column' : 'align-center'" class="d-flex text-white">
      <span :class="isSmall ? 'mb-lg' : 'mr-lg'">{{ getInvoiceTotalValue(data.itemsList) }}</span>
      <vi-badge :label="states[data.state].label" :color="states[data.state].color" />
      <fas-icon v-if="!isSmall" icon="fa-solid fa-chevron-right" class="vi-invoice__action-icon text-secondary ml-md text-sm cursor-pointer"/>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { states, getInvoiceTotalValue, humanizeDate, formatCurrency } from '@/assets/helpers';
import { useScreen } from '@/assets/composables'
import ViBadge from '@/components/generic/ViBadge.vue';

const { isSmall } = useScreen()
const router = useRouter()
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const goToInvoiceSingle = () => {
  router.push({ name: 'InvoicesSingle', params: { id: props.data.id } })
}
</script>