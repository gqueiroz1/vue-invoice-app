<template>
  <Transition name="fade">
    <div v-if="modelValue" class="vi-invoice-form__form-layer absolute w-100 h-100" />
  </Transition>

  <Transition name="horizontal-in">
    <div v-if="modelValue" class="vi-invoice-form__box absolute h-100 w-100vw bg-primary pa-xl">
      <h1 class="text-lg text-white d-flex align-center mb-xl">
        <fas-icon icon="fa-solid fa-arrow-left" class="mr-md cursor-pointer" @click="closeInvoiceForm"/> {{ formTitle }}
      </h1>
      <div>
        <span class="text-sm text-secondary d-block mb-md text-bold">Bill from</span>
        <div>
          <div>
            <label for="address" class="text-light-gray d-block text-bold text-sm mb-sm">Street Address</label>
            <input class="d-block bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="address" v-model="invoiceData.streetAddress">
          </div>
          <div :class="isSmall ? 'flex-wrap' : ''" class="d-flex mt-md gap-md">
            <div class="w-100"> 
              <label for="city" class="text-light-gray d-block text-bold text-sm mb-sm">City</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="city" v-model="invoiceData.city">
            </div>
            <div class="w-100"> 
              <label for="postalCode" class="text-light-gray d-block text-bold text-sm mb-sm">Postal Code</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="tel" name="postalCode" v-model="invoiceData.postalCode">
            </div>
            <div class="w-100"> 
              <label for="country" class="text-light-gray d-block text-bold text-sm mb-sm">Country</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="country" v-model="invoiceData.country">
            </div>
          </div>
        </div>
      </div>

      <div class="mt-xl">
        <span class="text-sm text-secondary d-block mb-md text-bold">Bill To</span>
        <div>
          <div class="d-flex column gap-md">
            <div>
              <label for="clientName" class="text-light-gray d-block text-bold text-sm mb-sm">Client Name</label>
              <input class="d-block bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="clientName" v-model="invoiceData.clientName">
            </div>
            <div>
              <label for="clientEmail" class="text-light-gray d-block text-bold text-sm mb-sm">Client Email</label>
              <input class="d-block bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="clientEmail" v-model="invoiceData.clientEmail">
            </div>
            <div>
              <label for="clientStreetAddress" class="text-light-gray d-block text-bold text-sm mb-sm">Client Street Address</label>
              <input class="d-block bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="clientStreetAddress" v-model="invoiceData.clientStreetAddress">
            </div>
          </div>

          <div :class="isSmall ? 'flex-wrap' : ''" class="d-flex column gap-md mt-md">
            <div class="w-100">
              <label for="clientCity" class="text-light-gray d-block text-bold text-sm mb-sm">City</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="clientCity" v-model="invoiceData.clientCity">
            </div>
            <div>
              <label for="clientPostalCode" class="text-light-gray d-block text-bold text-sm mb-sm">Postal Code</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="clientPostalCode" v-model="invoiceData.clientPostalCode">
            </div>
            <div>
              <label for="clientStreetAddress" class="text-light-gray d-block text-bold text-sm mb-sm">Country</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="clientStreetAddress" v-model="invoiceData.clientCountry">
            </div>
          </div>

          <div class="d-flex mt-md gap-md">
            <div class="w-100">
              <label for="invoiceDate" class="text-light-gray d-block text-bold text-sm mb-sm">Invoice Date</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" maxlength="10" placeholder="mm/dd/yyyy" name="invoiceDate" v-model="invoiceData.invoiceDate">
            </div>
            <div class="w-100">
              <label for="paymentTerms" class="text-light-gray d-block text-bold text-sm mb-sm">Payment Terms</label>
              <select name="paymentTerms" class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" v-model="invoiceData.paymentTerms">
                <option value="30">Next 30 days</option>
                <option value="60">Next 60 days</option>
                <option value="90">Next 90 days</option>
              </select>
            </div>
          </div>

          <div class="w-100 mt-md">
            <label for="projectDescription" class="text-light-gray d-block text-bold text-sm mb-sm">Project Description</label>
            <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" name="projectDescription" v-model="invoiceData.projectDescription">
          </div>

          <span class="d-block text-sm text-secondary d-block mt-lg mb-md text-bold">Items List</span>
          <div v-for="(item, index) in invoiceData.itemsList" class="d-flex align-center gap-md mb-md">
            <div style="flex: 2">
              <label :for="'itemName' + index" class="text-light-gray d-block text-bold text-sm mb-sm">Item Name</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" :name="'itemName' + index" v-model="item.itemName" />
            </div>
            <div style="flex: 0.5">
              <label :for="'itemQty' + index" class="text-light-gray d-block text-bold text-sm mb-sm">Qty</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="tel" :name="'itemQty' + index" v-model="item.quantity" />
            </div>
            <div style="flex: 0.5">
              <label :for="'itemPrice' + index" class="text-light-gray d-block text-bold text-sm mb-sm">Price</label>
              <input class="bg-primary-contrast pa-md w-100 border-sm text-light-gray" type="text" :name="'itemPrice' + index" v-model="item.price" />
            </div>
            <div style="flex: 0.5">
              <label class="text-light-gray d-block text-bold text-sm mb-sm">Total</label>
              <input class="bg-primary pa-md w-100 border-sm text-light-gray" type="text" disabled :value="getItemTotal(item)" />
            </div>
            <div style="flex: 0; text-align: right">
              <fas-icon v-if="showDeleteIcon" icon="fa-icon fa-trash" class="text-light-gray cursor-pointer" @click="removeInvoiceItem(index)"/>
            </div>
          </div>

          <vi-button label="Add New Item" bg-color="primary-contrast" flat icon="fa-solid fa-plus" class="w-100 py-md border-xl mt-md" @click.stop="addNewInvoiceItem"/>
        </div>

        <div class="d-flex justify-end mt-xl gap-md">
          <vi-button label="Cancel" bg-color="dark-gray" flat class="py-md border-xl" @click.stop="closeInvoiceForm"/>
          <vi-button :label="saveButtonLabel" bg-color="secondary" flat class="py-md border-xl" @click.stop="handleFormAction"/>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, reactive, watch, onUpdated, onRenderTriggered } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { cloneDeep } from 'lodash'
