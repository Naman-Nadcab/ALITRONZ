import { z } from "zod";

export const enquiryServices = [
  "AI & Intelligent Automation",
  "Digital Product Engineering",
  "Web3 & Blockchain Engineering",
  "Financial & Trading Technology",
  "Cloud, DevOps & Reliability",
  "Data Engineering & Analytics",
  "Cybersecurity & Application Security",
  "Not sure yet",
] as const;

export const investmentRanges = [
  "To be discussed",
  "Under 25,000 USD",
  "25,000–75,000 USD",
  "75,000–150,000 USD",
  "150,000–300,000 USD",
  "300,000 USD or more",
] as const;

export const timeframes = [
  "To be discussed",
  "Under 6 weeks",
  "1–3 months",
  "3–6 months",
  "6 months or longer",
] as const;

function cleanLine(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

function cleanText(value: string) {
  return value.replace(/[^\S\n\r\t]+/g, " ").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

const line = (min: number, max: number, empty: string, long: string) =>
  z
    .string()
    .transform(cleanLine)
    .pipe(z.string().min(min, empty).max(max, long));

const enquiryObject = z.object({
  name: line(2, 120, "Enter your name.", "Name is too long."),
  email: z
    .string()
    .transform(cleanLine)
    .pipe(z.string().max(254, "Email is too long.").pipe(z.email("Enter a valid email address."))),
  company: line(2, 160, "Enter your company.", "Company name is too long."),
  role: z.string().transform(cleanLine).pipe(z.string().max(120, "Role is too long.")),
  service: z.enum(enquiryServices, "Select a service."),
  challenge: z
    .string()
    .transform(cleanText)
    .pipe(
      z
        .string()
        .min(40, "Describe the business challenge in a few sentences.")
        .max(4000, "Keep the description under 4,000 characters."),
    ),
  investment: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.enum(investmentRanges, "Choose a listed range, or leave it open.").optional(),
  ),
  timeframe: z.enum(timeframes, "Select an expected timeframe."),
  consent: z.literal(true, "Consent is required before we can receive an enquiry."),
});

export const enquirySchema = enquiryObject;

export type Enquiry = z.infer<typeof enquirySchema>;

export const stepOneSchema = enquiryObject.pick({
  name: true,
  email: true,
  company: true,
  role: true,
});

export const stepTwoSchema = enquiryObject.pick({
  service: true,
  challenge: true,
});

export const stepThreeSchema = enquiryObject.pick({
  investment: true,
  timeframe: true,
  consent: true,
});

function fieldsFrom(error: z.ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
  }
  if (Object.keys(fields).length === 0) fields.form = "Check the form and try again.";
  return fields;
}

export function parseEnquiry(input: unknown) {
  const result = enquirySchema.safeParse(input);
  if (result.success) return { ok: true as const, data: result.data };
  return { ok: false as const, fields: fieldsFrom(result.error) };
}

export function parseStep(step: 1 | 2 | 3, input: unknown) {
  const schema = step === 1 ? stepOneSchema : step === 2 ? stepTwoSchema : stepThreeSchema;
  const result = schema.safeParse(input);
  if (result.success) return { ok: true as const };
  return { ok: false as const, fields: fieldsFrom(result.error) };
}
