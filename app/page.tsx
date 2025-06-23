"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'
import React from "react";

export default function Home() {
  const { data, error, isPending, refetch } = authClient.useSession();

  const router  = useRouter()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess:()=>{
          router.push("/login")
        }
      }
    })
    
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Session Info</h1>
      {isPending && <div>Loading session...</div>}
      {error && (
        <div className="text-red-500">Error: {error.message || "Unknown error"}</div>
      )}
      {!isPending && !error && !data && <div>Not logged in.</div>}
      {data && (
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">User</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm overflow-x-auto">
              {JSON.stringify(data.user, null, 2)}
            </pre>
          </div>
          {data.session && (
            <div>
              <h2 className="font-semibold">Session</h2>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm overflow-x-auto">
                {JSON.stringify(data.session, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
      <button
        className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
        onClick={() => refetch()}
        disabled={isPending}
      >
        Refetch Session
      </button>

      <Button variant={"outline"} onClick={signOut}>
        singout
      </Button>
    </div>
  );
}
