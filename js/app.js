const scenarios = {
  curfew: {
    title: "Curfew",
    summary: "A common conflict: What time to be home and how much flexibility is reasonable.",
    parent: {
      feel: "Concerned, responsible, and sometimes anxious about safety and routines.",
      care: [
        "Knowing their teen is safe",
        "Clear communication about plans and timing",
        "Healthy sleep and school routines",
        "Trust built through reliability"
      ],
      help: [
        "Explain the reason for the curfew instead of only stating the rule",
        "Agree on check-in expectations (e.g., a message if plans change)",
        "Offer flexibility when trust and responsibility are shown",
        "Discuss consequences and adjustments calmly in advance"
      ],
      bridge: "Bridge: A curfew can be framed as a safety plan, not just a restriction—especially when teens have a voice in setting it."
    },
    teen: {
      feel: "Wanting independence and trust, but sometimes frustrated or misunderstood.",
      care: [
        "Having time with friends and social experiences",
        "Being trusted to make responsible choices",
        "Fairness compared to peers and siblings",
        "A chance to explain plans and negotiate"
      ],
      help: [
        "Share plans clearly (where, who, when, how you'll get home)",
        "Check in on time to build trust",
        "Suggest a reasonable compromise or trial period",
        "Stay calm and revisit the conversation if emotions run high"
      ],
      bridge: "Bridge: Independence grows stronger when it is paired with communication and follow-through."
    }
  },
  phone: {
    title: "Phone & Privacy",
    summary: "Balancing connection, privacy, and safety in a digital world.",
    parent: {
      feel: "Protective and sometimes unsure about online risks, screen time, or boundaries.",
      care: [
        "Online safety and respectful behavior",
        "Balanced screen time and sleep",
        "Knowing when to step in if there is a problem",
        "Maintaining trust and openness"
      ],
      help: [
        "Set clear expectations together (time, apps, privacy, safety)",
        "Focus on safety and well-being rather than surveillance alone",
        "Respect age-appropriate privacy while keeping communication open",
        "Revisit rules as maturity and needs change"
      ],
      bridge: "Bridge: Trust grows when privacy and safety are discussed openly, not assumed."
    },
    teen: {
      feel: "Wanting personal space and autonomy, while still valuing support.",
      care: [
        "Privacy and control over personal conversations",
        "Staying connected with friends and interests",
        "Being treated as trustworthy",
        "Fair and transparent rules"
      ],
      help: [
        "Be honest about how you use your phone and what support you need",
        "Show responsibility with agreed limits",
        "Talk about what privacy means and where safety boundaries apply",
        "Ask for changes to rules when you can show readiness"
      ],
      bridge: "Bridge: Privacy and accountability can coexist when expectations are clear on both sides."
    }
  },
  grades: {
    title: "Grades & Expectations",
    summary: "Pressure, motivation, and support can feel very different depending on perspective.",
    parent: {
      feel: "Invested in their teen's future and sometimes worried about opportunities.",
      care: [
        "Effort, learning, and long-term options",
        "Healthy habits and time management",
        "Knowing when a teen is struggling",
        "Providing support without lowering expectations too much"
      ],
      help: [
        "Ask what is challenging before jumping to conclusions",
        "Focus on effort, progress, and strategies—not only results",
        "Work together on a realistic plan (study time, breaks, support)",
        "Recognize stress and celebrate improvement"
      ],
      bridge: "Bridge: Support is most effective when expectations come with understanding and practical help."
    },
    teen: {
      feel: "Pressured, motivated, overwhelmed, or discouraged—sometimes all at once.",
      care: [
        "Feeling capable and respected",
        "Managing stress and workload",
        "Having support when subjects are difficult",
        "Being seen as more than grades"
      ],
      help: [
        "Share what feels hard and what kind of help would be useful",
        "Break goals into manageable steps",
        "Be open about stress before it builds up",
        "Show effort and communicate early if you fall behind"
      ],
      bridge: "Bridge: Progress happens when teens feel supported and parents understand the pressures teens face."
    }
  },
  chores: {
    title: "Chores & Responsibilities",
    summary: "Sharing responsibilities at home can raise questions about fairness, time, and respect.",
    parent: {
      feel: "Responsible for keeping the household running and wanting teens to build life skills.",
      care: [
        "Shared responsibility and teamwork",
        "Reliability and follow-through",
        "Respect for shared spaces and family time",
        "Preparing teens for independence"
      ],
      help: [
        "Make expectations specific (what, when, and what 'done' looks like)",
        "Explain how responsibilities contribute to the family",
        "Be consistent and fair across family members",
        "Acknowledge effort and negotiate schedules when needed"
      ],
      bridge: "Bridge: Chores work best as shared contributions, not punishments or power struggles."
    },
    teen: {
      feel: "Busy or tired, and sometimes feeling that expectations are unfair or poorly timed.",
      care: [
        "Fairness and clear expectations",
        "Time for school, rest, and activities",
        "Being trusted with responsibility",
        "Having input on schedules and tasks"
      ],
      help: [
        "Ask for clarity if a task or deadline is confusing",
        "Suggest a schedule that fits school and other commitments",
        "Follow through or communicate early if you need to adjust",
        "Recognize that contributing at home builds trust"
      ],
      bridge: "Bridge: Fair, predictable responsibilities can increase trust and reduce repeated conflict."
    }
  }
};

