"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { onboardingSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { completeOnboardingAction } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Inputs = z.infer<typeof onboardingSchema>;

export default function OnboardingForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { seller: "individual" },
  });

  const sellerType = watch("seller");

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await completeOnboardingAction(data);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // ✅ Success flow
      toast.success("Welcome onboard!");
      // redirect after metadata is saved, middleware will now allow /sellers
      router.push("/sellers");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const individualErrors =
    errors as FieldErrors<Extract<Inputs, { seller: "individual" }>>;
  const dealerErrors =
    errors as FieldErrors<Extract<Inputs, { seller: "dealer" }>>;

  return (
    <>
      {/* Full-page overlay loader */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin h-10 w-10 text-white" />
            <p className="text-white text-lg">Onboarding, please wait...</p>
          </div>
        </div>
      )}

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
                    <Input
                      {...register("firstName")}
                      placeholder="Enter first name"
                    />
                    {individualErrors.firstName?.message && (
                      <p className="text-xs text-red-400">
                        {individualErrors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      {...register("lastName")}
                      placeholder="Enter last name"
                    />
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
                  <Input
                    {...register("whatsapp")}
                    placeholder="Enter WhatsApp number"
                  />
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
                  <Input
                    {...register("dealerName")}
                    placeholder="Enter dealer name"
                  />
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
                  <Input
                    {...register("whatsapp")}
                    placeholder="Enter WhatsApp number"
                  />
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
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "Onboarding..." : "Complete Onboarding → "}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
