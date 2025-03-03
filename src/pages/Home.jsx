import { useState } from "react"
import { SearchForm } from "../components/SearchForm.jsx"
import { JobList } from "../components/JobList.jsx"
import HeroImage from "../assets/HeroPageImage/heroPage.png"
import { HiOutlineSelector } from "react-icons/hi";

export default function Home() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    country: "",
  })

  const handleSearch = (newFilters) => {
    setFilters(newFilters)
  }

  return (
      <div className="min-h-screen">
        <section className="relative text-white py-32 md:py-44">
          <div className="container relative z-10 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-6">Discover Your Dream Career</h1>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Explore thousands of job opportunities with all the information <br/> you need. Its your future. Come find it.
                Manage all your job application <br/> from start to finish.
              </p>
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
                src={HeroImage}
                alt="Modern office"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#000000C4]" />
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <h2 className="text-3xl font-semibold mb-4 md:mb-0">Recommended jobs</h2>
              <div className="flex items-center gap-2 relative w-fit">
                  <select className="bg-white border rounded-full px-4 py-2 text-sm appearance-none pr-8">
                    <option>Most recent</option>
                    <option>Most relevant</option>
                  </select>
                <span className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <HiOutlineSelector/>
                </span>
              </div>
            </div>
            <JobList filters={filters}/>
          </div>
        </section>
      </div>
  )
}