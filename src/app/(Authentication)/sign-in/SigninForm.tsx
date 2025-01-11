"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/store/store";
import { login } from "@/store/Authentication/authSlice";

const SigninSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

type SigninFormValues = z.infer<typeof SigninSchema>;

export default function SigninForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { push } = useRouter();
    const dispatch = useDispatch<storeDispatch>();
    const { isLoading } = useSelector((state: storeState) => state.authReducer);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormValues>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");
        if (savedEmail && savedPassword) {
            setRememberMe(true);
        }
    }, []);

    const onSubmit = async (values: SigninFormValues) => {
        try {
            await dispatch(login(values)).unwrap();
            if (localStorage.getItem("token")) {
                if (rememberMe) {
                    localStorage.setItem("email", values.email);
                    localStorage.setItem("password", values.password);
                } else {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                }
                push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <form className="space-y-4 my-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
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
            <div className="flex justify-between items-center">
                <div className="flex items-center my-4">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="mr-2"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
                </div>
                <p className="text-right">
                    <a href="/forget-password" className="text-[#4461F2]">Recover Password?</a>
                </p>
            </div>
            <button
                type="submit"
                className={`w-full bg-[#2563eb] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition ${isLoading && "cursor-not-allowed"}`}
                disabled={isLoading}
            >
                {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i> : "Sign in"}
            </button>
        </form>
    );
}
