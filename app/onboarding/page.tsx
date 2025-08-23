import { getSellers } from '@/lib/sellers'
import OnboardingForm from '@/components/onboarding-form'

export default async function OnboardingPage() {
  const sellers = await getSellers()
  return (
    <section className='pb-24 pt-32 sm:pt-40'>
      <div className='container'>
        <OnboardingForm/>
      </div>
    </section>
  )
}
