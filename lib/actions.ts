"use server"

import { z } from "zod"
import { updateUser } from "@/lib/users"
import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { onboardingSchema } from "@/lib/schemas"
import { SellerType } from "@prisma/client"

type OnboardingInputs = z.infer<typeof onboardingSchema>

export async function completeOnboardingAction(data: OnboardingInputs) {
  const { userId } = auth()

  if (!userId) {
    return { error: "Please log in first." }
  }

  const result = onboardingSchema.safeParse(data)

  if (!result.success) {
    return { error: "Please select Seller Type." }
  }

  try {
    // ✅ Update Clerk metadata
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        seller: result.data.seller, // "individual" or "dealer"
      },
    })

    // ✅ Update your own User model
    const { user } = await updateUser(userId, {
      type:
        result.data.seller === "dealer"
          ? SellerType.DEALER
          : SellerType.INDIVIDUAL,
    })

    // Revalidate sellers page so fresh data shows
    revalidatePath("/sellers")

    // If the user has a dealer profile with slug, return it
    const slug = user?.seller?.slug

    return {
      success: true, // 👈 IMPORTANT: middleware + frontend depends on this
      slug: slug || null,
    }
  } catch (err) {
    console.error("❌ Error completing onboarding:", err)
    return { error: "There was an error updating the user metadata." }
  }
}
