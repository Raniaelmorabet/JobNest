import { Button } from "../ui/button"
import HeroImage from "../../assets/HeroPageImage/heroPage.png"
export function EmployerHero() {
  return (
      <section className="relative text-white py-32 md:py-44">
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-6">Welcome to Your Employer Dashboard</h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Manage your job listings, track applicants, and find the perfect candidates for your team.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" size="lg">
              Post a New Job
            </Button>
            <Button variant="outline" size="lg">
              View Applicants
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
              src={HeroImage}
              alt="Modern office"
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#000000C4]"/>
        </div>
      </section>
  )
}

