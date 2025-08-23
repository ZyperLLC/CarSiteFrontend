import { z } from "zod"

export const onboardingSchema = z.discriminatedUnion("seller", [
  // INDIVIDUAL SELLER
  z.object({
    seller: z.literal("individual"),
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email("Invalid email address."),
    address: z.string().min(1, "Address is required."),
    whatsapp: z.string().min(11, "Please enter a valid WhatsApp number."),
    phone: z.string().min(11, "Phone number is required."),
  }),

  // DEALER SELLER
  z.object({
    seller: z.literal("dealer"),
    dealerName: z.string().min(1, "Dealer name is required."), // camelCase to match Prisma
    location: z.string().min(1, "Company location is required."),
    description: z.string().min(1, "Please provide a description."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(7, "Phone number is required."),
    whatsapp: z.string().min(11, "Please enter a valid WhatsApp number."),
  }),
])
