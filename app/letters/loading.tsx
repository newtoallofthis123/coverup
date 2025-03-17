import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}
