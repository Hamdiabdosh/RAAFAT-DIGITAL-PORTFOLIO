import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ApiProject } from "@/lib/types";

export function CaseStudyStory({ project }: { project: ApiProject }) {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title: "Challenge", body: project.challenge },
          { title: "Solution", body: project.solution },
          { title: "Result", body: project.result },
        ].map((card) => (
          <Card key={card.title} className="p-6 bg-card">
            <h2 className="font-display font-semibold text-gold">{card.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{card.body}</p>
          </Card>
        ))}
      </div>

      {project.features.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold">Key features</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
