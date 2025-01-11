import React from "react";
import { motion } from "framer-motion";

interface ErrorProps {
    error: string;
}

export default function ErrorComponent({ error }: ErrorProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-600"
        >
            <p>Error: {error}</p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Try again
            </motion.button>
        </motion.div>
    );
}
