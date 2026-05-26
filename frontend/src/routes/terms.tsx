import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { useSiteSettings } from "@/hooks/use-site-settings";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — RAAFAT-DIGITAL" },
      { name: "description", content: "Terms of service for RAAFAT-DIGITAL." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { site_name: siteName, contact_email: email } = useSiteSettings();

  const sections = [
    {
      title: "Scope of Services",
      body: `${siteName} provides web design, branding, custom software, and e-commerce services as described in individual proposals and statements of work agreed with each client.`,
    },
    {
      title: "Payment Terms",
      body: "Payment schedules are defined per project. Deposits may be required before work begins on larger engagements. Invoices are due according to the dates stated in your proposal unless otherwise agreed in writing.",
    },
    {
      title: "Intellectual Property",
      body: "Upon full payment for agreed deliverables, clients receive the usage rights specified in the project contract. Third-party assets, fonts, and licensed components remain subject to their respective licenses.",
    },
    {
      title: "Revisions & Changes",
      body: "Scope changes may affect timeline and cost. We document changes clearly and confirm approval before proceeding with work outside the original agreement.",
    },
    {
      title: "Liability",
      body: `Our liability is limited to the fees paid for the specific project, except where prohibited by applicable law. Questions about these terms may be sent to ${email}.`,
    },
  ];

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
