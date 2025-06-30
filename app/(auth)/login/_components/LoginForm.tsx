"use client";

import { Button } from "@/components/ui/button";
import {
  CardDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { emailValidation } from "@/lib/validations";

const LoginForm = () => {

  const [isPending, startTransition] = useTransition();
  const [isEmailPending, startEmailTransition] = useTransition();

  const [email, setEmail ] = useState("")

  const router =  useRouter()

  async function GithubLogin() {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("signed in successfully");
          },
          onError: (error) => {
            toast.error("something went wrong");
          },
        },
      });
    });
  }

  async function SignInWithEmail(email: string){
    const result = emailValidation.safeParse({ email });
    if (!result.success) {
      toast.error("Invalid email address.");
      return;
    }
    startEmailTransition(async ()=>{
        await authClient.emailOtp.sendVerificationOtp({
            email:email,
            type:'sign-in',
            fetchOptions:{
                onSuccess: ()=> {toast.success("email sent successfully")
                    router.push(`/verify-request?email=${email}`)
                },
                onError:(error)=>{
                    toast.error("error sending email")
                }
            }
        })
    })
    
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Login using google or github</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            disabled={isPending}
            onClick={GithubLogin}
            className="w-full"
            variant={"outline"}
          >
            <GithubIcon className="size-4" />
            {isPending ? (
              <>
                <Loader className="animate-spin size-4" />
              </>
            ) : (
              <>Login with github</>
            )}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              or continue with
            </span>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input value={email} required onChange={(event)=> setEmail(event.target.value)} type="email" placeholder="abcd@example.co," />
            </div>
            <Button onClick={()=> SignInWithEmail(email)}>{isEmailPending?<Loader className="animate-spin"/>:<p>Continue with email</p>}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
