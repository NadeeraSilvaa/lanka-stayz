# Development summary

Lanka Stayz is a front-end slice of a booking site. The pages, the sample catalogue, and the booking rules are all in this repo. A server is only there to render Next.js. It does not save guests or stays.

## Approach

**Components.** The root layout owns the skip link, header, and footer. Pages compose smaller pieces: a property card, a gallery, a filter form, and a booking panel. Interactive pieces are client components (`"use client"`): the mobile menu, the search form, the gallery selector, the filter form, the booking dialog, and the contact form. Everything else stays a server component so the catalogue is not shipped as client JavaScript.

**Data model.** `Property` in `lib/types.ts` is the stay: slug, name, destination, neighbourhood, type, nightly price in LKR, guest cap, rooms, a short summary, a longer description, amenities, and at least three images. Each image carries alt text and a Wikimedia credit. `getPropertyBySlug` and `getFeaturedProperties` are the only lookups. Twelve stays cover the six towns in the brief, and six of them are flagged for the homepage.

**Filtering.** The listings page reads `searchParams` and turns them into a `StayFilters` object. Unknown towns, types, and sorts are ignored. Guests must be a whole number from 1 to 30. Dates must be real `YYYY-MM-DD` days. `filterProperties` keeps stays in the chosen town and type whose `maxGuests` is at least the requested party, then sorts by featured order or by price. The same object builds the next URL, so chips, cards, and the homepage search all share one query format: `/stays?destination=Ella&checkIn=2026-12-10&checkOut=2026-12-14&guests=2&sort=price-asc`.

Because this Next.js version uses Cache Components, `searchParams` is read inside `<Suspense>`. The heading of Explore Stays can render immediately. The filtered grid streams in after the query string is known.

**Validation.** `validateBooking` is a plain function. It does not touch the DOM. The form calls it on submit and stores the returned messages next to the fields. Rules: name present and at most 80 characters, email with a normal shape, Sri Lankan mobile (`07` plus eight digits, or `+947` plus eight digits, with spaces and dashes stripped), real dates, check-in not before today, check-out after check-in, guests a whole number inside the property maximum. The contact form uses the same email and phone checks. Phone is optional there.

**Dates and money.** Night counts use a Julian day number so a time zone cannot move the stay by a day. Rupees are grouped with a fixed comma pattern (`LKR 27,500`) so the server HTML and the browser cannot disagree. “Today” is read with `new Date()` only after the request is already dynamic (the listings and property pages have awaited `searchParams`) or inside a submit handler. That avoids calling the clock while Next.js is prerendering a static shell.

**Booking.** The property page passes a small `BookingStay` into the client panel, plus any dates and guests from the URL. The side panel multiplies nights by the nightly rate as the dates change. Book Now opens a dialog, copies those dates in, and validates again on submit. Success replaces the form with a summary and a reference such as `LS-261104-3A5`. The reference uses the date and `crypto.getRandomValues`. It exists only on the page.

**Responsive layout.** Tailwind breakpoints do the work: one column on a phone, two cards from `sm`, three from `lg`. The header links hide under a menu button below `md`. The booking panel sticks beside the gallery on large screens and stacks under the article on small ones. The dialog is a bottom sheet on a phone and a centred panel from `sm` up. Focus rings use the same lagoon outline on buttons, fields, and links.

## What a full website would add

- A backend and a database for hosts, stays, photos, and bookings, with the current `Property` type as the shape of the API response.
- A real availability calendar so the night total only includes nights that are free, and so a second request cannot take the same room.
- Accounts for guests and hosts, instead of typing a name on every request.
- Payments in LKR, with a clear split of the nightly rate, taxes, and any host fee. The reference number would be stored and emailed.
- Reviews and a rating on the card.
- An admin or host panel to create a stay, set the rate, block dates, and answer a request.
- Sinhala and Tamil, with translated copy and `lang` on the document, not only English.
- SEO beyond the current titles: canonical URLs, a sitemap, and Open Graph images with absolute URLs.
- An image CDN and responsive crops, instead of committing the source JPEGs.
- Tests: unit tests for `validateBooking`, `nightsBetween`, and `parseStayFilters`, plus a browser test for the booking dialog.
