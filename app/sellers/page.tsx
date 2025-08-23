// app/sellers/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Sellers from "@/components/Sellers";

export default async function SellersPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  return <Sellers />;
}
