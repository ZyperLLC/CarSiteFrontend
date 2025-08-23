"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"
import { onboardingSchema } from "@/lib/schemas"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { completeOnboardingAction } from "@/lib/actions"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Inputs = z.infer<typeof onboardingSchema>

export default function OnboardingForm() {
  const { user } = useUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { seller: "individual" },
  })

  const sellerType = watch("seller")

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await completeOnboardingAction(data)

    if (result?.error) {
      toast.error(result.error)
      return
    }

    if (result?.slug) {
      await user?.reload()
      router.push("/sellers")
      toast.success("Welcome to the community!")
    }
  }

  // Narrow errors depending on seller type
  const individualErrors =
    errors as FieldErrors<Extract<Inputs, { seller: "individual" }>>
  const dealerErrors =
    errors as FieldErrors<Extract<Inputs, { seller: "dealer" }>>

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Onboarding to TTRidz</CardTitle>
          <CardDescription>
            Select your seller type and complete your details
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Seller Type Selector */}
          <div className="space-y-2">
            <Label>Seller Type</Label>
            <Select
              onValueChange={(val) =>
                setValue("seller", val as "individual" | "dealer")
              }
              defaultValue="individual"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select seller type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="dealer">Dealer</SelectItem>
              </SelectContent>
            </Select>
            {errors.seller?.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.seller.message}
              </p>
            )}
          </div>

          {/* Conditional Fields */}
          {sellerType === "individual" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input {...register("firstName")} placeholder="Enter first name" />
                  {individualErrors.firstName?.message && (
                    <p className="text-xs text-red-400">
                      {individualErrors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input {...register("lastName")} placeholder="Enter last name" />
                  {individualErrors.lastName?.message && (
                    <p className="text-xs text-red-400">
                      {individualErrors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input {...register("email")} placeholder="Enter email" />
                {individualErrors.email?.message && (
                  <p className="text-xs text-red-400">
                    {individualErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input {...register("phone")} placeholder="Enter phone number" />
                {individualErrors.phone?.message && (
                  <p className="text-xs text-red-400">
                    {individualErrors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label>WhatsApp Number</Label>
                <Input {...register("whatsapp")} placeholder="Enter WhatsApp number" />
                {individualErrors.whatsapp?.message && (
                  <p className="text-xs text-red-400">
                    {individualErrors.whatsapp.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Address</Label>
                <Input {...register("address")} placeholder="Enter address" />
                {individualErrors.address?.message && (
                  <p className="text-xs text-red-400">
                    {individualErrors.address.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {sellerType === "dealer" && (
            <div className="space-y-4">
              <div>
                <Label>Dealer Name</Label>
                <Input {...register("dealerName")} placeholder="Enter dealer name" />
                {dealerErrors.dealerName?.message && (
                  <p className="text-xs text-red-400">
                    {dealerErrors.dealerName.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Location</Label>
                <Input {...register("location")} placeholder="Enter location" />
                {dealerErrors.location?.message && (
                  <p className="text-xs text-red-400">
                    {dealerErrors.location.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  {...register("description")}
                  placeholder="Enter company description"
                />
                {dealerErrors.description?.message && (
                  <p className="text-xs text-red-400">
                    {dealerErrors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Email</Label>
                <Input {...register("email")} placeholder="Enter email" />
                {dealerErrors.email?.message && (
                  <p className="text-xs text-red-400">
                    {dealerErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input {...register("phone")} placeholder="Enter phone number" />
                {dealerErrors.phone?.message && (
                  <p className="text-xs text-red-400">
                    {dealerErrors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label>WhatsApp Number</Label>
                <Input {...register("whatsapp")} placeholder="Enter WhatsApp number" />
                {dealerErrors.whatsapp?.message && (
                  <p className="text-xs text-red-400">
                    {dealerErrors.whatsapp.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            size="sm"
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
