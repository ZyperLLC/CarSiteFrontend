import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'

/**
 * Fetch all users, optionally limited
 */
export async function getUsers(limit?: number) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { lastName: 'asc' },
      ...(limit ? { take: limit } : {}),
      include: {
        plan: true,
        seller: true,
        cars: true,
      },
    })
    return { users }
  } catch (error) {
    return { error }
  }
}

/**
 * Create a new user
 */
export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.create({
      data,
      include: { plan: true, seller: true },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

/**
 * Get a user by ID or Clerk ID
 */
export async function getUserById({
  id,
  clerkUserId,
}: {
  id?: string
  clerkUserId?: string
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('id or clerkUserId is required')
    }

    const query = id ? { id } : { clerkUserId }

    const user = await prisma.user.findUnique({
      where: query,
      include: { plan: true, seller: true, cars: true },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { plan: true, seller: true },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

/**
 * Update user by Clerk ID
 */
export async function updateUser(
  clerkUserId: string,
  data: Partial<User> & { sellerId?: string }
) {
  try {
    const user = await prisma.user.update({
      where: { clerkUserId },
      data: {
        ...data,
        // if we want to connect to a seller
        ...(data.sellerId
          ? { seller: { connect: { id: data.sellerId } } }
          : {}),
      },
      include: { plan: true, seller: true },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

/**
 * Delete user by Clerk ID
 */
export async function deleteUser(clerkUserId: string) {
  try {
    const user = await prisma.user.delete({
      where: { clerkUserId },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

/**
 * Combine first + last name (fallbacks included)
 */
export function combineName(user: User) {
  const { firstName, lastName, dealerName } = user
  if (dealerName) return dealerName // Dealers show their dealerName
  return `${firstName ?? ''} ${lastName ?? ''}`.trim()
}
