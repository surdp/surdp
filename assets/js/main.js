(() => {
  "use strict";
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navButton = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        themeToggle.innerHTML = '<i class="portfolio-lucide" data-lucide="' + (theme === "dark" ? "sun" : "moon") + '" aria-hidden="true"></i>';
        window.lucide.createIcons({attrs: {"stroke-width": 1.9, "aria-hidden": "true"}});
      } else {
        themeToggle.textContent = theme === "dark" ? "☼" : "☾";
      }
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
    if (themeMeta) themeMeta.content = theme === "dark" ? "#111923" : "#f5f7fa";
    try { localStorage.setItem("suraj-portfolio-theme", theme); } catch (_) {}
  }
  setTheme(root.dataset.theme || "dark");
  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // Consistent semantic icon styling across the portfolio. If the icon CDN is
  // unavailable, retain the original symbols as a graceful fallback.
  const portfolioIconSelectors = [
    ".atlas-icon", ".mobile-dock a span", ".ba-step-icon", ".ba-process-icon",
    ".ba-list-icon", ".ba-layer-icon", ".ba-visual-outcomes > div > span",
    ".ba-panel-symbol", ".expertise-icon", ".workflow-solution-icon",
    ".workflow-stage-symbol", ".career-next-rocket", ".career-next-star",
    ".goals-category span", ".goals-target-icon", ".goals-focus-card > span",
    ".tool-tags span > i", ".resume-icon", ".credential-footer-mark",
    ".movie-setup-icon", ".travel-empty-icon", ".credential-empty > span", ".theme-toggle"
  ].join(",");
  function portfolioIconName(label, node) {
    const value = String(label || "").toLowerCase();
    const cls = node?.classList || { contains: () => false };
    if (cls.contains("theme-toggle")) return document.documentElement.dataset.theme === "dark" ? "sun" : "moon";
    if (cls.contains("resume-icon")) return /^ba$/i.test(value.trim()) ? "briefcase-business" : "shield-check";
    if (cls.contains("credential-footer-mark")) return "badge-check";
    if (cls.contains("movie-setup-icon")) return "clapperboard";
    if (cls.contains("travel-empty-icon")) return "images";
    if (cls.contains("career-next-rocket")) return "rocket";
    if (cls.contains("career-next-star")) return "sparkles";
    if (node?.closest(".workflow-solution-tab")) {
      const key = node.closest(".workflow-solution-tab").dataset.solution;
      return ({em:"heart-pulse",oncology:"ribbon",bloodbank:"droplet",lab:"flask-conical"})[key] || "activity";
    }
    if (/(^|\s)(intro|home)(\s|$)/.test(value)) return "house";
    if (/about|profile/.test(value)) return "user-round";
    if (/career|experience/.test(value)) return "briefcase-business";
    if (/healthcare|clinical|patient/.test(value)) return "heart-pulse";
    if (/project/.test(value)) return "folder-kanban";
    if (/credential|certification|award/.test(value)) return "badge-check";
    if (/movie|film/.test(value)) return "clapperboard";
    if (/trip|travel/.test(value)) return "plane";
    if (/gallery|images/.test(value)) return "images";
    if (/resume|cv/.test(value)) return "file-text";
    if (/contact|email/.test(value)) return "send";
    if (/jira|azure devops|confluence/.test(value)) return "list-check";
    if (/git|github|version control/.test(value)) return "git-branch";
    if (/selenium|playwright|eggplant|tosca|worksoft|automation/.test(value)) return "test-tube";
    if (/java(script)?/.test(value)) return "code-2";
    if (/maven|package/.test(value)) return "package";
    if (/power bi|analytics|reporting/.test(value)) return "chart-no-axes-column";
    if (/bpmn|process mapping/.test(value)) return "workflow";
    if (/hl7|fhir|interoperability/.test(value)) return "network";
    if (/oracle health|cerner|firstnet|mpages/.test(value)) return "heart-pulse";
    if (/discover|arrival|registration|search/.test(value)) return "search";
    if (/analyz|result|analytics|data/.test(value)) return "chart-no-axes-combined";
    if (/define|requirement|documentation|notes|traceability/.test(value)) return "file-check";
    if (/design|process|workflow|mapping/.test(value)) return "workflow";
    if (/deliver|impact|value|growth ahead|long-term vision/.test(value)) return "rocket";
    if (/business strategy|business value/.test(value)) return "target";
    if (/people|stakeholder|collaboration|team/.test(value)) return "users-round";
    if (/quality|validation|testing|regression/.test(value)) return "shield-check";
    if (/bank|finance/.test(value)) return "landmark";
    if (/retail|e-commerce|shopping/.test(value)) return "shopping-bag";
    if (/manufactur|factory/.test(value)) return "factory";
    if (/telecom|technology|technical|integration/.test(value)) return "network";
    if (/government|public/.test(value)) return "landmark";
    if (/other industr/.test(value)) return "layers";
    if (/sql|database/.test(value)) return "database";
    if (/postman|api/.test(value)) return "braces";
    if (/power bi|reporting/.test(value)) return "chart-column";
    if (/eggplant|laboratory|laboratory solutions|lab/.test(value)) return "flask-conical";
    if (/oncology/.test(value)) return "ribbon";
    if (/blood bank|transfusion/.test(value)) return "droplet";
    if (/emergency|firstnet/.test(value)) return "heart-pulse";
    if (/personal|user/.test(value)) return "user-round";
    if (/career growth/.test(value)) return "trending-up";
    if (/domain expertise/.test(value)) return "stethoscope";
    if (/certifications/.test(value)) return "graduation-cap";
    if (/discover/.test(value)) return "search";
    if (/analyze/.test(value)) return "chart-no-axes-combined";
    if (/define/.test(value)) return "file-check";
    if (/design/.test(value)) return "panels-top-left";
    if (/deliver/.test(value)) return "arrow-up-right";
    const glyph = String(label || "").trim();
    const glyphs = {
      "⌂":"house","◎":"circle-dot","▣":"square","♡":"heart-pulse","▤":"file-text",
      "✦":"sparkles","↗":"arrow-up-right","▧":"images","⌁":"activity","⚙":"settings",
      "✚":"plus","♙":"user-round","⌘":"command","✓":"check","◈":"layers","▦":"layout-grid",
      "⇄":"arrow-left-right","◇":"diamond","⚗":"flask-conical","♧":"users-round","◉":"circle-dot",
      "↔":"arrow-left-right","✿":"flower-2","♥":"heart","▥":"chart-no-axes-combined","➤":"arrow-right",
      "⌕":"search","♜":"trophy","✳":"sparkles","♟":"user-round","↻":"refresh-cw","⚠":"triangle-alert",
      "⌬":"hexagon","⌖":"crosshair","♡":"heart-pulse","⌂":"house"
    };
    return glyphs[glyph] || null;
  }
  function refreshPortfolioIcons() {
    if (!window.lucide || typeof window.lucide.createIcons !== "function") return;
    document.querySelectorAll(portfolioIconSelectors).forEach(node => {
      if (node.querySelector("svg")) return;
      const raw = node.textContent.trim();
      if (!raw || /^\d+$/.test(raw)) return;
      let label = raw;
      if (node.matches(".tool-tags span > i")) label = node.parentElement.textContent.replace(raw, "").trim();
      const link = node.closest(".atlas-link,.mobile-dock a");
      if (link) label = link.querySelector("b")?.textContent || raw;
      const listItem = node.closest("li");
      if (listItem) label = listItem.querySelector("b")?.textContent || raw;
      const step = node.closest(".ba-step,.ba-process-step,.workflow-stage,.goals-focus-card");
      if (step) label = step.querySelector("h3,b")?.textContent || raw;
      const layer = node.closest(".ba-stack-layer");
      if (layer) label = layer.querySelector(".ba-stack-title")?.textContent || raw;
      const heading = node.closest("header");
      if (heading && node.classList.contains("ba-panel-symbol")) label = heading.querySelector("h3")?.textContent || raw;
      const solutionTab = node.closest(".workflow-solution-tab");
      if (solutionTab) label = solutionTab.querySelector("b")?.textContent || raw;
      const goalsButton = node.closest("[data-goal-category]");
      if (goalsButton) label = goalsButton.dataset.goalCategory.replace(/-/g," ");
      const expertise = node.closest(".expertise-card");
      if (expertise) label = expertise.querySelector("h3")?.textContent || raw;
      const name = portfolioIconName(label, node) || portfolioIconName(raw, node);
      if (!name) return;
      node.innerHTML = '<i class="portfolio-lucide" data-lucide="' + name + '" aria-hidden="true"></i>';
    });
    window.lucide.createIcons({attrs: {"stroke-width": 1.9, "aria-hidden": "true"}});
  }
  refreshPortfolioIcons();

  // Interactive About infographic: industry lenses, capability layers,
  // tools and delivery principles all update the same clear detail area.
  const baIndustryProfiles = {
    healthcare:{title:"Healthcare",icon:"heart-pulse",text:"Clinical workflows, EHR context, requirements traceability and dependable application validation.",tags:["Clinical workflows","Requirements traceability","Validation"]},
    finance:{title:"Banking & Finance",icon:"landmark",text:"Transaction journeys, business rules, reconciliation, controls and auditable processes.",tags:["Transaction rules","Reconciliation","Audit trail"]},
    retail:{title:"Retail & E-commerce",icon:"shopping-bag",text:"Customer journeys, digital platform requirements, order flows and service improvements.",tags:["Customer journeys","Order management","Service experience"]},
    manufacturing:{title:"Manufacturing",icon:"factory",text:"Operational workflows, process efficiency, exceptions, dependencies and system hand-offs.",tags:["Process efficiency","Exception handling","System hand-offs"]},
    technology:{title:"Telecom & Technology",icon:"network",text:"System interactions, API dependencies, data movement, acceptance criteria and delivery coordination.",tags:["API dependencies","Data flows","Integration validation"]},
    public:{title:"Government & Public",icon:"building-2",text:"Service delivery, case workflows, policy-led rules, accessibility and transparent decision records.",tags:["Case workflows","Policy rules","Accessible services"]},
    insurance:{title:"Insurance & Payers",icon:"shield-check",text:"Claims journeys, policy rules, eligibility checks, approvals and traceable case handling.",tags:["Claims journeys","Eligibility rules","Approvals"]},
    education:{title:"Education & Learning",icon:"graduation-cap",text:"Learner and staff journeys, platform workflows, service requests and information hand-offs.",tags:["Learner journeys","Service requests","Platform workflows"]},
    logistics:{title:"Logistics & Supply Chain",icon:"truck",text:"Order and inventory flows, shipment milestones, exception handling and cross-team hand-offs.",tags:["Inventory flow","Shipment milestones","Exception handling"]},
    other:{title:"Other Industries",icon:"layers",text:"Transferable analysis practices can support travel and hospitality, energy and utilities, professional services and non-profit operations by clarifying service journeys, business rules, hand-offs and measurable outcomes.",tags:["Travel & hospitality","Energy & utilities","Professional services","Non-profit operations"]}
  };
  const baValuePrinciples = {
    alignment:{
      eyebrow:"DELIVERY PRINCIPLE",title:"Stakeholder Alignment",icon:"users-round",
      text:"Bring business users, clinical stakeholders and delivery teams around the problem to solve, the decisions required and the outcomes that define success.",
      tags:["Stakeholder workshops","Shared acceptance criteria","Clear ownership"],
      proofTitle:"Aligned decisions",proofText:"Reduce ambiguity before it becomes rework."
    },
    traceability:{
      eyebrow:"DELIVERY PRINCIPLE",title:"Decision Traceability",icon:"git-branch",
      text:"Connect business goals to requirements, scope decisions, acceptance criteria and validation evidence so teams can understand what is changing and why.",
      tags:["Requirement traceability","Business rules","Scope and dependencies"],
      proofTitle:"Visible rationale",proofText:"Keep decisions, assumptions and scope changes easy to follow."
    },
    quality:{
      eyebrow:"DELIVERY PRINCIPLE",title:"Quality by Design",icon:"shield-check",
      text:"Bring validation into delivery early by connecting requirements to test scenarios, data checks, UAT, defect triage and release-readiness discussions.",
      tags:["Testable requirements","UAT planning","Defect follow-up"],
      proofTitle:"Validation built in",proofText:"Make expected behaviour and acceptance conditions clear before release."
    },
    improvement:{
      eyebrow:"DELIVERY PRINCIPLE",title:"Continuous Improvement",icon:"trending-up",
      text:"Use stakeholder feedback, workflow evidence and delivery learnings to identify practical changes that improve efficiency, reliability and user experience.",
      tags:["Gap analysis","Workflow optimisation","Outcome review"],
      proofTitle:"Improvement that sticks",proofText:"Turn feedback into concrete actions and follow-through."
    }
  };
  const baValueButtons = [...document.querySelectorAll(".ba-value-options [data-ba-value]")];
  const baValueDetailIcon = document.getElementById("baValueDetailIcon");
  const baValueDetailEyebrow = document.getElementById("baValueDetailEyebrow");
  const baValueDetailTitle = document.getElementById("baValueDetailTitle");
  const baValueDetailText = document.getElementById("baValueDetailText");
  const baValueTags = document.getElementById("baValueTags");
  const baValueProofTitle = document.getElementById("baValueProofTitle");
  const baValueProofText = document.getElementById("baValueProofText");
  const baIndustryDetailMark = document.querySelector(".ba-industry-detail-mark");
  const baIndustryDetailTitle = document.getElementById("baIndustryDetailTitle");
  const baIndustryDetailText = document.getElementById("baIndustryDetailText");
  const baIndustryTags = document.getElementById("baIndustryTags");
  const baImpactProfiles = {
    clarity:{icon:"scan-search",eyebrow:"DELIVERY FOCUS",title:"Decision Clarity",text:"Turn stakeholder input into clear scope, documented decisions, traceable requirements and agreed acceptance criteria.",tags:["Scope clarity","Decision log","Acceptance criteria"]},
    workflow:{icon:"workflow",eyebrow:"PROCESS IMPROVEMENT",title:"Workflow Improvement",text:"Map current and future states, identify friction and hand-off gaps, and frame practical changes that improve the user journey.",tags:["AS-IS / TO-BE","Gap analysis","Handoffs"]},
    readiness:{icon:"shield-check",eyebrow:"QUALITY & READINESS",title:"Delivery Readiness",text:"Connect requirements to test scenarios, UAT, defect follow-up and release-readiness checks so teams can validate expected behaviour.",tags:["Testable requirements","UAT","Release readiness"]},
    outcomes:{icon:"chart-no-axes-combined",eyebrow:"MEASURABLE VALUE",title:"Outcome Visibility",text:"Make expected outcomes visible through agreed success measures, validation evidence, ownership and structured follow-through.",tags:["Success measures","Evidence","Action tracking"]}
  };
  const baImpactButtons = [...document.querySelectorAll("[data-impact-focus]")];
  const baImpactDetailIcon = document.querySelector(".ba-impact-detail-icon");
  const baImpactDetailEyebrow = document.getElementById("baImpactDetailEyebrow");
  const baImpactDetailTitle = document.getElementById("baImpactDetailTitle");
  const baImpactDetailText = document.getElementById("baImpactDetailText");
  const baImpactTags = document.getElementById("baImpactTags");
  function selectBaImpact(key) {
    const item = baImpactProfiles[key];
    if (!item) return;
    baImpactButtons.forEach(button => {
      const active = button.dataset.impactFocus === key;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    if (baImpactDetailEyebrow) baImpactDetailEyebrow.textContent=item.eyebrow;
    if (baImpactDetailTitle) baImpactDetailTitle.textContent=item.title;
    if (baImpactDetailText) baImpactDetailText.textContent=item.text;
    paintBaIcon(baImpactDetailIcon,item.icon);
    if (baImpactTags) {
      baImpactTags.innerHTML="";
      item.tags.forEach(tag=>{const chip=document.createElement("span");chip.textContent=tag;baImpactTags.append(chip);});
    }
  }
  baImpactButtons.forEach(button=>button.addEventListener("click",()=>selectBaImpact(button.dataset.impactFocus)));

  function paintBaIcon(target, iconName) {
    if (!target) return;
    target.innerHTML = '<i class="portfolio-lucide" data-lucide="' + iconName + '" aria-hidden="true"></i>';
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({attrs: {"stroke-width": 1.9, "aria-hidden": "true"}});
    }
  }

  const baPracticeProfiles = {
    requirements:{
      icon:"file-check",title:"Make requirements actionable",
      text:"Translate stakeholder needs into clear scope, business rules, acceptance criteria and traceable delivery artefacts.",
      tags:["Scope","Acceptance criteria","Traceability"]
    },
    workflow:{
      icon:"workflow",title:"Make complex processes clear",
      text:"Map current and future states, uncover gaps and dependencies, and improve hand-offs across people and systems.",
      tags:["AS-IS / TO-BE","Gap analysis","BPMN"]
    },
    quality:{
      icon:"shield-check",title:"Build quality into delivery",
      text:"Connect requirements to test scenarios, UAT, defect follow-up and release-readiness checks.",
      tags:["Test scenarios","UAT","Defect triage"]
    },
    outcomes:{
      icon:"chart-no-axes-combined",title:"Keep outcomes measurable",
      text:"Agree success measures early and use validation evidence and clear ownership to assess whether the change delivers value.",
      tags:["Success measures","Evidence","Follow-through"]
    }
  };
  const baPracticeTabs = [...document.querySelectorAll("[data-ba-practice]")];
  const baPracticeIcon = document.getElementById("baPracticeIcon");
  const baPracticeTitle = document.getElementById("baPracticeTitle");
  const baPracticeText = document.getElementById("baPracticeText");
  const baPracticeTags = document.getElementById("baPracticeTags");
  function selectBaPractice(key) {
    const item = baPracticeProfiles[key];
    if (!item) return;
    baPracticeTabs.forEach(button => {
      const active = button.dataset.baPractice === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (baPracticeTitle) baPracticeTitle.textContent = item.title;
    if (baPracticeText) baPracticeText.textContent = item.text;
    paintBaIcon(baPracticeIcon, item.icon);
    if (baPracticeTags) {
      baPracticeTags.innerHTML = "";
      item.tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        baPracticeTags.append(chip);
      });
    }
  }
  baPracticeTabs.forEach(button => button.addEventListener("click", () => selectBaPractice(button.dataset.baPractice)));
  function selectBaIndustry(key) {
    const item = baIndustryProfiles[key];
    if (!item) return;
    document.querySelectorAll("[data-ba-industry]").forEach(button => {
      const active = button.dataset.baIndustry === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (baIndustryDetailTitle) baIndustryDetailTitle.textContent = item.title;
    if (baIndustryDetailText) baIndustryDetailText.textContent = item.text;
    if (baIndustryTags) {
      baIndustryTags.innerHTML = "";
      (item.tags || []).forEach(tag => { const chip = document.createElement("span"); chip.textContent = tag; baIndustryTags.append(chip); });
    }
    paintBaIcon(baIndustryDetailMark, item.icon);
  }
  function selectBaValue(key, contextTitle, contextText) {
    const item = baValuePrinciples[key];
    if (!item) return;
    document.querySelectorAll(".ba-value-options [data-ba-value]").forEach(button => {
      const active = button.dataset.baValue === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".ba-visual-outcomes [data-ba-value]").forEach(button => {
      const active = button.dataset.baValue === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (baValueDetailEyebrow) baValueDetailEyebrow.textContent = item.eyebrow;
    if (baValueDetailTitle) baValueDetailTitle.textContent = item.title;
    if (baValueDetailText) baValueDetailText.textContent = item.text;
    paintBaIcon(baValueDetailIcon, item.icon);
    if (baValueTags) {
      baValueTags.innerHTML = "";
      item.tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        baValueTags.append(chip);
      });
    }
    if (baValueProofTitle) baValueProofTitle.textContent = contextTitle || item.proofTitle;
    if (baValueProofText) baValueProofText.textContent = contextText || item.proofText;
  }

  document.querySelectorAll("[data-ba-industry]").forEach(button => {
    button.addEventListener("click", () => selectBaIndustry(button.dataset.baIndustry));
  });

  const capabilityValueMap = {
    "business-strategy":"alignment",
    "people-and-stakeholders":"alignment",
    "processes-and-workflows":"traceability",
    "requirements-and-solutions":"traceability",
    "technology-and-data":"quality",
    "quality-and-validation":"quality",
    "outcomes-and-value":"improvement"
  };
  document.querySelectorAll("[data-ba-capability]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-ba-capability]").forEach(layer => {
        const active = layer === button;
        layer.classList.toggle("is-selected", active);
        layer.setAttribute("aria-pressed", String(active));
      });
      const title = button.querySelector(".ba-stack-title")?.textContent.trim() || "Selected capability";
      const summary = button.querySelector(".ba-stack-detail")?.textContent.trim() || "";
      selectBaValue(capabilityValueMap[button.dataset.baCapability] || "alignment", title, summary);
      document.querySelector(".ba-value-panel")?.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
  });

  document.querySelectorAll("[data-ba-tool]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-ba-tool]").forEach(tool => {
        const active = tool === button;
        tool.classList.toggle("is-active", active);
        tool.setAttribute("aria-pressed", String(active));
      });
      const title = button.querySelector("b")?.textContent.trim() || "Selected tool";
      const summary = button.querySelector("small")?.textContent.trim() || "";
      selectBaValue(button.dataset.baValueLink || "quality", title, summary);
      document.querySelector(".ba-value-panel")?.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
  });

  document.querySelectorAll(".ba-value-options [data-ba-value]").forEach(button => {
    button.addEventListener("click", () => selectBaValue(button.dataset.baValue));
  });
  document.querySelectorAll(".ba-visual-outcomes [data-ba-value]").forEach(button => {
    button.addEventListener("click", () => {
      const title = button.querySelector("b")?.textContent.trim();
      const summary = button.querySelector("small")?.textContent.trim();
      selectBaValue(button.dataset.baValue, title, summary);
      document.querySelector(".ba-value-panel")?.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
  });
  selectBaIndustry("healthcare");
  selectBaValue("alignment");
  selectBaImpact("clarity");
  selectBaPractice("requirements");

  function closeMenu() {
    nav?.classList.remove("open");
    navButton?.setAttribute("aria-expanded", "false");
    navButton?.setAttribute("aria-label", "Open navigation");
  }
  navButton?.addEventListener("click", () => {
    const open = navButton.getAttribute("aria-expanded") === "true";
    nav?.classList.toggle("open", !open);
    navButton.setAttribute("aria-expanded", String(!open));
    navButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

  const filters = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".project-card")];
  const projectCount = document.getElementById("projectCount");
  filters.forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let shown = 0;
    cards.forEach(card => {
      const display = key === "all" || card.dataset.category === key;
      card.hidden = !display;
      if (display) shown++;
    });
    if (projectCount) projectCount.textContent = "Showing " + shown + " project" + (shown === 1 ? "" : "s");
  }));


  // Project case-study dialog: cards open full details, with keyboard support,
  // existing repository/live links, and reliable focus restoration.
  const projectModal = document.getElementById("projectModal");
  const projectDialog = projectModal?.querySelector(".project-modal-dialog");
  const projectModalImage = document.getElementById("projectModalImage");
  const projectModalMark = document.getElementById("projectModalMark");
  const projectModalKicker = document.getElementById("projectModalKicker");
  const projectModalTitle = document.getElementById("projectModalTitle");
  const projectModalSummary = document.getElementById("projectModalSummary");
  const projectModalStack = document.getElementById("projectModalStack");
  const projectModalDetails = document.getElementById("projectModalDetails");
  let projectModalReturnFocus = null;

  const projectDetailProfiles = {
    focusflow: {
      overview: "FocusFlow is a cross-platform focus, productivity and study timer that combines a single-session timer with structured intervals, study plans and daily focus goals.",
      overviewCards: [
        {label:"FOCUS TIMER",title:"Set a session",text:"Choose a duration in hours, minutes and seconds, then start a dedicated focus session."},
        {label:"STRUCTURED TIME",title:"Intervals & study plans",text:"Alternate work and breaks or arrange study periods into a repeatable sequence."},
        {label:"DAILY PROGRESS",title:"Work toward a goal",text:"Set a daily focus target separately from the duration of an individual session."}
      ],
      modes: [
        {icon:"timer",title:"Focus Timer",text:"A single session with adjustable duration and pause/resume controls."},
        {icon:"repeat-2",title:"Intervals",text:"Configured work and break phases across repeated cycles."},
        {icon:"calendar-check",title:"Study Plans",text:"A sequence of study and break periods for structured learning."},
        {icon:"target",title:"Daily Focus",text:"A daily time goal that can be tracked independently of one session."}
      ],
      features: [
        {icon:"clock-3",title:"Flexible session duration",text:"Set hours, minutes and seconds instead of being restricted to a single preset."},
        {icon:"circle-pause",title:"Session controls",text:"Pause, resume, skip a supported phase, or end an active session."},
        {icon:"repeat-2",title:"Intervals and cycles",text:"Configure work and recovery periods for Pomodoro-style and repeated focus routines."},
        {icon:"book-open",title:"Study plans",text:"Organise study, revision, reading and practice into a planned sequence."},
        {icon:"target",title:"Daily focus goal",text:"Set a daily target independently of the maximum duration of a single timer."},
        {icon:"sun-moon",title:"Account and appearance",text:"The project documents account-based features, email/password or Google sign-in, and light/dark appearance."}
      ],
      approachIntro:"The product is organised around several time-management modes rather than a countdown alone. Each mode addresses a different way of structuring focused time.",
      approachItems:[
        {title:"Separate session modes",text:"Keep a straightforward timer available while also supporting intervals and study plans for more structured routines."},
        {title:"Keep controls close to the session",text:"Pause, resume, skip and end actions let users manage an active timer without treating every interruption as a full restart."},
        {title:"Treat platform behaviour carefully",text:"Notifications and background execution vary between Web, Android and iOS; capabilities depend on platform support and permissions."}
      ],
      note:"The public project README describes Web availability and ongoing mobile release/development. Notification and background behaviour can differ by platform."
    },
    "linkedin-automation": {
      overview:"A personal Node.js and Playwright prototype for inspecting a LinkedIn profile's skills, discovering available skill-picker options and assisting with carefully selected changes.",
      overviewCards:[
        {label:"CONNECTION",title:"Use a separate browser session",text:"Connect Playwright to an already launched Chrome session through Chrome DevTools Protocol."},
        {label:"INSPECTION",title:"Read and discover",text:"Inspect the skills inventory and discover available options using bounded browser operations."},
        {label:"VERIFICATION",title:"Check the visible result",text:"Use a final read-only scan to verify state instead of assuming an interaction succeeded."}
      ],
      features:[
        {icon:"monitor",title:"CDP connection",text:"Connect to a dedicated Chrome session; the user signs in manually rather than supplying a LinkedIn password to the scripts."},
        {icon:"list-check",title:"Skills inventory",text:"Read visible skill names and produce an organised inventory."},
        {icon:"search",title:"Option discovery",text:"Inspect which skill-picker options appear for a given search."},
        {icon:"mouse-pointer-click",title:"Scoped UI actions",text:"Use selector design and dialog scoping to distinguish controls with similar labels."},
        {icon:"refresh-cw",title:"Bounded retries and waits",text:"Account for asynchronous suggestions and UI timing with bounded waits and retries."},
        {icon:"shield-check",title:"Verification-first",text:"Separate read-only scans from scripts that can modify profile data; review scripts before any change."}
      ],
      approachIntro:"The repository documents this as a personal automation prototype. Not all scripts are intended to run together, and any state-changing script should be reviewed before execution.",
      approachItems:[
        {title:"Inspect the interface",text:"Diagnose controls and page structure before attempting automation."},
        {title:"Automate deliberately",text:"Use selectors, bounded scrolling, scoped dialog handling and asynchronous UI waits."},
        {title:"Verify instead of assuming",text:"Run a separate final scan to confirm the visible state after actions."}
      ],
      note:"The README records a historical final scan of 60 skills with no changes made at that time. That is a point-in-time observation, not a guarantee of current profile state."
    },
    "books-api": {
      overview:"An end-to-end API testing project for the Simple Books API, using Postman and Newman to cover endpoint behaviour, authentication, environment management, automated execution and reporting.",
      overviewCards:[
        {label:"SERVICE CHECK",title:"Health and catalog",text:"Check service availability and exercise book-list and single-book retrieval."},
        {label:"AUTHENTICATION",title:"Register and authorise",text:"Register an API client and reuse a bearer token for secured order requests."},
        {label:"ORDER LIFECYCLE",title:"CRUD validation",text:"Create, read, update and delete orders while checking request and response behaviour."}
      ],
      features:[
        {icon:"activity",title:"Health check",text:"Call the service status endpoint to verify that the API is responding."},
        {icon:"book-open",title:"Books endpoints",text:"Retrieve book lists and individual book details, including available query filtering."},
        {icon:"key-round",title:"Bearer-token handling",text:"Register a client, store the access token in a collection variable and reuse it for authorised calls."},
        {icon:"list-check",title:"Order CRUD",text:"Cover create, list, retrieve, update and delete operations for orders."},
        {icon:"settings-2",title:"Environment management",text:"Use variables for the base URL and testing environment so configuration can be switched cleanly."},
        {icon:"file-chart-column",title:"Repeatable reports",text:"Execute collections using Newman and generate CLI, JSON or HTML reports."}
      ],
      approachIntro:"The collection is organised into reusable requests, variables and an execution path that can be run manually or from a command line.",
      approachItems:[
        {title:"Arrange tests by module",text:"Keep service status, books, client registration and order management easy to inspect."},
        {title:"Assert behaviour and authorisation",text:"Check expected status codes, response data and access-token usage across protected requests."},
        {title:"Automate execution",text:"Use Newman and report output to make test runs repeatable and reviewable."}
      ],
      note:"The project README lists Postman, Newman, REST API testing, JSON, Node.js, Git/GitHub and CI/CD integration as technologies and practices."
    },
    "api-user-flow": {
      overview:"A Postman collection that demonstrates an end-to-end API lifecycle through authentication, token reuse, user creation, update, deletion and response validation.",
      overviewCards:[
        {label:"AUTHENTICATE",title:"Acquire a token",text:"Validate login and store the returned token for later secured requests."},
        {label:"CHAIN REQUESTS",title:"Reuse runtime data",text:"Capture a created user's ID and use it in subsequent operations."},
        {label:"VERIFY",title:"Assert each step",text:"Check status codes, response fields, schemas and negative cases as the flow progresses."}
      ],
      features:[
        {icon:"key-round",title:"Authentication module",text:"Validate login responses, token extraction, authenticated user retrieval and invalid-credential scenarios."},
        {icon:"workflow",title:"Chained user lifecycle",text:"Link login, create user, update user and delete user requests into one ordered collection."},
        {icon:"database",title:"Environment variables",text:"Store values such as base URL, token and dynamic user ID for use across requests."},
        {icon:"check-check",title:"Positive and negative checks",text:"Validate status codes, response time, data, headers, authentication and failure behaviour."},
        {icon:"play",title:"Runner and Newman",text:"Execute the collection through the Postman Collection Runner or Newman CLI."},
        {icon:"git-branch",title:"CI/CD readiness",text:"The repository includes a GitHub Actions workflow location for automated collection execution."}
      ],
      approachIntro:"The test flow makes dependencies explicit: later requests use data captured from earlier responses, and assertions confirm each stage.",
      approachItems:[
        {title:"Login and extract token",text:"Validate the authentication response and store the token in an environment variable."},
        {title:"Create and update a user",text:"Capture the new user ID and pass it into the update request dynamically."},
        {title:"Delete and clean up",text:"Complete the user flow, then remove temporary variables as part of cleanup."}
      ],
      note:"The repository README describes a ReqRes-based collection and documents required environment values, including the base URL, token and user ID."
    },
    "java-collections": {
      overview:"A hands-on Java practice repository covering language fundamentals, object-oriented programming and core collections, supported by structured examples and explanations.",
      overviewCards:[
        {label:"LANGUAGE BASICS",title:"Build foundations",text:"Variables, data types, operators, conditions and loops."},
        {label:"OBJECT DESIGN",title:"Apply OOP",text:"Classes, objects, inheritance, encapsulation and polymorphism."},
        {label:"DATA STRUCTURES",title:"Use collections",text:"Practice ArrayList, HashMap, HashSet and List, Set and Map concepts."}
      ],
      features:[
        {icon:"braces",title:"Core Java",text:"Examples for variables, data types, operators, conditional statements and loops."},
        {icon:"boxes",title:"Object-oriented programming",text:"Classes and objects, inheritance, encapsulation and polymorphism."},
        {icon:"list",title:"ArrayList and List",text:"Practice working with ordered collections and common collection operations."},
        {icon:"network",title:"HashMap and Map",text:"Explore key-value storage and the List, Set and Map interfaces."},
        {icon:"layers",title:"HashSet and Set",text:"Work with set-based collections and their common usage patterns."},
        {icon:"folder-tree",title:"Structured repository",text:"Keep examples organised across basics, OOP and collections folders."}
      ],
      approachIntro:"The project focuses on small, understandable examples that build confidence with the Java language and core collection APIs.",
      approachItems:[
        {title:"Start with language syntax",text:"Practise data types, operators, decisions and loops."},
        {title:"Model code with OOP",text:"Use classes and objects, with examples of inheritance, encapsulation and polymorphism."},
        {title:"Choose a suitable collection",text:"Compare list, set and map structures and work through concrete Java examples."}
      ],
      note:"The repository README lists Java, Eclipse IDE and Git/GitHub as tools used, and identifies mini-projects, more problem-solving examples and JUnit as possible future improvements."
    },
    "maven-junit": {
      overview:"A Java practice project that demonstrates a standard Maven layout, dependency management and unit testing with JUnit 5.",
      overviewCards:[
        {label:"STRUCTURE",title:"Separate source and tests",text:"Use standard src/main/java and src/test/java folders."},
        {label:"DEPENDENCIES",title:"Manage the build",text:"Use Maven project configuration to define dependencies and the build lifecycle."},
        {label:"UNIT TESTS",title:"Check behaviour",text:"Create JUnit 5 tests and assertions for expected results."}
      ],
      features:[
        {icon:"folder-tree",title:"Standard Maven layout",text:"Separate application code from test code using conventional source folders."},
        {icon:"package",title:"Dependency management",text:"Keep project dependencies declared in Maven configuration."},
        {icon:"test-tube",title:"JUnit 5 tests",text:"Use test annotations and assertions to verify expected outcomes."},
        {icon:"terminal",title:"Test lifecycle",text:"Run tests through the Maven test goal."},
        {icon:"package-check",title:"Build lifecycle",text:"Use Maven goals such as clean install to build the project."},
        {icon:"wrench",title:"Maintainable structure",text:"Keep setup simple and consistent so the project can grow with additional tests."}
      ],
      approachIntro:"This practice project separates build configuration from application and test code, creating a repeatable baseline for Java test work.",
      approachItems:[
        {title:"Keep a conventional project structure",text:"Place production code in src/main/java and test code in src/test/java."},
        {title:"Define dependencies once",text:"Manage Maven and JUnit 5 configuration in the build descriptor."},
        {title:"Run tests through the build",text:"Use mvn test for test execution and mvn clean install for a full build lifecycle."}
      ],
      note:"The repository README describes this as a practice project and lists Java, Maven, JUnit 5, Eclipse and IntelliJ IDEA in its tech stack."
    }
  };

  const projectModalTabs = [...document.querySelectorAll("[data-project-tab]")];
  const projectModalTabContent = document.getElementById("projectModalDetails");
  let projectModalActiveCard = null;
  let projectModalActiveTab = "overview";

  function projectElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function projectSectionHeading(parent, eyebrow, title, description) {
    const heading = projectElement("div", "project-detail-heading");
    if (eyebrow) heading.append(projectElement("span", "project-detail-eyebrow", eyebrow));
    heading.append(projectElement("h3", "", title));
    if (description) heading.append(projectElement("p", "", description));
    parent.append(heading);
  }

  function projectInfoCards(parent, items, className = "project-detail-info-grid") {
    const grid = projectElement("div", className);
    items.forEach(item => {
      const card = projectElement("article", "project-detail-info-card");
      if (item.icon) {
        const mark = projectElement("span", "project-detail-card-icon");
        mark.innerHTML = '<i class="portfolio-lucide" data-lucide="' + item.icon + '" aria-hidden="true"></i>';
        card.append(mark);
      }
      if (item.label) card.append(projectElement("small", "project-detail-card-label", item.label));
      card.append(projectElement("b", "", item.title));
      if (item.text) card.append(projectElement("p", "", item.text));
      grid.append(card);
    });
    parent.append(grid);
  }

  function projectBulletGrid(parent, items) {
    const grid = projectElement("div", "project-detail-feature-grid");
    items.forEach(item => {
      const card = projectElement("article", "project-detail-feature");
      const icon = projectElement("span", "project-detail-feature-icon");
      icon.innerHTML = '<i class="portfolio-lucide" data-lucide="' + (item.icon || "check") + '" aria-hidden="true"></i>';
      card.append(icon, projectElement("div", "", ""));
      const copy = card.lastElementChild;
      copy.append(projectElement("b", "", item.title), projectElement("p", "", item.text));
      grid.append(card);
    });
    parent.append(grid);
  }

  function renderProjectModalTab(tabKey) {
    const card = projectModalActiveCard;
    if (!card || !projectModalTabContent) return;
    const id = card.dataset.projectId;
    const profile = projectDetailProfiles[id];
    if (!profile) return;
    projectModalActiveTab = tabKey;

    projectModalTabs.forEach(button => {
      const active = button.dataset.projectTab === tabKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    projectModalTabContent.replaceChildren();
    projectModalTabContent.setAttribute("aria-labelledby", "projectTab" + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
    const content = projectModalTabContent;
    const links = [...card.querySelectorAll(".project-links a")];

    if (tabKey === "overview") {
      projectSectionHeading(content, "PROJECT OVERVIEW", "Purpose & scope", profile.overview);
      projectInfoCards(content, profile.overviewCards);
      if (profile.modes) {
        const modesHeading = projectElement("div", "project-detail-subheading");
        modesHeading.append(projectElement("h4", "", "The FocusFlow experience"));
        modesHeading.append(projectElement("p", "", "Different ways to structure focused time in one product."));
        content.append(modesHeading);
        projectInfoCards(content, profile.modes.map(mode => ({
          ...mode, label:"MODE"
        })), "project-detail-mode-grid");
      }
      const story = card.querySelector(".story-grid");
      if (story) {
        const storyCards = [...story.children].map(node => ({
          label:node.querySelector("span")?.textContent.trim() || "",
          title:node.querySelector("b")?.textContent.trim() || "",
          text:""
        }));
        if (storyCards.length) {
          content.append(projectElement("div","project-detail-divider"));
          projectInfoCards(content, storyCards, "project-detail-story-grid");
        }
      }
    } else if (tabKey === "features") {
      projectSectionHeading(content, "CAPABILITIES", "What it covers", "Project-specific functions and scenarios documented in the project materials.");
      projectBulletGrid(content, profile.features);
      const originalItems = [...card.querySelectorAll(".project-content>ul li")].map(li => li.textContent.trim());
      if (originalItems.length) {
        const list = projectElement("div", "project-detail-verified-list");
        list.append(projectElement("h4", "", "Additional project details"));
        const ul = projectElement("ul", "");
        originalItems.forEach(item => ul.append(projectElement("li", "", item)));
        list.append(ul);
        content.append(list);
      }
    } else if (tabKey === "approach") {
      projectSectionHeading(content, "DESIGN & QUALITY", "Approach and considerations", profile.approachIntro);
      const steps = projectElement("div", "project-detail-approach-list");
      profile.approachItems.forEach((item, index) => {
        const row = projectElement("article", "project-detail-approach-step");
        row.append(projectElement("span", "project-detail-step-number", String(index + 1).padStart(2, "0")));
        const copy = projectElement("div", "");
        copy.append(projectElement("b", "", item.title), projectElement("p", "", item.text));
        row.append(copy);
        steps.append(row);
      });
      content.append(steps);
      if (profile.note) {
        const note = projectElement("aside", "project-detail-note");
        const icon = projectElement("span", "project-detail-note-icon");
        icon.innerHTML = '<i class="portfolio-lucide" data-lucide="info" aria-hidden="true"></i>';
        note.append(icon, projectElement("div", "", ""));
        const copy = note.lastElementChild;
        copy.append(projectElement("b", "", "Project note"), projectElement("p", "", profile.note));
        content.append(note);
      }
    } else if (tabKey === "resources") {
      projectSectionHeading(content, "NEXT STEPS", "Open the project", "Explore the live experience or inspect the source material using the available project links.");
      const resourceGrid = projectElement("div", "project-detail-resource-grid");
      links.forEach(link => {
        const a = projectElement("a", "project-detail-resource");
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        const mark = projectElement("span", "project-detail-resource-icon");
        const isLive = /live app|open live|demo/i.test(link.textContent);
        mark.innerHTML = '<i class="portfolio-lucide" data-lucide="' + (isLive ? "external-link" : "github") + '" aria-hidden="true"></i>';
        const copy = projectElement("span", "");
        copy.append(projectElement("b", "", link.textContent.replace(/[↗→]/g, "").trim()));
        copy.append(projectElement("small", "", isLive ? "Open the published application in a new tab." : "Review the repository, files and documented implementation."));
        a.append(mark, copy);
        a.append(projectElement("span", "project-detail-resource-arrow", "↗"));
        resourceGrid.append(a);
      });
      if (!links.length) {
        resourceGrid.append(projectElement("p", "project-detail-empty", "No external project links are currently listed for this item."));
      }
      content.append(resourceGrid);
    }

    window.lucide?.createIcons?.({attrs: {"stroke-width": 1.9, "aria-hidden": "true"}});
  }

  function openProjectDetails(card) {
    if (!card || !projectModal || !projectDialog) return;
    const id = card.dataset.projectId;
    const title = card.querySelector(".project-content h3")?.textContent.trim() || "Project details";
    const category = card.querySelector(".project-meta>span:first-child")?.textContent.trim() || "PROJECT OVERVIEW";
    const summary = card.querySelector(".project-content>p")?.textContent.trim() || "";
    const image = card.querySelector(".project-photo");
    const stack = [...card.querySelectorAll(".project-stack span")].map(node => node.textContent.trim());
    const iconNode = card.querySelector(".project-icon");
    projectModalReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : card;
    projectModalActiveCard = card;

    if (projectModalImage) {
      projectModalImage.src = image?.currentSrc || image?.src || "";
      projectModalImage.alt = image?.alt || title;
    }
    if (projectModalMark) {
      const officialLogo = id === "focusflow";
      projectModalMark.innerHTML = officialLogo
        ? '<img src="https://raw.githubusercontent.com/surdp/FocusFlow-App/main/assets/pragunira-logo.png" alt="" aria-hidden="true">'
        : (iconNode ? iconNode.innerHTML : '<i class="portfolio-lucide" data-lucide="layers" aria-hidden="true"></i>');
      projectModalMark.classList.toggle("project-modal-mark--brand", officialLogo);
    }
    if (projectModalKicker) projectModalKicker.textContent = category;
    if (projectModalTitle) projectModalTitle.textContent = title;
    if (projectModalSummary) projectModalSummary.textContent = summary;
    if (projectModalStack) {
      projectModalStack.replaceChildren();
      stack.forEach(label => projectModalStack.append(projectElement("span", "", label)));
    }
    projectModal.hidden = false;
    document.body.classList.add("project-modal-open");
    document.addEventListener("keydown", handleProjectModalKeydown);
    renderProjectModalTab("overview");
    projectDialog.scrollTop = 0;
    projectModal.querySelector(".project-modal-close")?.focus({preventScroll:true});
  }

  function closeProjectDetails() {
    if (!projectModal || projectModal.hidden) return;
    projectModal.hidden = true;
    document.body.classList.remove("project-modal-open");
    document.removeEventListener("keydown", handleProjectModalKeydown);
    if (projectModalImage) projectModalImage.removeAttribute("src");
    if (projectModalDetails) projectModalDetails.replaceChildren();
    if (projectModalReturnFocus instanceof HTMLElement) projectModalReturnFocus.focus({preventScroll:true});
  }

  function handleProjectModalKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProjectDetails();
      return;
    }
    if (event.key !== "Tab" || !projectDialog) return;
    const focusable = [...projectDialog.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')]
      .filter(node => !node.hidden && node.getAttribute("aria-hidden") !== "true");
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  cards.forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest("a,button")) return;
      openProjectDetails(card);
    });
    card.addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && event.target === card) {
        event.preventDefault();
        openProjectDetails(card);
      }
    });
  });
  document.querySelectorAll("[data-open-project]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      const card = cards.find(item => item.dataset.projectId === button.dataset.openProject);
      if (card) openProjectDetails(card);
    });
  });
  projectModal?.querySelectorAll("[data-project-close]").forEach(button => {
    button.addEventListener("click", closeProjectDetails);
  });
  projectModalTabs.forEach(button => {
    button.addEventListener("click", () => renderProjectModalTab(button.dataset.projectTab));
    button.addEventListener("keydown", event => {
      if (!["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
      event.preventDefault();
      let next = projectModalTabs.indexOf(button);
      if (event.key === "ArrowRight") next = (next + 1) % projectModalTabs.length;
      else if (event.key === "ArrowLeft") next = (next - 1 + projectModalTabs.length) % projectModalTabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = projectModalTabs.length - 1;
      projectModalTabs[next].focus();
      renderProjectModalTab(projectModalTabs[next].dataset.projectTab);
    });
  });

  // Experience Timeline / Career Growth modes and interactive progression.
  const careerJourney = document.querySelector(".career-journey");
  const careerModeButtons = [...document.querySelectorAll("[data-career-mode]")];
  const careerTrackArrow = document.getElementById("careerTrackArrow");
  const careerTrackPoints = [...document.querySelectorAll("[data-career-jump]")];
  const careerRoleCards = [...document.querySelectorAll("[data-career-card]")];
  const careerCardsGrid = document.querySelector(".career-cards-grid");
  const careerTrack = document.querySelector(".career-track");
  const careerGrowthView = document.getElementById("careerGrowthView");
  const careerGrowthRoadmap = document.querySelector(".career-growth-roadmap");
  const careerGrowthStages = [...document.querySelectorAll("[data-growth-stage]")];
  const careerGrowthDetail = document.getElementById("careerGrowthDetail");
  let careerRoleFocus = "techmahindra";
  let careerMode = "experience";

  const growthStageDetails = [
    {
      eyebrow:"STAGE 01 · FOUNDATIONS", title:"Junior QA / Manual Testing",
      description:"Build a rigorous base in understanding requirements, designing test cases, executing functional checks and documenting defects clearly.",
      skills:["Requirement Understanding","Test Case Design","Functional Testing","Defect Lifecycle","Regression Basics"]
    },
    {
      eyebrow:"STAGE 02 · HEALTHCARE QUALITY", title:"Healthcare QA & Test Automation",
      description:"Apply quality engineering to enterprise healthcare workflows, strengthening regression coverage, integration validation and repeatable automation.",
      skills:["Healthcare Workflows","Regression Testing","Integration Testing","API Validation","Test Automation"]
    },
    {
      eyebrow:"STAGE 03 · SENIOR DELIVERY", title:"Senior Delivery Consultant",
      description:"Grow into release ownership, upgrade impact assessment, client coordination and resolving complex delivery risks across healthcare applications.",
      skills:["Upgrade Impact Analysis","Release Readiness","Defect Triage","Stakeholder Coordination","Clinical Applications"]
    },
    {
      eyebrow:"STAGE 04 · BUSINESS ANALYSIS", title:"Senior Business Analyst",
      description:"Connect stakeholder needs to documented requirements, process improvements, acceptance criteria and well-coordinated implementation and UAT.",
      skills:["Requirements Elicitation","Process Modelling","Traceability","Stakeholder Management","UAT & Agile Delivery"]
    },
    {
      eyebrow:"STAGE 05 · NEXT DIRECTION", title:"Healthcare Solution & Product Leadership",
      description:"An aspirational next step: combine healthcare domain knowledge, analytical thinking and delivery experience to help shape end-to-end solutions and product outcomes.",
      skills:["Solution Design","Product Ownership","Systems Thinking","Cross-functional Leadership","Outcome-driven Delivery"]
    }
  ];

  function selectCareerRole(role) {
    if (!["cerner","techmahindra"].includes(role)) return;
    careerRoleFocus = role;
    if (careerJourney) careerJourney.dataset.focusedRole = role;
    careerTrackPoints.forEach(button => {
      const active = button.dataset.careerJump === role;
      button.classList.toggle("is-current", active);
      button.setAttribute("aria-current", active ? "step" : "false");
    });
    careerRoleCards.forEach(card => card.classList.toggle("is-focused", card.dataset.careerCard === role));
    // Arrow moves only after a user selects a role. It is aligned to the
    // selected marker; CSS switches to the vertical coordinate on mobile.
    if (careerTrackArrow) {
      careerTrackArrow.style.left = role === "techmahindra" ? "calc(0% - 30px)" : "calc(46% - 30px)";
      careerTrackArrow.style.setProperty("--career-arrow-top", role === "techmahindra" ? "4%" : "48%");
      careerTrackArrow.setAttribute("aria-label", "Selected role: " + (role === "techmahindra" ? "Tech Mahindra" : "Oracle Health (Cerner)"));
    }
  }
  function setCareerMode(mode) {
    if (!["experience","growth"].includes(mode)) return;
    careerMode = mode;
    careerModeButtons.forEach(button => {
      const active = button.dataset.careerMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const showExperience = mode === "experience";
    if (careerTrack) careerTrack.hidden = !showExperience;
    if (careerCardsGrid) careerCardsGrid.hidden = !showExperience;
    if (careerGrowthView) careerGrowthView.hidden = showExperience;
    if (careerJourney) careerJourney.classList.toggle("is-growth-mode", !showExperience);
    if (!showExperience) selectCareerGrowthStage(0);
  }
  careerModeButtons.forEach(button => button.addEventListener("click", () => setCareerMode(button.dataset.careerMode)));
  careerTrackPoints.forEach(button => button.addEventListener("click", () => selectCareerRole(button.dataset.careerJump)));
  careerTrackArrow?.addEventListener("click", () => selectCareerRole(careerRoleFocus === "techmahindra" ? "cerner" : "techmahindra"));
  document.querySelectorAll("[data-role-select]").forEach(surface => {
    const activate = () => selectCareerRole(surface.dataset.roleSelect);
    surface.addEventListener("click", activate);
    surface.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  function selectCareerGrowthStage(index) {
    const detail = growthStageDetails[index];
    if (!detail || !careerGrowthDetail) return;
    careerGrowthStages.forEach((button, i) => {
      const active = i === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (careerGrowthRoadmap) careerGrowthRoadmap.style.setProperty("--growth-arrow-left", (4 + index * 22.5) + "%");
    careerGrowthDetail.innerHTML = "";
    const icon = document.createElement("div");
    icon.className = "career-growth-detail-icon";
    icon.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "overline";
    eyebrow.textContent = detail.eyebrow;
    const title = document.createElement("h4");
    title.textContent = detail.title;
    const description = document.createElement("p");
    description.textContent = detail.description;
    const skills = document.createElement("div");
    skills.className = "career-skill-cloud";
    detail.skills.forEach(skill => {
      const chip = document.createElement("span");
      chip.textContent = skill;
      skills.append(chip);
    });
    copy.append(eyebrow, title, description, skills);
    careerGrowthDetail.append(icon, copy);
  }
  careerGrowthStages.forEach(button => button.addEventListener("click", () => selectCareerGrowthStage(Number(button.dataset.growthStage))));
  selectCareerRole("techmahindra");
  setCareerMode("experience");

  // Career experience tabs: each role owns its own tab panel and skill set.
  document.querySelectorAll("[data-role-tab]").forEach(button => {
    button.addEventListener("click", () => {
      const role = button.dataset.role;
      const tab = button.dataset.roleTab;
      document.querySelectorAll('[data-role="' + role + '"][data-role-tab]').forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll('[data-role-panel^="' + role + '-"]').forEach(panel => {
        const active = panel.dataset.rolePanel === role + "-" + tab;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });

  // The workflow explorer uses representative clinical workflow examples.
  // Details are illustrative and must be adapted to the relevant client configuration.
  const workflowLibrary = {
    em: {
      title: "Emergency Medicine / FirstNet",
      short: "Emergency Medicine",
      description: "Representative emergency department workflow from patient arrival through disposition, supporting coordinated clinical care and documentation.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85",
      imageAlt: "Emergency department and clinical care environment",
      flows: [
        {name:"Patient Care Workflow", stages:[
          ["Patient arrival","Patient arrives at the emergency department; initial identity and visit details are captured.","♙"],
          ["Triage & assessment","Triage staff record the presenting complaint, vital signs and acuity information.","✚"],
          ["Provider evaluation","A clinician reviews symptoms, history and initial assessment findings.","▤"],
          ["Orders & consultations","Medication, laboratory, imaging and specialist consultation orders may be initiated.","⌘"],
          ["Results review","Clinical teams review available results and update the care plan.","▥"],
          ["Disposition","The encounter proceeds to discharge, admission, transfer or further care as appropriate.","↗"]
        ]},
        {name:"Orders & Results", stages:[
          ["Order entry","A clinician selects the appropriate order based on the encounter and care plan.","⌘"],
          ["Order validation","Order details, priority and required information are reviewed.","✓"],
          ["Lab & imaging","Requested laboratory and radiology services are performed by the relevant teams.","⚗"],
          ["Results available","Results are returned and made available for clinical review.","▥"],
          ["Clinical review","The care team considers findings in the wider patient context.","♡"],
          ["Next action","Follow-up orders, treatment changes or disposition planning are documented.","↗"]
        ]},
        {name:"Clinical Documentation", stages:[
          ["Encounter context","Patient identity, encounter details and relevant history are reviewed.","♙"],
          ["Assessment notes","Presenting concerns, observations and assessment are recorded.","▤"],
          ["Care plan","Treatment decisions, procedures and follow-up instructions are documented.","⌘"],
          ["Orders & actions","Clinical actions and linked order information are reconciled.","✓"],
          ["Review & sign","Required documentation is checked and authenticated by the appropriate clinician.","☑"],
          ["Continuity","The record supports handover, follow-up and subsequent care.","↗"]
        ]},
        {name:"Disposition & Follow-up", stages:[
          ["Reassessment","The clinical team reviews the patient's response and readiness for next steps.","♡"],
          ["Disposition decision","The responsible clinician determines the appropriate disposition.","✓"],
          ["Discharge planning","Instructions, prescriptions and follow-up needs are prepared where applicable.","▤"],
          ["Admission / transfer","For patients requiring further care, the appropriate receiving pathway is coordinated.","↗"],
          ["Patient communication","The team communicates next steps and key instructions.","♙"],
          ["Encounter completion","Documentation and disposition details are completed for continuity of care.","☑"]
        ]}
      ]
    },
    oncology: {
      title:"Cerner Oncology (PCO)",
      short:"Cerner Oncology",
      description:"Illustrative oncology workflows spanning patient assessment, treatment planning, medication ordering, administration documentation and follow-up.",
      image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=85",
      imageAlt:"Oncology care environment",
      flows:[
        {name:"Patient & Treatment Planning",stages:[
          ["Patient intake","Confirm patient context and capture relevant visit information.","♙"],
          ["Oncology assessment","Review diagnosis context, clinical history and assessment information.","♡"],
          ["Treatment plan","Care team evaluates the planned regimen and treatment intent.","▤"],
          ["Regimen review","Treatment details and required approvals are checked against local policy.","✓"],
          ["Schedule treatment","Coordinate treatment visits and associated services.","▦"],
          ["Follow-up","Record review plans, next visits and relevant monitoring needs.","↗"]
        ]},
        {name:"Orders & Medication",stages:[
          ["Regimen selection","A clinician selects the intended treatment regimen.","▤"],
          ["Order entry","Medication and supportive-care orders are entered by authorized users.","⌘"],
          ["Clinical verification","Orders undergo required clinical and pharmacy verification steps.","✓"],
          ["Scheduling","Coordinate administration timing and required visits.","▦"],
          ["Administration record","Document treatment administration according to local workflow.","☑"],
          ["Monitoring","Record follow-up observations and care-team actions.","♡"]
        ]},
        {name:"Clinical Documentation",stages:[
          ["Review history","Review diagnosis, prior therapy and relevant patient information.","♙"],
          ["Assessment","Document treatment-related assessment and clinical notes.","▤"],
          ["Plan of care","Capture treatment intent, plan changes and decisions.","⌘"],
          ["Consent & checks","Ensure required consent and verification processes are recorded.","✓"],
          ["Treatment record","Maintain treatment-related documentation and associated orders.","☑"],
          ["Follow-up notes","Record response review, next steps and follow-up plan.","↗"]
        ]},
        {name:"Monitoring & Follow-up",stages:[
          ["Scheduled review","Review planned follow-up date and monitoring requirements.","▦"],
          ["Patient assessment","Capture relevant symptoms and assessment findings.","♡"],
          ["Results review","Review applicable laboratory and clinical results.","▥"],
          ["Care-plan review","The clinical team considers whether plan updates are needed.","⌘"],
          ["Document decision","Record decisions and required communication.","☑"],
          ["Next appointment","Arrange appropriate follow-up and monitoring steps.","↗"]
        ]}
      ]
    },
    bloodbank: {
      title:"Blood Bank Transfusion (BBT)",
      short:"Blood Bank Transfusion",
      description:"Illustrative transfusion-service workflow highlighting sample identification, compatibility checks, product issue traceability and transfusion documentation.",
      image:"https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1000&q=85",
      imageAlt:"Blood products in a clinical laboratory setting",
      flows:[
        {name:"Sample to Compatibility",stages:[
          ["Request received","Receive a transfusion request with required patient and clinical context.","▤"],
          ["Patient identification","Confirm patient and sample identifiers according to policy.","♙"],
          ["Sample accession","Register the sample and perform required identity checks.","⌘"],
          ["Blood group testing","Perform and record the required blood group testing.","⚗"],
          ["Compatibility testing","Complete crossmatch or compatibility checks as applicable.","✓"],
          ["Result recorded","Record results and availability status for authorized review.","☑"]
        ]},
        {name:"Product Selection & Issue",stages:[
          ["Component request","Review the requested blood component and clinical requirements.","▤"],
          ["Eligibility checks","Check relevant group, compatibility and product requirements.","✓"],
          ["Product selection","Select an appropriate component according to local procedure.","♥"],
          ["Issue verification","Verify the product and recipient details before issue.","⌘"],
          ["Traceability record","Record issue, product identifiers and handover information.","▦"],
          ["Delivery / receipt","Document handover and receipt according to local policy.","↗"]
        ]},
        {name:"Transfusion Administration",stages:[
          ["Bedside identity check","Perform required patient and product identity checks.","♙"],
          ["Product verification","Confirm product details and compatibility documentation.","✓"],
          ["Baseline observations","Record required baseline observations before transfusion.","▤"],
          ["Administration","Document commencement and required administration details.","♥"],
          ["Monitoring","Monitor and document observations according to protocol.","♡"],
          ["Completion record","Record completion, outcome and any required follow-up.","☑"]
        ]},
        {name:"Reaction & Traceability",stages:[
          ["Concern identified","Recognize and escalate a suspected transfusion reaction.","⚠"],
          ["Immediate response","Follow local clinical protocol and notify the responsible team.","✚"],
          ["Record details","Capture observations, product identifiers and event timing.","▤"],
          ["Notify blood bank","Coordinate required notification and investigation steps.","↔"],
          ["Investigation","Carry out required checks and document findings per procedure.","⚗"],
          ["Resolution & reporting","Record outcome, actions and required incident reporting.","☑"]
        ]}
      ]
    },
    lab: {
      title:"Laboratory Solutions",
      short:"Laboratory Solutions",
      description:"Illustrative laboratory information workflow from test ordering and specimen handling through validation, reporting and critical-result communication.",
      image:"https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=85",
      imageAlt:"Clinical diagnostic laboratory",
      flows:[
        {name:"Specimen Lifecycle",stages:[
          ["Test order","A test request is entered with relevant patient and collection information.","⌘"],
          ["Collection","Specimen is collected and labelled according to procedure.","♙"],
          ["Accessioning","The laboratory receives and registers the specimen.","▤"],
          ["Processing","Specimen preparation and testing follow laboratory procedures.","⚗"],
          ["Verification","Results and quality checks are reviewed by authorized staff.","✓"],
          ["Reporting","Results are released and routed to appropriate recipients.","↗"]
        ]},
        {name:"Orders & Results",stages:[
          ["Order validation","Confirm request details and required order information.","✓"],
          ["Specimen matching","Match specimen identifiers to the correct order and patient.","⌘"],
          ["Instrument / bench testing","Perform testing within the relevant laboratory workflow.","⚗"],
          ["Result transmission","Results are delivered through the configured information pathway.","↔"],
          ["Result review","Authorized staff review exceptions and results requiring action.","▥"],
          ["Final report","Validated results are released with relevant comments where applicable.","☑"]
        ]},
        {name:"Quality & Exception Handling",stages:[
          ["Exception flagged","Identify missing, invalid or out-of-range information requiring review.","⚠"],
          ["Specimen review","Check labelling, integrity and acceptance criteria.","⌕"],
          ["Repeat / recollect","Arrange repeat testing or recollection when indicated by procedure.","↻"],
          ["Result validation","Review QC status and result plausibility.","✓"],
          ["Escalation","Escalate relevant exceptions or critical results according to policy.","↗"],
          ["Resolution record","Document resolution and any required communication.","☑"]
        ]},
        {name:"Critical Results & Reporting",stages:[
          ["Critical value detected","Identify a result that meets the configured critical threshold.","⚠"],
          ["Validation check","Confirm validity and apply required review steps.","✓"],
          ["Notify responsible team","Communicate the result through the approved pathway.","↗"],
          ["Acknowledgement","Record acknowledgement when required by the workflow.","☑"],
          ["Clinical action","Relevant care team determines and documents next steps.","♡"],
          ["Audit trail","Preserve result, communication and documentation trail.","▤"]
        ]}
      ]
    }
  };

  const workflowTabButtons = [...document.querySelectorAll("[data-solution]")];
  const workflowHero = document.getElementById("workflowHeroImage");
  const workflowFeature = document.getElementById("workflowFeature");
  const workflowTitle = document.getElementById("workflowTitle");
  const workflowDescription = document.getElementById("workflowDescription");
  const workflowSubtabs = [...document.querySelectorAll("[data-flow]")];
  const workflowStages = document.getElementById("workflowStages");
  const workflowCurrentFlow = document.getElementById("workflowCurrentFlow");
  const workflowStageDetail = document.getElementById("workflowStageDetail");
  const workflowPrevious = document.getElementById("workflowPrevious");
  const workflowNext = document.getElementById("workflowNext");
  let currentSolution = "em";
  let currentFlowIndex = 0;
  let currentStageIndex = 0;

  function renderWorkflowStageDetail(stage, index) {
    if (!workflowStageDetail) return;
    workflowStageDetail.innerHTML = "";
    const number = document.createElement("span");
    number.className = "workflow-stage-detail-icon";
    number.textContent = String(index + 1).padStart(2, "0");
    const copy = document.createElement("div");
    const heading = document.createElement("b");
    heading.textContent = stage[0];
    const description = document.createElement("p");
    description.textContent = stage[1];
    copy.append(heading, description);
    workflowStageDetail.append(number, copy);
  }
  function renderWorkflowStages() {
    const solution = workflowLibrary[currentSolution];
    if (!solution || !workflowStages) return;
    const flow = solution.flows[currentFlowIndex];
    workflowStages.innerHTML = "";
    if (workflowCurrentFlow) workflowCurrentFlow.textContent = flow.name;
    flow.stages.forEach((stage, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "workflow-stage" + (index === currentStageIndex ? " is-active" : "");
      button.setAttribute("aria-pressed", String(index === currentStageIndex));
      button.style.animationDelay = (index * 35) + "ms";
      const symbol = document.createElement("span");
      symbol.className = "workflow-stage-symbol";
      symbol.setAttribute("aria-hidden", "true");
      symbol.textContent = stage[2];
      const title = document.createElement("b");
      title.textContent = stage[0];
      const hint = document.createElement("small");
      hint.textContent = stage[1].length > 60 ? stage[1].slice(0,57).trimEnd() + "…" : stage[1];
      button.append(symbol, title, hint);
      button.addEventListener("click", () => {
        currentStageIndex = index;
        renderWorkflowStages();
        renderWorkflowStageDetail(stage, index);
      });
      workflowStages.append(button);
    });
    refreshPortfolioIcons();
    renderWorkflowStageDetail(flow.stages[currentStageIndex], currentStageIndex);
  }
  function activateWorkflow(solutionKey, flowIndex = 0) {
    const solution = workflowLibrary[solutionKey];
    if (!solution) return;
    currentSolution = solutionKey;
    currentFlowIndex = Math.max(0, Math.min(flowIndex, solution.flows.length - 1));
    currentStageIndex = 0;
    workflowTabButtons.forEach(button => {
      const active = button.dataset.solution === solutionKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    if (workflowFeature) {
      workflowFeature.dataset.solution = solutionKey;
      workflowFeature.classList.remove("workflow-changing");
      void workflowFeature.offsetWidth;
      workflowFeature.classList.add("workflow-changing");
    }
    if (workflowHero) {
      workflowHero.src = solution.image;
      workflowHero.alt = solution.imageAlt;
    }
    if (workflowTitle) workflowTitle.textContent = solution.title;
    if (workflowDescription) workflowDescription.textContent = solution.description;
    workflowSubtabs.forEach((button, index) => {
      const active = index === currentFlowIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.textContent = solution.flows[index]?.name || "Workflow view";
      button.hidden = !solution.flows[index];
    });
    renderWorkflowStages();
  }
  workflowTabButtons.forEach(button => button.addEventListener("click", () => activateWorkflow(button.dataset.solution)));
  workflowSubtabs.forEach(button => button.addEventListener("click", () => activateWorkflow(currentSolution, Number(button.dataset.flow))));
  workflowPrevious?.addEventListener("click", () => {
    const keys = Object.keys(workflowLibrary);
    const index = keys.indexOf(currentSolution);
    activateWorkflow(keys[(index - 1 + keys.length) % keys.length]);
  });
  workflowNext?.addEventListener("click", () => {
    const keys = Object.keys(workflowLibrary);
    const index = keys.indexOf(currentSolution);
    activateWorkflow(keys[(index + 1) % keys.length]);
  });
  if (workflowStages) activateWorkflow("em");

  // Goals dialog: category selection updates the graph, milestones and focus cards.
  const goalLibrary = {
    career: {
      label:"CAREER GROWTH",title:"Career Growth",icon:"↗",
      description:"Build on current delivery experience, expand solution ownership and grow towards healthcare solution architecture and product leadership.",
      milestones:[
        ["Current strengths","Deliver dependable outcomes","Apply business analysis, healthcare workflows and quality engineering to day-to-day delivery."],
        ["Expand ownership","Lead cross-functional work","Own larger requirements, workflow improvement and delivery-readiness activities."],
        ["Design solutions","Shape end-to-end options","Strengthen solution design, systems thinking and product delivery judgement."],
        ["Create impact","Improve healthcare outcomes","Help teams deliver scalable, reliable and user-focused healthcare solutions."]
      ],
      focus:[
        ["♧","Delivery ownership","Take ownership of requirements, decisions, validation and handover."],
        ["◎","Product thinking","Connect user needs, prioritization and measurable outcomes."],
        ["↔","Stakeholder leadership","Build alignment across business, clinical and technology teams."],
        ["↗","Solution architecture","Build the systems perspective needed for dependable solution design."]
      ]
    },
    technical:{
      label:"TECHNICAL SKILLS",title:"Technical Skills",icon:"⌘",
      description:"Build practical technical depth across data, integration, automation and delivery engineering to complement healthcare and business analysis experience.",
      milestones:[
        ["Strengthen data skills","SQL and analytics","Develop repeatable data validation, analysis and reporting practices."],
        ["Modern automation","API and UI testing","Build reusable test coverage and maintainable automation patterns."],
        ["Understand delivery","CI/CD and cloud basics","Improve familiarity with deployment pipelines, environments and monitoring concepts."],
        ["Apply emerging tech","Python and applied AI","Use small practical projects to solve workflow and quality problems."]
      ],
      focus:[
        ["▤","SQL & data analysis","Data validation, querying, quality checks and analytical thinking."],
        ["⌘","API & automation","API testing, reusable automation, assertions and integration checks."],
        ["↗","CI/CD practices","Quality gates, pipeline concepts and release confidence."],
        ["✳","Python & applied AI","Practical scripting, problem solving and AI-enabled workflow ideas."]
      ]
    },
    domain:{
      label:"HEALTHCARE DOMAIN",title:"Healthcare Domain Expertise",icon:"♡",
      description:"Deepen understanding of clinical operations and connected systems while building on real exposure to enterprise healthcare applications.",
      milestones:[
        ["Clinical context","Understand the care journey","Explore operational needs, user roles, safety considerations and workflow variation."],
        ["Workflow depth","Map current and future states","Connect clinical activities, data, applications and handoffs."],
        ["Interoperability","Understand data exchange","Build structured knowledge of HL7, FHIR and integration patterns."],
        ["Enterprise view","Connect care and operations","Understand how clinical systems and revenue-cycle processes interact."]
      ],
      focus:[
        ["♡","Clinical workflows","Emergency care, oncology, transfusion and laboratory process understanding."],
        ["↔","HL7 & FHIR","Interoperability concepts and common integration patterns."],
        ["▤","Healthcare data","Data quality, context, validation and downstream use."],
        ["◎","RCM fundamentals","Understand the relationship between care delivery and revenue-cycle workflows."]
      ]
    },
    credentials:{
      label:"CERTIFICATIONS & CREDENTIALS",title:"Certifications & Professional Learning",icon:"✦",
      description:"Build a focused record of professional development that supports business analysis, delivery, healthcare technology and quality engineering.",
      milestones:[
        ["Identify priorities","Choose role-aligned pathways","Prioritize credentials that map to target responsibilities and demonstrable skills."],
        ["Learn with intent","Complete structured learning","Turn courses into notes, exercises and practical examples."],
        ["Demonstrate capability","Build portfolio evidence","Pair credentials with projects, case studies and workflow examples."],
        ["Keep current","Maintain relevant knowledge","Review tools, standards and practices as roles and technology evolve."]
      ],
      focus:[
        ["▤","Business analysis","Requirements, process modelling, product delivery and stakeholder practices."],
        ["✓","Quality engineering","Testing strategy, automation and integration validation."],
        ["♡","Healthcare technology","Clinical systems, workflow understanding and interoperability."],
        ["↗","Portfolio evidence","Projects and examples that demonstrate applied knowledge."]
      ]
    },
    personal:{
      label:"PERSONAL DEVELOPMENT",title:"Personal Development",icon:"♙",
      description:"Strengthen the communication, organization and collaboration habits that make technical delivery more effective.",
      milestones:[
        ["Clear communication","Write with precision","Present requirements, decisions and risks in concise, audience-aware language."],
        ["Structured thinking","Make complexity clear","Use diagrams, options and evidence to explain workflows and trade-offs."],
        ["Collaboration","Build trusted partnerships","Listen actively, clarify assumptions and work constructively through change."],
        ["Consistency","Learn and reflect","Maintain practical learning habits and review progress regularly."]
      ],
      focus:[
        ["✎","Communication","Clear writing, presentation, listening and stakeholder updates."],
        ["⌘","Systems thinking","Break complex problems into connected steps and decisions."],
        ["♧","Collaboration","Facilitation, alignment, feedback and shared accountability."],
        ["↻","Continuous improvement","Reflection, practice and iterative skill development."]
      ]
    },
    vision:{
      label:"LONG-TERM VISION",title:"Long-Term Vision",icon:"♜",
      description:"Progress towards broader responsibility in healthcare solution architecture and product delivery, with meaningful impact on clinical and operational systems.",
      milestones:[
        ["Build foundations","Deepen domain and delivery","Continue strengthening requirements, workflow analysis and reliable release practices."],
        ["Broaden scope","Own end-to-end solutions","Work across discovery, options, validation and adoption."],
        ["Lead decisions","Guide solution direction","Grow capability in architecture principles, integration and product trade-offs."],
        ["Create lasting value","Enable better healthcare systems","Contribute to scalable, safe and user-centred digital healthcare outcomes."]
      ],
      focus:[
        ["▤","Solution architecture","System context, integration options, non-functional needs and trade-offs."],
        ["◎","Product leadership","Roadmaps, priorities, outcomes and stakeholder alignment."],
        ["♡","Healthcare innovation","Clinical workflow improvements supported by technology."],
        ["↗","Global collaboration","Communicate clearly and deliver well with distributed teams."]
      ]
    }
  };
  const goalsDialog = document.getElementById("goalsDialog");
  const goalsOpenButton = document.getElementById("exploreGoalsButton");
  const goalsCloseButton = document.getElementById("goalsDialogClose");
  const goalsCategoryButtons = [...document.querySelectorAll("[data-goal-category]")];
  const goalsFocusEyebrow = document.getElementById("goalsFocusEyebrow");
  const goalsFocusTitle = document.getElementById("goalsFocusTitle");
  const goalsFocusDescription = document.getElementById("goalsFocusDescription");
  const goalsTargetIcon = document.getElementById("goalsTargetIcon");
  const goalsMilestones = document.getElementById("goalsMilestones");
  const goalsFocusGrid = document.getElementById("goalsFocusGrid");
  const goalsFocusCount = document.getElementById("goalsFocusCount");
  const goalsGraphNodes = document.getElementById("goalsGraphNodes");
  const goalsGraphProgress = document.getElementById("goalsGraphProgress");
  const svgNs = "http://www.w3.org/2000/svg";
  let activeGoalCategory = "career";
  let activeGoalMilestone = 0;
  function makeSvg(tag, attrs = {}) {
    const element = document.createElementNS(svgNs, tag);
    Object.entries(attrs).forEach(([key,value]) => element.setAttribute(key, String(value)));
    return element;
  }
  function renderGoals(categoryKey) {
    const goal = goalLibrary[categoryKey];
    if (!goal) return;
    activeGoalCategory = categoryKey;
    activeGoalMilestone = 0;
    goalsCategoryButtons.forEach(button => {
      const active = button.dataset.goalCategory === categoryKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
    if (goalsFocusEyebrow) goalsFocusEyebrow.textContent = goal.label;
    if (goalsFocusTitle) goalsFocusTitle.textContent = goal.title;
    if (goalsFocusDescription) goalsFocusDescription.textContent = goal.description;
    if (goalsTargetIcon) goalsTargetIcon.textContent = goal.icon;
    if (goalsFocusCount) goalsFocusCount.textContent = goal.focus.length + " focus areas";
    if (goalsGraphNodes) {
      goalsGraphNodes.innerHTML = "";
      const xs = [48, 250, 455, 670];
      const ysByCategory = {
        career:[198,157,116,42],technical:[205,158,92,48],domain:[200,169,117,55],
        credentials:[205,155,104,48],personal:[199,144,122,45],vision:[204,172,95,40]
      };
      const ys = ysByCategory[categoryKey] || ysByCategory.career;
      const path = "M " + xs[0] + " " + ys[0] + " C " + (xs[0]+70) + " " + (ys[0]-12) + ", " + (xs[1]-60) + " " + (ys[1]+20) + ", " + xs[1] + " " + ys[1] +
        " S " + (xs[2]-50) + " " + (ys[2]-28) + ", " + xs[2] + " " + ys[2] +
        " S " + (xs[3]-70) + " " + (ys[3]+20) + ", " + xs[3] + " " + ys[3];
      if (goalsGraphProgress) goalsGraphProgress.setAttribute("d", path);
      goal.milestones.forEach((milestone,index) => {
        const g = makeSvg("g",{class:"goals-graph-node" + (index === activeGoalMilestone ? " is-active" : ""),tabindex:"0",role:"button","aria-label":milestone[0]});
        const circle = makeSvg("circle",{cx:xs[index],cy:ys[index],r:index===activeGoalMilestone?10:7});
        const text = makeSvg("text",{x:xs[index],y:Math.max(17,ys[index]-18)});
        text.textContent = String(index+1).padStart(2,"0");
        g.append(circle,text);
        const activate = () => selectGoalMilestone(index);
        g.addEventListener("click",activate);
        g.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();activate();}});
        goalsGraphNodes.append(g);
      });
    }
    if (goalsMilestones) {
      goalsMilestones.innerHTML = "";
      goal.milestones.forEach((milestone,index) => {
        const button=document.createElement("button");
        button.type="button";
        button.className="goals-milestone"+(index===activeGoalMilestone?" is-active":"");
        const small=document.createElement("small");small.textContent="STAGE "+String(index+1).padStart(2,"0");
        const title=document.createElement("b");title.textContent=milestone[0];
        const p=document.createElement("p");p.textContent=milestone[1];
        button.append(small,title,p);
        button.addEventListener("click",()=>selectGoalMilestone(index));
        goalsMilestones.append(button);
      });
    }
    if(goalsFocusGrid){
      goalsFocusGrid.innerHTML="";
      goal.focus.forEach(item=>{
        const iconName=portfolioIconName(item[1]);
        const card=document.createElement("article");card.className="goals-focus-card";
        const icon=document.createElement("span");
        icon.innerHTML=iconName?'<i class="portfolio-lucide" data-lucide="'+iconName+'" aria-hidden="true"></i>':item[0];
        icon.setAttribute("aria-hidden","true");
        const title=document.createElement("b");title.textContent=item[1];
        const desc=document.createElement("p");desc.textContent=item[2];
        card.append(icon,title,desc);goalsFocusGrid.append(card);
      });
    }
    refreshPortfolioIcons();
  }
  function selectGoalMilestone(index) {
    const goal=goalLibrary[activeGoalCategory];
    if(!goal || index<0 || index>=goal.milestones.length) return;
    activeGoalMilestone=index;
    const milestone=goal.milestones[index];
    if(goalsMilestones) [...goalsMilestones.children].forEach((el,i)=>el.classList.toggle("is-active",i===index));
    if(goalsGraphNodes) [...goalsGraphNodes.children].forEach((el,i)=>{
      el.classList.toggle("is-active",i===index);
      const c=el.querySelector("circle");
      if(c)c.setAttribute("r",i===index?10:7);
    });
    if(goalsFocusTitle) goalsFocusTitle.textContent=milestone[0];
    if(goalsFocusDescription) goalsFocusDescription.textContent=milestone[2];
    if(goalsTargetIcon) goalsTargetIcon.textContent=String(index+1).padStart(2,"0");
  }
  goalsCategoryButtons.forEach(button=>button.addEventListener("click",()=>renderGoals(button.dataset.goalCategory)));
  goalsMilestones?.addEventListener("keydown",event=>{
    const button=event.target.closest("button.goals-milestone");
    if(button && (event.key==="Enter"||event.key===" ")) { event.preventDefault(); button.click(); }
  });
  goalsOpenButton?.addEventListener("click",()=>{
    renderGoals(activeGoalCategory);
    if(goalsDialog?.showModal) goalsDialog.showModal();
    else goalsDialog?.setAttribute("open","");
  });
  goalsCloseButton?.addEventListener("click",()=>goalsDialog?.close());
  goalsDialog?.addEventListener("click",event=>{if(event.target===goalsDialog)goalsDialog.close();});
  goalsDialog?.addEventListener("close",()=>goalsOpenButton?.focus());
  renderGoals("career");

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("visible"));

  const topButton = document.getElementById("backTop");
  function updateTopButton() { topButton?.classList.toggle("visible", window.scrollY > 500); }
  window.addEventListener("scroll", updateTopButton, { passive: true });
  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateTopButton();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();