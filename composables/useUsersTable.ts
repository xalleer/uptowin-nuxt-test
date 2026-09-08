import type { User, UserRole } from '~/models/user'

export type SortField = 'age' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export function useUsersTable(users: User[]) {
  // filters
  const search = ref('')
  const role: Ref<UserRole | null> = ref(null)

  // sorting
  const sortBy = ref<SortField | null>(null)
  const sortDirection = ref<SortDirection>('asc')

  // pagination
  const page = ref(1)
  const perPage = ref<number | null>(10)

  const sortedUsers = computed(() => {
    if (!sortBy.value) return filteredUsers.value
    if (sortBy.value === 'age') {
      return [...filteredUsers.value].sort((a, b) =>
        sortDirection.value === 'asc' ? a.age - b.age : b.age - a.age,
      )
    } else if (sortBy.value === 'createdAt') {
      return [...filteredUsers.value].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime()
        const timeB = new Date(b.createdAt).getTime()
        return sortDirection.value === 'asc' ? timeA - timeB : timeB - timeA
      })
    } else {
      return filteredUsers.value
    }
  })

  const paginatedUsers = computed(() => {
    if (!perPage.value) return sortedUsers.value
    const start = (page.value - 1) * perPage.value
    const end = start + perPage.value

    return sortedUsers.value.slice(start, end)
  })
  const totalPages = computed(() => {
    if (!perPage.value) return 1
    return Math.ceil(sortedUsers.value.length / perPage.value)
  })

  const filteredUsers = computed(() => {
    const query = search.value.toLowerCase()

    return users.filter((user) => {
      const matchesRole = !role.value || user.role === role.value
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      return matchesRole && matchesSearch
    })
  })

  watch(totalPages, (newTotalPages) => {
    if (page.value > newTotalPages && newTotalPages > 0) {
      page.value = newTotalPages
    } else if (newTotalPages === 0) {
      page.value = 1
    }
  })

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages,
  }
}
