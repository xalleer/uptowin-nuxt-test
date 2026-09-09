<template>
  <UserFilters
    :search="search"
    :role="role"
    :per-page="perPage"
    @update:search="onSearch($event)"
    @update:role="onChangeRole($event)"
    @update:per-page="onPerPageChange($event)"
  />

  <UserTable
    :users="paginatedUsers"
    :sort-by="sortBy"
    :sort-direction="sortDirection"
    @sort="onSort"
  />

  <div class="pagination">
    <button :disabled="page <= 1" @click="page--">Prev</button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button :disabled="page >= totalPages" @click="page++">Next</button>
  </div>
</template>

<script setup lang="ts">
import { users } from '~/data/users'
import { useUsersTable, type SortField } from '~/composables/useUsersTable'
import type { UserRole } from '~/models/user'
import { DEFAULT_PAGINATION_PAGE } from '~/contants/pagination.ts'

const { search, role, sortBy, sortDirection, page, perPage, paginatedUsers, totalPages } =
  useUsersTable(users)

const onSort = (field: SortField) => {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDirection.value = 'asc'
  }
  page.value = DEFAULT_PAGINATION_PAGE
}

const onPerPageChange = (value: number | null) => {
  perPage.value = value ? Number(value) : null
  page.value = DEFAULT_PAGINATION_PAGE
}

const onSearch = (value: string) => {
  page.value = DEFAULT_PAGINATION_PAGE
  search.value = value
}

const onChangeRole = (r: UserRole | null) => {
  page.value = DEFAULT_PAGINATION_PAGE
  role.value = r
}
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
