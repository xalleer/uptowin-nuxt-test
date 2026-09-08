<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>

          <th class="sortable" @click="$emit('sort', 'age')">
            Age
            <span v-if="sortBy === 'age'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>

          <th>Role</th>

          <th class="sortable" @click="$emit('sort', 'createdAt')">
            Created
            <span v-if="sortBy === 'createdAt'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.role }}</td>
          <td>
            {{ new Date(user.createdAt).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/models/user'
import type { SortField, SortDirection } from '~/composables/useUsersTable'

defineProps<{
  users: User[]
  sortBy?: SortField | null
  sortDirection?: SortDirection
}>()

defineEmits<{
  (e: 'sort', field: SortField): void
}>()
</script>

<style scoped>
.table-wrapper {
  max-height: 400px;
  overflow: auto;
}

thead th {
  position: sticky;
  top: 0;
  background: #fff;
}

thead th.sortable {
  cursor: pointer;
  user-select: none;
}
</style>
