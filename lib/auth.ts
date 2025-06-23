import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";
import { EmailTemplate } from "@/components/email-template";
 
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders:{
    github: {
        clientId:env.GITHUB_CLIENT_ID,
        clientSecret:env.GITHUB_CLIENT_SECRET
        
    },
    // google:{
    //     clientId:"",
    //     clientSecret:""
    // }
  },
  plugins: [
    emailOTP({ 
            async sendVerificationOTP({ email, otp, type}) { 
              const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [email],
                subject: 'Hello world',
                // react: EmailTemplate({ firstName: 'John' }),
                html:`<p>hello here is your otp ${otp}</p>`
              });
      // Implement the sendVerificationOTP method to send the OTP to the user's email address
    }, 
    }) 
]
});