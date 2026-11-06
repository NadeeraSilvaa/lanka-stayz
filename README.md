# Lanka Stayz

Lanka Stayz is a front-end prototype of an accommodation booking site for Sri Lanka. Guests can search sample stays in Colombo, Kandy, Ella, Galle, Mirissa, and Nuwara Eliya, open a property, check a nightly total in Sri Lankan rupees, and submit a booking request. Nothing is stored and no payment is taken.

This repository is a technical assessment prototype for a Full-Stack Web Developer role.

## Live demo

https://lanka-stayz-source.vercel.app

## Run it locally

Requirements: Node.js 20 or newer (this project was built with Node 22).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

`npm run build` produces the production build. `npm start` serves that build. No environment variables are required.

## Tech stack

- Next.js 16 (App Router, Cache Components) and React 19
- TypeScript
- Tailwind CSS 4
- Sample data in typed TypeScript modules. No database, API, or authentication.

## Project structure

```text
app/
  layout.tsx              Root layout, fonts, header, footer
  page.tsx                Homepage
  stays/page.tsx          Explore Stays
  stays/[slug]/page.tsx   Property details, statically generated
  about/page.tsx
  contact/page.tsx
  not-found.tsx
  error.tsx
components/               Header, cards, gallery, filters, booking dialog, forms
lib/data/properties.ts    The 12 sample stays and photo credits
lib/filters.ts            Query-string parsing, filtering, sorting, URL builders
lib/validation.ts         Booking and contact validation
lib/dates.ts              Calendar dates and night counts
lib/format.ts             LKR and guest/night labels
lib/booking.ts            Quote and reference number
public/images/            Photographs used by the pages
```

`CODE_WALKTHROUGH.md` explains each file in plain language and includes likely interview questions. `DEVELOPMENT_SUMMARY.md` covers the approach and what a full product would add.

## Features checklist

| Brief | In this prototype |
| --- | --- |
| Homepage branding, logo, and nav (Home, Explore Stays, About Us, Contact) | Done. Sticky header, active link, mobile menu with Escape to close |
| Hero headline “Discover Your Perfect Stay in Sri Lanka” | Done, exact wording |
| Search: destination, check-in, check-out, guests, then listings with those filters | Done. The search navigates to `/stays` with a query string |
| At least 6 featured properties | 6 featured stays on the homepage, 12 in the catalogue |
| Footer with contact details and social links | Done |
| Listings across Colombo, Kandy, Ella, Galle, Mirissa, and Nuwara Eliya | Two stays in each town |
| Card: image, name, location, LKR price per night, max guests, type, View Details | Done |
| Filter by destination | Done, plus guests, property type, and price sort |
| Filters reflected in the URL | Done |
| Empty state when nothing matches | Done, with a clear-filters link |
| Dynamic property route, statically generated | `generateStaticParams` for every slug |
| Gallery of at least 3 images, description, amenities, capacity, price | Done |
| Check-in and check-out with nights × price | Done on the property page and inside the booking form |
| Book Now opens a booking form | Modal dialog |
| Fields: full name, email, phone, dates, guests | Done |
| Sri Lankan mobiles: `07XXXXXXXX` and `+947XXXXXXXX` | Also accepts spaces and dashes |
| Required fields, email, phone, check-out after check-in, no past dates, guests within the property max | Inline errors, labels, `aria-invalid`, and `role="alert"` |
| Success summary with property, dates, nights, total, and a reference number | Generated in the browser. Nothing is submitted |
| Responsive desktop, tablet, and mobile | Checked at about 1440px, 768px, and 390px |
| Accessibility: alt text, focus states, keyboard-usable modal | Skip link, focus trap, Escape to close, focus returned to the opener |
| About Us and Contact | Contact form validates in the browser and shows a success message |

## What is simplified

- There is no backend, database, authentication, or payment.
- Stays, prices, and descriptions are sample data. The buildings are fictional.
- Dates are not checked against a real availability calendar. Two guests can “book” the same night.
- The booking reference is created in the browser with `crypto.getRandomValues`. It is not saved.
- The contact form does not send email.
- Taxes and service fees are not calculated. The total is nights × nightly rate.
- The interface is English only.
- There is no automated test suite. `validateBooking` in `lib/validation.ts` is written so it can be unit-tested later without a browser.

## Photographs

