"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, resetSubjects } from "@/store/Subjects/subjectsSlice";
import { storeDispatch, storeState } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

export default function SubjectsGrid() {
    const dispatch = useDispatch<storeDispatch>();
    const observerTarget = useRef(null);
    const router = useRouter();
    const { items, loading, error, hasMore, currentPage } = useSelector((state: storeState) => state.subjects);

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

    const handleImageClick = (id: string) => {
        router.push(`/exams?subject=${id}`);

    };

    if (loading && items.length === 0) {
        return <Loader />;
    }

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {items.map((subject) => (
                        <motion.div
                            key={subject._id}
                            className="relative rounded-xl overflow-hidden shadow-lg group h-[250px] cursor-pointer"
                            onClick={() => handleImageClick(subject._id)}
                        >
                            <Image
                                src={subject.icon}
                                alt={subject.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 bg-blue-600 bg-opacity-40 backdrop-blur-sm p-6 text-white"
                            >
                                <h4 className="text-lg font-bold mb-2">{subject.name}</h4>
                                <p className="text-sm opacity-90">Voluptatem aut ut dignissimos blanditiis</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center my-8"
                >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </motion.div>
            )}

            <div ref={observerTarget} className="h-10" />
        </>
    );
}
