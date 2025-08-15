import { SignIn } from "@clerk/nextjs";

export default function IndividualSignInPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white"
    >
      <SignIn afterSignInUrl="/sell" />
    </div>
  );
}
