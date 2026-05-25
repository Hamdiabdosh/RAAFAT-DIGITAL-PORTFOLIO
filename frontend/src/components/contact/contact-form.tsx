import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(20, "Please provide at least 20 characters"),
  source: z.string().min(1, "Please select an option"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { t } = useLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      description: "",
      source: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Contact form submission:", data);
    toast.success(t("contact.success"));
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.fullName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.phone")}</FormLabel>
              <FormControl>
                <Input placeholder={t("contact.phoneHint")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.service")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("contact.service")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web">{t("contact.serviceOptions.web")}</SelectItem>
                  <SelectItem value="branding">{t("contact.serviceOptions.branding")}</SelectItem>
                  <SelectItem value="software">{t("contact.serviceOptions.software")}</SelectItem>
                  <SelectItem value="ecommerce">{t("contact.serviceOptions.ecommerce")}</SelectItem>
                  <SelectItem value="unsure">{t("contact.serviceOptions.unsure")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.budget")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("contact.budget")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="under10">{t("contact.budgetOptions.under10")}</SelectItem>
                  <SelectItem value="mid">{t("contact.budgetOptions.mid")}</SelectItem>
                  <SelectItem value="high">{t("contact.budgetOptions.high")}</SelectItem>
                  <SelectItem value="enterprise">{t("contact.budgetOptions.enterprise")}</SelectItem>
                  <SelectItem value="discuss">{t("contact.budgetOptions.discuss")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.description")}</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={t("contact.descriptionPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.source")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("contact.source")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="google">{t("contact.sourceOptions.google")}</SelectItem>
                  <SelectItem value="social">{t("contact.sourceOptions.social")}</SelectItem>
                  <SelectItem value="referral">{t("contact.sourceOptions.referral")}</SelectItem>
                  <SelectItem value="other">{t("contact.sourceOptions.other")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          {t("contact.submit")} →
        </Button>
      </form>
    </Form>
  );
}
