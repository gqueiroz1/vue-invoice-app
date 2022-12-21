<template>
  <div v-if="!isSmall" class="d-flex gap-sm">
    <vi-button v-for="(button, index) in buttonsData" :key="index" :use-label="!isSmall" :label="button.label" :flat="button.flat" :bg-color="button.bgColor" :text-color="button.textColor" :icon="button.buttonIcon" icon-classes="text-lg" class="border-xl" @click.stop="button.action"/>
  </div>

  <div v-else>
    <div class="relative vi-button-group__mobile">
      <vi-button :use-label="false" flat bg-color="secondary" text-color="white" icon="fa-solid fa-ellipsis-vertical" icon-classes="text-lg" class="round" @click.stop="toggleActionGroup"/>
      <Transition name="slide-fade" mode="out-in">
        <div v-if="isActionGroupOpen" class="absolute vi-button-group__mobile-group">
          <vi-button v-for="(button, index) in buttonsData" :key="index" :label="button.label" :flat="button.flat" :bg-color="button.bgColor" :text-color="button.textColor" icon-class="text-lg" class="vi-button-group__mobile  -group-button border-xl mb-sm" @click.stop="[button.action(), toggleActionGroup()]"/>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ViButton from './ViButton'
import { useScreen } from '@/assets/composables'

const { isSmall } = useScreen()

const props = defineProps({
  buttonsData: {
    type: Object,
    required: true
  }
})

const isActionGroupOpen = ref(false)
const toggleActionGroup = () => {
  isActionGroupOpen.value = !isActionGroupOpen.value
}
</script>

<style lang="scss" scoped>
.vi-button-group {
  &__mobile-group {
    min-width: 150px;
    top: 50px;
    right: 0;
  }

  &__mobile-group-button {
    width: 100%;
  }
}
</style>