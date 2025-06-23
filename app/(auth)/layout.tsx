import { buttonVariants } from "@/components/ui/button";
import LmsLogo from "@/components/ui/Svg/LmsLogo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({children}: {children:ReactNode}){
    return(
        <div className="relative flex min-h-svh flex-col gap-6 items-center justify-center">

            <Link href="/" className={buttonVariants({
                variant: 'outline',
                className: 'absolute top-5 left-5 '
            })}><ArrowLeft/> go back</Link>
            <div className="flex w-full max-w-sm flex-col gap-8">
                 <Link href='/'
                 className="flex items-center gap-2 self-center font-medium">
                    <LmsLogo className="text-gray-400"/> <span className="text-gray-400">Lms</span>
                
                </Link>
            {children}
            <div className="mx-auto w-2/3 text-center text-gray-300">
                <p className="text-sm text-pretty">By clicking continue You agree to our <span className="hover:text-primary hover:underline transition-all cursor-pointer">Terms and conditions</span> and <span className="hover:text-primary hover:underline transition-all cursor-pointer">Privacy Policy</span></p>
            </div>

            </div>
        </div>
    )

}