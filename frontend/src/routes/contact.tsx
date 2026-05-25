import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Mail, MessageCircle, Send } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/contact/contact-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/language-context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Start Your Project | RAAFAT-DIGITAL" },
      {
        name: "description",
        content: "Get in touch with RAAFAT-DIGITAL — contact form, email, WhatsApp, and more.",
      },
      { property: "og:title", content: "Contact — RAAFAT-DIGITAL" },
    ],
  }),
  component: ContactPage,
});

const contactFaqs = [
  {
    q: "How quickly do you respond?",
    a: "Within 24 hours on business days.",
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes, always.",
  },
  {
    q: "Do I need to have everything figured out?",
    a: "Absolutely not. We'll help you shape the idea.",
  },
];

function ContactPage() {
  const { t } = useLanguage();

  return (
    <PublicLayout>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{t("contact.title")}</h1>
            <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold">Or reach us directly</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "hello@raafat.digital",
                  hint: "We reply within 24 hours",
                  href: "mailto:hello@raafat.digital",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  value: "+251 XXX XXX XXX",
                  hint: "Chat with us directly",
                  href: "https://wa.me/251XXXXXXXXX",
                },
                {
                  icon: Send,
                  title: "Telegram",
                  value: "@raafatdigital",
                  hint: "Message us on Telegram",
                  href: "https://t.me/raafatdigital",
                },
              ].map((item) => (
                <Card key={item.title} className="p-5 bg-card flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gold-dim border border-gold-soft flex items-center justify-center text-gold flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <a href={item.href} className="text-sm text-gold hover:underline">
                      {item.value}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">{item.hint}</p>
                  </div>
                </Card>
              ))}
              <Card className="p-5 bg-card flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-gold-dim border border-gold-soft flex items-center justify-center text-gold flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Book a Call</p>
                  <p className="text-sm text-muted-foreground">
                    Schedule a free 30-minute discovery call
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-3 border-gold-soft">
                    <a href="#">Book a Call →</a>
                  </Button>
                </div>
              </Card>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              📍 Harar, Ethiopia — serving clients nationwide
            </p>
            <p className="text-sm text-muted-foreground">Mon–Fri, 9:00 AM – 6:00 PM EAT</p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {contactFaqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`cf-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </PublicLayout>
  );
}
