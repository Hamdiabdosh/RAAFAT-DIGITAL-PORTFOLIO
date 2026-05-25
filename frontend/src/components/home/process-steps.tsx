import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { useLanguage } from "@/context/language-context";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const steps = [
  { num: "01", title: "We Listen First", desc: "We start with a deep conversation about your business, goals, and challenges. No assumptions." },
  { num: "02", title: "We Plan Together", desc: "A clear project roadmap, timeline, and budget — agreed upfront. No surprises." },
  { num: "03", title: "We Build with Care", desc: "Regular updates, previews, and your feedback at every milestone. You're always in the loop." },
  { num: "04", title: "We Stay with You", desc: "Launch day support and ongoing maintenance so you never feel abandoned after delivery." },
];

export function ProcessSteps() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <Section>
      <SectionHeader
        label={t("sections.ourProcess")}
        title={t("sections.processTitle")}
      />
      <div ref={ref} className="mt-14 relative">
        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px border-t border-dashed border-gold/40" aria-hidden />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={cn(
                "text-center lg:text-left transition-all duration-500",
                inView ? "animate-in fade-in slide-in-from-left-4" : "opacity-0",
              )}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <p className="font-display text-4xl text-gold font-bold">{step.num}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
