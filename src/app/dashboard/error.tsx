"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const router = useRouter();

  function reconnect() {
    router.refresh();
    reset();
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Alert variant="destructive" className="max-w-md">
        <div>
          <div className="flex items-center mb-2">
            <AlertCircle className="h-6 w-6 mr-1" />
            <AlertTitle>Error</AlertTitle>
          </div>
          <AlertDescription>
            An error occurred while loading the dashboard data. Please try again
            later.
          </AlertDescription>
        </div>
        <Button
          onClick={reconnect}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Try again later
        </Button>
      </Alert>
    </div>
  );
}
