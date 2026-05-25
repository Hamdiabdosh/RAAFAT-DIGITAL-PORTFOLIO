import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Linkedin, MapPin } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/brand/logo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — RAAFAT-DIGITAL | Digital Agency in Harar, Ethiopia" },
      {
        name: "description",
        content:
          "Learn about RAAFAT-DIGITAL, Ethiopia's digital agency helping businesses thrive online.",
      },
      { property: "og:title", content: "About — RAAFAT-DIGITAL" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center min-h-[300px] flex flex-col justify-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">About RAAFAT-DIGITAL</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          A digital agency born in Ethiopia, built to help every kind of business thrive online.
        </p>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              RAAFAT-DIGITAL was founded in 2025 in Harar, Ethiopia, with one clear mission: to make
              professional digital services accessible to Ethiopian businesses of all sizes. We saw
              too many great businesses held back by outdated online presence, complex processes, and
              agencies that didn't understand the local context. So we built something different — a
              digital partner that speaks your language, understands your market, and delivers results
              you can see.
            </p>
          </div>
          <Card className="p-10 text-center bg-card border-border">
            <Logo size="lg" className="justify-center" />
            <p className="mt-4 text-gold font-medium">We Digitalize Everything</p>
            <p className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 text-gold" />
              Harar, Ethiopia 🇪🇹
            </p>
          </Card>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Our Mission",
              body: "To digitalize every Ethiopian business — from the solo entrepreneur in Harar to the enterprise in Addis Ababa.",
            },
            {
              title: "Our Vision",
              body: "An Ethiopia where every business, big or small, has the digital tools to compete, grow, and thrive.",
            },
            {
              title: "Our Values",
              body: "Honesty. Quality. Warmth. We treat every project like it's our own business on the line.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-6 bg-card">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-3xl font-bold text-center">The Person Behind It</h2>
        <Card className="mt-10 max-w-lg mx-auto p-8 text-center bg-card">
          <div className="h-24 w-24 rounded-full bg-gold-dim border border-gold-soft flex items-center justify-center text-gold font-display text-2xl mx-auto">
            RD
          </div>
          <h3 className="mt-6 font-display text-xl font-bold">Raafat</h3>
          <p className="text-sm text-gold">Founder & Lead Developer</p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Full-stack developer and designer passionate about using technology to solve real
            problems for Ethiopian businesses. Every project gets my full attention and care.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#" className="text-muted-foreground hover:text-gold" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </Card>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Growing — we're always looking for talented collaborators.{" "}
          <Link to="/contact" className="text-gold hover:underline">
            Get in touch →
          </Link>
        </p>
      </Section>

      <Section>
        <h2 className="font-display text-3xl font-bold text-center">Why We Focus on Ethiopia</h2>
        <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
          Ethiopia's digital economy is at an inflection point. With a young, growing population and
          increasing internet access, the opportunity for businesses to go digital has never been
          greater. We're here to make sure Ethiopian businesses don't miss this moment.
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {[
            { value: "120M+", label: "Population" },
            { value: "Fast-growing", label: "Internet penetration" },
            { value: "Booming", label: "Startup ecosystem" },
          ].map((s) => (
            <Card key={s.label} className="p-6 text-center bg-card">
              <p className="font-display text-2xl text-gold font-bold">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
