<template>
  <div class="page">
    <!-- HERO -->
    <header class="hero">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span>Vue 3 · TypeScript · WCAG 2.2</span>
      </div>
      <h1>
        <span class="hero-title-line">Accessible forms.</span>
        <span class="hero-title-line accent">Without the boilerplate.</span>
      </h1>
      <p class="lead">
        <code>a11y-forms</code> combines ARIA correctness, schema validation, and form-level
        orchestration into one consistent pattern — so every team can ship inclusive forms without
        re-implementing accessibility from scratch each time.
      </p>
      <div class="hero-actions">
        <a href="#examples" class="btn primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Live examples
        </a>
        <a href="#architecture" class="btn ghost">Architecture</a>
        <a href="https://github.com" class="btn github" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          GitHub
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">0</span>
          <span class="stat-label">aria-* written by hand</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">100%</span>
          <span class="stat-label">keyboard navigable</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">1</span>
          <span class="stat-label">pattern for every form</span>
        </div>
      </div>
    </header>

    <!-- PROBLEM / SOLUTION -->
    <section class="compare-section" aria-labelledby="compare-title">
      <div class="section-label">The Problem</div>
      <h2 id="compare-title">What happens without a11y-forms</h2>
      <div class="compare-grid">
        <div class="compare-card before">
          <div class="compare-header">
            <span class="compare-badge bad">Without a11y-forms</span>
          </div>
          <pre
            class="code-block"
          ><code><span class="c-comment">&lt;!-- Typical form code: ARIA scattered everywhere --&gt;</span>
<span class="c-tag">&lt;div&gt;</span>
  <span class="c-tag">&lt;label</span> <span class="c-attr">for</span>=<span class="c-str">"email"</span><span class="c-tag">&gt;</span>Email<span class="c-tag">&lt;/label&gt;</span>
  <span class="c-tag">&lt;input</span>
    <span class="c-attr">id</span>=<span class="c-str">"email"</span>
    <span class="c-attr">:aria-invalid</span>=<span class="c-str">"emailError ? 'true' : 'false'"</span>
    <span class="c-attr">:aria-describedby</span>=<span class="c-str">"emailError ? 'email-err' : undefined"</span>
    <span class="c-attr">v-model</span>=<span class="c-str">"email"</span>
    <span class="c-attr">@blur</span>=<span class="c-str">"validateEmail"</span>
  <span class="c-tag">/&gt;</span>
  <span class="c-tag">&lt;span</span>
    <span class="c-attr">v-if</span>=<span class="c-str">"emailError"</span>
    <span class="c-attr">id</span>=<span class="c-str">"email-err"</span>
    <span class="c-attr">role</span>=<span class="c-str">"alert"</span>
  <span class="c-tag">&gt;</span>{{ emailError }}<span class="c-tag">&lt;/span&gt;</span>
<span class="c-tag">&lt;/div&gt;</span>
<span class="c-comment">&lt;!-- Repeated for every field. For every team. --&gt;</span></code></pre>
          <ul class="compare-issues">
            <li>ARIA attributes managed by hand</li>
            <li>Focus after submit: custom implementation every time</li>
            <li>Validation: re-written for every form</li>
            <li>No consistent error pattern</li>
          </ul>
        </div>
        <div class="compare-card after">
          <div class="compare-header">
            <span class="compare-badge good">With a11y-forms</span>
          </div>
          <pre
            class="code-block"
          ><code><span class="c-comment">&lt;!-- Same UX. Zero boilerplate. --&gt;</span>
<span class="c-tag">&lt;FormProvider</span> <span class="c-attr">@submit</span>=<span class="c-str">"handleSubmit"</span> <span class="c-attr">novalidate</span><span class="c-tag">&gt;</span>

  <span class="c-tag">&lt;AccessibleInput</span>
    <span class="c-attr">v-model</span>=<span class="c-str">"email"</span>
    <span class="c-attr">label</span>=<span class="c-str">"Email"</span>
    <span class="c-attr">name</span>=<span class="c-str">"email"</span>
    <span class="c-attr">required</span>
    <span class="c-attr">:schema</span>=<span class="c-str">"emailSchema"</span>
  <span class="c-tag">/&gt;</span>

  <span class="c-tag">&lt;button</span> <span class="c-attr">type</span>=<span class="c-str">"submit"</span><span class="c-tag">&gt;</span>Submit<span class="c-tag">&lt;/button&gt;</span>

