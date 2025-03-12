import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { JobFilters } from "../components/JobFilters";
import { Pagination } from "../components/Pagination";
import { Loader } from "../components/ui/loader";
import { Link } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

// Define the shape of a job object
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    wage?: string;
    experience_level: string;
    description: string;
    picture?: string;
    no_of_applicants?: number;
    type?: string[];
    posted_at: string;
}

// Define the shape of the filters object
interface Filters {
    keyword?: string | null;
    location?: string | null;
    category?: string | null;
    experienceLevel?: string | null;
}

// Define the props for the JobList component
interface JobListProps {
    filters: Filters;
}

export function JobList({ filters: initialFilters }: JobListProps): JSX.Element {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [locations, setLocations] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");

    // Sync initialFilters with internal state
    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    // Fetch all jobs from the server
    const fetchJobs = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                "https://job-board-platform.onrender.com/api/job/",
                {
                    params: {
                        page: 1,
                        page_size: 1000,
                    },
                }
            );

            setAllJobs(response.data.results || []);
            setFilteredJobs(response.data.results || []);
            setTotalPages(Math.ceil(response.data.results.length / ITEMS_PER_PAGE));
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to fetch jobs"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch jobs on component mount
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Apply filters locally
    useEffect(() => {
        const filtered = allJobs.filter((job) => {
            const matchesKeyword = filters.keyword
                ? job.title.toLowerCase().includes(filters.keyword.toLowerCase())
                : true;
            const matchesLocation = filters.location
                ? job.location === filters.location
                : true;
            const matchesCategory = filters.category
                ? job.category === filters.category
                : true;

            // Map filter values to job data values
            const experienceLevelMap: Record<string, string> = {
                "Entry Level": "entry",
                "Mid Level": "mid",
                Senior: "senior",
            };

            const matchesExperienceLevel = filters.experienceLevel
                ? job.experience_level === experienceLevelMap[filters.experienceLevel]
                : true;

            return (
                matchesKeyword &&
                matchesLocation &&
                matchesCategory &&
                matchesExperienceLevel
            );
        });

        setFilteredJobs(filtered);
        setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
        setCurrentPage(1);
    }, [filters, allJobs]);

    // Fetch locations from API
    const fetchLocations = async (): Promise<void> => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://job-board-platform.onrender.com/api/job/locations/",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLocations(response.data.results);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    // Fetch categories from API
    const fetchCategories = async (): Promise<void> => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://job-board-platform.onrender.com/api/category/",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCategories(response.data.results);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Initial data fetching
    useEffect(() => {
        fetchLocations();
        fetchCategories();
    }, []);

    // Handle filter changes
    const handleFilterChange = (newFilters: Filters): void => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    // Handle page changes
    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    // Clear all filters
    const clearFilters = (): void => {
        setFilters({
            keyword: null,
            location: null,
            category: null,
            experienceLevel: null,
        });
    };

    // Error display component
    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                ⚠️ Error: {error}
                <Button className="mt-4" onClick={() => fetchJobs()}>
                    Retry
                </Button>
            </div>
        );
    }

    // Paginate jobs
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
            <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                locations={locations}
                categories={categories}
                clearFilters={clearFilters}
            />

            <div className="space-y-8 md:pb-16">
                {loading ? (
                    <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
                        <Loader size="lg" />
                    </div>
                ) : (
                    <>
                        {!loading && filteredJobs.length !== 0 ? (
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {paginatedJobs.map((job) => (
                                    <Link to={`/jobs/${job.id}`} key={job.id}>
                                        <Card className="flex flex-col h-full p-6 hover:shadow-lg transition-shadow">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex gap-4">
                                                        <img
                                                            src={
                                                                job?.picture
                                                                    ? job.picture
                                                                        .replace("image/upload/", "")
                                                                        .includes(".")
                                                                        ? job.picture.replace("image/upload/", "")
                                                                        : `${job.picture.replace(
                                                                            "image/upload/",
                                                                            ""
                                                                        )}.png`
                                                                    : "/placeholder.svg"
                                                            }
                                                            alt={job?.company}
                                                            className="size-14 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold text-lg">
                                                                {job.title}
                                                            </h3>
                                                            <p className="text-gray-500">
                                                                {job.company.slice(0, 15) +
                                                                    (job.company.length > 15 ? "..." : "")}{" "}
                                                                • {job.no_of_applicants || 0} Applicants
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-gray-600 mb-4 line-clamp-2">
                                                    {job.description.replace(
                                                        /^## Job Description\s*\r?\n/,
                                                        ""
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.type?.map((type, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="bg-transparent py-0 px-0"
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
                                                            ) : type === "remote" ? (
                                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-[2px] rounded-sm">
                                  Remote
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
                                                        className="bg-transparent py-0 px-0"
                                                    >
                            <span className="rounded-sm">
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
                            </span>
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <div className="font-semibold text-lg">
                                                    {job.wage ? `${job.wage}$` : "Salary not specified"}
                                                </div>
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
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No jobs found matching your criteria
                            </div>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
}