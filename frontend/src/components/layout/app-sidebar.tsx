import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  FileText,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";

const groups = [
  {
    label: "Main",
    items: [
      { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
      { title: "Projects", url: "/dashboard/projects", icon: FolderKanban, badge: "12" },
      { title: "Users", url: "/dashboard/users", icon: Users },
    ],
  },
  {
    label: "Manage",
    items: [
      { title: "Content", url: "/dashboard/content", icon: FileText },
      { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
      { title: "Alerts", url: "#", icon: Bell, badge: "3" },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => currentPath === p;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="h-14 px-4 flex items-center justify-start border-b border-sidebar-border">
        {!collapsed ? <Logo size="md" /> : <span className="font-display text-gold text-lg">R</span>}
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        className={active ? "bg-gold-dim text-gold border-l-2 border-gold rounded-l-none" : ""}
                      >
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && (
                            <>
                              <span className="flex-1">{item.title}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="bg-gold-dim text-gold border border-gold-border h-5 px-1.5 text-[10px]">
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gold-dim border border-gold-border flex items-center justify-center text-gold font-display text-sm">
              RD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">Demo User</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
            <Link to="/login" aria-label="Log out" className="text-muted-foreground hover:text-gold">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <Link to="/login" aria-label="Log out" className="flex justify-center text-muted-foreground hover:text-gold">
            <LogOut className="h-4 w-4" />
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}