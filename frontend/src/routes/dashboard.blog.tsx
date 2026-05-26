import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";

type BlogPost = {
  id: string;
  title: string;
  category: string;
  published: boolean;
  publishedAt: string | null;
};

export const Route = createFileRoute("/dashboard/blog")({
  head: () => ({ meta: [{ title: "Blog — RAAFAT-DIGITAL" }] }),
  component: BlogPage,
});

function BlogPage() {
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: () => api.admin.getBlogPosts({ limit: "100" }) as Promise<BlogPost[]>,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) =>
      api.admin.updatePost(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.admin.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post deleted");
    },
  });

  return (
    <>
      <PageHeader title="Blog" subtitle="Manage articles and drafts" />

      <Card className="overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published at</TableHead>
              <TableHead>Toggle</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(posts ?? []).map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.published ? "Published" : "Draft"}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {p.publishedAt
                    ? new Date(p.publishedAt).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={p.published}
                    onCheckedChange={(published) =>
                      updateMutation.mutate({ id: p.id, body: { published } })
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
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
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
