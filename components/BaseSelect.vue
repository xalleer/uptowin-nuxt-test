<template>
  <select v-model="model" class="select">
    <option v-if="placeholder !== undefined" :value="null">
      {{ placeholder }}
    </option>
    <option v-for="option in options" :key="String(option)" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T extends string | number">
defineProps<{
  options: T[]
  placeholder?: string
}>()

const model = defineModel<T | null>({ default: null })
</script>

<style scoped>
.select {
  padding: 6px;
}
</style>
