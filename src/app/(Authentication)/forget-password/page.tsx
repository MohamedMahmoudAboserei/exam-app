'use client'
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import VerifyResetCode from "./VerifyResetCode";
import ResetPassword from "./ResetPassword";
import HeroAuth from "@/components/Auth/HeroAuth/HeroAuth";
import NavbarAuth from "@/components/Auth/NavbarAuth/NavbarAuth";
import FooterAuth from "@/components/Auth/FooterAuth/FooterAuth";

export default function Signin() {
    const [step, setStep] = useState(1);

    return (
        <div className="container flex mx-auto w-full min-h-screen items-center justify-around">
            <div className="max-md:hidden">
                <HeroAuth />
            </div>
            <div className="w-1/4">
                <NavbarAuth />
                {step === 1 && <ForgetPassword setStep={setStep} />}
                {step === 2 && <VerifyResetCode setStep={setStep} />}
                {step === 3 && <ResetPassword />}
                <FooterAuth />
            </div>
        </div>
    );
}
