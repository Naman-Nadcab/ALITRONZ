"use client";

import { useRef, useState } from "react";
import { getPublicIdentity } from "@/lib/public-identity";
import { enquiryServices, investmentRanges, parseStep, timeframes } from "@/lib/enquiry-schema";

type Status = "idle" | "submitting" | "success" | "not_configured" | "rate_limited" | "failed";

const initial = {
  name: "",
  email: "",
  company: "",
  role: "",
  service: "",
  challenge: "",
  investment: "",
  timeframe: "",
  consent: false,
  company_website: "",
};

export function EnquiryForm({ initialService = "" }: { initialService?: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [values, setValues] = useState({ ...initial, service: initialService });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const alertRef = useRef<HTMLDivElement>(null);
  const identity = getPublicIdentity();

  function update(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function validateCurrent() {
    const result =
      step === 1
        ? parseStep(1, values)
        : step === 2
          ? parseStep(2, values)
          : parseStep(3, { ...values, consent: values.consent ? true : undefined });
    if (!result.ok) {
      setErrors(result.fields);
      return false;
    }
    setErrors({});
    return true;
  }

  async function submit() {
    if (!validateCurrent()) return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          consent: values.consent ? true : false,
          investment: values.investment,
        }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: Record<string, string> } | null;
      if (response.ok && data?.ok) {
        setStatus("success");
        return;
      }
      if (data?.error === "validation" && data.fields) {
        setStatus("idle");
        setErrors(data.fields);
        return;
      }
      if (data?.error === "not_configured") setStatus("not_configured");
      else if (data?.error === "rate_limited") setStatus("rate_limited");
      else setStatus("failed");
      alertRef.current?.focus();
    } catch {
      setStatus("failed");
      alertRef.current?.focus();
    }
  }

  if (status === "success") {
    return (
      <div className="enquiry-card" role="status">
        <p className="eyebrow">Received</p>
        <h2>Enquiry received.</h2>
        <p className="gap-top">We have it. If the project is a fit, we will reply to {values.email}.</p>
        <button className="btn btn-secondary gap-top-lg" type="button" onClick={() => { setValues(initial); setStep(1); setStatus("idle"); }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="enquiry-card"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (step < 3) {
          if (validateCurrent()) setStep((current) => (current + 1) as 2 | 3);
          return;
        }
        void submit();
      }}
    >
      <div className="steps">
        <span aria-current={step === 1 ? "step" : undefined}>1 Contact</span>
        <span aria-current={step === 2 ? "step" : undefined}>2 Project</span>
        <span aria-current={step === 3 ? "step" : undefined}>3 Scope</span>
      </div>
      <h2 className="gap-top">{step === 1 ? "Who should we reply to?" : step === 2 ? "What are you building?" : "Scale and consent"}</h2>

      {step === 1 ? (
        <>
          <Field label="Name" name="name" value={values.name} error={errors.name} autoComplete="name" onChange={update} />
          <Field label="Business email" name="email" type="email" value={values.email} error={errors.email} autoComplete="email" onChange={update} />
          <Field label="Company" name="company" value={values.company} error={errors.company} autoComplete="organization" onChange={update} />
          <Field label="Role" name="role" value={values.role} error={errors.role} autoComplete="organization-title" onChange={update} optional />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <label className="field">
            <span>Service required</span>
            <select name="service" value={values.service} aria-invalid={Boolean(errors.service)} onChange={(event) => update("service", event.target.value)}>
              <option value="">Select a service</option>
              {enquiryServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            {errors.service ? <span className="field-error" role="alert">{errors.service}</span> : null}
          </label>
          <label className="field">
            <span>Project description and business challenge</span>
            <textarea name="challenge" value={values.challenge} aria-invalid={Boolean(errors.challenge)} onChange={(event) => update("challenge", event.target.value)} />
            {errors.challenge ? <span className="field-error" role="alert">{errors.challenge}</span> : null}
          </label>
          <p className="fine">Describe links or documents in the brief. This form does not accept file uploads.</p>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <dl className="summary-list">
            <div><dt>Name</dt><dd>{values.name}</dd></div>
            <div><dt>Email</dt><dd>{values.email}</dd></div>
            <div><dt>Company</dt><dd>{values.company}</dd></div>
            <div><dt>Service</dt><dd>{values.service}</dd></div>
          </dl>
          <label className="field">
            <span>Approximate investment range</span>
            <select name="investment" value={values.investment} aria-invalid={Boolean(errors.investment)} onChange={(event) => update("investment", event.target.value)}>
              <option value="">Leave open</option>
              {investmentRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            <span className="fine">Optional. These bands describe scale. They are not an Alitroz price list.</span>
            {errors.investment ? <span className="field-error" role="alert">{errors.investment}</span> : null}
          </label>
          <label className="field">
            <span>Expected timeframe</span>
            <select name="timeframe" value={values.timeframe} aria-invalid={Boolean(errors.timeframe)} onChange={(event) => update("timeframe", event.target.value)}>
              <option value="">Select a timeframe</option>
              {timeframes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {errors.timeframe ? <span className="field-error" role="alert">{errors.timeframe}</span> : null}
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              aria-invalid={Boolean(errors.consent)}
              onChange={(event) => update("consent", event.target.checked)}
            />
            <span>I agree to Alitroz Technology using this information to respond to the enquiry.</span>
          </label>
          {errors.consent ? <span className="field-error" role="alert">{errors.consent}</span> : null}
          <p className="fine">How enquiries are handled is described in the <a href="/privacy-policy">privacy policy</a>.</p>
        </>
      ) : null}

      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.company_website}
            onChange={(event) => update("company_website", event.target.value)}
            name="company_website"
          />
        </label>
      </div>

      {status !== "idle" && status !== "submitting" ? (
        <div className="form-error" role="alert" tabIndex={-1} ref={alertRef}>
          {status === "not_configured" ? (
            <p>
              Your enquiry was not sent. Outbound delivery is not configured for this environment, so nothing was delivered.
              {identity.email ? ` You can write to ${identity.email} instead.` : " A public email address has not been published."}
            </p>
          ) : null}
          {status === "rate_limited" ? <p>Too many attempts from this network. Wait a while, then try again.</p> : null}
          {status === "failed" ? <p>The enquiry could not be delivered. Nothing was confirmed as sent. You can try again.</p> : null}
        </div>
      ) : null}

      <div className="form-actions">
        {step > 1 ? (
          <button className="btn btn-secondary" type="button" onClick={() => setStep((current) => (current - 1) as 1 | 2)}>
            Back
          </button>
        ) : null}
        <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending" : step === 3 ? "Submit enquiry" : "Continue"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  optional = false,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="field">
      <span>{label}{optional ? " (optional)" : ""}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error ? <span id={errorId} className="field-error" role="alert">{error}</span> : null}
    </label>
  );
}
