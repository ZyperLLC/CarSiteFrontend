import { SignIn } from "@clerk/nextjs";

export default function DealerSignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <SignIn afterSignInUrl="/premium" />
    </div>
  );
}
