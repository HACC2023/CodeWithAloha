import Navbar from "../components/Navbar";
import ReportForm from "../components/ReportForm";

export default function ReportPage() {
  return (
    <>

      <section className="h-fit custom-background">

        <Navbar />
        <div className="absolute h-full top-0 left-0 bottom-0 -z-10">
          <div className="custom-clip-path bg-white/10"></div>
        </div>

        <ReportForm />
      </section>
    </>
  );
}
