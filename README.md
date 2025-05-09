# Accessible Form System (Vue 3 + TypeScript)

This project provides a scalable, accessible, and fully reactive form system for Vue 3 applications. It is built with enterprise-grade form handling and accessibility in mind – designed to eliminate duplication, enforce validation, and improve user experience for all users.

---

## Table of Contents

- [Overview](#overview)
- [Developer Frustration in the Real World](#developer-frustration-in-the-real-world)
- [Motivation](#motivation)
- [Architectural Principles](#architectural-principles)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [System Design Diagram](#system-design-diagram)
- [Testing Strategy](#testing-strategy)
- [Usage Example](#usage-example)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

---

## Overview

Most Vue form implementations are inconsistent, inaccessible, and difficult to test. This project solves those issues by introducing a component-driven system that separates concerns, supports schema validation, and ensures accessibility out of the box.

---

## Developer Frustration in the Real World

- Writing the same `v-model + error + touched` boilerplate in every component is wasteful.
- Having to "fight" with design system components to make them accessible slows down delivery.
- Being forced to choose between beautiful components and accessible ones is a false choice.
- In large teams, accessibility becomes everyone's responsibility — which too often means no one owns it.

This system restores ownership, sanity, and speed to form development.

---

## Motivation

While contributing to a large-scale design system in the banking sector, I consistently encountered three recurring pain points:

1. **Inaccessible defaults**: Inputs and forms across teams lacked basic ARIA roles and keyboard support. Fixes were often patchwork and inconsistent.
2. **Validation chaos**: Every team reimplemented form validation logic – leading to duplicated effort, silent failures, and regressions.
3. **Lack of form ownership**: There was no central pattern for managing complex forms with lifecycle awareness, validation state, and accessibility.

This repository is my response to those challenges.

It introduces a scalable, declarative pattern for accessible forms with centralized validation and ARIA correctness – and it's designed to be used in serious enterprise projects.

---

## Architectural Principles

- **Separation of concerns**: Validation, ARIA, and state are isolated in composables. Components stay lean and declarative.
- **Form-centric thinking**: The `<FormProvider />` acts as a local validation manager – no global state, no unnecessary dependencies.
- **Fail loud, not silent**: All validation returns `Promise<boolean>` and forces visibility. Errors aren't swallowed – they’re exposed.
- **Accessibility is not a theme**: It's in the DNA. ARIA attributes, roles, and `aria-describedby` come built-in.
- **Design system agnostic**: This works with or without Stella UI, Vuetify, Tailwind, or any other UI layer.

This pattern helps me work faster, test easier, and avoid UI regressions in large banking frontends.

---

## Layered Architecture

This project follows a layered architecture inspired by MVC principles:

- **Model (State & Logic):**

  - `useA11yInput.ts` – Manages input state, validation, ARIA computation.
  - `useForm.ts` – Global form registry, lifecycle, and validation logic.

- **View (UI Components):**

  - `AccessibleInput.vue`, `AccessibleTextarea.vue` – Render inputs with full ARIA and error display.
  - These are design-system-agnostic and minimal in style.

- **Controller (Flow & Orchestration):**
  - `FormProvider.vue` – Acts as the controller that registers/unregisters fields, triggers validations, and manages submit flow.

This separation ensures testability, reusability, and clarity at scale. Each concern is isolated, which makes the form system suitable for microfrontends, design system integrations, and automated testing.

---

## Features

- **FormProvider** for scoped validation and control
- **Composable `useA11yInput`** for managing value, validation, and ARIA attributes
- **Schema-based validation** using `valibot`
- Fully supports `v-model` bindings
- Accessible by default (ARIA roles, `aria-invalid`, `aria-describedby`)
- Type-safe and framework-agnostic logic
- No design layer – easy to theme or integrate into design systems

---

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Valibot** for validation schemas
- **Vite** (recommended dev server)
- Optional: **Vitest** for unit testing
- Optional: **Storybook** for isolated component dev

---

## Directory Structure

```txt
src/
├── components/
│   ├── AccessibleInput.vue
│   ├── AccessibleTextarea.vue
│   └── FormProvider.vue
├── composables/
│   ├── useA11yInput.ts
│   └── useForm.ts
├── schemas/
│   └── index.ts
├── App.vue (example usage)

```

---

## System Design Diagram

```
+----------------------+         +------------------+
| <FormProvider />     |<------->| useForm()        |
| (manages state)      |         | (registry + val) |
+----------+-----------+         +--------+---------+
           |                             |
     registers                       async validate
           |                             |
+----------v-----------+         +--------v---------+
| <AccessibleInput />  |         | <AccessibleTextarea />
| useA11yInput()       |         | useA11yInput()    |
| exposes validate()   |         | exposes validate()|
+----------------------+         +-------------------+
```

---

## Testing Strategy

- Unit-tested using [Vitest](https://vitest.dev)
- Mocked input events for `onInput`, `onBlur`
- Validate ARIA attributes (`aria-invalid`, `aria-describedby`)
- Validate async validation return values
- Storybook stories as integration sanity tests

---

## Usage Example

```vue
<FormProvider @submit="handleSubmit">
  <AccessibleInput
    v-model="email"
    name="email"
    label="Email"
    required
    :schema="emailSchema"
  />

  <AccessibleTextarea
    v-model="message"
    name="message"
    label="Message"
    required
    :schema="messageSchema"
  />

  <button type="submit">Send</button>
</FormProvider>
```

---

## Roadmap

- [ ] Add async schema support
- [ ] Improve screen reader announcement timing
- [ ] Add loading + disabled states to `FormProvider`
- [ ] CLI generator for new fields
- [ ] Public package for npm

---

## About the Author

I'm a frontend engineer working in a major European bank. I'm building this system not just to solve technical problems – but to reshape how form accessibility is handled in real enterprise products. Accessibility isn’t an add-on. It’s **in the code, like DNA**.

---

## License

MIT
