"use client";

import { authClient } from "@/lib/auth-client";

const Page = () => {
  return (
    <div className="mx-auto max-w-sm p-6">
      <SignInWithGitHub />
    </div>
  );
};

export default Page;

const SignInWithGitHub = () => {
  return (
    <button
      type="button"
      className="w-full gap-2"
      onClick={async () => {
        const result = await authClient.signIn.social({
          provider: "github",
          callbackURL: "/dashboard",
        });

        console.log(result.data);
      }}
    >
      Sign in with Github
    </button>
  );
};
