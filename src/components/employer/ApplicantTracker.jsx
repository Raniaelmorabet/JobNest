import { useState } from "react"
import { Card } from "../ui/card"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const initialApplicants = [
  { id: 1, name: "John Doe", job: "Senior Frontend Developer", status: "New", appliedDate: "2023-05-15" },
  { id: 2, name: "Jane Smith", job: "UX Designer", status: "Interviewed", appliedDate: "2023-05-14" },
  { id: 3, name: "Bob Johnson", job: "Product Manager", status: "Rejected", appliedDate: "2023-05-13" },
  { id: 4, name: "Alice Brown", job: "Senior Frontend Developer", status: "Shortlisted", appliedDate: "2023-05-12" },
]

export function ApplicantTracker() {
  const [applicants, setApplicants] = useState(initialApplicants)

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(
      applicants.map((applicant) => (applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant)),
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Applicant Tracker</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{applicant.name}</span>
                </div>
              </TableCell>
              <TableCell>{applicant.job}</TableCell>
              <TableCell>{applicant.appliedDate}</TableCell>
              <TableCell>
                <Select value={applicant.status} onValueChange={(value) => handleStatusChange(applicant.id, value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>{applicant.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Interviewed">Interviewed</SelectItem>
                    <SelectItem value="Offered">Offered</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

