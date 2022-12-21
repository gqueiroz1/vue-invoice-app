<template>
  <div>
    <button class="vi-button d-flex align-center justify-center px-md py-sm" :class="viButtonClasses" :type="type" :style="viButtonStyles" v-bind="$attrs">
      <fas-icon v-if="props.icon" :icon="props.icon" :class="[iconClasses, getIconClasses()]"/> <span v-if="useLabel">{{ props.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { colors } from '@/assets/helpers'

const props = defineProps({
  bgColor: {
    type: String,
    default: 'secondary'
  },

  textColor: {
    type: String,
    default: 'white'
  },

  icon: {
    type: String
  },

  iconClasses: {
    type: [String, Array]
  },

  label: {
    type: String,
    default: ''
  },

  useLabel: {
    type: Boolean,
    default: true
  },

  type: {
    type: String
  },

  flat: {
    type: Boolean
  }
})

const viButtonClasses = computed(() => {
  return {
    'border-none': props.flat
  }
})
const viButtonStyles = computed (() => {
  return {
    'background-color': colors[`bg-${props.bgColor}`],
    'color': props.textColor
  }
})

const getIconClasses = () => {
  return { 'mr-sm': props.useLabel }
}
</script>

<style lang="scss">
.vi-button {
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    background-color: v-bind('colors[`bg-${props.bgColor}-hover`]') !important;
    transition: all .3s ease;
  }
}
</style>