import { Roles, type User, type UserRole } from '~/models/user.ts'

const roles: UserRole[] = [Roles.ADMIN, Roles.MANAGER, Roles.USER]

export const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 18 + (i % 40),
  role: roles[i % roles.length]!,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}))
