# PentoraX Dashboard Migration: Restart Phase
Do not delete this instruction:

---

**AGENT INSTRUCTIONS — FOLLOW STRICTLY, NO EXCEPTIONS**

**Entry Point**
- This file is your **sole entry point**
- Write and update **all progress directly in this file**
- **DO NOT** create any Gemini file or folder
- **DO NOT** create any Artifact of any kind (e.g., task.md, implementation_plan.md, walkthrough.md)
- **STRICTLY NO ARTIFACTS OR TASK BOUNDARIES** — Stick to chat and this file only.

**Component Naming**
- **DO NOT** suffix component names with `Client`
- **DO NOT** suffix component names with `View`

**UI Components — Native HTML is FORBIDDEN, always use the shadcn equivalent**

**COMPONENTS CODE LENGTH**
- **DO NOT** create components with more than 150 lines of code
- **FOLLOW THE 150 LINE Rule**
- ** Exception to component that handles form, they could actually be more than 150, but must be modular, reusable and maintainable. Each section should be a separate component, making it 150 lines or less**
- **MAINTAIN THE SRP (Single Responsibility Principle)**
- **YOUR CODE MUST BE CLEAN, READABLE, TESTABLE, MAINTAINABLE, AND MODULAR**


| ❌ DO NOT USE (Native) | ✅ USE INSTEAD (shadcn) |
|---|---|
| `<button>` | `<Button>` |
| `<input>` | `<Input>` |
| `<textarea>` | `<Textarea>` |
| `<select>` | `<Select>` |
| `<checkbox>` / `<input type="checkbox">` | `<Checkbox>` |
| `<input type="radio">` | `<RadioGroup>` / `<RadioGroupItem>` |
| `<input type="range">` | `<Slider>` |
| `<input type="switch">` / toggle | `<Switch>` |
| `<label>` | `<Label>` |
| `<a>` (navigation link) | `<Link>` or shadcn navigation component |
| `<hr>` | `<Separator>` |
| `<img>` (avatar) | `<Avatar>` |
| `<progress>` | `<Progress>` |
| `<details>` / `<summary>` | `<Accordion>` |
| `<dialog>` / `<modal>` | `<Dialog>` |
| `<alert>` / custom alert div | `<Alert>` |
| Custom tooltip div | `<Tooltip>` |
| Custom dropdown div | `<DropdownMenu>` |
| Custom popover div | `<Popover>` |
| Custom tabs div | `<Tabs>` |
| Custom card div | `<Card>` |
| Custom badge span | `<Badge>` |
| Custom skeleton div | `<Skeleton>` |
| Custom table (`<table>`, `<tr>`, `<td>`) | `<Table>` |
| Custom toast / notification | `<Toast>` / `useToast()` |
| Custom calendar / date picker | `<Calendar>` / `<DatePicker>` |
| Custom command palette | `<Command>` |
| Custom context menu | `<ContextMenu>` |
| Custom sheet / drawer | `<Sheet>` |
| Custom navigation menu | `<NavigationMenu>` |
| Custom scrollable area | `<ScrollArea>` |
| Custom aspect ratio div | `<AspectRatio>` |
| Custom toggle button | `<Toggle>` / `<ToggleGroup>` |
| Custom form wrapper | `<Form>` (shadcn + react-hook-form) |
| Custom breadcrumb nav | `<Breadcrumb>` |
| Custom pagination | `<Pagination>` |
| Custom resizable panels | `<ResizablePanelGroup>` |
| Custom carousel | `<Carousel>` |
| Custom chart | `<ChartContainer>` (shadcn + recharts) |
| Custom input with suggestions | `<Combobox>` |
| Custom number input | `<InputOTP>` (for OTP) or `<Input type="number">` |
| Custom sidebar layout | `<Sidebar>` |

**General Rule**
> If shadcn has a component for it — **use it, no exceptions**. Never reach for a native HTML element or build a custom component when a shadcn equivalent exists.

---

**Progress Tracking (Current Refresh)**
- [x] Initialize fresh Next.js 15 project in `frontend`
- [x] Shadcn UI Setup (Nova preset, Tailwind v4)
- [x] UI Library Migration (51 components verified)
- [x] Git & Environment Consolidation (.gitignore & .env rooted)
- [x] Legacy Config Audit (Frontend configs reviewed)
- [x] Configuration Consolidation (ESLint, Commitlint, Prettier established)
- [x] Cleanup Execution (Legacy File Deletion completed)
- [x] Utility Restoration (src/utils restored with original names)
- [x] Library Restoration (src/lib restored with original names)
- [x] State Management Restoration (src/stores restored with original names)
- [x] Service Layer Restoration (src/services restored with original names)
- [x] Provider Restoration (src/providers restored and refactored)
- [x] Establish `(dashboard)` route group with layout, Sidebar, DashboardHeader, ProtectedRoute
- [x] Dashboard Overview page (`/dashboard`)
- [x] Products Listing page (`/dashboard/products`)
- [x] Orders Listing page (`/dashboard/orders`)
- [x] Newsletter page (`/dashboard/newsletter`)

