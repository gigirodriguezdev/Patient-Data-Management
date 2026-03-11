# Patient Data Management

A React + TypeScript patient management interface for browsing, searching, and locally creating or editing patient records, with validated API data loading and a UX focused on clarity and maintainability.

## Run the project

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open:

- `http://localhost:5173/`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint code

```bash
npm run lint
```

## Architecture

- **General pattern:** layered architecture with clearly separated responsibilities.
- **`domain`:** entity/form contracts and validation assets (`Patient`, `PatientFormValues`, `patientFormSchema`), plus helper mapping (`patientToFormValues`) and avatar validation constants.
- **`services`:** HTTP access plus response validation/parsing (`getPatients` + Zod).
- **`hooks`:** encapsulate data access and query state (`usePatients`).
- **`components`:**
  - reusable primitives (`Button`, `IconButton`, `Input`, `Modal`, `Card`, etc.),
  - feature components (`PatientCard`, `PatientList`, `PatientsToolbar`, `PatientForm`, `PatientFormModal`, `PatientDetailModal`),
  - dedicated UI-state components (`LoadingState`, `ErrorState`, `EmptyState`).
- **`pages`:** flow orchestration in `PatientsPage` (search, list rendering, create/edit modal, handlers, local list updates).
- **Cross-cutting infrastructure:** `QueryClientProvider` and `Toaster` initialized in `main.tsx`.

## Design decisions

Design decisions prioritized clarity of responsibilities and long-term maintainability. A layered architecture was adopted so that `domain` defines contracts, `services` own API access and data validation, `hooks` encapsulate remote state, and `pages` coordinate UI flow without overloading presentation components with business logic.

From a UX perspective, the interface uses a card-based patient list in a single column. Each card supports inline expand/collapse to reveal more details without losing navigation context. Create and edit flows are centralized in `PatientsPage`: cards emit intent, and the page controls modal state, form mode, and local list updates.

Form and feedback behavior also follow a consistency-first approach. Validation is implemented with React Hook Form + Zod for declarative rules and predictable field errors, while Sonner handles transient success notifications. State-specific rendering is intentionally explicit through dedicated `LoadingState`, `ErrorState`, and `EmptyState` components, and patient inspection is separated into `PatientDetailModal` to keep responsibilities clear. At layout level, toolbar and list are split into separate containers to keep content navigation stable.

Accessibility is treated as a transversal quality goal: semantic structure, properly labeled controls, and keyboard-safe behavior in critical components such as the modal.

To improve code maintainability, module path aliases are used (for example `@/components`, `@/hooks`, `@/services`). This avoids deep relative imports (`../../..`), improves readability, and reduces friction during refactors.

## Tools used

- **React 19 + React DOM 19 + TypeScript:** frontend foundation with static typing.
- **Vite:** fast local development and build tooling.
- **TanStack Query:** remote state lifecycle and query handling.
- **React Hook Form:** efficient form state management.
- **Zod:** schema-based validation and safe data parsing.
- **Sonner:** success/toast notifications.
- **Lucide React:** lightweight and consistent iconography.
- **CSS Modules:** style encapsulation per component.
- **ESLint + Prettier:** code quality and formatting consistency.
- **Unit testing (pending):** not implemented due to time constraints; **Jest** is the selected testing technology.

## Tradeoffs

- **Vite over full-stack frameworks:** favors simplicity and delivery speed, while giving up integrated SSR-like capabilities.
- **CSS Modules over Tailwind CSS:** favors readability and separation of concerns, avoiding JSX with high utility-class density. This also aligns with the goal of building components and styling from the ground up, at the cost of more manual styling work.
- **RHF + Zod over manual validation:** improves consistency and type safety, at the cost of additional dependencies and onboarding curve.
- **Local state for create/edit:** aligned with a non-persistent dataset, but does not mirror a fully remote mutation flow.
- **Cards over dense table layout:** improves readability and UX for long-form content, at the cost of lower on-screen density.
- **Inner scroll container for the list:** improves toolbar control and navigation stability, but requires careful height/overflow calibration.
- **No unit tests in this iteration:** time was prioritized for feature completion and architecture/UI quality; this is acknowledged as controlled technical debt with Jest planned next.

## Relevant notes about current state

- **Environment configuration:** `VITE_PATIENTS_API_URL` is consumed only from the `services` layer.
- **Persistence model:** create/edit actions are local (Query cache updates), consistent with a non-persistent dataset.
- **List UX:** toolbar and list are intentionally decoupled to keep content scrolling stable.
- **Path aliases:** the project uses `@/` absolute aliases to avoid complex relative import paths.

## UI state conventions

- **Loading states:** use `LoadingState` for list/detail loading and action-processing waits instead of ad-hoc spinners.
- **Consistent messaging:** always pass a context-aware `title` (`Loading patients`, `Saving...`) and use `message` when extra guidance is needed.
- **Customization:** prefer the same base layout and only override visuals through `children` when a custom loading animation is necessary.
- **Accessibility baseline:** keep `role="status"` and `aria-live="polite"` behavior for loading feedback.
