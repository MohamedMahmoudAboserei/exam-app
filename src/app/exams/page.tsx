import NavbarSide from "@/components/NavbarSide/NavbarSide";
import HeaderSections from "@/components/HeaderSections/HeaderSections";
import ExamsList from "@/components/Exams/ExamsList";

interface ExamsPageProps {
    searchParams: {
        subject: string;
    };
}

export default function ExamsPage({ searchParams }: ExamsPageProps) {
    const subjectId = searchParams.subject;
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") ?? "" : "";

    return (
        <div className="relative flex mt-4">
            <NavbarSide />
            <main className="w-[86%] mx-auto space-y-4">
                <HeaderSections />
                <div>
                    <h1 className="text-2xl font-bold text-center mb-4">Exams</h1>
                    <ExamsList subjectId={subjectId} />
                </div>
            </main>
        </div>
    );
}