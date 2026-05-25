import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — RAAFAT-DIGITAL" },
      { name: "description", content: "Terms of service for RAAFAT-DIGITAL." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Scope of Services",
    body: "Lorem ipsum dolor sit amet. RAAFAT-DIGITAL provides web design, branding, custom software, and e-commerce services as agreed in individual project proposals.",
  },
  {
    title: "Payment Terms",
    body: "Sed do eiusmod tempor. Payment schedules are defined per project. Deposits may be required before work begins on larger engagements.",
  },
  {
    title: "Intellectual Property",
    body: "Ut enim ad minim veniam. Upon full payment, clients receive agreed deliverables and usage rights as specified in the project contract.",
  },
  {
    title: "Revisions & Changes",
    body: "Quis nostrud exercitation. Scope changes may affect timeline and cost. We communicate changes clearly before proceeding.",
  },
  {
    title: "Liability",
    body: "Duis aute irure dolor. Our liability is limited to the fees paid for the specific project, except where prohibited by applicable law.",
  },
];

function TermsPage() {
  return (
    <PublicLayout>
      <Section>
        <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 2025</p>
        <div className="mt-12 space-y-10 max-w-3xl">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
