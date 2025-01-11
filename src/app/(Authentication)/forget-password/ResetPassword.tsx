import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/store/Authentication/authSlice";

const schema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function ResetPassword({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (values: FormData) => {
        await dispatch(resetPassword(values));
        if (localStorage.getItem("token")) {
            push("/");
        }
        setStep(3);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-8">
            <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
            <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-2xl shadow-xl focus:outline-[#2563eb] mb-4"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <input
                {...register("newPassword")}
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 border rounded-2xl shadow-xl focus:outline-[#2563eb] mb-4"
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                Reset Password
            </button>
        </form>
    );
}
