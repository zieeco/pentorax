Here's the full design system breakdown from the cross-referenced with MY `globals.css`:Here's the complete design system breakdown as a reference table:

| Token                  | CSS Variable                                             | Hex Value | HSL Value           | Use Case                                                                                                     |
| ---------------------- | -------------------------------------------------------- | --------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Primary**            | `var(--color-brand-primary)` / `hsl(var(--primary))`     | `#0061FF` | `217 100% 50%`      | CTAs, active states, links, primary buttons, nav highlights, icon fills                                      |
| **Secondary**          | `var(--color-brand-secondary)` / `hsl(var(--secondary))` | `#27D18C` | `156 68% 49%`       | Success states, badges, secondary buttons, progress indicators, positive metrics                             |
| **Tertiary / Accent**  | `var(--color-brand-tertiary)` / `hsl(var(--accent))`     | `#FFD24D` | `45 100% 65%`       | Warnings, highlights, edit/pencil actions, floating action buttons, attention callouts                       |
| **Neutral / Dark**     | `var(--color-brand-dark)`                                | `#111827` | `228 7% 18%`        | Page backgrounds (dark), sidebar, text on light surfaces, inverted button fills                              |
| **Light / Background** | `var(--color-brand-light)` / `hsl(var(--background))`    | `#F9FAFB` | `0 0% 100%`         | Page background, card backgrounds, light surface fills                                                       |
| **Card surface**       | `hsl(var(--card))`                                       | —         | `0 0% 100%`         | Component card backgrounds, modal surfaces                                                                   |
| **Muted**              | `hsl(var(--muted))`                                      | —         | `220 13% 91%`       | Disabled states, section backgrounds (the light blue-grey panel behind cards in the design system), dividers |
| **Muted Foreground**   | `hsl(var(--muted-foreground))`                           | —         | `220 9% 46%`        | Placeholder text (e.g. "Search"), secondary/helper labels, captions                                          |
| **Foreground**         | `hsl(var(--foreground))`                                 | —         | `228 7% 18%`        | Primary body text, headings on light backgrounds                                                             |
| **Border**             | `hsl(var(--border))`                                     | —         | `214.3 31.8% 91.4%` | Input borders, card borders, dividers, table lines                                                           |
| **Destructive**        | `hsl(var(--destructive))`                                | —         | `0 84.2% 60.2%`     | Delete actions (red trash icon buttons), error states, danger alerts                                         |

---

**Component-specific usage from the design system image:**

| Component                       | Token to Use                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| Primary button (filled blue)    | `bg-primary text-primary-foreground`                                                   |
| Secondary button (outline)      | `border-border text-foreground`                                                        |
| Inverted button (black fill)    | `bg-brand-dark text-white`                                                             |
| Outlined button                 | `border-primary text-primary`                                                          |
| Search input                    | `bg-muted border-border text-muted-foreground` (placeholder)                           |
| Progress/divider lines          | Primary line: `bg-primary`, Secondary line: `bg-secondary`, Tertiary line: `bg-accent` |
| Active nav icon                 | `bg-primary text-white`                                                                |
| Inactive nav icons              | `text-muted-foreground`                                                                |
| Floating Action Button (pencil) | `bg-accent text-accent-foreground`                                                     |
| Label button (blue+icon)        | `bg-primary/20 text-primary border-primary`                                            |
| Icon button — Primary           | `bg-primary`                                                                           |
| Icon button — Secondary         | `bg-secondary`                                                                         |
| Icon button — Tertiary          | `bg-accent`                                                                            |
| Icon button — Destructive       | `bg-destructive`                                                                       |
| Card / panel surface            | `bg-card` or `bg-muted`                                                                |
| Body text                       | `text-foreground`                                                                      |
| Caption / label text            | `text-muted-foreground`                                                                |

---

**Rules for the DESIGN, TYPO, COLOR, etc:**

1. **Never hardcode hex values** — always use the CSS variable or Tailwind utility that maps to it (e.g. `bg-primary` not `bg-[#0061FF]`).
2. **Never hardcode HSL** — use `hsl(var(--primary))` in raw CSS if needed, not the literal HSL string.
3. **Brand colors live in two places** — `--color-brand-*` for direct reference and `--primary/--secondary/--accent` for Shadcn component props. Prefer the semantic token (`--primary`) over the brand alias (`--color-brand-primary`) so dark mode switching works automatically.
4. **Destructive = red = delete only** — do not repurpose it for warnings; use `--accent` (yellow) for warnings.
5. **Muted backgrounds ≠ disabled** — `bg-muted` is a valid surface color for panels and section wrappers, not just disabled states.
