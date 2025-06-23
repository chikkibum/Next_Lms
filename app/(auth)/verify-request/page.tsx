"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyRequestPage() {
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const { data, error } = await authClient.signIn.emailOtp({ email, otp });
      if (error) {
        toast.error("Invalid OTP or email. Please try again.");
      } else {
        toast.success("OTP verified! Logging you in...");
        router.push("/");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Please check your email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm text-pretty text-center">
              We have sent an email to the account{" "}
              <span className="text-primary hover:underline">{email}</span>{" "}
              Please enter the otp below{" "}
            </p>
          </div>
          <div className="flex items-center justify-center space-y-2">
            <InputOTP maxLength={6} name="otp">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
