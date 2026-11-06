"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { buttonClass, Field, fieldClass } from "@/components/ui";
import { hasFieldErrors, validateContact, type ContactInput } from "@/lib/validation";

const EMPTY: ContactInput = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof ContactInput>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) {
      setSent(false);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-3xl border border-line bg-foam p-6">
        <h2 className="font-display text-3xl text-forest">Message noted</h2>
        <p className="mt-3 text-sm leading-6 text-forest">
          Thanks, {form.fullName.trim().split(" ")[0]}. This preview does not send email. On the
          full site this note would reach the Colombo desk at the address you entered.
        </p>
        <button
          type="button"
          className={`${buttonClass("secondary")} mt-5`}
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-3xl border border-line bg-paper p-5 sm:p-6">
      <Field id="contact-name" label="Full name" required error={errors.fullName}>
        <input
          name="fullName"
          autoComplete="name"
          value={form.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <Field id="contact-email" label="Email" required error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <Field
        id="contact-phone"
        label="Phone"
        error={errors.phone}
        hint="Optional. Sri Lankan mobile, such as 07XXXXXXXX or +947XXXXXXXX."
      >
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <Field id="contact-message" label="Message" required error={errors.message}>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className={fieldClass}
        />
      </Field>
      <button type="submit" className={`${buttonClass()} w-full sm:w-auto`}>
        Send message
      </button>
    </form>
  );
}
