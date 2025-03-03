import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Pencil, Trash2, Eye } from "lucide-react"

const initialJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=40&h=40&auto=format&fit=crop&q=60",
    description: "We are looking for an experienced frontend developer to join our team...",
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with the design team",
      "Optimize application for maximum speed and scalability",
    ],
    requiredSkills: ["React", "TypeScript", "CSS", "HTML", "Git"],
    status: "Active",
    applicants: 12,
    salary: "$120k - $150k",
    location: "Remote",
    postedDate: "2023-05-15",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&h=40&auto=format&fit=crop&q=60",
    description: "We're seeking a talented UX designer to create intuitive and engaging user experiences...",
    responsibilities: [
      "Create user-centered designs",
      "Conduct user research and testing",
      "Develop wireframes and prototypes",
    ],
    requiredSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    status: "Active",
    applicants: 8,
    salary: "$90k - $120k",
    location: "New York, NY",
    postedDate: "2023-05-10",
  },
]

export function JobListingManager() {
  const [jobs, setJobs] = useState(initialJobs)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    description: "",
    responsibilities: "",
    requiredSkills: "",
    salary: "",
    location: "",
  })

  const handleCreateJob = (e) => {
    e.preventDefault()
    const job = {
      id: jobs.length + 1,
      ...newJob,
      responsibilities: newJob.responsibilities.split("\n"),
      requiredSkills: newJob.requiredSkills.split(",").map((skill) => skill.trim()),
      status: "Active",
      applicants: 0,
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=40&h=40&auto=format&fit=crop&q=60", // Placeholder logo
      postedDate: new Date().toISOString().split("T")[0],
    }
    setJobs([...jobs, job])
    setNewJob({
      title: "",
      company: "",
      description: "",
      responsibilities: "",
      requiredSkills: "",
      salary: "",
      location: "",
    })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Listings</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Job</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Job Listing</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                <Textarea
                  id="responsibilities"
                  value={newJob.responsibilities}
                  onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
                <Input
                  id="requiredSkills"
                  value={newJob.requiredSkills}
                  onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Create Job</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-500">
                      {job.company} • {job.applicants} Applicants
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.requiredSkills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {job.requiredSkills.length > 3 && (
                  <Badge variant="secondary">+{job.requiredSkills.length - 3} more</Badge>
                )}
              </div>
            </div>
            <div className="border-t p-4 flex items-center justify-between bg-gray-50">
              <div className="text-sm text-gray-500">Posted on {job.postedDate}</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

