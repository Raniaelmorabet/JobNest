import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import logo from "@/assets/NavBarLogo/logo1.png"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const userData = JSON.parse(localStorage.getItem("user")) || {};
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

 
  navMain: [
    {
      title: userData.company_name || "Default Company",
      url: "#",
      icon: GalleryVerticalEnd,
      isActive: true,
      items: [
        {
          title: "Jobs",
          url: "#",
        },
        {
          title: "Applications",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Industries",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    
  ],

}

export function AppSidebar({
  selectedSection, ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain selectedSection={selectedSection} items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
