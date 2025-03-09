
import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({ selectedSection, navData, isCompanySection = false, isBottomSection = false }) {
  const [activeItem, setActiveItem] = useState(null)

  const handleItemClick = (title) => {
    selectedSection(title)
    setActiveItem(title)
  }

  return (
    <>
      {navData.map((section, sectionIndex) => (
        <SidebarGroup key={section.title || `section-${sectionIndex}`} className={isBottomSection ? "mt-auto" : ""}>
          {section.title && !isBottomSection && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">{section.title}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items?.map((item) =>
                item.hasSubmenu || (isCompanySection && item.items) ? (
                  <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} isActive={activeItem === item.title}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={activeItem === subItem.title}>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleItemClick(subItem.title)
                                  }}
                                >
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild={!item.toggle} tooltip={item.title} isActive={activeItem === item.title}>
                      {item.toggle ? (
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                            <span>{item.title}</span>
                          </div>
                          <Switch />
                        </div>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handleItemClick(item.title)
                          }}
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </a>
                      )}
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="bg-muted text-muted-foreground">{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

