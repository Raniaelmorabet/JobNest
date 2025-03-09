import React, { createContext, useContext, useState, useEffect } from 'react';
import {listJobs, getJobDetails, createJob, updateJob, deleteJob, applyForJob, getJobApplicants,} from '../services/api';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all jobs
    const fetchJobs = async (search = '', page = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const data = await listJobs(search, page, pageSize);
            setJobs(data.results);
            setError('');
        } catch (err) {
            setError('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    // Fetch job details
    const fetchJobDetails = async (jobId) => {
        setLoading(true);
        try {
            const data = await getJobDetails(jobId);
            return data;
        } catch (err) {
            setError('Failed to fetch job details');
        } finally {
            setLoading(false);
        }
    };

    // Create a new job
    const addJob = async (jobData) => {
        try {
            const data = await createJob(jobData);
            setJobs((prevJobs) => [data, ...prevJobs]);
            return data;
        } catch (err) {
            setError('Failed to create job');
        }
    };

    // Update a job
    const editJob = async (jobId, jobData) => {
        try {
            const data = await updateJob(jobId, jobData);
            setJobs((prevJobs) =>
                prevJobs.map((job) => (job.id === jobId ? data : job))
            );
            return data;
        } catch (err) {
            setError('Failed to update job');
        }
    };

    // Delete a job
    const removeJob = async (jobId) => {
        try {
            await deleteJob(jobId);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        } catch (err) {
            setError('Failed to delete job');
        }
    };

    // Apply for a job
    const applyJob = async (jobId, applicationData) => {
        try {
            const data = await applyForJob(jobId, applicationData);
            return data;
        } catch (err) {
            setError('Failed to apply for job');
        }
    };

    // Get job applicants
    const fetchJobApplicants = async (jobId) => {
        try {
            const data = await getJobApplicants(jobId);
            return data;
        } catch (err) {
            setError('Failed to fetch applicants');
        }
    };

    // Expose the context value
    const value = {
        jobs,
        loading,
        error,
        fetchJobs,
        fetchJobDetails,
        addJob,
        editJob,
        removeJob,
        applyJob,
        fetchJobApplicants,
    };

    return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

// Custom hook to use the JobContext
export const useJobs = () => {
    return useContext(JobContext);
};