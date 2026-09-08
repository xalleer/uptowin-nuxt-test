<template>
  <div class="filters">
    <input
      :value="search"
      placeholder="Search by name or email"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <BaseSelect
      :model-value="role"
      placeholder="All Roles"
      :options="[Roles.ADMIN, Roles.MANAGER, Roles.USER]"
      @update:model-value="$emit('update:role', $event ?? null)"
    />

    <BaseSelect
      :model-value="perPage"
      placeholder="All"
      :options="[10, 15, 20]"
      @update:model-value="$emit('update:perPage', $event ? Number($event) : null)"
    />
  </div>
</template>

<script setup lang="ts">
import { Roles, type UserRole } from '~/models/user'

defineProps<{
  search?: string
  role?: UserRole | null
  perPage?: number | null
}>()

defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:role', value: UserRole | null): void
  (e: 'update:perPage', value: number | null): void
}>()
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
