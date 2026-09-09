# Requirements — FYP Scope

This project is based on a full client requirements document for a private eSIM
marketplace app. The original document describes a 22-sprint, production-scale build.
For an academic FYP timeline, the scope has been deliberately tiered as follows.

## Core (must be fully working and deployable by the end)
- **Auth**: email/password signup, login, JWT-based sessions, OTP verification only
  at signup and at payment (not on every login)
- **eSIM Store**: browse, search, and filter packages by type — Local / Regional / Global
- **Purchase & Activation**: Stripe payment in **test mode**, QR code generated and
  emailed on purchase, basic activation status tracking
- **My eSIMs**: view active and expired eSIMs, top-up an active plan
- **Basic Admin Panel**: manage users, manage eSIM packages, view orders
- **Role-Based Access Control**: two roles — User and Admin — enforced at the API
  level (server-side), not just hidden in the UI

## Stretch (build only if time remains after Core is solid)
- Family & Friends package (buy 2–8 eSIMs in one transaction)
- Custom bundle builder (user-selected data/validity/destination)
- A simple FAQ-style chatbot (no live human agent escalation)
- Google / Apple sign-in
- One analytics tool integrated (not all three from the original document)

## Out of scope (documented in the FYP report, not built)
- 24/7 live human agent support and ticketing (Zendesk/Freshdesk)
- Full GDPR technical implementation (data anonymization pipelines, automated
  retention/deletion policies, breach reporting workflows)
- Publishing to the Apple App Store / Google Play Store
- Multi-region telecom fraud detection and compliance systems
- Production-scale cloud deployment (AWS/GCP at real traffic levels)

## Why this scope was chosen
The original document assumes a small professional team working full-time for
3–4 months. An FYP team has a fixed academic timeline and no dedicated
DevOps/compliance/support staff — so the scope above focuses effort on
end-to-end technical correctness of the core purchase flow (the part that best
demonstrates the engineering work), while clearly documenting the rest as
understood-but-out-of-scope rather than attempting a partial, unreliable version
of everything.
