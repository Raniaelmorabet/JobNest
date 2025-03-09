import { Clock, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export function JobCard({ job, onJobClick, onUpdateJob, onDeleteJob }) {
  return (
    <Card
      className="flex flex-col h-full p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onJobClick(job)}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            <img
              src={job.picture || "/placeholder.svg"}
              alt={job.company}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">
                {job.title.split(" ").slice(0, 2).join(" ")}
                {job.title.split(" ").length > 2 ? "..." : ""}
              </h3>
              <p className="text-gray-500">
                {job.company.split(" ").length > 1
                  ? job.company.split(" ")[0] + " ..."
                  : job.company}{" "}
                • {job.no_of_applicants || 0} Applicants
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-blue-600"
              onClick={(e) => onUpdateJob(e, job)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-600"
              onClick={(e) => onDeleteJob(e, job)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-gray-600 mb-4 line-clamp-2">
          {job.description.replace(/^## Job Description\s*\r?\n/, "")}
        </div>
        <div className="flex flex-wrap gap-2">
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
          <Badge variant="secondary" className={"bg-transparent py-0 px-0"}>
            {job.experience_level === "entry" ? (
              <span className=" bg-gray-100 text-gray-700 px-3 py-[2px] rounded-sm">
                Entry Level
              </span>
            ) : job.experience_level === "senior" ? (
              <span className=" bg-purple-100 text-purple-700 px-3 py-[2px] rounded-sm">
                Senior
              </span>
            ) : job.experience_level === "mid" ? (
              <span className=" bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                Mid Level
              </span>
            ) : (
              <span className=" bg-blue-100 text-blue-700 px-3 py-[2px] rounded-sm">
                {job.experience_level}
              </span>
            )}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t mt-4">
        <div className="font-semibold text-lg">${job.wage}</div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Posted {new Date(job.posted_at).toLocaleDateString()}
        </div>
      </div>
    </Card>
  );
}