let currentScenario = "curfew";
let currentLens = "parent";

function $(selector) {
  return document.querySelector(selector);
}

function renderScenario() {
  const scenario = scenarios[currentScenario];
  const lens = scenario[currentLens];

  $("#scenario-title").textContent = scenario.title;
  $("#scenario-summary").textContent = scenario.summary;
  $("#lens-feel").textContent = lens.feel;

  const careList = $("#lens-care");
  const helpList = $("#lens-help");
  careList.innerHTML = "";
  helpList.innerHTML = "";

  lens.care.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    careList.appendChild(li);
  });

  lens.help.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    helpList.appendChild(li);
  });

  $("#lens-bridge").textContent = lens.bridge;
  $("#lens-panel").setAttribute("aria-labelledby", currentLens === "parent" ? "tab-parent" : "tab-teen");
}

function setScenario(scenarioKey) {
  currentScenario = scenarioKey;
  document.querySelectorAll(".chip[data-scenario]").forEach((chip) => {
    const isActive = chip.dataset.scenario === scenarioKey;
    chip.classList.toggle("active", isActive);
    chip.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  renderScenario();
}

function setLens(lensKey) {
  currentLens = lensKey;
  document.querySelectorAll(".tab[data-lens]").forEach((tab) => {
    const isActive = tab.dataset.lens === lensKey;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;
  });
  renderScenario();
}

function setupPerspectiveSwitcher() {
  document.querySelectorAll(".chip[data-scenario]").forEach((chip) => {
    chip.setAttribute("aria-pressed", chip.classList.contains("active") ? "true" : "false");
    chip.addEventListener("click", () => setScenario(chip.dataset.scenario));
  });

  document.querySelectorAll(".tab[data-lens]").forEach((tab) => {
    tab.addEventListener("click", () => setLens(tab.dataset.lens));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = tab.dataset.lens === "parent" ? "teen" : "parent";
      setLens(next);
      document.querySelector(`.tab[data-lens="${next}"]`).focus();
    });
  });

  renderScenario();
}

function setupFlipCards() {
  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("flipped");
      card.setAttribute("aria-expanded", flipped ? "true" : "false");
    });
  });
}

function valueOrFallback(id, fallback = "Not specified") {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const value = el.value.trim();
  return value || fallback;
}

