# Dealcraft: verified deal card (UI prototype)

A small, deliberately polished React + TypeScript interaction exercise. It showcases a fictional shopping-deal card with four simulated verification states, a working copy-to-clipboard action, feedback, loading/disabled states, and responsive styling.

> **Personal prototype.** Luma & Loom is a fictional merchant. `LUMA30` is a nonredeemable sample code. **No real coupons are verified, no merchant API is contacted, and the status labels do not indicate actual verification.**

## Requirements

- Node.js **20.19+ or 22.12+** (a current Node.js LTS version recommended)
- npm
- VS Code or another text editor
- Optional: Git and GitHub account; Vercel account for hosting

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`).

Other commands:

```bash
npm run typecheck  # TypeScript validation
npm run build      # Check types, then generate dist/
npm run preview    # Preview the production build
```

## Architecture

```
src/
  App.tsx                     # Accessible state controls, loading simulation, page layout
  deal.ts                     # Typed state model, fictional offer data, status-specific copy rules
  components/
    DealCard.tsx              # Merchant, coupon, status messaging, clipboard UI
    Icons.tsx                 # Reusable inline SVG icons
  hooks/
    useCouponCopy.ts          # Clipboard API, feedback timers, failure handling
  styles.css                  # Responsive design system, focus states, reduced motion
  main.tsx                    # React entry point
```

### State model

| Preview state | Primary action | Reason |
| --- | --- | --- |
| Verified (demo) | Enabled unless loading | Test the clipboard flow with a sample code |
| Uncertain (demo) | Disabled | Avoid suggesting validity when a status is uncertain |
| Expired (demo) | Disabled | Expired offers cannot be copied through the action button |
| Failed (demo) | Disabled | A simulated failed check has no valid result |
| Loading preview | Disabled | Prevent actions during a simulated delay |

The selectable coupon code field remains available in the UI in every state so users can inspect the sample; the **primary copy action** is disabled outside the verified preview. This is a deliberate UX decision and not a security boundary.

### Clipboard and error handling

- Copy uses `navigator.clipboard.writeText` on a user click. This usually requires a secure origin such as localhost or HTTPS and may depend on browser permissions.
- Success creates a visible status and an `aria-live` announcement, then clears after three seconds.
- Failure creates an announced error and automatically focuses and selects the read-only input for manual copying.
- A checkbox lets you deliberately simulate the clipboard failure branch without changing browser permissions.
- Feedback timers are cleaned up on unmount. Changing preview state re-mounts the demo card to clear stale copy feedback.

### Accessibility

- Native `<button>`, `<fieldset>`, `<legend>`, and `<input>` elements for real keyboard operation.
- `aria-pressed` exposes which preview state is selected.
- Visible `:focus-visible` outlines and a skip-to-content link.
- Statuses are identified by **text and icons**, not color alone.
- Disabled buttons use the native `disabled` property.
- `role="status"` and `aria-live="polite"` announce clipboard results.
- The offer card uses `aria-busy` for the loading preview.
- Animations respect `prefers-reduced-motion: reduce`.

### Design choices

- One demonstration card and one control panel instead of a full shopping app. This keeps attention on edge cases.
- Deep green, cream, and soft lime create a premium identity; warm amber and muted red differentiate alternative states.
- A ticket perforation visually reinforces the coupon metaphor without relying on imagery.
- Manrope and DM Sans use web fonts with system-font fallbacks. Removing the `@import` in `styles.css` makes it fully self-contained and offline-friendly.
- CSS only for animations; Framer Motion is not required.

## Manual QA checklist

1. Start on **Verified**. Click **Copy code** and confirm the button changes to **Copied!**, a success message appears, and the clipboard contains `LUMA30`.
2. Use Tab and Shift+Tab to navigate. Confirm every interactive control has a visible keyboard focus ring. Press Enter or Space to activate buttons and the checkbox.
3. Switch to **Uncertain**, **Expired**, and **Failed**. Confirm unique labels/descriptions and disabled copy action in each state.
4. Click **Simulate loading**. Confirm the status reads Loading, the action is disabled, and the old status returns after about 1.5 seconds. Clicking a status during loading cancels the delay.
5. Return to Verified, check **Simulate clipboard error**, and click Copy. Confirm error feedback, focus moves to the selected code, and manual copying works.
6. Resize from roughly 320px through desktop widths. Confirm no horizontal scrolling, clipped buttons, or overlapping text.
7. Turn on your OS/browser **Reduce motion** setting and confirm the spinner/shimmer effect no longer animates noticeably.
8. Run `npm run typecheck` and `npm run build`.

## Deploy

### GitHub

Create an empty repository on GitHub named `verified-deal-card` (do not add a README at creation; one is already included), then in this project folder:

```bash
git init
git add .
git commit -m "Build accessible deal card prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/verified-deal-card.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your account name. GitHub authentication may be required.

### Vercel

1. Go to <https://vercel.com/new> and sign in.
2. Import the GitHub repository `verified-deal-card`.
3. Choose Vite if asked; use build command `npm run build` and output directory `dist` (Vercel commonly detects these automatically).
4. Deploy and save the generated public URL.
5. Add **Live demo** and **GitHub repository** links to the repository description or README once they actually exist.

Guide: <https://vite.dev/guide/static-deploy>

## Limitations and future work

- All offer data and status outcomes are static simulations. There is no backend, expiration engine, live redemption, persistence, or remote verification.
- The `failed` state illustrates a failed check but does not contact a server. The loading control is a timer only.
- There is no production-level accessibility audit, automated cross-browser suite, or analytics. Verify with VoiceOver/NVDA and more browsers before calling it production-ready.
- A production integration would need a real, consented merchant data source, reliable freshness timestamps, disclosure of confidence level, secure API handling, and error observability.

## Project statement for a portfolio

> Built an accessible, responsive coupon-deal interface in React and TypeScript featuring four simulated verification states, robust clipboard feedback, disabled/loading behavior, keyboard-friendly controls, and reduced-motion support. Fictional data only; no real coupon verification.

## License

Personal learning/demo use. No trademark, merchant endorsement, or coupon validation is claimed.