<span class="c-tag">&lt;/FormProvider&gt;</span>
<span class="c-comment">&lt;!-- ARIA, errors, focus: automatic. --&gt;</span></code></pre>
          <ul class="compare-good">
            <li>ARIA generated by the primitives</li>
            <li>Focus jumps automatically to the first error</li>
            <li>Schema rules: explicit and reusable</li>
            <li>One pattern. Consistent everywhere.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ARCHITECTURE -->
    <section id="architecture" class="arch-section" aria-labelledby="arch-title">
      <div class="section-label">Architecture</div>
      <h2 id="arch-title">How the pieces fit together</h2>
      <p class="section-lead">
        Three layers — orchestration, primitives, schemas — cleanly separated yet working in
        concert.
      </p>
      <div class="arch-diagram">
        <div class="arch-layer layer-top">
          <div class="arch-node primary">
            <code>FormProvider</code>
            <span>registers fields · validates · focuses errors</span>
          </div>
        </div>
        <div class="arch-arrows">
          <div class="arch-arrow"></div>
          <div class="arch-arrow"></div>
        </div>
        <div class="arch-layer layer-mid">
          <div class="arch-node secondary">
            <code>AccessibleInput</code>
            <span>label · aria-invalid · aria-describedby</span>
          </div>
          <div class="arch-node secondary">
            <code>AccessibleTextarea</code>
            <span>same API as Input</span>
          </div>
        </div>
        <div class="arch-arrows">
          <div class="arch-arrow"></div>
          <div class="arch-arrow"></div>
        </div>
        <div class="arch-layer layer-bottom">
          <div class="arch-node tertiary">
            <code>useField()</code>
            <span>Composable: state + validation</span>
          </div>
          <div class="arch-node tertiary">
            <code>schema</code>
            <span>Explicit validation rules</span>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS (steps) -->
    <section class="steps-section" aria-labelledby="steps-title">
      <div class="section-label">How it works</div>
      <h2 id="steps-title">Three steps to an inclusive form</h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">01</div>
          <h3>Define a schema</h3>
          <p>Write validation rules once, reuse them everywhere. No inline chaos.</p>
          <pre class="code-block small"><code><span class="c-comment">// schemas.ts</span>
<span class="c-kw">export const</span> <span class="c-var">emailSchema</span> = {
  validate: (v: <span class="c-type">string</span>) =>
    <span class="c-str">/^[^\s@]+@[^\s@]+\.[^\s@]+$/</span>.test(v),
  message: <span class="c-str">'Please enter a valid email address'</span>
}</code></pre>
        </div>
        <div class="step-card">
          <div class="step-number">02</div>
          <h3>Use the primitives</h3>
          <p>
            <code>AccessibleInput</code> and <code>AccessibleTextarea</code> handle ARIA, error
            display, and state automatically.
          </p>
          <pre class="code-block small"><code><span class="c-tag">&lt;AccessibleInput</span>
  <span class="c-attr">v-model</span>=<span class="c-str">"email"</span>
  <span class="c-attr">label</span>=<span class="c-str">"Email"</span>
  <span class="c-attr">name</span>=<span class="c-str">"email"</span>
  <span class="c-attr">required</span>
  <span class="c-attr">:schema</span>=<span class="c-str">"emailSchema"</span>
<span class="c-tag">/&gt;</span></code></pre>
        </div>
        <div class="step-card">
          <div class="step-number">03</div>
          <h3>Submit with confidence</h3>
          <p>
            <code>FormProvider</code> blocks submit when any field is invalid — and automatically
            moves focus to the first failing field.
          </p>
          <pre class="code-block small"><code><span class="c-tag">&lt;FormProvider</span>
  <span class="c-attr">@submit</span>=<span class="c-str">"onSubmit"</span>
  <span class="c-attr">novalidate</span>