function formatDate(value) {
  if (!value) return "Not specified";
  const date = new Date(value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function updateAgreementPreview() {
  const preview = $("#agreement-preview");
  const familyName = valueOrFallback("family-name", "Our Family");
  const agreementDate = formatDate($("#agreement-date").value);
  const checkinDate = formatDate($("#checkin-date").value);

  const topics = [
    {
      title: "Curfew / time management",
      agreement: valueOrFallback("topic1-agreement"),
      teen: valueOrFallback("topic1-teen"),
      parent: valueOrFallback("topic1-parent")
    },
    {
      title: "Phone, privacy, and trust",
      agreement: valueOrFallback("topic2-agreement"),
      teen: valueOrFallback("topic2-teen"),
      parent: valueOrFallback("topic2-parent")
    },
    {
      title: "School, chores, or other responsibilities",
      agreement: valueOrFallback("topic3-agreement"),
      teen: valueOrFallback("topic3-teen"),
      parent: valueOrFallback("topic3-parent")
    }
  ];

  const disagreements = valueOrFallback("disagreements");

  preview.innerHTML = `
    <div class="preview-header">
      <h4>${familyName}</h4>
      <p><strong>Date:</strong> ${agreementDate}</p>
      <p><strong>Check-in date:</strong> ${checkinDate}</p>
    </div>
    ${topics.map((topic) => `
      <section class="preview-topic">
        <h5>${topic.title}</h5>
        <p><strong>Our agreement:</strong> ${topic.agreement}</p>
        <p><strong>Teen commitment:</strong> ${topic.teen}</p>
        <p><strong>Parent commitment:</strong> ${topic.parent}</p>
      </section>
    `).join("")}
    <section class="preview-topic">
      <h5>Handling disagreements</h5>
      <p>${disagreements}</p>
    </section>
    <p class="preview-note">This agreement is a starting point. Families can review and adjust it as needs change.</p>
  `;
}

const AGREEMENT_STORAGE_KEY = "family-bridge-agreement-v1";
const AGREEMENT_FIELDS = [
  "family-name", "agreement-date", "topic1-agreement", "topic1-teen", "topic1-parent",
  "topic2-agreement", "topic2-teen", "topic2-parent", "topic3-agreement", "topic3-teen",
  "topic3-parent", "disagreements", "checkin-date"
];

function setSaveStatus(message, saved = false) {
  const status = $("#save-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("saved", saved);
}

function saveAgreementToStorage() {
  const data = {};
  AGREEMENT_FIELDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  try {
    localStorage.setItem(AGREEMENT_STORAGE_KEY, JSON.stringify(data));
    setSaveStatus("Autosaved locally in this browser.", true);
  } catch {
    setSaveStatus("Autosave unavailable in this browser.");
  }
}

function loadAgreementFromStorage() {
  try {
    const raw = localStorage.getItem(AGREEMENT_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return false;
    let hasValue = false;
    AGREEMENT_FIELDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && typeof data[id] === "string") {
        el.value = data[id];
        if (data[id].trim()) hasValue = true;
      }
    });
    return hasValue;
  } catch {
    return false;
  }
}

function clearAgreement() {
  const form = $("#agreement-form");
  form.reset();
  try { localStorage.removeItem(AGREEMENT_STORAGE_KEY); } catch { /* ignore */ }
  setDefaultDate();
  $("#agreement-preview").innerHTML = '<p class="muted">Fill in the form and select <strong>Update preview</strong> to see your agreement here.</p>';
  setSaveStatus("Form cleared. Autosave ready.");
}

function setDefaultDate() {
  const dateInput = $("#agreement-date");
  if (dateInput && !dateInput.value) {
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    dateInput.value = local.toISOString().slice(0, 10);
  }
}

function buildAgreementSummary() {
  const familyName = valueOrFallback("family-name", "Our Family");
  const lines = [
    `${familyName} — Family Agreement`,
    `Date: ${formatDate($("#agreement-date").value)}`,
    `Check-in date: ${formatDate($("#checkin-date").value)}`,
    "",
    "1) Curfew / time management",
    `Agreement: ${valueOrFallback("topic1-agreement")}`,
    `Teen commitment: ${valueOrFallback("topic1-teen")}`,
    `Parent commitment: ${valueOrFallback("topic1-parent")}`,
    "",
    "2) Phone, privacy, and trust",
    `Agreement: ${valueOrFallback("topic2-agreement")}`,
    `Teen commitment: ${valueOrFallback("topic2-teen")}`,
    `Parent commitment: ${valueOrFallback("topic2-parent")}`,
    "",
    "3) School, chores, or other responsibilities",
    `Agreement: ${valueOrFallback("topic3-agreement")}`,
    `Teen commitment: ${valueOrFallback("topic3-teen")}`,
    `Parent commitment: ${valueOrFallback("topic3-parent")}`,
    "",
    "Handling disagreements",
    valueOrFallback("disagreements"),
    "",
    "This agreement is a starting point. Families can review and adjust it as needs change."
  ];
  return lines.join("\n");
}

async function copyAgreementSummary() {
  updateAgreementPreview();
  const text = buildAgreementSummary();
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setSaveStatus("Agreement summary copied to clipboard.", true);
  } catch {
    setSaveStatus("Could not copy automatically. You can still download or print.");
  }
}

