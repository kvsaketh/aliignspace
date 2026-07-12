"use client";

import { WidgetBuilder } from "@/components/builder/WidgetBuilder";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const router = useRouter();

  return (
    <WidgetBuilder
      pageId="home"
      onSave={async () => {
        // TODO: Implement save API call
        console.log("Saving widgets...");
      }}
      onClose={() => router.push("/admin/pages")}
    />
  );
}
