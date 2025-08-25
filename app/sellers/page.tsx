import { UserButton } from "@clerk/nextjs";
import Sellers from "@/components/Sellers";

export default function SellersPage() {
  return (
    <div className="p-6">
      {/* Clerk UserButton for sign-out and account management */}
      <div className="flex justify-end mb-4">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Sellers component */}
      <Sellers />
    </div>
  );
}