function downloadAgreementSummary() {
  updateAgreementPreview();
  const text = buildAgreementSummary();
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "family-agreement.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  setSaveStatus("Agreement downloaded as family-agreement.txt.", true);
}

function setupAgreementBuilder() {
  const hasStored = loadAgreementFromStorage();
  setDefaultDate();
  if (hasStored) {
    updateAgreementPreview();
    setSaveStatus("Restored your saved agreement from this browser.", true);
  }

  let saveTimer;
  const scheduleSave = () => {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveAgreementToStorage, 250);
  };
  $("#agreement-form").addEventListener("input", scheduleSave);
  $("#agreement-form").addEventListener("change", scheduleSave);

  $("#update-preview").addEventListener("click", () => {
    updateAgreementPreview();
    saveAgreementToStorage();
  });

  const cleanupPrintMode = () => document.body.classList.remove("print-agreement");
  window.addEventListener("afterprint", cleanupPrintMode);
  $("#print-agreement").addEventListener("click", () => {
    updateAgreementPreview();
    saveAgreementToStorage();
    document.body.classList.add("print-agreement");
    window.print();
    setTimeout(cleanupPrintMode, 1000);
  });

  const copyBtn = $("#copy-agreement");
  if (copyBtn) copyBtn.addEventListener("click", copyAgreementSummary);
  const downloadBtn = $("#download-agreement");
  if (downloadBtn) downloadBtn.addEventListener("click", downloadAgreementSummary);
  $("#clear-agreement").addEventListener("click", clearAgreement);
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  document.documentElement.classList.add("reveal-ready");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((item) => observer.observe(item));
}

function setupMobileNav() {
  const toggle = $("#menu-toggle");
  const nav = $("#primary-nav");
  if (!toggle || !nav) return;
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 720) close(); });
}

function setupScrollProgress() {
  const bar = $("#scroll-progress-bar");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${progress})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animate = (el) => {
    const target = Number(el.dataset.count || "0");
    if (reduceMotion) { el.textContent = String(target); return; }
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => observer.observe(c));
}

