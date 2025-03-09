import { useState } from "react"
import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx"
import { JobListingManager } from "../components/employer/JobListingManager"
import { ApplicantTracker } from "../components/employer/ApplicantTracker"
import { DashboardStats } from "../components/employer/DashboardStats"
import { EmployerHero } from "../components/employer/EmployerHero"
import { TopApplicants } from "../components/employer/TopApplicants"

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div id='employerdashboard' className="min-h-screen bg-gray-100">
      <EmployerHero />
      <div className="container px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="px-4 py-2 rounded-md">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="px-4 py-2 rounded-md">
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="applicants" className="px-4 py-2 rounded-md">
              Applicants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <DashboardStats />
            {/*<div className="grid gap-6 md:grid-cols-2">*/}
            {/*  <Card className="p-6 bg-white shadow-sm">*/}
            {/*    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Performing Job Posts</h2>*/}
            {/*    <ul className="space-y-2">*/}
            {/*      <li className="flex justify-between items-center">*/}
            {/*        <span>Senior Frontend Developer</span>*/}
            {/*        <span className="text-green-600">32 applicants</span>*/}
            {/*      </li>*/}
            {/*      <li className="flex justify-between items-center">*/}
            {/*        <span>UX Designer</span>*/}
            {/*        <span className="text-green-600">28 applicants</span>*/}
            {/*      </li>*/}
            {/*      <li className="flex justify-between items-center">*/}
            {/*        <span>Product Manager</span>*/}
            {/*        <span className="text-green-600">25 applicants</span>*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*  </Card>*/}
            {/*  <TopApplicants />*/}
            {/*</div>*/}
          </TabsContent>

          <TabsContent value="jobs">
            <JobListingManager />
          </TabsContent>

          <TabsContent value="applicants">
            <ApplicantTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

