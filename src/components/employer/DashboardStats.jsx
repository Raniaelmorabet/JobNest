import { Card } from "../ui/card.jsx"
import { Briefcase, Users, Eye, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    { title: "Active Jobs", value: 12, icon: Briefcase, change: "+2 this week", color: "bg-blue-500" },
    { title: "Total Applicants", value: 483, icon: Users, change: "+58 this month", color: "bg-green-500" },
    { title: "Profile Views", value: 1.2, icon: Eye, change: "+12% this week", unit: "k", color: "bg-purple-500" },
    { title: "Interview Requests", value: 36, icon: TrendingUp, change: "+5 this week", color: "bg-yellow-500" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-white shadow-sm">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stat.value}
                {stat.unit && <span className="text-lg font-normal">{stat.unit}</span>}
              </h3>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

