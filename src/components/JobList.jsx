import { useState, useEffect, useCallback } from "react"
import { Heart, Clock } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { JobFilters } from "../components/JobFilters.jsx"
import { Pagination } from "../components/Pagination.jsx"
import { Loader } from "../components/ui/loader"
import { Link } from "react-router-dom"
import Spotify from "../assets/JobCardsImages/Spotify.jpg"
import Netflix from "../assets/JobCardsImages/Netflix.jpeg"
import Meta from "../assets/JobCardsImages/metaMask.webp"
import Slack from "../assets/JobCardsImages/Slack.jpg"
import Adobe from "../assets/JobCardsImages/Adobe.png"
import Twitter from "../assets/JobCardsImages/twitter.jpg"
import Google from "../assets/JobCardsImages/google.webp"
import Apple from "../assets/JobCardsImages/apple.png"
import Amazon from "../assets/JobCardsImages/amazon.jpg"
import Microsoft from "../assets/JobCardsImages/Microsoft.jpg"

const initialJobs = [
  {
    id: 1,
    title: "UI Designer",
    company: "Twitter",
    logo: Twitter,
    applicants: 41,
    description: "Create beautiful and intuitive user interfaces for millions...",
    tags: ["Mid Level", "Full-Time"],
    salary: "$160/hr",
    postedAt: "4 days ago",
    category: "Design",
    location: "San Francisco",
    experienceLevel: "Mid Level",
  },
  {
    id: 2,
    title: "Marketing Director",
    company: "Adobe",
    logo: Adobe,
    applicants: 23,
    description: "Lead our global marketing initiatives and brand strategy...",
    tags: ["Senior", "Full-Time"],
    salary: "$210/hr",
    postedAt: "1 week ago",
    category: "Marketing",
    location: "San Jose",
    experienceLevel: "Senior",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Microsoft",
    logo: Microsoft,
    applicants: 25,
    description: "Doing the right thing for investors is what we're all about at Vanguard...",
    tags: ["Mid Level", "Full-Time"],
    salary: "$200/hr",
    postedAt: "12 days ago",
    category: "Technology",
    location: "New York",
    experienceLevel: "Mid Level",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Apple",
    logo: Apple,
    applicants: 45,
    description: "Lead product development for our innovative technology products...",
    tags: ["Senior", "Full-Time"],
    salary: "$220/hr",
    postedAt: "1 week ago",
    category: "Product",
    location: "Cupertino",
    experienceLevel: "Senior",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Amazon",
    logo: Amazon,
    applicants: 28,
    description: "Apply your expertise in machine learning and data analysis...",
    tags: ["Mid Level", "Full-Time"],
    salary: "$175/hr",
    postedAt: "3 days ago",
    category: "Data",
    location: "Seattle",
    experienceLevel: "Mid Level",
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "Slack",
    logo: Slack,
    applicants: 37,
    description: "Build scalable backend systems for our messaging platform...",
    tags: ["Senior", "Remote"],
    salary: "$195/hr",
    postedAt: "6 days ago",
    category: "Technology",
    location: "Remote",
    experienceLevel: "Senior",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "Spotify",
    logo: Spotify,
    applicants: 19,
    description: "Help us build and maintain our cloud infrastructure...",
    tags: ["Senior", "Remote"],
    salary: "$190/hr",
    postedAt: "5 days ago",
    category: "Technology",
    location: "Remote",
    experienceLevel: "Senior",
  },
  {
    id: 10,
    title: "Frontend Developer",
    company: "Google",
    logo: Google,
    applicants: 32,
    description: "Join our team to build the next generation of web applications...",
    tags: ["Senior", "Full-Time"],
    salary: "$180/hr",
    postedAt: "2 days ago",
    category: "Technology",
    location: "Mountain View",
    experienceLevel: "Senior",
  },
];

const ITEMS_PER_PAGE = 6

export function JobList({ filters: initialFilters }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const applyFilters = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filteredJobs = initialJobs.filter((job) => {
        const keywordMatch =
            !filters.keyword ||
            job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.keyword.toLowerCase());
        const locationMatch = !filters.location || job.location === filters.location;
        const categoryMatch = !filters.category || job.category === filters.category;
        const experienceLevelMatch =
            !filters.experienceLevel || job.experienceLevel === filters.experienceLevel;
        return keywordMatch && locationMatch && categoryMatch && experienceLevelMatch;
      });
      setJobs(filteredJobs);
      setCurrentPage(1);
      setLoading(false);
    }, 1000);
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="space-y-8">
          {/*{loading ? (*/}
          {/*    <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">*/}
          {/*      <Loader size="lg"/>*/}
          {/*    </div>*/}
          {/*) : (*/}
              <>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedJobs.map((job) => (
                      <Link to={`/jobs/${job.id}`} key={job.id}>
                        <Card className="flex flex-col h-full p-6 hover:shadow-lg transition-shadow">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex gap-4">
                                <img
                                    src={job.logo || "/placeholder.svg"}
                                    alt={job.company}
                                    className="h-12 w-12 rounded-lg object-cover"
                                />
                                <div>
                                  <h3 className="font-semibold text-lg">{job.title}</h3>
                                  <p className="text-gray-500">
                                    {job.company} • {job.applicants} Applicants
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {job.tags.map((tag) => (
                                  <Badge
                                      key={tag}
                                      variant="secondary"
                                      className={`
                              ${tag.includes("Expert") ? "bg-purple-100 text-purple-700" : ""}
                              ${tag.includes("Entry") ? "bg-violet-100 text-violet-700" : ""}
                              ${tag.includes("Mid Level") ? "bg-blue-100 text-blue-700" : ""}
                              ${tag.includes("Part-Time") ? "bg-green-100 text-green-700" : ""}
                              ${tag.includes("Full-Time") ? "bg-blue-100 text-blue-700" : ""}
                              ${tag.includes("Remote") ? "bg-orange-100 text-orange-700" : ""}
                              ${tag.includes("Senior") ? "bg-purple-100 text-purple-700" : ""}
                            `}
                                  >
                                    {tag}
                                  </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="font-semibold text-lg">
                              {job.salary.split('/')[0]}
                              <span className="text-gray-400 ">/{job.salary.split('/')[1]}</span>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {job.postedAt}
                            </div>
                          </div>
                        </Card>
                      </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
              </>
          {/*)}*/}
        </div>
      </div>
  );
}