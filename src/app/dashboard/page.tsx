"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const EXPECTED_REDIRECT_URI =
  "https://ba-oauth-proxy-example.vercel.app/api/auth/callback/google";

const Page = () => {
  const result = authClient.useSession();
  const [pending, setPending] = useState(false);
  const [probe, setProbe] = useState<{
    authorizationURL: string;
    redirectURI: string | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runLinkSocialProbe = async () => {
    setPending(true);
    setProbe(null);
    setError(null);

    const response = await authClient.linkSocial({
      provider: "google",
      callbackURL: "/dashboard?linkSocial=complete",
      disableRedirect: true,
    });

    if (response.error) {
      setError(response.error.message || "linkSocial failed");
      setPending(false);
      return;
    }

    const authorizationURL = response.data?.url;
    if (!authorizationURL) {
      setError("Authorization URL was not returned");
      setPending(false);
      return;
    }

    setProbe({
      authorizationURL,
      redirectURI: new URL(authorizationURL).searchParams.get("redirect_uri"),
    });
    setPending(false);
  };

  const proxyEngaged = probe?.redirectURI === EXPECTED_REDIRECT_URI;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <section>
        <h1 className="font-medium text-xl mb-6 underline">Current session</h1>
        <pre className="font-mono text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      </section>

      <section className="space-y-4 border-t pt-8">
        <div>
          <h2 className="font-medium text-xl">OAuth Proxy linkSocial probe</h2>
          <p className="text-sm text-gray-600 mt-1">
            Run this while signed in on localhost or a preview deployment.
          </p>
        </div>

        <button
          type="button"
          className="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-lg disabled:opacity-50"
          disabled={pending || !result.data}
          onClick={runLinkSocialProbe}
        >
          {pending ? "Preparing link..." : "Test linkSocial"}
        </button>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        {probe ? (
          <div className="space-y-3 rounded-lg border p-4 text-sm">
            <p
              className={
                proxyEngaged
                  ? "font-medium text-green-700"
                  : "font-medium text-red-700"
              }
            >
              {proxyEngaged
                ? "PASS: OAuth Proxy uses the production callback"
                : "RED: linkSocial bypasses OAuth Proxy"}
            </p>

            <dl className="space-y-2 break-all">
              <div>
                <dt className="font-medium">Expected redirect_uri</dt>
                <dd className="font-mono text-xs">{EXPECTED_REDIRECT_URI}</dd>
              </div>
              <div>
                <dt className="font-medium">Actual redirect_uri</dt>
                <dd className="font-mono text-xs">
                  {probe.redirectURI || "missing"}
                </dd>
              </div>
            </dl>

            <a
              className="inline-flex px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50"
              href={probe.authorizationURL}
            >
              Continue with Google
            </a>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Page;
