import NavbarSide from "@/components/NavbarSide/NavbarSide";
import HeaderSections from "@/components/HeaderSections/HeaderSections";
import UserProfile from "@/components/UserProfile/UserProfile";
import SubjectsPage from "@/components/Subjects/Subjects";

export default function Home() {
  return <>
    <div className="relative flex flex-col md:flex-row">
      <NavbarSide />
      <main className="w-full md:w-[86%] mx-auto space-y-4 pt-16 md:pt-4 px-4">
        <HeaderSections />
        <UserProfile />
        <SubjectsPage />
      </main>
    </div>
  </>;
}
