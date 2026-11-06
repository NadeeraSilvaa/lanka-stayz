import { isISODate } from "@/lib/dates";

export type BookingInput = {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

export type ContactInput = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Sri Lankan mobile numbers:
 * - 07XXXXXXXX (10 digits)
 * - +947XXXXXXXX
 * Spaces, dashes, dots, and brackets are ignored.
 */
export function isSriLankanMobile(value: string): boolean {
  const compact = value.replace(/[\s().-]/g, "");
  return /^(?:\+94|0)7\d{8}$/.test(compact);
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function validateBooking(
  input: BookingInput,
  maxGuests: number,
  today: string,
): BookingErrors {
  const errors: BookingErrors = {};
  const fullName = input.fullName.trim();

  if (!fullName) {
    errors.fullName = "Enter the guest’s full name.";
  } else if (fullName.length < 2) {
    errors.fullName = "Name should be at least 2 characters.";
  } else if (fullName.length > 80) {
    errors.fullName = "Name should be 80 characters or fewer.";
  }

  const email = input.email.trim();
  if (!email) {
    errors.email = "Enter an email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address, such as name@email.com.";
  }

  const phone = input.phone.trim();
  if (!phone) {
    errors.phone = "Enter a phone number.";
  } else if (!isSriLankanMobile(phone)) {
    errors.phone = "Use a Sri Lankan mobile number, like 07XXXXXXXX or +947XXXXXXXX.";
  }

  if (!input.checkIn) {
    errors.checkIn = "Choose a check-in date.";
  } else if (!isISODate(input.checkIn)) {
    errors.checkIn = "Choose a valid check-in date.";
  } else if (input.checkIn < today) {
    errors.checkIn = "Check-in cannot be in the past.";
  }

  if (!input.checkOut) {
    errors.checkOut = "Choose a check-out date.";
  } else if (!isISODate(input.checkOut)) {
    errors.checkOut = "Choose a valid check-out date.";
  } else if (input.checkIn && isISODate(input.checkIn) && input.checkOut <= input.checkIn) {
    errors.checkOut = "Check-out must be after check-in.";
  }

  if (!input.guests.trim()) {
    errors.guests = "Enter the number of guests.";
  } else if (!/^\d+$/.test(input.guests.trim())) {
    errors.guests = "Enter a whole number of guests.";
  } else {
    const guests = Number(input.guests);
    if (guests < 1) {
      errors.guests = "Enter at least 1 guest.";
    } else if (guests > maxGuests) {
      errors.guests = `This stay allows up to ${maxGuests} guests.`;
    }
  }

  return errors;
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const fullName = input.fullName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!fullName) {
    errors.fullName = "Enter your name.";
  } else if (fullName.length < 2) {
    errors.fullName = "Name should be at least 2 characters.";
  } else if (fullName.length > 80) {
    errors.fullName = "Name should be 80 characters or fewer.";
  }

  if (!email) {
    errors.email = "Enter an email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address, such as name@email.com.";
  }

  if (phone && !isSriLankanMobile(phone)) {
    errors.phone = "Use a Sri Lankan mobile number, like 07XXXXXXXX or +947XXXXXXXX.";
  }

  if (!message) {
    errors.message = "Enter a message.";
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  } else if (message.length > 1000) {
    errors.message = "Message should be 1,000 characters or fewer.";
  }

  return errors;
}

export function hasFieldErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}
