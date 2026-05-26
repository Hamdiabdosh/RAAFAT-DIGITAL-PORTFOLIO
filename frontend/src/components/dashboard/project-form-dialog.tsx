import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormSection } from "@/components/dashboard/form-section";
import { GalleryUploadField } from "@/components/dashboard/gallery-upload-field";
import { ImageUploadField } from "@/components/dashboard/image-upload-field";
import {
  MetricsInput,
  metricsToRows,
  rowsToMetrics,
  type MetricRow,
} from "@/components/dashboard/metrics-input";
import { StringListInput } from "@/components/dashboard/string-list-input";
import { TagInput } from "@/components/dashboard/tag-input";
import { api } from "@/lib/api";
import { projectCategoryLabels } from "@/lib/content";
import { slugifyTitle } from "@/lib/slugify";
import type { ApiProject, ProjectCategory } from "@/lib/types";

const categories = Object.entries(projectCategoryLabels) as [ProjectCategory, string][];

type FormState = {
  title: string;
  client: string;
  clientType: string;
  category: ProjectCategory;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  timeline: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  videoUrl: string;
  technicalNotes: string;
  nextSteps: string;
  coverImage: string;
  galleryImages: string[];
  architectureImage: string;
  metrics: MetricRow[];
  published: boolean;
  featured: boolean;
};

const emptyForm: FormState = {
  title: "",
  client: "",
  clientType: "",
  category: "WEB_DEVELOPMENT",
  description: "",
  challenge: "",
  solution: "",
  result: "",
  timeline: "",
  technologies: [],
  features: [""],
  liveUrl: "",
  githubUrl: "",
  videoUrl: "",
  technicalNotes: "",
  nextSteps: "",
  coverImage: "",
  galleryImages: [],
  architectureImage: "",
  metrics: [],
  published: false,
  featured: false,
};

function projectToForm(project: ApiProject): FormState {
  const features = project.features ?? [];
  return {
    title: project.title,
    client: project.client,
    clientType: project.clientType,
    category: project.category,
    description: project.description,
    challenge: project.challenge,
    solution: project.solution,
    result: project.result,
    timeline: project.timeline,
    technologies: project.technologies ?? [],
    features: features.length > 0 ? features : [""],
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    videoUrl: project.videoUrl ?? "",
    technicalNotes: project.technicalNotes ?? "",
    nextSteps: project.nextSteps ?? "",
    coverImage: project.coverImage ?? "",
    galleryImages: project.images ?? [],
    architectureImage: project.architectureImage ?? "",
    metrics: metricsToRows(project.metrics),
    published: project.published,
    featured: project.featured,
  };
}

function formToPayload(form: FormState) {
  return {
    title: form.title.trim(),
    client: form.client.trim(),
    clientType: form.clientType.trim(),
    category: form.category,
    description: form.description.trim(),
    challenge: form.challenge.trim(),
    solution: form.solution.trim(),
    result: form.result.trim(),
    timeline: form.timeline.trim(),
    technologies: form.technologies,
    features: form.features.map((s) => s.trim()).filter(Boolean),
    liveUrl: form.liveUrl.trim() || null,
    githubUrl: form.githubUrl.trim() || null,
    videoUrl: form.videoUrl.trim() || null,
    technicalNotes: form.technicalNotes.trim() || null,
    nextSteps: form.nextSteps.trim() || null,
    coverImage: form.coverImage.trim() || null,
    images: form.galleryImages.filter(Boolean),
    architectureImage: form.architectureImage.trim() || null,
    metrics: rowsToMetrics(form.metrics),
    published: form.published,
    featured: form.featured,
  };
}

