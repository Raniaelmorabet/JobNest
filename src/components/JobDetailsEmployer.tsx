import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader } from "./ui/loader";
import { ApplicantCard } from "./applicant-card";
import React from "react";

export default function JobDetailsEmployer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [expandedApplicant, setExpandedApplicant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Fetch job details and applicants
  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      try {
        // Fetch job and applicants
        const response = await fetch(
            `https://job-board-platform.onrender.com/api/job/${id}/applicants/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch job and applicants");
        }

        const data = await response.json();
        setJob(data.results.job);
        setApplicants(data.results.applicants);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndApplicants();
  }, [id]);

  // Handle back to jobs navigation
  const handleBackToJobs = () => {
    navigate("/employer/jobs");
  };

  // Toggle applicant details expansion
  const toggleApplicantExpand = (applicantId) => {
    setExpandedApplicant((prev) => (prev === applicantId ? null : applicantId));
  };

  // Update application status
  const updateApplicationStatus = async (applicationId, status) => {
    const token = localStorage.getItem("token");

    try {
      // Find the applicant in the current state to get the required data
      const applicant = applicants.find((app) => app.id === applicationId);

      if (!applicant) {
        throw new Error("Applicant not found");
      }

      const requestData = {
        status,
        // resume_link: applicant.resume_link,
        // cover_letter: applicant.cover_letter,
        // job: applicant.job,
      };

      const response = await fetch(
          `https://job-board-platform.onrender.com/api/application/${applicationId}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
          }
      );

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      // Update the applicant's status in the local state
      setApplicants((prevApplicants) =>
          prevApplicants.map((app) =>
              app.id === applicationId ? { ...app, status } : app
          )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Filter applicants based on the selected status
  const filteredApplicants = applicants.filter((applicant) => {
    if (filter === "all") return true; // Show all applicants
    return applicant.status === filter; // Filter by status
  });

  // Show loader while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Show error message if no job data is found
  if (!job) {
    return <div>No job data found.</div>;
  }

  return (
      <div className="container mx-auto pt-20 pb-16">
        <div className="flex flex-col mt-7 gap-5 justify-between mb-6">
          <div className="w-full md:w-fit mb-4 md:mb-0 flex items-center">
            <Link
                to="/dashboard"
                className="inline-flex items-center gap-2  text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to jobs
            </Link>
          </div>
          <h1 className="text-2xl font-bold">
            {job?.title} - Applicants ({filteredApplicants.length})
          </h1>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
                src={
                  job?.picture
                      ? job.picture.replace('image/upload/', '').includes('.')
                          ? job.picture.replace('image/upload/', '')
                          : `${job.picture.replace('image/upload/', '')}.png`
                      : "/placeholder.svg"
                }
                alt={job?.company}
                className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{job?.title}</h2>
              <p className="text-gray-500 mb-2">
                {job?.company} • {job?.location}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-none p-0"
                >
                  {job?.experience_level === "entry" ? (
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
                </Badge>

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

                <Badge variant="outline" className="flex items-center gap-1">
                  ${job?.wage.toLocaleString()}
                </Badge>
              </div>
              <div className="text-gray-700">
                {job?.description.replace(/^## Job Description\s*\r?\n/, "")}
              </div>

              {job?.responsibilities && job.responsibilities.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Responsibilities:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
              )}

              {job?.required_skills && job.required_skills.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Required Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.required_skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                      ))}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </Card>

        <div className="mb-4 overflow-x-auto">
          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value)}>
            <TabsList className="flex-nowrap">
              <TabsTrigger value="all">All Applicants</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredApplicants.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No applicants found for the selected filter.
              </div>
          ) : (
              filteredApplicants.map((applicant) => (
                  <ApplicantCard
                      key={applicant.id}
                      applicant={{
                        ...applicant,
                        name: `${applicant.applicant.first_name} ${applicant.applicant.last_name}`,
                        email: applicant.applicant.email,
                        resume_url: applicant.resume_link,
                      }}
                      isExpanded={expandedApplicant === applicant.id}
                      onToggleExpand={() => toggleApplicantExpand(applicant.id)}
                      onUpdateStatus={(status) =>
                          updateApplicationStatus(applicant.id, status)
                      }
                  />
              ))
          )}
        </div>
      </div>
  );
}