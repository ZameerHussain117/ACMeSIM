# Initial Backlog — Core Features Only

User stories below are derived only from the Core scope in `requirements.md`.
Stretch/out-of-scope items are intentionally not broken into stories yet —
revisit only if Core is complete with time remaining.

## Auth
- As a user, I can sign up with my email and password.
- As a user, I receive an OTP by email at signup and must verify it before my
  account is fully active.
- As a user, I can log in with my email and password and receive a session
  (JWT) that keeps me logged in without re-entering my password on every request.
- As a user, I can reset my password via email if I forget it.

## eSIM Store
- As a user, I can browse a list of available eSIM packages.
- As a user, I can filter packages by type: Local, Regional, or Global.
- As a user, I can search for packages by destination/country.
- As a user, I can view full details of a package (data amount, validity, price)
  before buying.

## Purchase & Activation
- As a user, I can pay for a package using a test-mode Stripe card.
- As a user, I receive a QR code by email after a successful purchase.
- As a user, I can see my purchase in an order confirmation screen.
- As a user, my eSIM's validity period only starts once the device connects to
  a real network (not at the moment of purchase).

## My eSIMs
- As a user, I can see all my active eSIMs with remaining data and expiry date.
- As a user, I can see my expired eSIMs and choose to buy the same package again.
- As a user, I can top up an active eSIM without buying a new one.

## Admin Panel
- As an admin, I can view, update, and deactivate user accounts.
- As an admin, I can add, edit, or remove eSIM packages.
- As an admin, I can view all orders and their payment status.

## Access Control
- As an admin, I can access admin-only endpoints that a regular user cannot,
  even if they try to call the API directly (not just because a button is hidden).
- As a user, I cannot access any admin-only functionality, regardless of how
  I try to reach it.
