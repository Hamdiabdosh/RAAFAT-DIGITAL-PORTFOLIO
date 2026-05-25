import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RAAFAT-DIGITAL" },
      { name: "description", content: "Privacy policy for RAAFAT-DIGITAL." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Data We Collect",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We may collect information you provide via contact forms, including name, email, phone number, and project details.",
  },
  {
    title: "How We Use It",
    body: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Your information is used to respond to inquiries, provide services, and improve our offerings.",
  },
  {
    title: "Cookies & Analytics",
    body: "Ut enim ad minim veniam, quis nostrud exercitation. We may use cookies and analytics tools to understand site usage and improve user experience.",
  },
  {
    title: "Your Rights",
    body: "Duis aute irure dolor in reprehenderit. You may request access, correction, or deletion of your personal data by contacting hello@raafat.digital.",
  },
  {
    title: "Contact",
    body: "For privacy-related questions, email us at hello@raafat.digital.",
  },
];

function PrivacyPage() {
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
