# eSIM Marketplace App (FYP)

A private eSIM marketplace app — similar to Airalo/Numero — allowing users to browse,
purchase, and activate eSIM data packages. Built as a Final Year Project, scoped down
from a full 22-sprint client requirements document into an academic-timeline-friendly
build.

## Repo Structure

```
/backend        Node.js + Express + MongoDB API (this sprint's main focus)
/mobile-app     React Native app (scaffolded in a later sprint)
/admin-panel    React.js admin dashboard (scaffolded in a later sprint)
/docs           Requirements, backlog, and team role docs
```

## Tech Stack

| Layer            | Technology                          |
|------------------|--------------------------------------|
| Backend          | Node.js, Express.js                  |
| Database         | MongoDB (via Mongoose)               |
| Mobile App       | React Native                         |
| Admin Panel      | React.js                             |
| Auth             | JWT (sessions) + OTP (signup/payment only) |
| Payments         | Stripe (test mode)                   |
| eSIM Provisioning| eSIMgo API (mocked until live access is available) |

## FYP Scope

### Core — must work end-to-end
- Auth: email/password signup + login, JWT sessions, OTP at signup + payment only
- eSIM Store: browse/search/filter by Local / Regional / Global
- Purchase + activation: Stripe test mode, QR code + email delivery
- My eSIMs: view active/expired plans, top-up
- Basic admin panel: users, packages, orders
- Role-based access control (User / Admin), enforced server-side

### Stretch — only if time allows
- Family & Friends package
- Custom bundle builder
- Simple FAQ chatbot (no live human agent escalation)
- Google / Apple sign-in
- One analytics tool (not three)

### Out of scope — documented only, not built
- Live human agent support / 24/7 staffing
- Full GDPR technical implementation
- App Store / Play Store publishing
- Multi-region telecom fraud detection systems
- Production-scale cloud deployment

## Current Sprint

**Sprint 1 — Setup & Planning.** See `/docs` for requirements, backlog, and roles.
Backend is scaffolded with folder structure, database models, mock eSIM data, and
auth middleware structure. Actual login/signup logic is implemented in Sprint 3.
