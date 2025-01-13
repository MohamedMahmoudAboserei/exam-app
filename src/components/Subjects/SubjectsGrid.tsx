"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, resetSubjects } from "@/store/Subjects/subjectsSlice";
import { storeDispatch, storeState } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";

export default function SubjectsGrid() {
    const dispatch = useDispatch<storeDispatch>();
    const observerTarget = useRef(null);
    const router = useRouter();
    const { items, loading, error, hasMore, currentPage } = useSelector(
        (state: storeState) => state.subjects
    );

    useEffect(() => {
        dispatch(resetSubjects());
        dispatch(fetchSubjects(1));
        return () => {
            dispatch(resetSubjects());
        };
    }, [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    dispatch(fetchSubjects(currentPage + 1));
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, dispatch, currentPage]);

    if (loading && items.length === 0) return <Loader />;

    return (
        <>
            <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-[#4461F2]">Quizes</h2>
                </div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {items.map((subject) => (
                            <motion.div
                                key={subject._id}
                                className="group relative h-[300px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                onClick={() => router.push(`/exams?subject=${subject._id}`)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image
                                    src={subject.icon}
                                    alt={subject.name}
                                    fill
                                    className="absolute inset-0 bg-cover bg-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 className="text-lg font-semibold mb-1">{subject.name}</h4>
                                    <p className="text-sm text-white/90">
                                        Voluptatem aut ut dignissimos blanditiis
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {loading && (
                    <div className="flex justify-center my-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4461F2]"></div>
                    </div>
                )}

                <div ref={observerTarget} className="h-10" />
            </div>
        </>
    );
}

