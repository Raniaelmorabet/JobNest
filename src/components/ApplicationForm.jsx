import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { X } from "lucide-react";

export function ApplicationForm({ jobTitle, onClose, jobDetails }) {
  const [formData, setFormData] = useState({
    coverLetter: "",
    cv: "",
  });
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [validationErrors, setValidationErrors] = useState({
    coverLetter: "",
    cv: "",
  }); // State for validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation errors when the user starts typing
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    // Validate cover letter (must be greater than 50 characters)
    if (formData.coverLetter.length <= 50) {
      errors.coverLetter = "Cover letter must be greater than 50 characters.";
    }

    // Validate resume link (must be a valid URL and required)
    if (!formData.cv) {
      errors.cv = "Resume link is required.";
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[&\w=.-]*)?(#[\w-]*)?$/;
      if (!urlPattern.test(formData.cv)) {
        errors.cv = "Please enter a valid URL for your resume.";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to apply for a job.");
      }

      // Prepare the payload
      const payload = {
        job: jobDetails.id, // Send only the job's unique ID
        resume_link: formData.cv, // Required field
        cover_letter: formData.coverLetter, // Required field
      };

      // Send the request to the API
      const response = await fetch(
        "https://job-board-platform.onrender.com/api/application/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.message || "Failed to submit application");
      }

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <Card className="fixed inset-0 z-50 border-none flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mx-auto">Apply for {jobTitle}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Letter Field */}
          <div>
            <Label htmlFor="coverLetter" className="mb-2">
              Cover Letter
            </Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              required
            />
            {validationErrors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.coverLetter}
              </p>
            )}
          </div>

          {/* Resume Link Field */}
          <div>
            <Label htmlFor="cv" className="mb-2">
              Resume Link
            </Label>
            <Input
              id="cv"
              name="cv"
              type="text"
              value={formData.cv}
              onChange={handleInputChange}
              required
            />
            {validationErrors.cv && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.cv}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </Card>
  );
}