const guidedScenarios = {
  curfew: {
    title: "Curfew",
    description: "It's Friday night and plans change. How can the conversation go better?",
    parent: "I want to know you're safe and when to expect you home. When plans change, I worry.",
    teen: "I want some freedom and trust. I don't want to feel controlled when I'm being responsible.",
    question: "What's the most constructive response in the moment?",
    options: [
      { label: "React fast", text: "\"You're late again — that's it, you're grounded.\"", feedback: "This may escalate the conflict.", tip: "Pause before reacting. A calm question like \"What happened?\" opens the door to problem-solving." },
      { label: "Listen first", text: "\"Tell me what changed, then let's figure out a safe plan together.\"", feedback: "Strong choice. This balances care and respect.", tip: "Acknowledge the concern and invite the other person into the solution. It builds trust on both sides." },
      { label: "Avoid it", text: "Say nothing now and bring it up days later when upset.", feedback: "This delays resolution and can build resentment.", tip: "Address issues soon, but calmly. Pick a time when everyone can talk without pressure." }
    ]
  },
  phone: {
    title: "Phone & Privacy",
    description: "A parent is worried about screen time; a teen feels their privacy is being invaded.",
    parent: "I'm concerned about your well-being and what you're exposed to online. I want to protect you.",
    teen: "My phone is personal. I want privacy and trust, not constant checking.",
    question: "Which approach builds trust while keeping boundaries clear?",
    options: [
      { label: "Set rules together", text: "\"Let's agree on screen-time boundaries and when privacy/safety concerns apply.\"", feedback: "Strong choice. Collaboration creates clearer, fairer expectations.", tip: "Define boundaries together and revisit them as trust and maturity grow." },
      { label: "All-or-nothing control", text: "\"I'm taking your phone. I need to see everything.\"", feedback: "This may protect in the short term but damage trust.", tip: "Explain safety concerns clearly and pair limits with transparency and respect for age-appropriate privacy." },
      { label: "Ignore concerns", text: "\"Do whatever you want; I don't want to argue.\"", feedback: "Avoiding the issue leaves safety and expectations unclear.", tip: "Even difficult topics need calm, clear boundaries. Silence can create confusion, not trust." }
    ]
  },
  grades: {
    title: "Grades & Expectations",
    description: "A report card triggers stress at home. Both sides feel pressure.",
    parent: "I want you to have opportunities. I'm worried this grade means you're falling behind.",
    teen: "I'm trying, but I feel overwhelmed. I need support, not just pressure.",
    question: "What response is most likely to help?",
    options: [
      { label: "Focus only on the grade", text: "\"This isn't good enough. You need to do better.\"", feedback: "This may increase pressure without solving the problem.", tip: "Ask what's making it hard. Pair expectations with support and a concrete plan." },
      { label: "Problem-solve together", text: "\"I see you're struggling — what's hard, and what support would help?\"", feedback: "Strong choice. This turns pressure into partnership.", tip: "Break goals into small steps, check progress, and recognize effort as well as results." },
      { label: "Dismiss it", text: "\"It doesn't matter, just forget about it.\"", feedback: "This can feel supportive, but it may miss a chance to help.", tip: "Validate feelings and still offer practical support. Care includes guidance." }
    ]
  },
  chores: {
    title: "Chores & Responsibilities",
    description: "Chores aren't done and frustration builds on both sides.",
    parent: "I need help keeping the household running. It feels unfair when I have to remind you repeatedly.",
    teen: "I have school and I'm tired. I don't mind helping, but the timing feels unfair.",
    question: "What response moves the conversation forward?",
    options: [
      { label: "Make it specific", text: "\"Let's agree on which chores, when they're done, and what 'done' looks like.\"", feedback: "Strong choice. Clear expectations reduce repeated conflict.", tip: "Specific, fair agreements are easier to follow than vague reminders." },
      { label: "Accuse", text: "\"You never help around here. You're so lazy.\"", feedback: "Labels escalate conflict and make cooperation less likely.", tip: "Describe the situation, not the person. Focus on one issue and a practical next step." },
      { label: "Take over silently", text: "Do everything yourself and stay resentful.", feedback: "This avoids conflict now but builds frustration over time.", tip: "Share responsibilities clearly. Asking for help respectfully models healthy communication." }
    ]
  }
};

