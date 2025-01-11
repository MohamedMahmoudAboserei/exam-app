import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { verifyResetCode } from "@/store/Authentication/authSlice";

const schema = z.object({
    resetCode: z.string().length(6, "Reset code must be 6 digits").nonempty("Reset code is required"),
});

type FormData = z.infer<typeof schema>;

export default function VerifyResetCode({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (values: FormData) => {
        await dispatch(verifyResetCode(values));
        setStep(3);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-8">
            <h2 className="text-2xl font-semibold text-gray-800">Verify Reset Code</h2>
            <input
                {...register("resetCode")}
                placeholder="Enter reset code"
                className="w-full p-3 border rounded-2xl shadow-xl focus:outline-[#2563eb] mb-4"
            />
            {errors.resetCode && <p className="text-red-500 text-sm">{errors.resetCode.message}</p>}
            <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                Verify Code
            </button>
        </form>
    );
}
