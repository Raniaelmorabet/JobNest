import { Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JobCard } from "@/components/job-card";
import { JobForm } from "@/components/job-form";
import { SuccessToast } from "@/components/success-toast";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { Pagination } from "./Pagination";
import { useNavigate } from "react-router-dom";
import { Loader } from "./ui/loader";
import React from "react";

export function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [totalApplicants, setTotalApplicants] = useState<number | null>(null);
  const [totalJobs, setTotalJobs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [categories, setCategories] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch jobs from the API
  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://job-board-platform.onrender.com/api/job/list-total-jobs/?search=${searchTerm}&page=${page}&page_size=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch categories from the API
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://job-board-platform.onrender.com/api/category/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch industries from the API
  const fetchIndustries = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://job-board-platform.onrender.com/api/industry/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch industries");
      }

      const data = await response.json();
      setIndustries(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories();
    fetchIndustries();
  }, [searchTerm, page, pageSize]);

  // Fetch total applicants and total jobs
  useEffect(() => {
    const fetchTotalApplicants = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await fetch(
          "https://job-board-platform.onrender.com/api/job/total-applicants/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTotalApplicants(data.all_applicants);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchTotalJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await fetch(
          "https://job-board-platform.onrender.com/api/job/total-jobs/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTotalJobs(data.total_jobs);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTotalJobs();
    fetchTotalApplicants();
  }, []);

  // Handle job deletion
  const handleConfirmDelete = (e, job) => {
    e.stopPropagation();
    setJobToDelete(job);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteJob = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://job-board-platform.onrender.com/api/job/${jobToDelete.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setJobs(jobs.filter((job) => job.id !== jobToDelete.id));
      setTotalJobs(totalJobs - 1);
      setIsDeleteConfirmOpen(false);
      setNotification({ message: "Job deleted successfully", type: "delete" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    } catch (err) {
      setError(err.message);
      setNotification({ message: "Failed to delete job", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    }
  };

  // Handle adding a new job
  const handleAddNewJob = () => {
    setEditingJob(null);
    setIsAddJobModalOpen(true);
  };

  // Handle updating a job
  const handleUpdateJob = (e, job) => {
    e.stopPropagation();
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  // Handle saving a job (create or update)
  const handleSaveJob = async (jobData) => {
    const token = localStorage.getItem("token");

    try {
      const url = editingJob
        ? `https://job-board-platform.onrender.com/api/job/${editingJob.id}/` 
        : "https://job-board-platform.onrender.com/api/job/"; 

      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("API Error:", errorResponse);
        throw new Error(editingJob ? "Failed to update job" : "Failed to create job");
      }

      const savedJob = await response.json();

      // Refetch jobs after saving
      fetchJobs();

      // Close the modal and show success notification
      setIsEditModalOpen(false);
      setIsAddJobModalOpen(false);
      setNotification({
        message: editingJob ? "Job updated successfully" : "New job created successfully",
        type: "success",
      });
      editingJob ? "" : setTotalJobs(totalJobs + 1);
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    } catch (err) {
      setError(err.message);
      setNotification({
        message: editingJob ? "Failed to update job" : "Failed to create job",
        type: "error",
      });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  // Handle job click
  const handleJobClick = (job) => {
    navigate(`/dashboard/jobs/${job.id}`);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalJobs / pageSize);

  // Render the Loader while fetching jobs
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" /> {/* Render the Loader component */}
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 px-5 md:pb-20 mb-5 relative min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>
      </div>

      <Card className="mb-6 bg-black text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm mb-1">Total Jobs</div>
            <div className="text-3xl font-bold">{totalJobs}</div>
            <div className="flex items-center text-sm mt-1 text-green-400">
              <User className="h-4 w-4 mr-1" />
              {totalApplicants} Total Applicants
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-green-400 hover:bg-green-400 text-black"
              onClick={handleAddNewJob}
            >
              <Plus className="h-4 w-4 mr-1" /> Add New Job
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onJobClick={handleJobClick}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleConfirmDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Job Form Modals */}
      <JobForm
        isOpen={isEditModalOpen || isAddJobModalOpen}
        onOpenChange={(isOpen) => {
          if (editingJob) {
            setIsEditModalOpen(isOpen);
          } else {
            setIsAddJobModalOpen(isOpen);
          }
        }}
        job={editingJob}
        onSave={handleSaveJob}
        mode={editingJob ? "edit" : "add"}
        categories={categories} 
        industries={industries}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        jobTitle={jobToDelete?.title}
        onConfirmDelete={handleDeleteJob}
      />

      {/* Success/Error Notifications */}
      {notification.message && <SuccessToast message={notification.message} type={notification.type} />}
    </div>
  );
}