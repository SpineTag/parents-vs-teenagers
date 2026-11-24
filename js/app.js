const scenarios = {
  curfew: {
    title: "Curfew",
    summary: "A common conflict: what time to be home and how much flexibility is reasonable.",
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
  document.querySelectorAll(".chip").forEach((chip) => {
    const isActive = chip.dataset.scenario === scenarioKey;
    chip.classList.toggle("active", isActive);
    chip.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  renderScenario();
}

function setLens(lensKey) {
  currentLens = lensKey;
  document.querySelectorAll(".tab").forEach((tab) => {
    const isActive = tab.dataset.lens === lensKey;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;
  });
  renderScenario();
}

function setupPerspectiveSwitcher() {
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.setAttribute("aria-pressed", chip.classList.contains("active") ? "true" : "false");
    chip.addEventListener("click", () => setScenario(chip.dataset.scenario));
  });

  document.querySelectorAll(".tab").forEach((tab) => {
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

function clearAgreement() {
  const form = $("#agreement-form");
  form.reset();
  setDefaultDate();
  $("#agreement-preview").innerHTML = '<p class="muted">Fill in the form and select <strong>Update preview</strong> to see your agreement here.</p>';
}

function setDefaultDate() {
  const dateInput = $("#agreement-date");
  if (dateInput && !dateInput.value) {
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    dateInput.value = local.toISOString().slice(0, 10);
  }
}

function setupAgreementBuilder() {
  setDefaultDate();
  $("#update-preview").addEventListener("click", updateAgreementPreview);
  $("#print-agreement").addEventListener("click", () => {
    updateAgreementPreview();
    window.print();
  });
  $("#clear-agreement").addEventListener("click", clearAgreement);
}

document.addEventListener("DOMContentLoaded", () => {
  setupPerspectiveSwitcher();
  setupFlipCards();
  setupAgreementBuilder();
});