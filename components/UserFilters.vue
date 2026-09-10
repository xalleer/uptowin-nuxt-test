<template>
  <div class="filters">
    <input v-model="searchInput" class="input" placeholder="Search by name or email..." />

    <BaseSelect
      :model-value="role"
      placeholder="All Roles"
      :options="[Roles.ADMIN, Roles.MANAGER, Roles.USER]"
      @update:model-value="$emit('update:role', $event ?? null)"
    />

    <BaseSelect
      :model-value="perPage"
      placeholder="All"
      :options="PAGINATION_LIMIT_OPTIONS"
      @update:model-value="$emit('update:perPage', $event ? Number($event) : null)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from 'perfect-debounce'
import { Roles, type UserRole } from '~/models/user'
import { PAGINATION_LIMIT_OPTIONS } from '~/contants/pagination'

const props = defineProps<{
  search?: string
  role?: UserRole | null
  perPage?: number | null
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:role', value: UserRole | null): void
  (e: 'update:perPage', value: number | null): void
}>()

const searchInput = ref(props.search ?? '')

const debouncedEmitSearch = debounce((value: string) => {
  emit('update:search', value)
}, 300)

watch(searchInput, (newVal) => {
  debouncedEmitSearch(newVal)
})

watch(
  () => props.search,
  (newVal) => {
    if (newVal !== searchInput.value) {
      searchInput.value = newVal ?? ''
    }
  },
)
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-md;

  .input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid $border-color;
    border-radius: $border-radius-sm;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: $primary-color;
    }
  }
}
</style>
