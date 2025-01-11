import HeroAuth from "@/components/Auth/HeroAuth/HeroAuth";
import NavbarAuth from "@/components/Auth/NavbarAuth/NavbarAuth";
import FooterAuth from "@/components/Auth/FooterAuth/FooterAuth";
import dynamic from "next/dynamic";

const SigninForm = dynamic(() => import("./SigninForm"), { ssr: false });

export default function SigninPage() {
    return (
        <div className="container flex mx-auto w-full min-h-screen items-center justify-around">
            <div className="max-md:hidden">
                <HeroAuth />
            </div>
            <div className="md:w-1/4 max-md:w-11/12">
                <NavbarAuth />
                <h3 className="text-3xl text-[#4461F2]">Sign in</h3>
                <SigninForm />
                <FooterAuth />
            </div>
        </div>
    );
}
