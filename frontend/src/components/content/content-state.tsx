import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ContentLoading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-xl" />
      ))}
    </div>
  );
}

export function ContentError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center">
      <p className="text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm text-gold hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function ContentGate({
  isLoading,
  isError,
  error,
  onRetry,
  children,
  skeletonRows,
}: {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry?: () => void;
  children: ReactNode;
  skeletonRows?: number;
}) {
  if (isLoading) return <ContentLoading rows={skeletonRows} />;
  if (isError) {
    return (
      <ContentError
        message={error?.message ?? "Failed to load content"}
        onRetry={onRetry}
      />
    );
  }
  return <>{children}</>;
}
