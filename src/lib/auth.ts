import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  appName: "Better Auth OAuth Proxy Test",

  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  // comment
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  plugins: [
    oAuthProxy({
      // Your production server URL
      productionURL: "https://ba-oauth-proxy-example.vercel.app",
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  trustedOrigins: [
    // Your dev servers
    "http://localhost:3000",

    // Your preview servers (wildcard supported)
    "https://ba-oauth-proxy-example-*-taesu.vercel.app",
    "https://ba-oauth-proxy-example.vercel.app",
  ],
});
