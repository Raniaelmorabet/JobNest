import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

// Default empty job form
const defaultJobForm = {
  title: "",
  company: "",
  location: "",
  wage: 0,
  type: [""], // Initialize with one empty type
  experience_level: "entry",
  description: "",
  responsibilities: [""],
  required_skills: [""],
  picture: "", // Ensure picture is initialized as an empty string
  industry: "",
  category: "",
  is_active: true,
};

// Predefined job types
const jobTypes = ["full-time", "part-time", "contract", "internship", "remote"];

export function JobForm({
  isOpen,
  onOpenChange,
  job = null,
  onSave,
  mode = "add",
  categories,
  industries,
}) {
  const [jobForm, setJobForm] = useState(defaultJobForm);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredIndustries, setFilteredIndustries] = useState([]); // Industries with categories
  const [error, setError] = useState(""); // State to hold validation error messages

  // Initialize form with job data if in edit mode
  useEffect(() => {
    if (job && mode === "edit") {
      setJobForm({
        title: job.title,
        company: job.company,
        location: job.location || "",
        wage: job.wage,
        type: [...job.type],
        experience_level: job.experience_level,
        description: job.description.replace(/^## Job Description\s*\r?\n/, ""),
        responsibilities: [...job.responsibilities],
        required_skills: [...job.required_skills],
        picture: job.picture || "", // Ensure picture is set correctly
        industry: job.industry?.id || "", // Use industry ID
        category: job.category?.id || "", // Use category ID
        is_active: job.is_active,
      });

      // Filter categories based on the job's industry
      if (job.industry) {
        const filtered = categories.filter(
          (cat) => cat.industry === job.industry.id
        );
        setFilteredCategories(filtered);
      }
    } else {
      setJobForm(defaultJobForm);
      setFilteredCategories([]);
    }
  }, [job, mode, categories]);

  // Filter industries to only include those with categories
  useEffect(() => {
    const industriesWithCategories = industries.filter((industry) =>
      categories.some((cat) => cat.industry === industry.id)
    );
    setFilteredIndustries(industriesWithCategories);
  }, [industries, categories]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setJobForm({
      ...jobForm,
      [field]: value,
    });

    // When industry changes, filter categories and reset category selection
    if (field === "industry") {
      const filtered = categories.filter((cat) => cat.industry === value);
      setFilteredCategories(filtered);
      setJobForm((prev) => ({
        ...prev,
        category: "", // Reset category when industry changes
      }));
    }
  };

  // Handle array field changes (type, responsibilities, required_skills)
  const handleArrayInputChange = (field, index, value) => {
    const newArray = [...jobForm[field]];
    newArray[index] = value;
    setJobForm({
      ...jobForm,
      [field]: newArray,
    });
  };

  // Add new item to array fields
  const handleAddArrayItem = (field) => {
    if (field === "type" && jobForm.type.length >= 2) {
      return; // Max 2 items for type
    }

    setJobForm({
      ...jobForm,
      [field]: [...jobForm[field], ""],
    });
  };

  // Remove item from array fields
  const handleRemoveArrayItem = (field, index) => {
    const newArray = [...jobForm[field]];
    newArray.splice(index, 1);
    setJobForm({
      ...jobForm,
      [field]: newArray.length ? newArray : [""], // Always keep at least one empty input
    });
  };

  // Helper function to validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const jobData = {
      title: jobForm.title.trim(),
      company: jobForm.company.trim(),
      location: jobForm.location.trim(),
      wage: jobForm.wage ? Number.parseInt(jobForm.wage) : null,
      type: jobForm.type.filter((t) => t.trim() !== ""), // Filter out empty types
      experience_level: jobForm.experience_level || null,
      description: jobForm.description.trim(),
      is_active: jobForm.is_active,
      responsibilities: jobForm.responsibilities.filter((r) => r.trim() !== ""),
      required_skills: jobForm.required_skills.filter((s) => s.trim() !== ""),
      industry: jobForm.industry || null,
      category: jobForm.category || null,
      picture: jobForm.picture.trim(), // Ensure picture is trimmed and sent correctly
    };

    // Validate required fields
    if (!jobData.title) {
      setError("Please fill in the Job Title.");
      return;
    }

    if (!jobData.company) {
      setError("Please fill in the Company.");
      return;
    }

    if (!jobData.location) {
      setError("Please fill in the Location.");
      return;
    }

    if (!jobData.description) {
      setError("Please fill in the Description.");
      return;
    }

    // Validate title, company, and location length (1-255 characters)
    if (jobData.title.length > 255) {
      setError("Title must be 255 characters or less.");
      return;
    }

    if (jobData.company.length > 255) {
      setError("Company must be 255 characters or less.");
      return;
    }

    if (jobData.location.length > 255) {
      setError("Location must be 255 characters or less.");
      return;
    }

    // Validate description is non-empty
    if (!jobData.description.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    // Validate type, responsibilities, and required_skills are non-empty arrays
    if (jobData.type.length === 0) {
      setError("Please select at least one job type.");
      return;
    }

    if (jobData.responsibilities.length === 0) {
      setError("Please add at least one responsibility.");
      return;
    }

    if (jobData.required_skills.length === 0) {
      setError("Please add at least one required skill.");
      return;
    }

    // Validate type array has at most 3 items
    if (jobData.type.length > 3) {
      setError("You can select up to 3 job types.");
      return;
    }

    // Validate wage is a positive number if provided
    if (jobData.wage && jobData.wage < 0) {
      setError("Wage must be a positive number.");
      return;
    }

    // Additional validation for wage in edit mode
    if (mode === "edit" && jobData.wage === null) {
      setError("Wage is required.");
      return;
    }

    // Validate picture URL if provided
    if (jobData.picture && !isValidUrl(jobData.picture)) {
      setError("Please enter a valid URL for the picture.");
      return;
    }

    // Validate industry and category are selected
    if (!jobData.industry) {
      setError("Please select an industry.");
      return;
    }

    if (!jobData.category) {
      setError("Please select a category.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Send the job data to the parent component
    onSave(jobData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Job" : "Add New Job"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Make changes to the job listing. Click save when you're done."
              : "Fill in the details for the new job listing."}
          </DialogDescription>
        </DialogHeader>

        {/* Display error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={jobForm.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={jobForm.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={jobForm.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wage">Wage (Annual)</Label>
              <Input
                id="wage"
                type="number"
                value={jobForm.wage}
                onChange={(e) => handleInputChange("wage", e.target.value)}
                placeholder={mode === "edit" ? "Required in edit mode" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Job Type (Max 2)</Label>
              {jobForm.type.map((type, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={type}
                    onValueChange={(value) =>
                      handleArrayInputChange("type", index, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveArrayItem("type", index)}
                    disabled={jobForm.type.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {jobForm.type.length < 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddArrayItem("type")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Type
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level</Label>
              <Select
                value={jobForm.experience_level}
                onValueChange={(value) =>
                  handleInputChange("experience_level", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={jobForm.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Responsibilities</Label>
              {jobForm.responsibilities.map((resp, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={resp}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "responsibilities",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleRemoveArrayItem("responsibilities", index)
                    }
                    disabled={jobForm.responsibilities.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddArrayItem("responsibilities")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Responsibility
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Required Skills</Label>
              {jobForm.required_skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={skill}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "required_skills",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Skill ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleRemoveArrayItem("required_skills", index)
                    }
                    disabled={jobForm.required_skills.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddArrayItem("required_skills")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Skill
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="picture">Picture URL</Label>
              <Input
                id="picture"
                value={jobForm.picture}
                onChange={(e) => handleInputChange("picture", e.target.value)}
                placeholder="Enter a valid URL"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={jobForm.industry}
                  onValueChange={(value) =>
                    handleInputChange("industry", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredIndustries.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={jobForm.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  disabled={!jobForm.industry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="is_active"
                checked={jobForm.is_active}
                onCheckedChange={(checked) =>
                  handleInputChange("is_active", checked)
                }
              />
              <Label htmlFor="is_active">Active Job Listing</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Save Changes" : "Create Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
