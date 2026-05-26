import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { api, type ContactMessage } from "@/lib/api";

export const Route = createFileRoute("/dashboard/messages")({
  head: () => ({ meta: [{ title: "Messages — RAAFAT-DIGITAL" }] }),
  component: MessagesPage,
});

function MessagesPage() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: () => api.admin.getMessages({ limit: "50" }),
  });

  const { data: selected } = useQuery({
    queryKey: ["message", selectedId],
    queryFn: () => api.admin.getMessage(selectedId!),
    enabled: !!selectedId,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) =>
      api.admin.updateMessage(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Message updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.admin.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setSelectedId(null);
      toast.success("Message deleted");
    },
  });

  function openMessage(m: ContactMessage) {
    setSelectedId(m.id);
    setNotes(m.notes ?? "");
  }

  return (
    <>
      <PageHeader title="Messages" subtitle="Contact form enquiries" />

      <Card className="overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(messages ?? []).map((m) => (
              <TableRow
                key={m.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => openMessage(m)}
              >
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.serviceInterest ?? "—"}</TableCell>
                <TableCell>{m.budgetRange ?? "—"}</TableCell>
                <TableCell>{m.status}</TableCell>
                <TableCell>{new Date(m.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selected && (
        <Card className="mt-6 p-6 bg-card space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold">{selected.name}</h3>
              <p className="text-sm text-muted-foreground">{selected.email}</p>
            </div>
            <Select
              value={selected.status}
              onValueChange={(status) =>
                updateMutation.mutate({ id: selected.id, body: { status } })
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNREAD">Unread</SelectItem>
                <SelectItem value="READ">Read</SelectItem>
                <SelectItem value="REPLIED">Replied</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm whitespace-pre-wrap">{selected.description}</p>
          <div>
            <label className="text-sm font-medium">Admin notes</label>
            <Textarea
              className="mt-2"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button
              className="mt-2"
              size="sm"
              onClick={() =>
                updateMutation.mutate({ id: selected.id, body: { notes } })
              }
            >
              Save notes
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteMutation.mutate(selected.id)}
          >
            Delete
          </Button>
        </Card>
      )}
    </>
  );
}
