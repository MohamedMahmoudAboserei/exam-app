'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from 'lucide-react';
import FinalLogo from "@/public/images/logo/Final Logo 1.png";
import dashboard from "@/public/images/icon/Vector.svg";
import quize from "@/public/images/icon/quize.svg";
import LogoutButton from "../Auth/LogoutButton/LogoutButton";

export default function NavbarSide() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return <>
        <nav className="md:hidden fixed top-0 left-0 right-0 bg-[#4461F2] z-50 flex items-center justify-between px-4 py-2">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white p-2"
            >
                <Menu className="h-6 w-6" />
            </button>

            <button className="text-white p-2">
                <Search className="h-6 w-6" />
            </button>

            <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                    src={FinalLogo}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                />
            </div>
        </nav>

        <nav className={`absolute top-0 left-0 right-0 w-56 bg-white shadow-lg transform 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 ease-in-out md:translate-x-0 md:relative z-40`}
        >
            <div className="px-6 py-4">
                <Image
                    src={FinalLogo}
                    alt="Final Logo"
                    width={151}
                    height={29}
                />
            </div>
            <div className="mt-6 space-y-4">
                <Link
                    href={'/'}
                    className="flex items-center px-6 mx-6 py-3 text-white bg-[#4461F2] rounded-md"
                >
                    <span className="mr-3">
                        <Image src={dashboard} alt="Dashboard" width={18} height={18} />
                    </span>
                    Dashboard
                </Link>
                <Link
                    href={'/quiz-history'}
                    className="flex items-center px-6 mx-6 py-3 text-gray-700 hover:bg-blue-100 rounded-md"
                >
                    <span className="mr-3">
                        <Image src={quize} alt="Dashboard" width={18} height={18} />
                    </span>
                    Quiz History
                </Link>
                <LogoutButton />
            </div>
        </nav>
    </>;
}