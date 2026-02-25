# Better Auth OAuth Proxy Example

This is a minimal example demonstrating the [OAuth Proxy](https://www.better-auth.com/docs/plugins/oauth-proxy) plugin for [Better Auth](https://www.better-auth.com/).

## The Problem

OAuth providers require you to register a fixed callback URL. This becomes an issue when your app runs on dynamic URLs — such as local development servers or preview deployments — because each environment has a different origin.

## How the OAuth Proxy Works

The OAuth Proxy plugin routes all OAuth callbacks through your production server. When a user initiates sign-in from any environment, the flow goes through your production URL (where the OAuth provider's callback is registered), and then redirects back to the originating environment.

You only need to register **one** callback URL with your OAuth provider: your production server's.

## Setup

### 1. Add the Plugin (Server)

```ts
import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    oAuthProxy({
      productionURL: "https://your-production-url.com",
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://your-production-url.com",
    // add preview/staging URLs as needed (wildcards supported)
  ],
});
```

That's it for the server. The plugin handles the redirect flow internally — you don't need to set `redirectURI` on your social providers.

### 2. Configure Trusted Origins

`trustedOrigins` tells Better Auth which origins are allowed to initiate and receive OAuth redirects. Include your local dev server, production URL, and any preview/staging URLs.

Wildcard patterns are supported for dynamic preview URLs:

```ts
trustedOrigins: [
  "http://localhost:3000",
  "https://your-production-url.com",
  "https://your-app-*-your-team.example.com",
],
```

### 3. Register the Callback URL with Your OAuth Provider

Register your **production** callback URL with each OAuth provider. For example, with GitHub:

```
https://your-production-url.com/api/auth/callback/github
```

This is the only URL you need to register — the proxy takes care of routing back to the correct environment.

### 4. Client Usage

The client doesn't require any special configuration for the proxy:

```ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
```

Sign in as usual:

```ts
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
});
```

## Running This Example

```bash
pnpm install
```

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```bash
pnpm dev
```
