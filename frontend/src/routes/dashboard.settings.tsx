import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

const SETTING_KEYS = [
  "site_name",
  "tagline",
  "contact_email",
  "whatsapp_number",
  "telegram_handle",
  "instagram_url",
  "linkedin_url",
  "address",
  "office_hours",
] as const;

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — RAAFAT-DIGITAL" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: () => api.admin.getSettings(),
  });

  useEffect(() => {
    if (settings) setValues(settings);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: () =>
      api.admin.updateSettings(
        SETTING_KEYS.map((key) => ({ key, value: values[key] ?? "" })),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Settings saved");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    },
  });

  return (
    <>
      <PageHeader title="Site Settings" subtitle="Global site configuration" />

      <Card className="p-6 bg-card max-w-xl space-y-4">
        {SETTING_KEYS.map((key) => (
          <div key={key}>
            <Label className="capitalize">{key.replace(/_/g, " ")}</Label>
            <Input
              className="mt-1.5"
              value={values[key] ?? ""}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            />
          </div>
        ))}
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          Save settings
        </Button>
      </Card>
    </>
  );
}
