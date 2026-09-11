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

<style lang="scss" scoped>
.select {
  padding: 8px 12px;
  border: 1px solid var(--border-color, $border-color);
  border-radius: $border-radius-sm;
  background-color: var(--input-bg, #fff);
  color: var(--text-color, $text-color);
  font-size: 14px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: $primary-color;
  }
}
</style>
