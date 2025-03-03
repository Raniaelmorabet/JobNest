import { useState, useEffect } from "react"
import { ArrowLeft, Heart, Clock, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ApplicationForm } from "../components/ApplicationForm.jsx"
import { Loader } from "../components/ui/loader"

// This would typically come from an API or database
const initialJobs = [
  {
    id: 1,
    title: "Sr. UX Designer",
    company: "Netflix",
    logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=40&h=40&auto=format&fit=crop&q=60",
    applicants: 14,
    description:
        "Netflix is one of the world's leading streaming entertainment service with over 238 million paid memberships in over 190 countries enjoying TV series, films and games across a wide variety of genres and languages. Members can play, pause, and resume watching as much as they want, anytime, anywhere, and can change their plans at any time.",
    tags: ["Expert", "Part-Time", "Remote"],
    salary: "$195/hr",
    postedAt: "5 days ago",
    category: "Design",
    location: "San Francisco, USA",
    experienceLevel: "Senior",
    founded: "January 6, 1997",
    paymentVerified: true,
    budget: "$65k+ Spend",
    services: ["Web & App Design", "Backend", "FedRAMP", "Compliance", "Frontend", "Offensive Security"],
    responsibilities: [
      "We want you to have a deep understanding of the tools and services that are offered through WB Games New York. While we don't expect you to write code, we are looking for a level of curiosity from a technical standpoint. We want you to explore and ask plenty of questions.",
      "You will work directly with our engineers to design user interfaces and dashboards around the complex services that they are delivering.",
      "We are expecting you to create wireframes, interactive prototypes, and documentation of the frontends that you will be designing.",
    ],
    requiredSkills: ["Wireframing", "Figma", "Adobe XD", "UX/UI Designer", "Team work"],
  },
  {
    id: 2,
    title: "Product designer",
    company: "Microsoft",
    logo: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=40&h=40&auto=format&fit=crop&q=60",
    applicants: 58,
    description: "Welcome to Lightspeed LA, the first U.S.-based, AAA game development studio...",
    tags: ["Intermediate", "Full-Time"],
    salary: "$210/hr",
    postedAt: "4 days ago",
    category: "Design",
    location: "Remote",
    experienceLevel: "Mid Level",
  },
  {
    id: 3,
    title: "Backend Dev.",
    company: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&h=40&auto=format&fit=crop&q=60",
    applicants: 21,
    description: "Coalfire is on a mission to make the world a safer place...",
    tags: ["Intermediate", "Full-Time"],
    salary: "$180/hr",
    postedAt: "3 days ago",
    category: "Development",
    location: "New York",
    experienceLevel: "Mid Level",
  },
]

export default function JobDetail() {
  const { id } = useParams()
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const job = initialJobs.find((j) => j.id.toString() === id)
      setSelectedJob(job)
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          <Loader size="lg" />
        </div>
    )
  }

  if (!selectedJob) {
    return <div>Job not found</div>
  }

  return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr_300px]">
            {/* Left Sidebar - Job Cards */}
            <div className="bg-white rounded-lg shadow-sm overflow-y-auto h-[calc(100vh-200px)]">
              <div className="divide-y">
                {initialJobs.map((job) => (
                    <Link to={`/jobs/${job.id}`} key={job.id}>
                      <Card
                          className={`rounded-none border-0 hover:bg-gray-50 transition-colors ${
                              job.id.toString() === id ? "bg-blue-50" : ""
                          }`}
                      >
                        <div className="p-4 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              <img
                                  src={job.logo || "/placeholder.svg"}
                                  alt={job.company}
                                  className="h-10 w-10 rounded object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-sm text-gray-500">
                                  {job.company} • {job.applicants} Applicants
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className={`
                              ${tag.includes("Expert") ? "bg-purple-100 text-purple-700" : ""}
                              ${tag.includes("Intermediate") ? "bg-violet-100 text-violet-700" : ""}
                              ${tag.includes("Part-Time") ? "bg-green-100 text-green-700" : ""}
                              ${tag.includes("Full-Time") ? "bg-blue-100 text-blue-700" : ""}
                              ${tag.includes("Remote") ? "bg-orange-100 text-orange-700" : ""}
                            `}
                                >
                                  {tag}
                                </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                          <div className="flex items-center justify-between pt-2">
                            <div className="font-semibold">{job.salary}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.postedAt}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                ))}
              </div>
            </div>

            {/* Center Content - Job Details */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold break-words mb-2">{selectedJob.title}</h1>
                    <div className="flex items-center gap-2 text-gray-500">
                      <img
                          src={selectedJob.logo || "/placeholder.svg"}
                          alt={selectedJob.company}
                          className="h-6 w-6 rounded-full object-cover"
                      />
                      <span>{selectedJob.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                    {selectedJob.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className={`
                        ${tag.includes("Expert") ? "bg-purple-100 text-purple-700" : ""}
                        ${tag.includes("Entry") ? "bg-violet-100 text-violet-700" : ""}
                        ${tag.includes("Mid-Level") ? "bg-blue-100 text-blue-700" : ""}
                        ${tag.includes("Part-Time") ? "bg-green-100 text-green-700" : ""}
                        ${tag.includes("Full-Time") ? "bg-blue-100 text-blue-700" : ""}
                        ${tag.includes("Remote") ? "bg-orange-100 text-orange-700" : ""}
                      `}
                        >
                          {tag}
                        </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">About the role</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                    <ul className="space-y-4">
                      {selectedJob.responsibilities?.map((item, i) => (
                          <li key={i} className="text-gray-600 leading-relaxed">
                            {item}
                          </li>
                      ))}
                    </ul>
                  </div>

                  {selectedJob.requiredSkills && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Required skills:</h2>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.requiredSkills.map((skill) => (
                              <Badge className='text-[#747576] bg-[#F0F4F2] border-none rounded-full py-1 px-3' key={skill} variant="outline">
                                {skill}
                              </Badge>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Right Sidebar - Company Info & Job Overview */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <img
                      src={selectedJob.logo || "/placeholder.svg"}
                      alt={selectedJob.company}
                      className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{selectedJob.company}</h2>
                  </div>
                  </div>
                  <h2 className="text-xl font-semibold ">Job Overview</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                      <p className="text-lg font-semibold">{selectedJob.salary}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Experience Level</h3>
                      <p>{selectedJob.experienceLevel}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p>{selectedJob.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Posted</h3>
                      <p>{selectedJob.postedAt}</p>
                    </div>
                  </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-2">Apply for this job</h2>
                <p className="text-gray-600 mb-4">
                  Ready to take the next step in your career? Apply now and join our team!
                </p>
                <Button className="w-full" size="lg" onClick={() => setShowApplicationForm(true)}>
                  Apply now
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {showApplicationForm && (
            <ApplicationForm jobTitle={selectedJob.title} onClose={() => setShowApplicationForm(false)} />
        )}
      </div>
  )
}