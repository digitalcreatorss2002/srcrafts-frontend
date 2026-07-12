import { Suspense } from "react";
import ApiResults from "./ApiResult";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        API Caller Page
      </h1>

      <Suspense fallback={<p>Loading data...</p>}>
        <ApiResults />
      </Suspense>
    </div>
  );
}
