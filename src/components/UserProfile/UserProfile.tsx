"use client";

import { Flag, Clock, CheckCircle } from 'lucide-react';
import person from "@/public/images/person/Frame 40.png";
import Image from 'next/image';

export default function UserProfile() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        src={person}
                        alt="Mohamed Mahmoud"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 w-full">
                    <h2 className="text-2xl font-semibold text-[#4461F2] mb-1">
                        Mohamed Mahmoud
                    </h2>
                    <p className="text-gray-500 mb-4">Voluptatem aut</p>

                    <div className="w-full h-2 bg-gray-100 rounded-full mb-6">
                        <div
                            className="h-full bg-[#4461F2] rounded-full"
                            style={{ width: '70%' }}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <div className="flex items-center gap-2">
                                <Flag className="w-5 h-5 text-[#4461F2]" />
                                <span className="text-2xl font-semibold text-[#4461F2]">27</span>
                            </div>
                            <p className="text-sm text-gray-500">Quiz Passed</p>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-1">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#4461F2]" />
                                <span className="text-2xl font-semibold text-[#4461F2]">13 min</span>
                            </div>
                            <p className="text-sm text-gray-500">Fastest Time</p>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-1">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#4461F2]" />
                                <span className="text-2xl font-semibold text-[#4461F2]">200</span>
                            </div>
                            <p className="text-sm text-gray-500">Correct Answers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

