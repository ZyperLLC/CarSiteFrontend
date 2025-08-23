'use server'

import { z } from 'zod'
import { updateUser } from '@/lib/users'
import { revalidatePath } from 'next/cache'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { onboardingSchema } from '@/lib/schemas'
import { SellerType } from '@prisma/client'

type OnboardingInputs = z.infer<typeof onboardingSchema>

export async function completeOnboardingAction(data: OnboardingInputs) {
  const { userId } = auth()

  if (!userId) {
    return { error: 'Please log in first.' }
  }

  const result = onboardingSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Please select Seller Type.' }
  }

  try {
    // Store onboarding completion + seller type in Clerk metadata
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        seller: result.data.seller, // 'individual' or 'dealer'
      },
    })

    // Update our own User model in Prisma
    const { user } = await updateUser(userId, {
      type:
        result.data.seller === 'dealer'
          ? SellerType.DEALER
          : SellerType.INDIVIDUAL,
    })

    // If the user is a dealer, we might redirect them to their Seller profile
    const slug = user?.seller?.slug
    if (slug) {
      revalidatePath("/sellers")
    }

    return { slug }
  } catch (err) {
    console.error(err)
    return { error: 'There was an error updating the user metadata.' }
  }
}
