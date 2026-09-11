<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const updatePage = (direction: 'prev' | 'next') => {
  const targetPage = direction === 'prev' ? props.page - 1 : props.page + 1
  if (targetPage >= 1 && targetPage <= props.totalPages) {
    emit('update:page', targetPage)
  }
}
</script>

<template>
  <div v-if="totalPages > 0" class="pagination">
    <button class="pagination__button" :disabled="page <= 1" @click="updatePage('prev')">
      Prev
    </button>

    <span class="pagination__info">{{ page }} / {{ totalPages }}</span>

    <button class="pagination__button" :disabled="page >= totalPages" @click="updatePage('next')">
      Next
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: $spacing-md;
  @include flex-center;
  gap: $spacing-sm;

  &__button {
    padding: 6px 14px;
    border: 1px solid var(--border-color, $border-color);
    border-radius: $border-radius-sm;
    background-color: var(--card-bg, #fff);
    color: var(--text-color, $text-color);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover:not(:disabled) {
      background-color: var(--hover-bg, $background-color);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: 14px;
    color: var(--text-color, $text-color);
    font-weight: 500;
  }
}
</style>
