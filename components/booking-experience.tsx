"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Dialog } from "@/components/dialog";
import { buttonClass, Field, fieldClass } from "@/components/ui";
import { createBookingReference, quoteStay, type BookingConfirmation } from "@/lib/booking";
import { formatDisplayDate } from "@/lib/dates";
import { formatGuests, formatLkr, formatNights } from "@/lib/format";
import type { BookingStay } from "@/lib/types";
import { hasFieldErrors, validateBooking, type BookingInput } from "@/lib/validation";

export function BookingExperience({
  stay,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  today,
}: {
  stay: BookingStay;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: string;
  today: string;
}) {
  const titleId = useId();
  const confirmHeadingRef = useRef<HTMLHeadingElement>(null);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BookingInput>({
    fullName: "",
    email: "",
    phone: "",
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: initialGuests,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingInput, string>>>({});
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const quote = quoteStay(stay.pricePerNightLkr, checkIn, checkOut);
  const checkInPast = Boolean(today && checkIn && checkIn < today);

  function update<K extends keyof BookingInput>(key: K, value: BookingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function openBooking() {
    setConfirmation(null);
    setErrors({});
    setForm((current) => ({
      ...current,
      checkIn,
      checkOut,
      guests,
    }));
    setOpen(true);
  }

  const closeBooking = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (confirmation) confirmHeadingRef.current?.focus();
  }, [confirmation]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBooking(form, stay.maxGuests, today);
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    const priced = quoteStay(stay.pricePerNightLkr, form.checkIn, form.checkOut);
    if (!priced) return;

    const result: BookingConfirmation = {
      reference: createBookingReference(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
      nights: priced.nights,
      totalLkr: priced.totalLkr,
    };
    setConfirmation(result);
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-line bg-paper p-5 shadow-[0_16px_40px_-24px_rgba(15,47,38,0.35)]">
        <p className="text-sm text-mist">Price per night</p>
        <p className="mt-1 font-display text-4xl tracking-tight text-forest">{formatLkr(stay.pricePerNightLkr)}</p>
        <p className="mt-1 text-sm text-mist">Up to {formatGuests(stay.maxGuests)}</p>

        <div className="mt-5 grid gap-3">
          <label className="block text-sm font-semibold text-forest" htmlFor="side-check-in">
            Check-in date
            <input
              id="side-check-in"
              type="date"
              value={checkIn}
              min={today}
              onChange={(event) => setCheckIn(event.target.value)}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-sm font-semibold text-forest" htmlFor="side-check-out">
            Check-out date
            <input
              id="side-check-out"
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(event) => setCheckOut(event.target.value)}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-sm font-semibold text-forest" htmlFor="side-guests">
            Guests
            <input
              id="side-guests"
              type="number"
              min={1}
              max={stay.maxGuests}
              inputMode="numeric"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
        </div>

        <div className="mt-4 rounded-2xl bg-foam px-4 py-3" aria-live="polite">
          {checkInPast ? (
            <p className="text-sm text-red-700">Check-in cannot be in the past.</p>
          ) : quote ? (
            <p className="text-sm text-forest">
              <span className="font-semibold">{formatNights(quote.nights)}</span>
              {" × "}
              {formatLkr(stay.pricePerNightLkr)}
              {" = "}
              <span className="font-semibold">{formatLkr(quote.totalLkr)}</span>
            </p>
          ) : (
            <p className="text-sm text-mist">Choose a check-out after check-in to see the total.</p>
          )}
          <p className="mt-1 text-xs text-mist">Taxes are not included in this preview.</p>
        </div>

        <button type="button" onClick={openBooking} className={`${buttonClass("accent")} mt-4 w-full`}>
          Book Now
        </button>
        <p className="mt-3 text-xs leading-5 text-mist">
          You will confirm guest details before anything is reserved. No payment is taken.
        </p>
      </div>

      <Dialog
        open={open}
        titleId={titleId}
        title={confirmation ? "Request received" : "Book this stay"}
        onClose={closeBooking}
      >
        {confirmation ? (
          <div>
            <h3
              ref={confirmHeadingRef}
              tabIndex={-1}
              className="font-display text-xl text-forest outline-none"
            >
              Your reference is {confirmation.reference}
            </h3>
            <p className="mt-2 text-sm leading-6 text-mist">
              This is a preview. Nothing was sent, no payment was taken, and the stay is not
              reserved.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <SummaryRow label="Property" value={`${stay.name}, ${stay.neighbourhood}`} />
              <SummaryRow label="Guest" value={confirmation.fullName} />
              <SummaryRow label="Email" value={confirmation.email} />
              <SummaryRow label="Phone" value={confirmation.phone} />
              <SummaryRow
                label="Dates"
                value={`${formatDisplayDate(confirmation.checkIn)} to ${formatDisplayDate(confirmation.checkOut)}`}
              />
              <SummaryRow label="Nights" value={formatNights(confirmation.nights)} />
              <SummaryRow label="Guests" value={formatGuests(confirmation.guests)} />
              <SummaryRow label="Total" value={formatLkr(confirmation.totalLkr)} />
            </dl>
            <button type="button" onClick={closeBooking} className={`${buttonClass()} mt-6 w-full`}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-4">
            <p className="text-sm text-mist">
              {stay.name} · {formatLkr(stay.pricePerNightLkr)} per night · up to{" "}
              {formatGuests(stay.maxGuests)}
            </p>
            <Field id="booking-name" label="Full name" required error={errors.fullName}>
              <input
                name="fullName"
                autoComplete="name"
                value={form.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                className={fieldClass}
                data-autofocus="true"
              />
            </Field>
            <Field id="booking-email" label="Email" required error={errors.email}>
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
              id="booking-phone"
              label="Phone"
              required
              error={errors.phone}
              hint="Sri Lankan mobile, such as 07XXXXXXXX or +947XXXXXXXX."
            >
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                className={fieldClass}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="booking-check-in" label="Check-in" required error={errors.checkIn}>
                <input
                  name="checkIn"
                  type="date"
                  min={today}
                  value={form.checkIn}
                  onChange={(event) => update("checkIn", event.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field id="booking-check-out" label="Check-out" required error={errors.checkOut}>
                <input
                  name="checkOut"
                  type="date"
                  min={form.checkIn || today}
                  value={form.checkOut}
                  onChange={(event) => update("checkOut", event.target.value)}
                  className={fieldClass}
                />
              </Field>
            </div>
            <Field
              id="booking-guests"
              label="Number of guests"
              required
              error={errors.guests}
              hint={`Maximum ${stay.maxGuests} for this stay.`}
            >
              <input
                name="guests"
                type="number"
                min={1}
                inputMode="numeric"
                value={form.guests}
                onChange={(event) => update("guests", event.target.value)}
                className={fieldClass}
              />
            </Field>
            <FormQuote stay={stay} form={form} today={today} />
            <button type="submit" className={`${buttonClass("accent")} w-full`}>
              Submit Booking Request
            </button>
          </form>
        )}
      </Dialog>
    </aside>
  );
}

function FormQuote({
  stay,
  form,
  today,
}: {
  stay: BookingStay;
  form: BookingInput;
  today: string | null;
}) {
  const quote = quoteStay(stay.pricePerNightLkr, form.checkIn, form.checkOut);
  const past = Boolean(today && form.checkIn && form.checkIn < today);
  if (past || !quote) return null;
  return (
    <p className="rounded-2xl bg-foam px-4 py-3 text-sm text-forest" aria-live="polite">
      {formatNights(quote.nights)} · total {formatLkr(quote.totalLkr)}
    </p>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2">
      <dt className="text-mist">{label}</dt>
      <dd className="text-right font-semibold text-forest">{value}</dd>
    </div>
  );
}

export function BookingFallback() {
  return (
    <div className="h-96 rounded-3xl border border-line bg-paper" aria-hidden="true" />
  );
}
