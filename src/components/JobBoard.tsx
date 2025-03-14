import React, { useState, useEffect } from "react";
import { JobFilters } from "./JobFilters";

// Define the shape of a job object
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    wage: string;
    experience_level: string;
    description: string;
}

// Define the shape of the filters object
interface Filters {
    category: string | null;
    location: string | null;
    experienceLevel: string | null;
    search?: string;
    page?: number;
    page_size?: number;
    type?: string;
}

const JobBoard = (): JSX.Element => {
    // State for filters
    const [filters, setFilters] = useState<Filters>({
        category: null,
        location: null,
        experienceLevel: null,
    });

    // State for jobs
    const [jobs, setJobs] = useState<Job[]>([]);

    // Function to fetch jobs based on filters
    const fetchJobs = async (): Promise<void> => {
        const params = new URLSearchParams({
            search: filters.search || "",
            page: filters.page?.toString() || "1",
            page_size: filters.page_size?.toString() || "10",
            location: filters.location || "",
            type: filters.type || "",
            experience_level: filters.experienceLevel || "",
            category: filters.category || "",
        });

        try {
            const response = await fetch(
                `https://job-board-platform.onrender.com/api/job/categorized-jobs/?${params}`
            );
            const data = await response.json();
            setJobs(data.results);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Fetch jobs whenever filters change
    useEffect(() => {
        fetchJobs();
    }, [filters]);

    return (
        <div className="container mx-auto p-4">
            {/* Job Filters Component */}
            <JobFilters filters={filters} onFilterChange={setFilters} />

            {/* Job Listings */}
            <div className="mt-8">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.id} className="border p-4 mb-4 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold">{job.title}</h2>
                            <p className="text-gray-600">{job.company}</p>
                            <p className="text-gray-600">{job.location}</p>
                            <p className="text-gray-600">${job.wage}</p>
                            <p className="text-gray-600">{job.experience_level}</p>
                            <div
                                className="mt-2 text-gray-700"
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default JobBoard;