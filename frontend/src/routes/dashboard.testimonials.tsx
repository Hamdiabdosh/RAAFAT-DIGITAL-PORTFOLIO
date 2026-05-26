import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  quote: string;
  featured: boolean;
};

export const Route = createFileRoute("/dashboard/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — RAAFAT-DIGITAL" }] }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
  });

  const { data: testimonials } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => api.admin.getTestimonials() as Promise<Testimonial[]>,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      api.admin.createTestimonial({
        ...form,
        company: form.company || undefined,
        featured: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      setOpen(false);
      setForm({ name: "", role: "", company: "", quote: "" });
      toast.success("Testimonial created");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.admin.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success("Testimonial deleted");
    },
  });

  return (
    <>
      <PageHeader
        title="Testimonials"
        subtitle="Client quotes on the homepage"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Add testimonial</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New testimonial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Quote</Label>
                  <Textarea
                    rows={4}
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  />
                </div>
                <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(testimonials ?? []).map((t) => (
          <Card key={t.id} className="p-6 bg-card">
            <p className="text-sm leading-relaxed">"{t.quote}"</p>
            <p className="mt-4 font-medium text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground">
              {t.role}
              {t.company ? ` · ${t.company}` : ""}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-destructive"
              onClick={() => deleteMutation.mutate(t.id)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
