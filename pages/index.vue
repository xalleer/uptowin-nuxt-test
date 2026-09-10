<template>
  <div class="container">
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

    <BasePagination v-model:page="page" :total-pages="totalPages" />
  </div>
</template>

<script setup lang="ts">
import { users } from '~/data/users'
import { useUsersTable, type SortField } from '~/composables/useUsersTable'
import type { UserRole } from '~/models/user'
import { DEFAULT_PAGINATION_PAGE } from '~/contants/pagination.ts'
import BasePagination from '~/components/BasePagination.vue'

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

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 32px auto;
  padding: $spacing-lg;
  background-color: #fff;
  border: 1px solid $border-color;
  border-radius: $border-radius-md;
}
</style>
