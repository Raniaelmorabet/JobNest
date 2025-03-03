import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

const topApplicants = [
  { name: "Alice Johnson", role: "Senior Frontend Developer", skills: ["React", "TypeScript", "Node.js"] },
  { name: "Bob Smith", role: "UX Designer", skills: ["Figma", "Adobe XD", "User Research"] },
  { name: "Carol Williams", role: "Product Manager", skills: ["Agile", "Scrum", "Data Analysis"] },
]

export function TopApplicants() {
  return (
    <Card className="p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Applicants</h2>
      <div className="space-y-4">
        {topApplicants.map((applicant, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/40?img=${index + 1}`} />
              <AvatarFallback>
                {applicant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{applicant.name}</h3>
              <p className="text-sm text-gray-500">{applicant.role}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {applicant.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

