import {
  BarChart3,
  CreditCard,
  FileText,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  Repeat,
  Settings,
  Vault,
} from "lucide-react"
import { useEffect, useState } from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

export function AppSidebar({ selectedSection, ...props }) {
  const [userData, setUserData] = useState({ company_name: "Sequence" })

  // Safely get user data from localStorage on client side only
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUserData(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Navigation data
  const data = {
    user: {
      name: "Young Alaska",
      email: "alaska@gmail.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    navMain: [
      {
        title: "GENERAL",
        items: [
          {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
            isActive: true,
          },
          {
            title: "Payment",
            url: "#",
            icon: Repeat,
          },
          {
            title: "Transaction",
            url: "#",
            icon: FileText,
          },
          {
            title: "Cards",
            url: "#",
            icon: CreditCard,
            hasSubmenu: true,
          },
        ],
      },
      {
        title: "SUPPORT",
        items: [
          {
            title: "Capital",
            url: "#",
            icon: BarChart3,
          },
          {
            title: "Vaults",
            url: "#",
            icon: Vault,
          },
          {
            title: "Reports",
            url: "#",
            icon: FileText,
          },
          {
            title: "Earn",
            url: "#",
            icon: GalleryVerticalEnd,
            badge: "€ 150",
          },
        ],
      },
    ],
    companySection: {
      title: userData.company_name,
      url: "#",
      icon: GalleryVerticalEnd,
      isActive: false,
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
    bottomItems: [
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
      {
        title: "Help",
        url: "#",
        icon: HelpCircle,
      },
      {
        title: "Pro Mode",
        url: "#",
        icon: GalleryVerticalEnd,
        toggle: true,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border" {...props}>
      <SidebarHeader className="py-4">
        <div className="flex items-center px-4">
          <div className="mr-2 h-6 w-6 bg-primary text-primary-foreground flex items-center justify-center rounded">
            <span className="font-bold">S</span>
          </div>
          <span className="font-semibold text-lg">Sequence</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain selectedSection={selectedSection} navData={data.navMain} />
        <NavMain selectedSection={selectedSection} navData={[data.companySection]} isCompanySection={true} />
        <NavMain selectedSection={selectedSection} navData={[{ items: data.bottomItems }]} isBottomSection={true} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

