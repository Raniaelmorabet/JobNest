//
// import { ArrowDown, ArrowUp, MoreHorizontal, Plus, Send } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { SidebarInset } from "@/components/ui/sidebar"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
//
// export function DashboardContent({ selectedSection }) {
//   const [dateRange, setDateRange] = useState("Last 30 days")
//
//   return (
//     <SidebarInset className="flex-1">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-bold">{selectedSection || "Dashboard"}</h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-2 text-sm">
//               <span>18 Oct 2024 - 18 Nov 2024</span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" size="sm" className="gap-1">
//                     {dateRange}
//                     <ArrowDown className="h-3 w-3" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => setDateRange("Last 7 days")}>Last 7 days</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setDateRange("Last 30 days")}>Last 30 days</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setDateRange("Last 90 days")}>Last 90 days</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//             <Button variant="outline" size="sm">
//               Export
//             </Button>
//           </div>
//         </div>
//
//         {selectedSection === "Dashboard" && (
//           <>
//             <Card className="mb-6 bg-[#0e3a3d] text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-sm mb-1">Total Balance</div>
//                     <div className="text-3xl font-bold">€ 320.845,20</div>
//                     <div className="flex items-center text-sm mt-1 text-green-400">
//                       <ArrowUp className="h-3 w-3 mr-1" />
//                       15.8%
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button size="sm" variant="secondary" className="bg-teal-600 hover:bg-teal-700 text-white">
//                       <Plus className="h-4 w-4 mr-1" /> Add
//                     </Button>
//                     <Button size="sm" variant="secondary" className="bg-teal-600 hover:bg-teal-700 text-white">
//                       <Send className="h-4 w-4 mr-1" /> Send
//                     </Button>
//                     <Button size="sm" variant="secondary" className="bg-teal-600 hover:bg-teal-700 text-white">
//                       Request
//                     </Button>
//                     <Button size="sm" variant="secondary" className="bg-teal-600 hover:bg-teal-700 text-white p-0 w-8">
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//
//             <div className="mb-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-md font-medium">Cash Flow</CardTitle>
//                   <Tabs defaultValue="weekly">
//                     <TabsList>
//                       <TabsTrigger value="weekly">Weekly</TabsTrigger>
//                       <TabsTrigger value="daily">Daily</TabsTrigger>
//                     </TabsList>
//                   </Tabs>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[200px] flex items-center justify-center text-muted-foreground">
//                     Cash flow chart would be displayed here
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="bg-green-100 p-2 rounded-full">
//                         <ArrowUp className="h-4 w-4 text-green-600" />
//                       </div>
//                       <CardTitle className="text-md font-medium">Income</CardTitle>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="text-2xl font-bold">€ 12.378,20</div>
//                     <div className="flex items-center text-sm text-green-600">
//                       <ArrowUp className="h-3 w-3 mr-1" />
//                       450%
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="bg-red-100 p-2 rounded-full">
//                         <ArrowDown className="h-4 w-4 text-red-600" />
//                       </div>
//                       <CardTitle className="text-md font-medium">Expense</CardTitle>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="text-2xl font-bold">€ 5.788,21</div>
//                     <div className="flex items-center text-sm text-red-600">
//                       <ArrowDown className="h-3 w-3 mr-1" />
//                       12.5%
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//
//               <Card className="md:col-span-1">{/* Placeholder for third card */}</Card>
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-md font-medium">Business account</CardTitle>
//                     <span className="text-xs text-muted-foreground">Last 30 days</span>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">€ 8.672,20</div>
//                   <div className="flex items-center text-xs text-green-600 mt-1">
//                     <ArrowUp className="h-3 w-3 mr-1" />
//                     16.0%
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-1">vs. 7,120.04 Last Period</div>
//                 </CardContent>
//               </Card>
//
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-md font-medium">Total Saving</CardTitle>
//                     <span className="text-xs text-muted-foreground">Last 30 days</span>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">€ 3.765,35</div>
//                   <div className="flex items-center text-xs text-red-600 mt-1">
//                     <ArrowDown className="h-3 w-3 mr-1" />
//                     8.2%
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-1">vs. 4,116.50 Last Period</div>
//                 </CardContent>
//               </Card>
//
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-md font-medium">Tax Reserve</CardTitle>
//                     <span className="text-xs text-muted-foreground">Last 30 days</span>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">€ 14.376,16</div>
//                   <div className="flex items-center text-xs text-green-600 mt-1">
//                     <ArrowUp className="h-3 w-3 mr-1" />
//                     35.2%
//                   </div>
//                   <div className="text-xs text-muted-foreground mt-1">vs. 10,236.46 Last Period</div>
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         )}
//       </div>
//     </SidebarInset>
//   )
// }
//