<span class="c-tag">&gt;</span>
  <span class="c-comment">&lt;!-- fields go here --&gt;</span>
<span class="c-tag">&lt;/FormProvider&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <!-- LIVE EXAMPLES -->
    <section id="examples" class="examples-section" aria-labelledby="examples-title">
      <div class="section-label">Live examples</div>
      <h2 id="examples-title">Try it out</h2>
      <p class="section-lead">
        Both forms follow the exact same pattern — different fields, identical architecture.
      </p>

      <div class="examples-grid">
        <!-- Contact Form -->
        <article class="example-card" aria-labelledby="ex1-title">
          <div class="example-meta">
            <span class="example-tag">Example 1</span>
            <h3 id="ex1-title">Contact form</h3>
            <p>Required fields, email validation, live feedback on submit.</p>
          </div>
          <div class="example-form">
            <FormProvider @submit="submitContact" novalidate>
              <AccessibleInput
                v-model="contactEmail"
                label="Email"
                name="contact-email"
                required
                placeholder="you@example.com"
                :schema="emailSchema"
              />
              <AccessibleTextarea
                v-model="contactMessage"
                label="Message"
                name="contact-message"
                required
                placeholder="How can we help?"
                :schema="messageSchema"
              />
              <button type="submit">Send message</button>
              <p v-if="contactFeedback" class="feedback" role="status" aria-live="polite">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6.5 11.5 3 8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ contactFeedback }}
              </p>
            </FormProvider>
          </div>
        </article>

        <!-- Newsletter -->
        <article class="example-card" aria-labelledby="ex2-title">
          <div class="example-meta">
            <span class="example-tag">Example 2</span>
            <h3 id="ex2-title">Newsletter signup</h3>
            <p>Compact flow, two required fields, the same validation pattern.</p>
          </div>
          <div class="example-form">
            <FormProvider @submit="submitNewsletter" novalidate>
              <AccessibleInput
                v-model="newsletterEmail"
                label="Work email"
                name="newsletter-email"
                required
                placeholder="name@company.com"
                :schema="emailSchema"
              />
              <AccessibleInput
                v-model="newsletterRole"
                label="Role"
                name="newsletter-role"
                required
                placeholder="Product Designer"
                :schema="messageSchema"
              />
              <button type="submit">Subscribe</button>
              <p v-if="newsletterFeedback" class="feedback" role="status" aria-live="polite">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6.5 11.5 3 8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ newsletterFeedback }}
              </p>
            </FormProvider>
          </div>
        </article>
      </div>
    </section>

    <!-- PRINCIPLES -->
    <section class="principles-section" aria-labelledby="principles-title">
      <div class="section-label">Design principles</div>
      <h2 id="principles-title">The three rules</h2>
      <div class="principles-grid">
        <div class="principle">
          <div class="principle-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3>Fail loud</h3>
          <p>Validation is explicit and blocks submit. No silent dismissal of invalid input.</p>
        </div>
        <div class="principle">
          <div class="principle-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="2"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="11"
                y="2"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="2"
                y="11"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="11"
                y="11"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <h3>Separated concerns</h3>
          <p>Components render UI. Composables manage behavior. Schemas define rules.</p>
        </div>
        <div class="principle">
          <div class="principle-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M10 4v12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>
          <h3>Scales safely</h3>
          <p>The same pattern works from a simple login dialog to complex enterprise journeys.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccessibleInput from './components/AccessibleInput.vue'
import AccessibleTextarea from './components/AccessibleTextarea.vue'
import FormProvider from './components/FormProvider.vue'
import { emailSchema, messageSchema } from '@/schemas'

const contactEmail = ref('')
const contactMessage = ref('')
const contactFeedback = ref('')

const newsletterEmail = ref('')
const newsletterRole = ref('')
const newsletterFeedback = ref('')

function submitContact() {
  contactFeedback.value = `Thanks! We received your message from ${contactEmail.value}.`
}

function submitNewsletter() {
  newsletterFeedback.value = `Subscribed ${newsletterEmail.value} (${newsletterRole.value}) to product updates.`
}
</script>
