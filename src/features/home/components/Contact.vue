<script setup lang="ts">
import { ref, onMounted } from "vue";
import { t } from "../../../i18n/utils/translate";

const form = ref({ name: "", email: "", subject: "", message: "" });
const sent = ref(false);
const sending = ref(false);
const visitorCount = ref<number | null>(null);

onMounted(() => {
  fetch("https://api.countapi.xyz/hit/erikorozco-dev/visitors")
    .then((res) => res.json())
    .then((data) => { visitorCount.value = data.value; })
    .catch(() => { visitorCount.value = 0; });
});

function submitForm() {
  if (!form.value.name || !form.value.email || !form.value.message) return;
  sending.value = true;
  const text = encodeURIComponent(
    `Hola Erik! Te contacto desde tu portafolio.\nNombre: ${form.value.name}\nEmail: ${form.value.email}` +
    (form.value.subject ? `\nAsunto: ${form.value.subject}` : "") +
    `\nMensaje: ${form.value.message}`
  );
  window.open(`https://wa.me/523121336288?text=${text}`, "_blank", "noopener");
  sent.value = true;
  setTimeout(() => {
    sent.value = false;
    sending.value = false;
    form.value = { name: "", email: "", subject: "", message: "" };
  }, 3200);
}
</script>

<template>
  <section class="curriculum-contact" id="contact">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ "// contact" }}</span>
        <h2 class="section-title">{{ t("lets-work-together") }}</h2>
        <p class="section-description">{{ t("about-tagline") }}</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-phone"></i></div>
            <div class="contact-details">
              <span class="contact-label">{{ t("phone") }}</span>
              <a href="tel:+523121336288" class="contact-value">(312) 133-6288</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><i class="fas fa-envelope"></i></div>
            <div class="contact-details">
              <span class="contact-label">{{ t("email") }}</span>
              <a href="mailto:orozcoalcarazerik@gmail.com" class="contact-value">orozcoalcarazerik@gmail.com</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon"><i class="fab fa-whatsapp"></i></div>
            <div class="contact-details">
              <span class="contact-label">WhatsApp</span>
              <a href="https://wa.me/523121336288" target="_blank" rel="noopener noreferrer" class="contact-value">(312) 133-6288</a>
            </div>
          </div>
          <div class="contact-social-row">
            <a href="https://wa.me/523121336288" target="_blank" rel="noopener noreferrer" class="social-btn whatsapp-btn">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="submitForm" novalidate>
            <div class="form-group">
              <label for="contact-name">{{ t("name") }}</label>
              <input type="text" id="contact-name" v-model="form.name" :placeholder="t('name')" required />
            </div>
            <div class="form-group">
              <label for="contact-email">{{ t("email") }}</label>
              <input type="email" id="contact-email" v-model="form.email" :placeholder="t('email')" required />
            </div>
            <div class="form-group">
              <label for="contact-subject">{{ t("subject") }}</label>
              <input type="text" id="contact-subject" v-model="form.subject" :placeholder="t('subject')" />
            </div>
            <div class="form-group">
              <label for="contact-message">{{ t("message") }}</label>
              <textarea id="contact-message" v-model="form.message" rows="5" :placeholder="t('message')" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full" :disabled="sending">
              <i v-if="!sent" class="fas fa-paper-plane"></i>
              <i v-else class="fas fa-check"></i>
              {{ sent ? (t("contact") + " ✓") : t("contact") }}
            </button>
          </form>
        </div>
      </div>

      <div class="visitor-counter" v-if="visitorCount !== null">
        <i class="fas fa-eye"></i>
        <span>{{ visitorCount.toLocaleString() }} {{ t("visits") }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.curriculum-contact {
  --accent: #6366f1;
  --accent-2: #8b5cf6;
  --accent-3: #06b6d4;
  --accent-bg: rgba(99,102,241,.1);
  --accent-b: rgba(99,102,241,.22);
  --t-1: #f1f5f9;
  --t-2: #94a3b8;
  --t-3: #475569;
  --glass: rgba(255,255,255,.04);
  --glass-b: rgba(255,255,255,.07);
  --glass-b-hover: rgba(255,255,255,.14);
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
  --r-xl: 24px;
  --ease: all .3s cubic-bezier(.4,0,.2,1);
  --font-display: 'Chakra Petch','Inter',system-ui,sans-serif;
  --font-mono: 'JetBrains Mono','Courier New',monospace;

  background: var(--bg-0, #030305);
  color: var(--t-1);
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 80px 0;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-family: var(--font-mono);
}
.section-tag::before { content: '[ '; color: var(--accent-3); }
.section-tag::after  { content: ' ]'; color: var(--accent-3); }

.section-title {
  font-size: clamp(26px, 3.8vw, 40px);
  font-weight: 700;
  letter-spacing: -.02em;
  margin-bottom: 12px;
  font-family: var(--font-display);
  color: var(--t-1);
}

.section-description {
  color: var(--t-2);
  font-size: 15px;
  max-width: 480px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 44px;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: rgba(3,3,5,.6);
  border: 1px solid var(--glass-b);
  border-radius: var(--r-lg);
  backdrop-filter: blur(16px);
  transition: var(--ease);
}

.contact-item:hover {
  border-color: rgba(99,102,241,.25);
}

.contact-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-bg);
  border-radius: var(--r-sm);
  color: var(--accent);
  font-size: 17px;
  flex-shrink: 0;
}

.contact-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: var(--t-3);
  text-transform: uppercase;
  letter-spacing: .08em;
  margin-bottom: 3px;
}

.contact-value {
  font-size: 14px;
  font-weight: 500;
  transition: var(--ease);
  color: var(--t-1);
  text-decoration: none;
}

.contact-value:hover {
  color: var(--accent);
}

.contact-social-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: var(--r-md);
  font-size: 13px;
  font-weight: 600;
  transition: var(--ease);
  border: 1px solid var(--glass-b);
  text-decoration: none;
  color: var(--t-1);
}

.social-btn:hover {
  transform: translateY(-2px);
}

.whatsapp-btn {
  background: rgba(37,211,102,.08);
  border-color: rgba(37,211,102,.22);
  color: #25d366;
}

.whatsapp-btn:hover {
  background: rgba(37,211,102,.16);
}

.contact-form-wrapper {
  padding: 32px;
  background: rgba(3,3,5,.6);
  border: 1px solid var(--glass-b);
  border-radius: var(--r-xl);
  backdrop-filter: blur(16px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group label {
  font-size: 12px;
  font-weight: 700;
  color: var(--t-2);
  text-transform: uppercase;
  letter-spacing: .05em;
}

.form-group input,
.form-group textarea {
  padding: 12px 14px;
  background: rgba(255,255,255,.03);
  border: 1px solid var(--glass-b);
  border-radius: var(--r-md);
  color: var(--t-1);
  font-size: 14px;
  font-family: inherit;
  transition: var(--ease);
  outline: none;
  resize: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: rgba(99,102,241,.5);
  background: rgba(99,102,241,.04);
  box-shadow: 0 0 0 3px rgba(99,102,241,.07);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--t-3);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: var(--r-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: var(--ease);
  letter-spacing: .01em;
  white-space: nowrap;
  text-decoration: none;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff;
  box-shadow: 0 4px 18px rgba(99,102,241,.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(99,102,241,.5);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

.btn:disabled {
  opacity: .7;
  cursor: not-allowed;
  transform: none !important;
}

.visitor-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;
  font-size: 12px;
  color: var(--t-3);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

.visitor-counter i {
  color: var(--accent);
  font-size: 11px;
}

@media (max-width: 820px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
