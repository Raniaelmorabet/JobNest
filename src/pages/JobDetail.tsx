import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Clock, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ApplicationForm } from "../components/ApplicationForm";
import { Loader } from "../components/ui/loader";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  picture: string;
  type: string[];
  wage: string;
  no_of_applicants: number;
  posted_at: string;
  category: string;
  responsibilities?: string[];
  required_skills?: string[];
  experience_level: string;
  location: string;
}

interface JobDetailParams {
  id: string;
}

export default function JobDetail() {
  const { id } = useParams<JobDetailParams>();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch job details from the API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
            `https://job-board-platform.onrender.com/api/job/${id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data: Job = await response.json();
        setSelectedJob(data); // Set the fetched job data

        // Fetch related jobs in the same category
        const categoryId = data.category;
        const relatedJobsResponse = await fetch(
            `https://job-board-platform.onrender.com/api/category/${categoryId}/jobs/`
        );
        if (!relatedJobsResponse.ok) {
          throw new Error("Failed to fetch related jobs");
        }
        const relatedJobsData: { results: Job[] } = await relatedJobsResponse.json();
        setRelatedJobs(relatedJobsData.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const filteredRelatedJobs = relatedJobs.filter(
      (job) => job.id.toString() !== id
  );

  // Function to extract specific sections from the description
  const extractSections = (description: string) => {
    const sections = {
      description: "",
      responsibilities: "",
      keySkills: "",
      howToApply: "",
    };

    // Split the description into lines
    const lines = description.split("\r\n");

    let currentSection: keyof typeof sections | null = null;

    lines.forEach((line) => {
      if (line.startsWith("## Job Description")) {
        currentSection = "description";
      } else if (line.startsWith("## Responsibilities")) {
        currentSection = "responsibilities";
      } else if (line.startsWith("## Key Skills")) {
        currentSection = "keySkills";
      } else if (line.startsWith("## How to Apply")) {
        currentSection = "howToApply";
      }

      if (currentSection && line.trim() !== "") {
        sections[currentSection] += line + "\n";
      }
    });

    return sections;
  };

  // Display loader while fetching data
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          <Loader size="lg" />
        </div>
    );
  }

  // Display error message if there's an error
  if (error) {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
    );
  }

  // Display message if job is not found
  if (!selectedJob) {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          <p>Job not found.</p>
        </div>
    );
  }

  // Extract the required sections from the description
  const { description, responsibilities, keySkills, howToApply } =
      extractSections(selectedJob.description);

  return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container px-4 py-8">
          {/* Back Button */}
          <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          {/* Job Details Grid */}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr_300px]">
            {/* Left Sidebar - Related Jobs */}
            <div className="overflow-y-auto h-[calc(100vh-200px)] lg:order-1 order-3">
              <div className="divide-y">
                {filteredRelatedJobs.length > 0 ? (
                    filteredRelatedJobs.map((job) => (
                        <Link to={`/jobs/${job.id}`} key={job.id}>
                          <Card
                              className={` mb-4 border border-black/10 hover:bg-gray-50 transition-colors ${
                                  job.id.toString() === id ? "bg-blue-50" : ""
                              }`}
                          >
                            <div className="p-4 space-y-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
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
                                      alt={job.title}
                                      className="h-16 w-16 rounded-lg object-cover"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-lg">
                                      {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {job.company} • {job.no_of_applicants}{" "}
                                      Applicants
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 ">
                                {selectedJob.type.map((type, index) => (
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
                                          <span className="bg-purple-100 text-purple-600 px-3 py-[2px] rounded-sm">
                                  Contract
                                </span>
                                      ) : (
                                          <span className="bg-gray-100 text-gray-700 px-3 py-[2px] rounded-sm">
                                  {type}
                                </span>
                                      )}
                                    </Badge>
                                ))}
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {job.description}
                              </p>
                              <div className="flex items-center justify-between pt-2">
                                <div className="font-semibold">${job.wage}</div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {new Date(job.posted_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">
                      No related jobs found.
                    </div>
                )}
              </div>
            </div>

            {/* Center Content - Job Details */}
            <div className="space-y-6 lg:order-2 order-1">
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold break-words mb-2">
                      {selectedJob.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500">
                      <img
                          src={selectedJob.picture || "/placeholder.svg"}
                          alt={selectedJob.title}
                          className="size-8 rounded-full object-cover"
                      />
                      <span>{selectedJob.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                    {selectedJob.type.map((type, index) => (
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
                              <span className="bg-purple-100 text-purple-600 px-3 py-[2px] rounded-sm">
                          Contract
                        </span>
                          ) : (
                              <span className="bg-gray-100 text-gray-700 px-3 py-[2px] rounded-sm">
                          {type}
                        </span>
                          )}
                        </Badge>
                    ))}
                  </div>
                </div>

                {/* Render the filtered sections */}
                <div className="space-y-8">
                  {/* Job Description */}
                  {selectedJob.description && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">
                          About the role
                        </h2>
                        {selectedJob.description}
                      </div>
                  )}

                  {/* Responsibilities */}
                  {selectedJob.responsibilities && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">
                          Responsibilities
                        </h2>
                        <ul className="space-y-4">
                          {selectedJob.responsibilities.map((item, index) => (
                              <li
                                  key={index}
                                  className="text-gray-600 leading-relaxed"
                              >
                                • {item}
                              </li>
                          ))}
                        </ul>
                      </div>
                  )}

                  {/* Required Skills */}
                  {selectedJob.required_skills && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">
                          Required skills:
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.required_skills.map((skill, index) => (
                              <Badge
                                  key={index}
                                  className="text-[#747576] bg-[#F0F4F2] border-none rounded-full py-1 px-3"
                                  variant="outline"
                              >
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
            <div className="space-y-6 lg:order-3 order-2">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <img
                      src={
                        selectedJob?.picture
                            ? selectedJob.picture
                                .replace("image/upload/", "")
                                .includes(".")
                                ? selectedJob.picture.replace("image/upload/", "")
                                : `${selectedJob.picture.replace(
                                    "image/upload/",
                                    ""
                                )}.png`
                            : "/placeholder.svg"
                      }
                      alt={selectedJob?.company}
                      className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {selectedJob.company}
                    </h2>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mt-4">Job Overview</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                    <p className="text-lg font-semibold">${selectedJob.wage}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Experience Level
                    </h3>
                    <p>
                      {selectedJob.experience_level === "entry" ? (
                          <span className="text-sm bg-violet-100 text-violet-700 px-3 py-[2px] rounded-sm">
                        Entry Level
                      </span>
                      ) : selectedJob.experience_level === "senior" ? (
                          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-[2px] rounded-sm">
                        Senior
                      </span>
                      ) : selectedJob.experience_level === "mid" ? (
                          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                        Mid Level
                      </span>
                      ) : (
                          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                        {selectedJob.experience_level}
                      </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p>{selectedJob.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Posted</h3>
                    <p>{new Date(selectedJob.posted_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>

              {/* Apply Button */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-2">Apply for this job</h2>
                <p className="text-gray-600 mb-4">
                  Ready to take the next step in your career? Apply now and join
                  our team!
                </p>
                <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowApplicationForm(true)}
                >
                  Apply now
                </Button>
              </Card>
            </div>
          </div>

          {/* Application Form Modal */}
          {showApplicationForm && (
              <ApplicationForm
                  jobTitle={selectedJob.title}
                  onClose={() => setShowApplicationForm(false)}
                  jobDetails={selectedJob}
              />
          )}
        </div>
      </div>
  );
}