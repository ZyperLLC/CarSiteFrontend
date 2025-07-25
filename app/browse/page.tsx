import { Suspense } from "react";
import BrowsePageClient from "./BrowsePageClient";

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowsePageClient />
    </Suspense>
  );
}
