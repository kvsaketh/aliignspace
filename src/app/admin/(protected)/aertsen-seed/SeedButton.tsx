"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { seedAertsenContent, SeedActionResult } from "./actions";

export default function SeedButton() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SeedActionResult | null>(null);

  const handleClick = () => {
    setResult(null);
    startTransition(async () => {
      const res = await seedAertsenContent();
      setResult(res);
    });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleClick}
        disabled={isPending}
        size="lg"
        className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Seeding Content...
          </>
        ) : (
          <>
            <Rocket className="mr-2 h-5 w-5" />
            Seed All Aertsen Content
          </>
        )}
      </Button>

      {result && (
        <div
          className={`p-4 rounded-lg text-left w-full max-w-lg ${
            result.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {result.success ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span
              className={`font-medium ${
                result.success ? "text-green-800" : "text-red-800"
              }`}
            >
              {result.message}
            </span>
          </div>
          {result.details.length > 0 && (
            <ul className="space-y-1 text-sm text-muted-foreground ml-7">
              {result.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
