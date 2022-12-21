<template>
  <div
    class="align-center border-sm d-flex px-lg py-sm vi-badge"
    :class="badgeClasses"
  >
    <div
      class="mr-sm round vi-badge__dot"
      :class="badgeDotClasses"
    />
    <span :class="badgeLabelClasses">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },

  color: {
    type: String,
    default: 'positive'
  },

  textSize: {
    type: String,
    default: 'sm'
  }
})

const badgeClasses = computed(() => {
  return [
    `bg-${props.color}-opacity`,
    `text-${props.color}`
  ]
})
const badgeDotClasses = computed(() => {
  return [`bg-${props.color}`]
})
const badgeLabelClasses = computed (() => {
  return [`text-${props.textSize}`]
})
</script>

<style lang="scss">
.vi-badge {
  &__dot {
    width: 8px;
    height: 8px;
  }
}
</style>
