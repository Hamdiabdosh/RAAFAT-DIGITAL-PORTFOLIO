import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type MetricRow = { key: string; value: string };

const PRESETS: { key: string; label: string }[] = [
  { key: "traffic", label: "Traffic / growth" },
  { key: "delivery", label: "Delivery time" },
  { key: "satisfaction", label: "Client satisfaction" },
];

export function MetricsInput({
  value,
  onChange,
}: {
  value: MetricRow[];
  onChange: (rows: MetricRow[]) => void;
}) {
  function updateRow(index: number, patch: Partial<MetricRow>) {
    const next = [...value];
    next[index] = { ...next[index]!, ...patch };
    onChange(next);
  }

  return (
    <div className="space-y-2">
      <Label>Outcome metrics</Label>
      <p className="text-xs text-muted-foreground">
        Shown on the case study page (e.g. +40% traffic, 8 weeks delivery).
      </p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.key}
            type="button"
            variant="outline"
            size="sm"
            className="text-xs h-7"
            disabled={value.some((r) => r.key === preset.key)}
            onClick={() => onChange([...value, { key: preset.key, value: "" }])}
          >
            + {preset.label}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        {value.map((row, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <Input
              placeholder="Key (traffic)"
              value={row.key}
              onChange={(e) => updateRow(index, { key: e.target.value })}
            />
            <Input
              placeholder="Value (+40%)"
              value={row.value}
              onChange={(e) => updateRow(index, { value: e.target.value })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              aria-label="Remove metric"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, { key: "", value: "" }])}
      >
        <Plus className="h-4 w-4" />
        Add metric
      </Button>
    </div>
  );
}

export function metricsToRows(metrics?: Record<string, string> | null): MetricRow[] {
  if (!metrics || typeof metrics !== "object") return [];
  return Object.entries(metrics).map(([key, value]) => ({
    key,
    value: String(value),
  }));
}

export function rowsToMetrics(rows: MetricRow[]): Record<string, string> | null {
  const entries = rows
    .map((r) => [r.key.trim(), r.value.trim()] as const)
    .filter(([key, val]) => key && val);
  if (entries.length === 0) return null;
  return Object.fromEntries(entries);
}
