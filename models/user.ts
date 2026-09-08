export const Roles = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const

export type UserRole = (typeof Roles)[keyof typeof Roles]

export interface User {
  id: number
  name: string
  email: string
  age: number
  role: UserRole
  createdAt: string
}