Images are real free-licence photographs of the towns, downloaded into `public/images` so `next/image` does not depend on a remote host at runtime. They show the area around each sample stay. They are not photographs of the fictional properties. Each gallery names the photographer and links to the Wikimedia Commons file page.

All images are from [Wikimedia Commons](https://commons.wikimedia.org/). Licences are CC BY, CC BY-SA, or the Free Art License. Attribution required by those licences is stored on each image in `lib/data/properties.ts` and shown under the gallery.

| File | Subject | Photographer | Licence |
| --- | --- | --- | --- |
| hero.jpg | South-coast palms | Richard Mortel | CC BY 4.0 |
| colombo-beira.jpg | Beira Lake, Colombo | A. Savin | Free Art License |
| colombo-skyline.jpg | Colombo skyline | XKillSwitchXxx | CC BY-SA 4.0 |
| colombo-marine.jpg | Marine Drive, Colombo | Pol van den Scheetek | CC BY 3.0 |
| colombo-dutch-hospital.jpg | Dutch Hospital, Colombo Fort | Kanatonian | CC BY-SA 3.0 |
| colombo-spices.jpg | Pettah spice stall | Adam Jones | CC BY-SA 2.0 |
| colombo-arcade.jpg | Independence Square arcade | Anuradha Dullewe Wijeyeratne | CC BY-SA 4.0 |
| kandy-lake.jpg | Kandy Lake and the Temple of the Tooth | Dan Arndt | CC BY-SA 4.0 |
| kandy-garden.jpg | Royal Botanical Gardens, Kandy | McKay Savage | CC BY 2.0 |
| kandy-peradeniya.jpg | Peradeniya landscaped forest | Vyacheslav Argenberg | CC BY 4.0 |
| kandy-temple.jpg | Temple of the Sacred Tooth Relic | A. Savin | Free Art License |
| kandy-night.jpg | Temple of the Tooth at night | Nalin Adikaram | CC BY-SA 4.0 |
| ella-peak.jpg | Little Adam’s Peak | Gayan Perera | CC BY-SA 4.0 |
| ella-hills.jpg | Hills near Demodara | A. Savin | Free Art License |
| ella-bridge.jpg | Nine Arches Bridge | Janith Pramuditha | CC BY-SA 4.0 |
| ella-bridge-wide.jpg | Nine Arches Bridge | Ishan Shanuka | CC BY-SA 4.0 |
| galle-street.jpg | Street in Galle Fort | Tom Worthington | CC BY 2.0 |
| galle-lighthouse.jpg | Galle Fort lighthouse | Jan Kranendonk | CC BY-SA 4.0 |
| galle-sunset.jpg | Galle Fort at dusk | calflier001 | CC BY-SA 2.0 |
| unawatuna.jpg | Unawatuna beach | Bernard Gagnon | CC BY-SA 3.0 |
| jungle-beach.jpg | Jungle Beach, Unawatuna | Hirushini Dematagoda | CC BY-SA 4.0 |
| mirissa-sea.jpg | Mirissa coast | Thedani Karasnagoda | CC BY-SA 4.0 |
| mirissa-sea-2.jpg | Mirissa coast | Thedani Karasnagoda | CC BY-SA 4.0 |
| mirissa-secret.jpg | Secret Beach, Mirissa | ShakiAbey | CC BY-SA 4.0 |
| coconut-hill.jpg | South coast near Mirissa | Richard Mortel | CC BY 4.0 |
| tea-estate.jpg | Tea estate above Nuwara Eliya | Vyacheslav Argenberg | CC BY 4.0 |
| tea-pickers.jpg | Tea plucker near Nuwara Eliya | Vyacheslav Argenberg | CC BY 4.0 |
| gregory-lake.jpg | Gregory Lake | Kalana Jayatilake | CC BY-SA 4.0 |
| nuwara-post.jpg | Nuwara Eliya post office | Dan Arndt | CC BY-SA 4.0 |

Commons file pages are linked from `lib/data/properties.ts`. CC BY and CC BY-SA images are used under those licences; adaptations of the site itself are separate from the photographs.

## AI usage

AI coding tools in Cursor were used for assistance while building this prototype: scaffolding the Next.js app, drafting components, and checking the booking validation. I have read the code in this repository, I understand how the pages, filters, and validation fit together, and I can explain those decisions in a technical interview. The sample copy, the information architecture, and the choice to keep this front-end only were reviewed before submission.