**Phase 3: Full Port + Violation Fixes (corrected after original frontend review)**

### Route Architecture (Next.js App Router)
Original has 3 route groups: auth, public (with Header+Footer), dashboard.
Next.js port must mirror:
- `(auth)/auth/login/` → `/auth/login` — 2-pane login layout, no nav
- `(auth)/auth/signup/` → `/auth/signup`
- `(auth)/auth/forgot-password/` → `/auth/forgot-password`
- `(home)/` → `/` with Header + Footer public layout (LandingPage + shop + about etc.)
- `(dashboard)/dashboard/` → `/dashboard/*` with sidebar (already done)

### Violation Fixes (SRP / 150-line rule / shadcn-only)
- [x] Fix `Sidebar.tsx`: Already refactored to 80 lines and modularized.
- [x] Refactor `dashboard/page.tsx`: Decomposed into `DashboardStatsGrid`, `DashboardInventoryTable`, etc. (91 lines).
- [x] Refactor `products/page.tsx`: Decomposed into `ProductHeader`, `ProductTable`, etc. (90 lines).
- [x] Refactor `orders/page.tsx`: Decomposed into `OrderHeader`, `OrdersTable`, etc. (67 lines).
- [ ] Refactor `newsletter/page.tsx`: replace native `<input>`, `<button>`, `<table>` with shadcn equivalents
- [!] **Violation Note**: `ProductTable.tsx` (173 lines) and `OrdersTable.tsx` (174 lines) currently exceed the 150-line rule and require further decomposition (e.g., extract `TableRow` components).

### Auth Pages (`(auth)` route group)
- [ ] Create `(auth)/layout.tsx` — clean full-screen layout, no sidebar
- [ ] Create `(auth)/auth/login/page.tsx` — 2-pane: left decorative (image + tagline), right form (email + password + forgot-password link + signup link)
- [ ] Create `(auth)/auth/signup/page.tsx` — signup form
- [ ] Create `(auth)/auth/forgot-password/page.tsx` — email reset form
- [ ] Update root `app/page.tsx` → server redirect to `/dashboard`

### Home Layout (`(home)` route group) — PUBLIC SITE
⚠️ Original app has a full public website (Landing, Shop, About, Solutions, Products pages)
Do NOT port these yet — ask user for scope. Placeholder only.
- [ ] Create `(home)/layout.tsx` — Header + Footer wrapper
- [ ] Create `(home)/page.tsx` — redirect to LandingPage stub or redirect to `/auth/login`

### Product Form Module (Core — highest priority)
- [ ] Port `useProductsPage` hook to `frontend/src/hooks/useProductsPage.ts`
- [ ] Port product form sub-components to `src/components/dashboard/products/form/`:
  - `ProductFormHeader`, `ProductFormSkeleton`, `ProductInventorySection`
  - `ProductBasicInfoSection`, `ProductPricingSection`, `ProductCategorizationSection`
  - `ProductVisualsSection`, `ProductImagesButton`, `ProductSpecificationsButton`
  - `ProductImagesModal`, `ProductSpecificationsModal`, `AISuggestionsAlert`, `ProductDeleteButton`
- [ ] Create `/dashboard/products/new/page.tsx` + `/dashboard/products/[slug]/edit/page.tsx` using shared `ProductFormPage` logic
- [ ] Add `useUploadProductImage` hook to `products-hooks.ts`

### Stock Notifications Module
- [ ] Port `stockNotifications.admin.hooks.ts` → `src/hooks/notifications-hooks.ts`
- [ ] Port `useNotificationsPage.ts` hook
- [ ] Port `SendEmailDialog` component → `src/components/dashboard/SendEmailDialog.tsx`
- [ ] Create `/dashboard/notifications/page.tsx` (paginated table, bulk actions, email dialog, tabs filter)

- [x] Refactor `ProductTable.tsx` and `OrdersTable.tsx` (Violation Fixes)
- [x] Port `Product Form` Module (14 sub-components)
- [x] Port `Stock Notifications` Module (hooks, `SendEmailDialog`, etc.)
- [x] Create `/dashboard/orders/[id]/page.tsx` (Order Detail Admin)
- [x] Create placeholder pages for `Customers`, `Analytics`, `Content`, `Support`, `Settings`

**Phase 3: Refinements & Public Site Gaps**
- [x] Implement `(home)/newsletter/unsubscribe/page.tsx` (Functional implementation)
- [x] Implement `(home)/payment/cancel/page.tsx` and error handling
- [ ] Verify/Refine `(home)/about/team` and `careers` pages (Verified as complete)
- [ ] Verify `(home)/case-studies` detail views requirements (Legacy is list-only, parity achieved)

**Phase 4: Dashboard Transition (Data-Driven)**
- [ ] Transition `Analytics` placeholder (Pending Backend stats API)
- [ ] Transition `Customers` placeholder (Pending Backend ViewSet)
- [ ] Transition `Content` placeholder (Pending Backend CRUD)
- [ ] Transition `Support` placeholder (Pending Ticket API integration)

**Current Task**: Finalizing migration review and verification.

---
*Last updated: 2026-03-28*
