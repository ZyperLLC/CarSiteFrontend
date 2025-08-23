import prisma from '@/lib/prisma'

/**
 * Get all sellers
 */
export async function getSellers(
  limit?: number,
  sort: 'name' | 'createdAt' = 'createdAt'
) {
  return await prisma.seller.findMany({
    orderBy: { [sort]: 'desc' },
    ...(limit ? { take: limit } : {}),
    include: {
      user: true, // include the user who owns this seller
    },
  })
}

/**
 * Get a seller by slug
 */
export async function getSellerBySlug(slug: string) {
  return await prisma.seller.findUnique({
    where: {
      slug,
    },
    include: {
      user: {
        include: {
          cars: true, // include cars owned by the seller’s user
          plan: true, // include the seller’s plan if set
        },
      },
    },
  })
}
