import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/language-context";

const bullets = ["why1", "why2", "why3", "why4"] as const;

const progressItems = [
  { label: "Discovery", value: 100 },
  { label: "Design", value: 100 },
  { label: "Development", value: 75 },
  { label: "Launch", value: 20 },
];

export function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            label={t("sections.whyUs")}
            title={t("sections.whyTitle")}
            align="left"
            className="!text-left [&_p]:!mx-0"
          />
          <p className="mt-4 text-muted-foreground leading-relaxed">{t("sections.whyBody")}</p>
          <ul className="mt-8 space-y-4">
            {bullets.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span>{t(`sections.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm font-medium mb-6">Project Progress</p>
          <div className="space-y-5">
            {progressItems.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{item.label}</span>
                  <span className="text-gold">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
