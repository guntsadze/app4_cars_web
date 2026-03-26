import {
  Car,
  ChevronRight,
  Database,
  ShieldAlert,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "./ui/mode-toggle";
import { usePathname } from "next/navigation";
import { menuData } from "@/lib/menu-data";
import Link from "next/link";
import { authService } from "@/services/auth/auth.services";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            App4Cars
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuData.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.items.some((sub) => sub.url === pathname)}
                    >
                      <item.icon className="size-5" />
                      <span>{item.title}</span>

                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                            className={cn(
                              "transition-colors",
                              pathname === subItem.url
                                ? "opacity-100 text-primary"
                                : "opacity-70 hover:opacity-100",
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <div className="flex flex-col gap-2">
          <ModeToggle />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={authService.logout}
                className="group-data-[collapsible=icon]:justify-center text-muted-foreground hover:text-foreground"
                tooltip="გასვლა"
              >
                <LogOut className="size-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  გასვლა
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
