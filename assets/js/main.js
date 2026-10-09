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
      themeToggle.textContent = theme === "dark" ? "☼" : "☾";
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
    if (themeMeta) themeMeta.content = theme === "dark" ? "#111923" : "#f5f7fa";
    try { localStorage.setItem("suraj-portfolio-theme", theme); } catch (_) {}
  }
  setTheme(root.dataset.theme || "dark");
  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

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
        const card=document.createElement("article");card.className="goals-focus-card";
        const icon=document.createElement("span");icon.textContent=item[0];icon.setAttribute("aria-hidden","true");
        const title=document.createElement("b");title.textContent=item[1];
        const desc=document.createElement("p");desc.textContent=item[2];
        card.append(icon,title,desc);goalsFocusGrid.append(card);
      });
    }
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