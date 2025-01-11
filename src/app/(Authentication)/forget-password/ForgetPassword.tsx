import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { forgetPassword } from "@/store/Authentication/authSlice";

const schema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
});

type FormData = z.infer<typeof schema>;

export default function ForgetPassword({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });


    const onSubmit = async (values: FormData) => {
        await dispatch(forgetPassword(values));
        setStep(2);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-8">
            <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
            <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2]"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                Send Reset Code
            </button>
        </form>
    );
}
