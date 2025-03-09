import { useState, useEffect, useCallback } from "react";
import { Heart, Clock } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { JobFilters } from "../components/JobFilters.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { Loader } from "../components/ui/loader";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ITEMS_PER_PAGE = 6;

export function JobList({ filters: initialFilters }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  // Fetch jobs with filters applied
  const fetchJobs = async (page) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        page_size: ITEMS_PER_PAGE,
        ...(filters.category && { category: filters.category }),
        ...(filters.location && { location: filters.location }),
        ...(filters.experienceLevel && {
          experience_level: filters.experienceLevel,
        }),
      }).toString();

      const response = await fetch(
        `https://job-board-platform.onrender.com/api/job/?${queryParams}`
      );
      const data = await response.json();
      setJobs(data.results || []);

      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://job-board-platform.onrender.com/api/job/locations/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLocations(data.results);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://job-board-platform.onrender.com/api/category/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCategories(data.results);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch jobs when page or filters change
  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage, filters]);

  // Fetch locations and categories on component mount
  useEffect(() => {
    fetchLocations();
    fetchCategories();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
      {/* Job Filters */}
      <JobFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        locations={locations}
        categories={categories}
      />

      {/* Job List */}
      <div className="space-y-8 md:pb-16">
        {loading ? (
          <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
            <Loader size="lg" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Link to={`/jobs/${job.id}`} key={job.id}>
                  <Card className="flex flex-col h-full p-6 hover:shadow-lg transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                          <img
                            src={job.picture || "/placeholder.svg"}
                            alt={job.company}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">
                              {job.title.split(" ").slice(0, 2).join(" ")}
                              {job.title.split(" ").length > 2 ? "..." : ""}
                            </h3>
                            <p className="text-gray-500">
                              {job.company.split(" ").length > 1
                                ? job.company.split(" ")[0] + " ..."
                                : job.company}{" "}
                              • {job.no_of_applicants || 0} Applicants
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {/* <ReactMarkdown> */}
                        {job.description.replace(
                          /^## Job Description\s*\r?\n/,
                          ""
                        )}
                        {/* </ReactMarkdown> */}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {/* <Badge variant="secondary" className={"bg-transparent py-0 px-0"}>
                                {job.experience_level === "entry" ? (
                                    <span className="bg-violet-100 text-violet-700 px-3 py-[2px] rounded-sm">
                              Entry Level
                            </span>
                                ) : job.experience_level === "senior" ? (
                                    <span className="bg-purple-100 text-purple-700 px-3 py-[2px] rounded-sm">
                              Senior
                            </span>
                                ) : job.experience_level === "mid" ? (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                              Mid Level
                            </span>
                                ) : (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                              {job.experience_level}
                            </span>
                                )}
                              </Badge> */}

                        {job.type &&
                          job.type.map((type, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={"bg-transparent py-0 px-0"}
                            >
                              {type === "full-time" ? (
                                <span className="bg-green-100 text-green-700 px-3 py-[2px] rounded-sm">
                                  Full Time
                                </span>
                              ) : type === "part-time" ? (
                                <span className="bg-orange-100 text-orange-700 px-3 py-[2px] rounded-sm">
                                  Part Time
                                </span>
                              ) : type === "contract" ? (
                                <span className="bg-red-100 text-red-700 px-3 py-[2px] rounded-sm">
                                  Contract
                                </span>
                              ) : type === "internship" ? (
                                <span className="bg-yellow-100 text-yellow-900 px-3 py-[2px] rounded-sm">
                                  Internship
                                </span>
                              ) : (
                                <span className="bg-gray-100 text-gray-700 px-3 py-[2px] rounded-sm">
                                  {type}
                                </span>
                              )}
                            </Badge>
                          ))}
                        <Badge
                          variant="secondary"
                          className={"bg-transparent py-0 px-0"}
                        >
                          {job.experience_level === "entry" ? (
                            <span className=" bg-gray-100 text-gray-700 px-3 py-[2px] rounded-sm">
                              Entry Level
                            </span>
                          ) : job.experience_level === "senior" ? (
                            <span className=" bg-purple-100 text-purple-700 px-3 py-[2px] rounded-sm">
                              Senior
                            </span>
                          ) : job.experience_level === "mid" ? (
                            <span className=" bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                              Mid Level
                            </span>
                          ) : (
                            <span className=" bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                              {job.experience_level}
                            </span>
                          )}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="font-semibold text-lg">{job.wage}$</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {new Date(job.posted_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
