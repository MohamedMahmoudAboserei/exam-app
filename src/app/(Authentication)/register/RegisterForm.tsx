'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/store/store";
import { register } from "@/store/Authentication/registerSlice";
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
        username: z.string().min(4, "Must be at least 4 characters").max(25, "Must be less than 25 characters"),
        firstName: z.string().min(3, "Must be at least 3 characters").max(20, "Must be less than 20 characters"),
        lastName: z.string().min(3, "Must be at least 3 characters").max(20, "Must be less than 20 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        rePassword: z.string().min(6, "Password must be at least 6 characters"),
        phone: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.rePassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["rePassword"],
                message: "Passwords must match",
            });
        }
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch<storeDispatch>();
    const { push } = useRouter();
    const { isLoading, error: registerError } = useSelector((state: storeState) => state.registerReducer);

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        const result = await dispatch(register(data));
        if (result.meta.requestStatus === "fulfilled") {
            push("/sign-in");
        }
    };

    return (
        <form className="space-y-4 my-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="text"
                    {...formRegister("username")}
                    placeholder="Enter your username"
                    className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.username ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div className="flex space-x-2">
                <div>
                    <input
                        type="text"
                        {...formRegister("firstName")}
                        placeholder="Enter your first name"
                        className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        {...formRegister("lastName")}
                        placeholder="Enter your last name"
                        className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
            </div>
            <div>
                <input
                    type="email"
                    {...formRegister("email")}
                    placeholder="Enter your email"
                    className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    {...formRegister("password")}
                    placeholder="Enter your password"
                    className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[28%] text-gray-500"
                >
                    {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                </button>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...formRegister("rePassword")}
                    placeholder="Confirm your password"
                    className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.rePassword ? "border-red-500" : "border-gray-300"}`}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[28%] text-gray-500"
                >
                    {showConfirmPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                </button>
                {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
            </div>
            <div>
                <input
                    type="text"
                    {...formRegister("phone")}
                    placeholder="Enter your phone number"
                    className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <p className="text-center">
                Already have an account? <Link href="/sign-in" className="text-[#4461F2]">Login</Link>
            </p>
            {registerError && <p className="text-red-500 text-center">{registerError}</p>}
            <button
                type="submit"
                className={`w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition`}
                disabled={isLoading}
            >
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Create Account"}
            </button>
        </form>
    );
}
