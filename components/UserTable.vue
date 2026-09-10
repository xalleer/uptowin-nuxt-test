<template>
  <div class="table-wrapper">
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>

          <th class="sortable" @click="$emit('sort', 'age')">
            Age
            <span v-if="sortBy === 'age'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>

          <th>Role</th>

          <th class="sortable" @click="$emit('sort', 'createdAt')">
            Created
            <span v-if="sortBy === 'createdAt'" class="sort-arrow">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="5" class="empty-row">No users found</td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td class="role-cell">{{ user.role }}</td>
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

<style lang="scss" scoped>
.table-wrapper {
  max-height: 420px;
  overflow: auto;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  background-color: #fff;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;

  th,
  td {
    padding: 10px 14px;
    border-bottom: 1px solid $border-color;
  }

  thead th {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f8fafc;
    font-weight: 600;
    color: $text-color;

    &.sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #f1f5f9;
      }
    }
  }

  tbody tr {
    &:last-child td {
      border-bottom: none;
    }

    &:hover {
      background-color: #f8fafc;
    }
  }

  .sort-arrow {
    margin-left: 4px;
    font-weight: bold;
    color: $primary-color;
  }

  .role-cell {
    text-transform: capitalize;
  }

  .empty-row {
    text-align: center;
    color: $secondary-color;
    padding: 24px;
  }
}
</style>
