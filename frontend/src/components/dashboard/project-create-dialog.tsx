import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";
import { projectCategoryLabels } from "@/lib/content";
import type { ProjectCategory } from "@/lib/types";

const categories = Object.entries(projectCategoryLabels) as [ProjectCategory, string][];

const emptyForm = {
  title: "",
  client: "",
  clientType: "",
  category: "WEB_DEVELOPMENT" as ProjectCategory,
  description: "",
  challenge: "",
  solution: "",
  result: "",
  timeline: "",
  technologies: "",
  published: false,
  featured: false,
};

type ProjectCreateDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

export function ProjectCreateDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: ProjectCreateDialogProps) {
  const queryClient = useQueryClient();
  const [internalOpen, setInternalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledOnOpenChange ?? setInternalOpen;

  const createMutation = useMutation({
    mutationFn: () =>
      api.admin.createProject({
        title: form.title,
        client: form.client,
        clientType: form.clientType,
        category: form.category,
        description: form.description,
        challenge: form.challenge,
        solution: form.solution,
        result: form.result,
        timeline: form.timeline,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published: form.published,
        featured: form.featured,
        images: [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
      setForm(emptyForm);
      toast.success("Project created");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to create project");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate();
  }

  const isControlled = controlledOpen !== undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger &&
        (isControlled ? (
          trigger
        ) : (
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        ))}
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Add a portfolio case study. Slug is generated from the title.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="client">Client *</Label>
              <Input
                id="client"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clientType">Client type *</Label>
              <Input
                id="clientType"
                placeholder="E-commerce · Ethiopia"
                value={form.clientType}
                onChange={(e) => setForm({ ...form, clientType: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Category *</Label>
              <Select
                value={form.category}
                onValueChange={(category) =>
                  setForm({ ...form, category: category as ProjectCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Short description *</Label>
              <Textarea
                id="description"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="challenge">Challenge *</Label>
              <Textarea
                id="challenge"
                rows={2}
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="solution">Solution *</Label>
              <Textarea
                id="solution"
                rows={2}
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="result">Result *</Label>
              <Textarea
                id="result"
                rows={2}
                value={form.result}
                onChange={(e) => setForm({ ...form, result: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timeline">Timeline *</Label>
              <Input
                id="timeline"
                placeholder="3 weeks"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="technologies">Technologies</Label>
              <Input
                id="technologies"
                placeholder="React, Node.js"
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <Switch
                checked={form.published}
                onCheckedChange={(published) => setForm({ ...form, published })}
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch
                checked={form.featured}
                onCheckedChange={(featured) => setForm({ ...form, featured })}
              />
              Featured
            </label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating…" : "Create project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
