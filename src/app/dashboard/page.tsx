"use client";

import { authClient } from "@/lib/auth-client";

const Page = () => {
  const result = authClient.useSession();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <pre className="font-mono text-sm">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default Page;
