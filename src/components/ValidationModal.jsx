import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

export default function ValidationModal({ onClose }) {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAccountCreation = async () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
    window.location.reload();
    onClose();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="relative p-8 rounded-lg shadow-xl bg-white w-full max-w-md text-center">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Access Restricted
        </h2>

        {/* Message */}
        {userInfo.role === "user" ? (
          <p className="text-gray-600 mb-4">
            Your account is for job seekers. To upload job opportunities, please create an employer account.
          </p>
        ) : (
          <p className="text-gray-600 mb-4">
            Your account is for employers. To browse and apply for jobs, please create a job seeker account.
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="default"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-950 duration-300"
            onClick={handleAccountCreation}
            disabled={loading}
          >
            {loading ? "Processing..." : "Create New Account"}
          </Button>
          <Button
            variant="outline"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
