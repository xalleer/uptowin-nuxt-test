import type { User, UserRole } from '~/models/user'
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from '~/contants/pagination'

export type SortField = 'age' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export function useUsersTable(users: User[]) {
  const route = useRoute()
  const router = useRouter()
  // filters
  const search = ref(String(route.query.search ?? ''))

  const role: Ref<UserRole | null> = ref((route.query.role as UserRole) ?? null)

  // sorting
  const sortBy = ref<SortField | null>((route.query.sortBy as SortField) ?? null)
  const sortDirection = ref<SortDirection>(route.query.sortDirection === 'desc' ? 'desc' : 'asc')

  // pagination
  const page = ref(
    Number(route.query.page) > 0 ? Number(route.query.page) : DEFAULT_PAGINATION_PAGE,
  )
  const perPage = ref<number | null>(
    route.query.perPage === 'all' ? null : Number(route.query.perPage) || DEFAULT_PAGINATION_LIMIT,
  )

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
    if (!perPage.value) return DEFAULT_PAGINATION_PAGE
    return Math.max(1, Math.ceil(sortedUsers.value.length / perPage.value))
  })

  const filteredUsers = computed(() => {
    const query = search.value.trim().toLowerCase()

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
      page.value = DEFAULT_PAGINATION_PAGE
    }
  })

  watch([search, role, sortBy, sortDirection, page, perPage], () => {
    const query: Record<string, string | number> = {}

    if (search.value.trim()) query.search = search.value
    if (role.value) query.role = role.value

    if (sortBy.value) {
      query.sortBy = sortBy.value
      query.sortDirection = sortDirection.value
    }

    if (page.value > DEFAULT_PAGINATION_PAGE) query.page = page.value
    if (perPage.value === null) {
      query.perPage = 'all'
    } else if (perPage.value !== DEFAULT_PAGINATION_LIMIT) {
      query.perPage = perPage.value
    }

    router.replace({ query })
  })

  watch(
    () => route.query,
    (newVal) => {
      search.value = String(newVal.search ?? '')
      role.value = (newVal.role as UserRole) ?? null
      sortBy.value = (newVal.sortBy as SortField) ?? null
      sortDirection.value = (newVal.sortDirection as SortDirection) === 'desc' ? 'desc' : 'asc'
      page.value = Number(newVal.page) > 0 ? Number(newVal.page) : DEFAULT_PAGINATION_PAGE
      perPage.value =
        newVal.perPage === 'all' ? null : Number(newVal.perPage) || DEFAULT_PAGINATION_LIMIT
    },
  )

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