import { getItemTotal } from '@/assets/helpers'
import { useForm, useScreen } from '@/assets/composables'
import ViButton from '@/components/generic/ViButton'

const { getters, dispatch } = useStore()
const props = defineProps(['modelValue'])
const emit = defineEmits(['closeForm'])
const route = useRoute()
const { isCreation, closeForm, isFormOpen } = useForm()
const { isSmall } = useScreen()

const formTitle = computed(() => {
  return isCreation.value ? 'New Invoice' : `${invoiceData.code} - Edit`
})
const saveButtonLabel = computed(() => {
  return `Save ${isCreation.value ? 'invoice' : 'changes'}`
})
const addNewInvoiceItem = () => {
  console.log('addNEW')
  invoiceData.itemsList.push({
    itemName: '',
    quantity: 1,
    price: 0
  })
}
const removeInvoiceItem = index => {
  invoiceData.itemsList.splice(index, 1)
}
const handleFormAction = () => {
  if (Object.values(invoiceData).some(value => value === '')) {
    return console.log("Form can't have empty values")
  }

  if (isCreation.value) {
    dispatch('createInvoice', {
      ...invoiceData,
      code: `#${Math.trunc(Math.random(5000) * 1000)}`
    })
  } else {
    dispatch('updateInvoice', { ...invoiceData })
  }

  closeInvoiceForm()
}
const showDeleteIcon = computed (() => {
  return invoiceData.itemsList.length > 1
})
const closeInvoiceForm = () => {
  emit('closeForm')
}

watch(route, newValue => {
  if(newValue.name !== 'InvoicesCreate' && newValue.name !== 'InvoicesEdit') {
    if (isFormOpen.value) {
      closeForm()
    }
  }
})

const invoiceData = reactive({
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
  clientName: '',
  clientEmail: '',
  clientStreetAddress: '',
  clientCity: '',
  clientPostalCode: '',
  clientCountry: '',
  invoiceDate: '',
  paymentTerms: '',
  projectDescription: '',
  state: 'pending',
  itemsList: [
    {
      itemName: '',
      quantity: 1,
      price: 0
    }
  ]
})
watch(() => invoiceData.invoiceDate, newValue => {
  if (newValue.match(/^\d{2}$/) !== null || newValue.match(/^\d{2}\/\d{2}$/) !== null) {
    invoiceData.invoiceDate = newValue + '/'
  }
})

onRenderTriggered(() => {
  document.querySelector('body').classList.add('overflow-hidden')
})

onUpdated(() => {
  const id = isCreation.value ? '' : route.params.id

  return Object.assign(invoiceData, cloneDeep(getters.getInvoiceById(id)))
})
</script>

<style lang="scss">
.vi-invoice-form {
  &__form-layer {
    height: calc(100% + 90px);
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__box {
    overflow-y: scroll;
    max-width: 50%;
    top: 0;
    right: 0;
    z-index: 3;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }
}
</style>