type ProjectFormDialogProps = {
  project?: ApiProject | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

export function ProjectFormDialog({
  project,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: ProjectFormDialogProps) {
  const queryClient = useQueryClient();
  const [internalOpen, setInternalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [tab, setTab] = useState("basics");
  const isEdit = !!project;

  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledOnOpenChange ?? setInternalOpen;

  const slugPreview = useMemo(() => slugifyTitle(form.title), [form.title]);

  useEffect(() => {
    if (open && project) {
      setForm(projectToForm(project));
      setTab("basics");
    }
    if (open && !project) {
      setForm(emptyForm);
      setTab("basics");
    }
  }, [open, project]);

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = formToPayload(form);
      return isEdit
        ? api.admin.updateProject(project!.id, payload)
        : api.admin.createProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (project?.slug) {
        queryClient.invalidateQueries({ queryKey: ["project", project.slug] });
      }
      setOpen(false);
      if (!isEdit) setForm(emptyForm);
      toast.success(isEdit ? "Project updated" : "Project created");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to save project");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveMutation.mutate();
  }

  const isControlled = controlledOpen !== undefined;
  const previewSlug = isEdit ? project?.slug : slugPreview;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger &&
        (isControlled ? (
          trigger
        ) : (
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        ))}
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <DialogTitle>{isEdit ? "Edit project" : "New project"}</DialogTitle>
              <DialogDescription>
                Build a case study for the public portfolio. Fields map to each section on the
                project page.
              </DialogDescription>
            </div>
            {isEdit && project?.published && previewSlug && (
              <Button variant="outline" size="sm" asChild className="shrink-0">
                <a
                  href={`/portfolio/${previewSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Preview
                </a>
              </Button>
            )}
          </div>
          {form.title && (
            <p className="text-xs text-muted-foreground mt-2">
              URL:{" "}
              <span className="font-mono text-foreground/80">
                /portfolio/{previewSlug || "…"}
              </span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <Tabs value={tab} onValueChange={setTab} className="flex flex-col min-h-0 flex-1 px-6">
            <TabsList className="w-full justify-start h-auto flex-wrap gap-1 bg-transparent p-0 mt-4 shrink-0">
              <TabsTrigger value="basics" className="data-[state=active]:bg-muted">
                Basics
              </TabsTrigger>
              <TabsTrigger value="story" className="data-[state=active]:bg-muted">
                Story
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-muted">
                Media
              </TabsTrigger>
              <TabsTrigger value="links" className="data-[state=active]:bg-muted">
                Links
              </TabsTrigger>
              <TabsTrigger value="depth" className="data-[state=active]:bg-muted">
                Depth
              </TabsTrigger>
              <TabsTrigger value="publish" className="data-[state=active]:bg-muted">
                Publish
              </TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto flex-1 py-4 min-h-[280px] max-h-[50vh]">
              <TabsContent value="basics" className="mt-0 space-y-6">
                <FormSection
                  title="Project identity"
                  description="Title, client, and how it appears in the hero."
                >
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
                      <Label htmlFor="client">Client name *</Label>
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
                      <Label htmlFor="description">One-liner *</Label>
                      <Textarea
                        id="description"
                        rows={2}
                        placeholder="What it does and who it's for — one clear sentence."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="timeline">Timeline *</Label>
                      <Input
                        id="timeline"
                        placeholder="8 weeks"
                        value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <TagInput
                        label="Tech stack"
                        hint="Press Enter after each technology. Shown as pills on the case study."
                        value={form.technologies}
                        onChange={(technologies) => setForm({ ...form, technologies })}
                        placeholder="React, PostgreSQL…"
                      />
                    </div>
                  </div>
                </FormSection>
              </TabsContent>

              <TabsContent value="story" className="mt-0 space-y-6">
                <FormSection
                  title="Challenge → Solution → Result"
                  description="The narrative cards on the case study page."
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="challenge">Challenge *</Label>
                      <Textarea
                        id="challenge"
                        rows={3}
                        value={form.challenge}
                        onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="solution">Solution *</Label>
                      <Textarea
                        id="solution"
                        rows={3}
                        value={form.solution}
                        onChange={(e) => setForm({ ...form, solution: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="result">Result *</Label>
                      <Textarea
                        id="result"
                        rows={3}
                        value={form.result}
                        onChange={(e) => setForm({ ...form, result: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </FormSection>
                <StringListInput
                  label="Key features"
                  hint="Highlight what makes this project stand out — 3–6 bullets."
                  value={form.features}
                  onChange={(features) => setForm({ ...form, features })}
                  placeholder="e.g. Multi-vendor checkout"
                />
              </TabsContent>

              <TabsContent value="media" className="mt-0 space-y-6">
                <FormSection
                  title="Visuals"
                  description="Hero image first, then gallery screenshots."
                >
                  <ImageUploadField
                    id="coverImage"
                    label="Hero image"
                    hint="Full-width image at the top of the case study."
                    value={form.coverImage}
                    onChange={(coverImage) => setForm({ ...form, coverImage })}
                  />
                  <GalleryUploadField
                    label="Gallery"
                    hint="Additional screenshots — dashboard, mobile, detail views."
                    value={form.galleryImages}
                    onChange={(galleryImages) => setForm({ ...form, galleryImages })}
                  />
                  <ImageUploadField
                    id="architectureImage"
                    label="Architecture diagram"
                    hint="Optional system diagram for technical credibility."
                    value={form.architectureImage}
                    onChange={(architectureImage) =>
                      setForm({ ...form, architectureImage })
                    }
                  />
                </FormSection>
              </TabsContent>

              <TabsContent value="links" className="mt-0 space-y-6">
                <FormSection
                  title="Proof & demos"
                  description="External links shown as buttons on the hero."
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="liveUrl">Live site</Label>
                      <Input
                        id="liveUrl"
                        type="url"
                        placeholder="https://example.com"
                        value={form.liveUrl}
                        onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="githubUrl">GitHub</Label>
                      <Input
                        id="githubUrl"
                        type="url"
                        placeholder="https://github.com/org/repo"
                        value={form.githubUrl}
                        onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="videoUrl">Demo video</Label>
                      <Input
                        id="videoUrl"
                        type="url"
                        placeholder="YouTube or Loom share link"
                        value={form.videoUrl}
                        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        YouTube and Loom links embed automatically on the page.
                      </p>
                    </div>
                  </div>
                </FormSection>
              </TabsContent>

              <TabsContent value="depth" className="mt-0 space-y-6">
                <MetricsInput
                  value={form.metrics}
                  onChange={(metrics) => setForm({ ...form, metrics })}
                />
                <div className="space-y-1.5">
                  <Label htmlFor="technicalNotes">Technical approach</Label>
                  <Textarea
                    id="technicalNotes"
                    rows={4}
                    placeholder="Trade-offs, architecture choices, what was hard…"
                    value={form.technicalNotes}
                    onChange={(e) => setForm({ ...form, technicalNotes: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nextSteps">What&apos;s next</Label>
                  <Textarea
                    id="nextSteps"
                    rows={3}
                    placeholder="Planned improvements or known limitations."
                    value={form.nextSteps}
                    onChange={(e) => setForm({ ...form, nextSteps: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="publish" className="mt-0 space-y-6">
                <FormSection
                  title="Visibility"
                  description="Control whether this appears on the public portfolio."
                >
                  <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
                    <label className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">Published</p>
                        <p className="text-xs text-muted-foreground">
                          Visible at /portfolio/{previewSlug || "slug"}
                        </p>
                      </div>
                      <Switch
                        checked={form.published}
                        onCheckedChange={(published) => setForm({ ...form, published })}
                      />
                    </label>
                    <label className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">Featured</p>
                        <p className="text-xs text-muted-foreground">
                          Prioritized on the homepage portfolio section
                        </p>
                      </div>
                      <Switch
                        checked={form.featured}
                        onCheckedChange={(featured) => setForm({ ...form, featured })}
                      />
                    </label>
                  </div>
                </FormSection>
              </TabsContent>
            </div>
          </Tabs>

          <DialogFooter className="px-6 py-4 border-t border-border shrink-0 sm:justify-between">
            <p className="text-xs text-muted-foreground hidden sm:block">
              Tab: <span className="capitalize">{tab}</span>
            </p>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending
                  ? isEdit
                    ? "Saving…"
                    : "Creating…"
                  : isEdit
                    ? "Save changes"
                    : "Create project"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** @deprecated Use ProjectFormDialog */
export function ProjectCreateDialog(
  props: Omit<ProjectFormDialogProps, "project">,
) {
  return <ProjectFormDialog {...props} />;
}
