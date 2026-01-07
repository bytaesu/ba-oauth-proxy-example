"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Better Auth OAuth Proxy
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/sign-in">
            <button
              type="button"
              className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </Link>

          <Link href="/dashboard">
            <button
              type="button"
              className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Dashboard
            </button>
          </Link>

          <button
            type="button"
            className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-white border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={async () => {
              await authClient.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
