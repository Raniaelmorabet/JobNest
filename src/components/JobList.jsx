import {useState, useEffect, useCallback} from "react";
import {Heart, Clock, MapPin} from "lucide-react";
import {Badge} from "../components/ui/badge";
import {Button} from "../components/ui/button";
import {Card} from "../components/ui/card";
import {JobFilters} from "../components/JobFilters.jsx";
import {Pagination} from "../components/Pagination.jsx";
import {Loader} from "../components/ui/loader";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

export function JobList({filters: initialFilters}) {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState(initialFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    // Sync initialFilters with internal state
    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    // Fetch jobs with filters applied
    const fetchJobs = useCallback(async (page) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get("https://job-board-platform.onrender.com/api/job/", {
                params: {
                    page,
                    page_size: ITEMS_PER_PAGE,
                    search: filters.keyword,
                    location: filters.location,
                    category: filters.category,
                    experience_level: filters.experienceLevel
                }
            });

            setJobs(response.data.results || []);
            setTotalPages(Math.ceil(response.data.count / ITEMS_PER_PAGE));
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Fetch jobs when page or filters change
    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage, filters, fetchJobs]);

    // Fetch locations from API
    const fetchLocations = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://job-board-platform.onrender.com/api/job/locations/",
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setLocations(response.data.results);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://job-board-platform.onrender.com/api/category/",
                {headers: {Authorization: `Bearer ${token}`}}
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
    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({...prev, ...newFilters}));
        setCurrentPage(1);
    };

    // Handle page changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Error display component
    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                ⚠️ Error: {error}
                <Button
                    className="mt-4"
                    onClick={() => fetchJobs(currentPage)}
                >
                    Retry
                </Button>
            </div>
        );
    }

    // Empty state
    if (!loading && jobs.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No jobs found matching your criteria
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
            <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                locations={locations}
                categories={categories}
            />

            <div className="space-y-8 md:pb-16">
                {loading ? (
                    <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
                        <Loader size="lg"/>
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
                                                            {job.title}
                                                        </h3>
                                                        <p className="text-gray-500">
                                                            {job.company} • {job.no_of_applicants || 0} Applicants
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-gray-600 mb-4 line-clamp-2">
                                                <ReactMarkdown>
                                                    {job.description.replace(/^## Job Description\s*\r?\n/, "")}
                                                </ReactMarkdown>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {job.type?.map((type, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="bg-transparent py-0 px-0"
                                                    >
                                                        {type === "full-time" ? (
                                                            <span
                                                                className="bg-green-100 text-green-700 px-3 py-[2px] rounded-sm">
                                      Full Time
                                    </span>
                                                        ) : type === "part-time" ? (
                                                            <span
                                                                className="bg-orange-100 text-orange-700 px-3 py-[2px] rounded-sm">
                                    Part Time
                                    </span>
                                                        ) : type === "contract" ? (
                                                            <span
                                                                className="bg-red-100 text-red-700 px-3 py-[2px] rounded-sm">
                                    Contract
                                    </span>
                                                        ) : (
                                                            <span
                                                                className="bg-gray-100 text-gray-700 px-3 py-[2px] rounded-sm">
                                      {type}
                                      </span>
                                                        )}
                                                    </Badge>
                                                ))}
                                                <Badge variant="secondary" className="bg-transparent py-0 px-0">
          <span className="bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
            {job.experience_level || 'N/A'}
          </span>
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="font-semibold text-lg">
                                                {job.wage ? `${job.wage}$` : 'Salary not specified'}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                <Clock className="h-4 w-4"/>
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