<template>
  <button
    class="theme-toggle"
    type="button"
    :title="isDark ? 'Switch to Light theme' : 'Switch to Dark theme'"
    @click="toggleTheme"
  >
    <span class="theme-toggle__label">
      {{ isDark ? 'Dark Theme' : 'Light Theme' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const applyTheme = (dark: boolean) => {
  isDark.value = dark
  const theme = dark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

const toggleTheme = () => {
  applyTheme(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    applyTheme(saved === 'dark')
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(true)
  }
})
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid var(--border-color, $border-color);
  border-radius: $border-radius-sm;
  background-color: var(--card-bg, #fff);
  color: var(--text-color, #0f172a);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: var(--hover-bg, #f8fafc);
  }

  &__label {
    user-select: none;
  }
}
</style>
