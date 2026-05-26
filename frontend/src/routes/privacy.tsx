import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { useSiteSettings } from "@/hooks/use-site-settings";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RAAFAT-DIGITAL" },
      { name: "description", content: "Privacy policy for RAAFAT-DIGITAL." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { contact_email: email } = useSiteSettings();

  const sections = [
    {
      title: "Data We Collect",
      body: `When you contact us or request a quote, we may collect your name, email address, phone number, company details, and information about your project. We only collect what you choose to share through our contact form or direct communication.`,
    },
    {
      title: "How We Use It",
      body: "We use your information to respond to inquiries, prepare proposals, deliver contracted services, and improve how we support clients. We do not sell your personal data to third parties.",
    },
    {
      title: "Cookies & Analytics",
      body: "Our website may use cookies and analytics tools to understand how visitors use the site and to improve performance and content. You can control cookies through your browser settings.",
    },
    {
      title: "Your Rights",
      body: `You may request access, correction, or deletion of personal data we hold about you. Contact us at ${email} and we will respond within a reasonable timeframe.`,
    },
    {
      title: "Contact",
      body: `For privacy-related questions, email us at ${email}.`,
    },
  ];

  return (
    <PublicLayout>
      <Section>
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
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
