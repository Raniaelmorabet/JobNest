import { ChevronDown, ChevronUp, ExternalLink, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ApplicantCard({ applicant, isExpanded, onToggleExpand, onUpdateStatus }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col cursor-pointer" onClick={onToggleExpand}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">{applicant.name}</h3>
              <p className="text-gray-500 text-sm">{applicant.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Applied on {new Date(applicant.applied_at).toLocaleDateString()}
            </div>
            <Badge className={getStatusBadgeClass(applicant.status)}>
              {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
            </Badge>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <div className="mb-4">
              <h4 className="font-medium mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Cover Letter
              </h4>
              <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line text-gray-700">
                {applicant.cover_letter}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Resume</h4>
              <a
                href={applicant.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
                View Resume
              </a>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                className={applicant.status === "rejected" ? "bg-red-50" : ""}
                disabled={applicant.status === "rejected"}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus("rejected");
                }}
              >
                Reject
              </Button>
              <Button
                variant="outline"
                className={applicant.status === "accepted" ? "bg-green-50" : ""}
                disabled={applicant.status === "accepted"}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus("accepted");
                }}
              >
                Accept
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}