import { getSellers } from '@/lib/sellers'
import OnboardingForm from '@/components/onboarding-form'

export default async function OnboardingPage() {
  const sellers = await getSellers()

  return (
    <section className="min-h-screen flex items-center justify-center pb-24 pt-32 sm:pt-40">
      <div className="w-full max-w-2xl px-4">
        <OnboardingForm />
      </div>
    </section>
  )
}
