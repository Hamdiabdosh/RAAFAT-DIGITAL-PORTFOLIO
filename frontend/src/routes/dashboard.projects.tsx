import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectFormDialog } from "@/components/dashboard/project-form-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { projectCategoryLabels } from "@/lib/content";
import type { ApiProject, ProjectCategory } from "@/lib/types";

type ProjectsSearch = {
  create?: string;
};

export const Route = createFileRoute("/dashboard/projects")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
    create: typeof search.create === "string" ? search.create : undefined,
  }),
  head: () => ({ meta: [{ title: "Projects — RAAFAT-DIGITAL" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ApiProject | null>(null);

  useEffect(() => {
    if (search.create) setCreateOpen(true);
  }, [search.create]);

  function handleCreateOpenChange(open: boolean) {
    setCreateOpen(open);
    if (!open && search.create) {
      navigate({ to: "/dashboard/projects", search: {}, replace: true });
    }
  }

  const { data: projects, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => api.admin.getProjects({ limit: "100" }) as Promise<ApiProject[]>,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) =>
      api.admin.updateProject(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update project");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.admin.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Project deleted");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete project");
    },
  });

  return (
    <>
      <ProjectFormDialog open={createOpen} onOpenChange={handleCreateOpenChange} />
      <ProjectFormDialog
        project={editingProject}
        open={!!editingProject}
        onOpenChange={(open) => {
          if (!open) setEditingProject(null);
        }}
      />

      <PageHeader
        title="Projects"
        subtitle="Manage portfolio case studies shown on the public site"
        actions={
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            New project
          </Button>
        }
      />

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading projects…</p>
      )}
      {isError && (
        <Card className="p-6 bg-card">
          <p className="text-sm text-destructive">{error?.message ?? "Failed to load projects"}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
            Retry
          </Button>
        </Card>
      )}

      {!isLoading && !isError && (
        <Card className="overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(projects ?? []).map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>
                    {projectCategoryLabels[p.category as ProjectCategory] ?? p.category}
                  </TableCell>
                  <TableCell>{p.client}</TableCell>
                  <TableCell>
                    <Switch
                      checked={p.published}
                      onCheckedChange={(published) =>
                        updateMutation.mutate({ id: p.id, body: { published } })
                      }
                    />
                  </TableCell>
                  <TableCell>{p.order}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProject(p)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => deleteMutation.mutate(p.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!projects?.length && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No projects yet — click New project to add one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </>
  );
}
