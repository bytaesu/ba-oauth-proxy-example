"use client";

import { authClient } from "@/lib/auth-client";

const Page = () => {
  const result = authClient.useSession();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="font-medium text-xl mb-6 underline">Current session</h1>
      <pre className="font-mono text-xs">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default Page;