function setupGuidedMode() {
  const section = $("#guided");
  if (!section) return;
  const keys = Object.keys(guidedScenarios);
  let currentKey = "curfew";
  let selectedOption = -1;
  let phase = 1; // 1: understand, 2: choose, 3: reflect

  const progressFill = $("#guided-progress-fill");
  const progressText = $("#guided-progress-text");
  const stepLabel = $("#guided-step-label");
  const title = $("#guided-title");
  const description = $("#guided-description");
  const parent = $("#guided-parent");
  const teen = $("#guided-teen");
  const question = $("#guided-question");
  const optionsEl = $("#guided-options");
  const questionBlock = $("#guided-question-block");
  const continueBtn = $("#guided-continue");
  const feedbackTitle = $("#guided-feedback-title");
  const feedbackText = $("#guided-feedback-text");
  const tip = $("#guided-tip");
  const nextBtn = $("#guided-next");
  const restartBtn = $("#guided-restart");

  function syncScenarioChips() {
    document.querySelectorAll("[data-guided-scenario]").forEach((b) => {
      const active = b.dataset.guidedScenario === currentKey;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function render() {
    const scenario = guidedScenarios[currentKey];
    const step = phase;
    progressFill.style.width = `${(step / 3) * 100}%`;
    progressText.textContent = `Step ${step} of 3`;
    const stepLabels = {
      1: "Step 1 — Understand both sides",
      2: "Step 2 — Choose a response",
      3: "Step 3 — Reflect and grow"
    };
    stepLabel.textContent = stepLabels[step];
    title.textContent = scenario.title;
    description.textContent = scenario.description;
    parent.textContent = scenario.parent;
    teen.textContent = scenario.teen;
    question.textContent = scenario.question;

    const showQuestion = phase >= 2;
    if (questionBlock) questionBlock.hidden = !showQuestion;
    if (continueBtn) {
      continueBtn.hidden = phase !== 1;
      continueBtn.disabled = false;
    }

    optionsEl.innerHTML = "";
    scenario.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "guided-option";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", selectedOption === idx ? "true" : "false");
      btn.innerHTML = `<span class="option-label">${opt.label}</span><span class="option-text">${opt.text}</span>`;
      btn.addEventListener("click", () => {
        selectedOption = idx;
        phase = 3;
        render();
        const selected = optionsEl.querySelector('[aria-checked="true"]');
        if (selected) selected.focus();
      });
      optionsEl.appendChild(btn);
    });

    if (phase === 3 && selectedOption >= 0) {
      const opt = scenario.options[selectedOption];
      feedbackTitle.textContent = opt.feedback;
      feedbackText.textContent = "Reflect on how this response might make the other person feel, and what outcome it creates.";
      tip.hidden = false;
      tip.innerHTML = `<strong>Try this:</strong> ${opt.tip}`;
      nextBtn.disabled = false;
    } else if (phase === 2) {
      feedbackTitle.textContent = "Choose a response";
      feedbackText.textContent = "Pick the response that feels most constructive. You’ll see feedback and a communication tip.";
      tip.hidden = true;
      tip.innerHTML = "";
      nextBtn.disabled = true;
    } else {
      feedbackTitle.textContent = "Understand both sides first";
      feedbackText.textContent = "Read the parent and teen perspectives, then continue when you’re ready to choose a response.";
      tip.hidden = true;
      tip.innerHTML = "";
      nextBtn.disabled = true;
    }
  }

  document.querySelectorAll("[data-guided-scenario]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentKey = btn.dataset.guidedScenario;
      selectedOption = -1;
      phase = 1;
      syncScenarioChips();
      render();
    });
  });

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      phase = 2;
      render();
      const first = optionsEl.querySelector(".guided-option");
      if (first) first.focus();
    });
  }

  nextBtn.addEventListener("click", () => {
    const idx = keys.indexOf(currentKey);
    currentKey = keys[(idx + 1) % keys.length];
    selectedOption = -1;
    phase = 1;
    syncScenarioChips();
    render();
  });

  restartBtn.addEventListener("click", () => {
    selectedOption = -1;
    phase = 1;
    render();
  });

  syncScenarioChips();
  render();
}
document.addEventListener("DOMContentLoaded", () => {
  setupReveal();
  setupMobileNav();
  setupScrollProgress();
  setupCounters();
  setupPerspectiveSwitcher();
  setupGuidedMode();
  setupFlipCards();
  setupAgreementBuilder();
});