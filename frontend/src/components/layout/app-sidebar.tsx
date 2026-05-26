import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  FileText,
  Quote,
  Settings,
  LogOut,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { clearAdminToken } from "@/lib/auth";
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
      { title: "Messages", url: "/dashboard/messages", icon: MessageSquare, badgeKey: "unread" as const },
      { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
      { title: "Blog", url: "/dashboard/blog", icon: FileText },
      { title: "Testimonials", url: "/dashboard/testimonials", icon: Quote },
    ],
  },
  {
    label: "Manage",
    items: [{ title: "Settings", url: "/dashboard/settings", icon: Settings }],
  },
];

function adminInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppSidebar() {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => currentPath === p;

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.admin.getStats(),
  });

  const { data: admin } = useQuery({
    queryKey: ["admin-me"],
    queryFn: () => api.me(),
  });

  function handleLogout() {
    clearAdminToken();
    navigate({ to: "/login", replace: true });
  }

  const displayName = admin?.name ?? "Admin";
  const displayEmail = admin?.email ?? "";
  const initials = adminInitials(displayName);

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
                              {"badgeKey" in item && item.badgeKey === "unread" && stats && stats.messages.unread > 0 && (
                                <Badge variant="secondary" className="bg-gold-dim text-gold border border-gold-border h-5 px-1.5 text-[10px]">
                                  {stats.messages.unread}
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
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="text-muted-foreground hover:text-gold"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="flex w-full justify-center text-muted-foreground hover:text-gold"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}