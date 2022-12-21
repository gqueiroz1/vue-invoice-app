<template>
  <div class="vi-header d-flex justify-between align-center mb-xl">
    <div class="d-flex column">
      <slot name="title">
        <h1 class="text-white text-lg mb-sm">{{ title }}</h1>
        <span v-if="subtitle" class="text-light-gray text-sm">{{ subtitle }}</span>
      </slot>
    </div>

    <div>
      <div class="d-flex align-center">
        <slot name="actions">
          <span v-if="useFilter" class="vi-header__filter text-white text-sm mr-lg">
            {{ filterLabel }} <span class="text-bold text-gray">{{ selectedFilter }}</span>
            <fas-icon icon="fa-solid fa-chevron-down" class="text-secondary ml-sm text-sm cursor-pointer" @click="toggleFilter"/>
            <Transition name="slide-fade"  mode="out-in">
              <ul v-if="isFilterOpen" class="vi-header__filter-selector bg-primary-contrast border-sm overflow-hidden">
                <li v-for="(option, index) in filterOptions" :key="index" class="vi-header__filter-item cursor-pointer pa-md" @click="filter(option)">{{ option.label }}</li>
                <li class="vi-header__filter-item cursor-pointer pa-md" @click="filter('')">Clear filter</li>
              </ul>
            </Transition> 
          </span>
          <vi-button :use-label="!isSmall" :label="buttonLabel" flat bg-color="secondary" text-color="white" :icon="buttonIcon" icon-class="text-lg" class="border-xl" @click.stop="buttonAction" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useScreen } from '@/assets/composables'
import ViButton from '@/components/generic/ViButton.vue'

const { isSmall } = useScreen()

const emit = defineEmits(['filter'])

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  subtitle: {
    type: String
  },

  filterOptions: {
    type: Array,
    default: () => []
  },

  buttonLabel: {
    type: String,
    required: true
  },

  buttonIcon: {
    type: String,
    default: 'fa-solid fa-circle-plus'
  },

  buttonAction: {
    type: Function,
    required: true
  }
})
  
const selectedFilter = ref('')
const isFilterOpen = ref(false)
const useFilter = computed(() => {
  return !!props.filterOptions.length
})
const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value
}
const filter = option => {
  selectedFilter.value = option.label
  emit('filter', option.value)
  isFilterOpen.value = false
}
const filterLabel = computed(() => {
  return isSmall.value ? 'Filter' : 'Filter by status'
})
</script>

<style lang="scss">
.vi-header {
  &__filter {
    position: relative;
  }

  &__filter-selector {
    box-shadow: $shadow-md;
    position: absolute;
    top: 20px;
    right: 0;
    max-width: 100%;
    min-width: 100px;
  }

  &__filter-item {
    transition: all .3s;
  }

  &__filter-item:hover {
    transition: all .3s ease;
    background-color: $secondary;
    color: $white;
  }
}
</style>