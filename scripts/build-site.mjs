import { mkdirSync, writeFileSync } from "node:fs";

const bookingUrl = "https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_1_113462";
const tebraPolicyUrl = "https://www.tebra.com/platform-privacy-policy";
const hipaaUrl = "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/privacy-practices-for-protected-health-information/index.html";

const navigation = [
  { label: "Services", href: "/services/" },
  { label: "Our Philosophy", href: "/about/" },
  { label: "Fees/Insurance", href: "/services/" },
  { label: "Doctors", href: "/dr-wallis/" },
];

const serviceCards = [
  {
    title: "Longevity & Preventive Medicine Focus",
    text: "Risk-based prevention and long-term health optimization using evidence-based strategies.",
    href: "/services/longevity/",
    image: "longevity.png",
  },
  {
    title: "Women’s Health & Menopause Expertise",
    text: "Comprehensive, individualized care for perimenopause and menopause, addressing symptoms, long-term health, and quality of life.",
    href: "/services/womens-health/",
    image: "womens-health.png",
  },
  {
    title: "Personalized Weight & Metabolic Care",
    text: "Medical weight management focused on prevention, metabolic health, and sustainable outcomes—not quick fixes.",
    href: "/services/weight-management/",
    image: "weight-management.png",
  },
  {
    title: "International Second Opinions",
    text: "Clear, cohesive interpretation of complex medical cases and conflicting specialist recommendations.",
    href: "/services/medical-second-opinion/",
    image: "medical-second-opinion.png",
  },
  {
    title: "Limited Virtual Urgent Care",
    text: "Evaluation of select acute conditions such as UTIs, sinus infections, bronchitis, and asthma flares. No pain management, ADHD care, or controlled substances.",
    href: "/services/urgent-care/",
    image: "urgent-care.png",
  },
];

const pages = [
  {
    path: "index.html",
    title: "DWMedLLC",
    description: "Telemedicine in the DC area",
    active: "",
    render: renderHome,
  },
  {
    path: "about/index.html",
    title: "About | DWMedLLC",
    description: "Our philosophy and approach to concierge telemedicine.",
    active: "/about/",
    render: renderAbout,
  },
  {
    path: "dr-wallis/index.html",
    title: "Dr. Denise D. Wallis, MD | DWMedLLC",
    description: "Meet Dr. Denise D. Wallis, MD, FAAFP.",
    active: "/dr-wallis/",
    render: renderDoctor,
  },
  {
    path: "services/index.html",
    title: "Services | DWMedLLC",
    description: "Healthcare services tailored to you.",
    active: "/services/",
    render: renderServices,
  },
  {
    path: "services/longevity/index.html",
    title: "Longevity and Preventive Medicine | DWMedLLC",
    description: "Longevity and preventive medicine at Paradigm by DW Medical.",
    active: "/services/",
    render: () =>
      renderServiceDetail({
        breadcrumb: "Longevity and Preventive Medicine",
        title: "Longevity and Preventive Medicine",
        kicker: "Live Better, Longer – On Your Terms",
        description:
          "Longevity care at Paradigm by DW Medical focuses on reducing risk, maintaining function, and preserving quality of life.",
        offers: [
          "Cardiometabolic risk assessment",
          "Preventive screening strategy",
          "Bone and muscle health",
          "Evidence-based supplement guidance",
        ],
        why:
          "By addressing root causes—before symptoms arise—we can often slow or reverse early disease processes like metabolic dysfunction, insulin resistance, or brain fog.",
        who:
          "This service is ideal for adults who want to stay ahead of chronic illness, optimize performance, improve energy, or invest intentionally in their long-term wellness. It’s also suited for those seeking thoughtful, physician-led guidance rather than fragmented, trend-driven advice. Whether you’re starting your wellness journey or fine-tuning a high-performing lifestyle, this program is built for you.",
        note: "Care is grounded in science, not extreme or experimental interventions.",
        image: "longevity.png",
      }),
  },
  {
    path: "services/womens-health/index.html",
    title: "Menopause & Women's Health | DWMedLLC",
    description: "Menopause and women’s health expertise.",
    active: "/services/",
    render: () =>
      renderServiceDetail({
        breadcrumb: "Menopause & Women's Health",
        title: "Menopause & Women's Health",
        kicker: "Menopause Shouldn’t Derail Your Life—Let’s Reclaim Your Balance",
        description:
          "Menopause is a transition that affects nearly every system in the body—not just hormones. Too often, women feel rushed, dismissed, or offered oversimplified solutions.",
        offers: [
          "Hot flashes and night sweats",
          "Sleep disruption and fatigue",
          "Brain fog and mood changes",
          "Weight gain and metabolic shifts",
          "Sexual and vaginal health",
          "Long-term health considerations",
        ],
        why:
          "Women’s health is complex — especially during perimenopause, menopause, and other transitional phases that impact energy, mood, weight, and hormonal balance. Paradigm by DW Medical provides a modern, comprehensive, evidence-based approach to these life stages, ensuring women receive the clarity, validation, and medical support they deserve.",
        who:
          "This service is designed for women navigating perimenopause or menopause, those experiencing irregular cycles, mood changes, sleep issues, weight shifts, or concerns about long-term bone and cardiovascular health. It’s also ideal for women seeking a physician who listens, understands the nuances of hormonal care, and offers personalized solutions instead of one-size-fits-all protocols.",
        note:
          "Treatment plans are individualized and may include hormonal and non-hormonal options when appropriate. This practice does not prescribe controlled substances and does not provide ADHD evaluation or treatment.",
        image: "womens-health.png",
      }),
  },
  {
    path: "services/weight-management/index.html",
    title: "Weight Management | DWMedLLC",
    description: "Physician-led weight and metabolic care.",
    active: "/services/",
    render: () =>
      renderServiceDetail({
        breadcrumb: "Weight Management",
        title: "Weight Management",
        kicker: "Sustainable Weight Loss, Designed for You",
        description: "Weight management is both preventive medicine and foundational to long-term health.",
        offers: [
          "Comprehensive medical assessment",
          "Evaluation of metabolic and hormonal contributors",
          "Thoughtful use of medications when appropriate",
          "Sustainable, physiology-based strategies",
        ],
        why:
          "Sustainable weight management begins with understanding your unique metabolic profile, lifestyle demands, hormonal influences, and long-term health goals. At Paradigm by DW Medical, we move beyond quick fixes or generic diet plans. Our physician-led approach integrates evidence-based medicine with personalized, concierge-level support so you can improve your metabolic health, feel better in your body, and finally maintain results that last.",
        who:
          "This program is ideal for adults who have tried to lose weight without lasting success, individuals with metabolic conditions such as insulin resistance or prediabetes, and those experiencing weight changes related to aging, stress, or hormones. It is also well-suited for patients seeking a physician-supervised, safe, and structured path toward better health — without judgment, guesswork, or generic advice.",
        note:
          "Dr. Wallis is pursuing certification in Obesity Medicine, reflecting her commitment to evidence-based metabolic care.",
        image: "weight-management.png",
      }),
  },
  {
    path: "services/medical-second-opinion/index.html",
    title: "Medical Second Opinion | DWMedLLC",
    description: "Global access to expert U.S. medical guidance.",
    active: "/services/",
    render: () =>
      renderServiceDetail({
        breadcrumb: "Medical Second Opinion",
        title: "Medical Second Opinion",
        kicker: "Global Access to Expert U.S. Medical Guidance",
        description:
          "Many patients seek second opinions after seeing multiple specialists without a clear explanation. Dr. Wallis brings a family medicine perspective uniquely suited to synthesizing across disciplines, including internal medicine, neurology, psychiatry, gynecology, and musculoskeletal medicine.",
        offers: [
          "Detailed record review",
          "Clear explanation of findings",
          "Cohesive medical interpretation",
          "Guidance on next steps",
        ],
        why:
          "Medical decisions carry weight, especially when the diagnosis is serious or the recommended treatment is complex. Our International Second Opinion service allows patients worldwide to receive an unbiased, expert review of their medical condition from a U.S.-trained, board-certified physician. We provide clarity, confidence, and a global standard of care — all through a streamlined virtual process.",
        who:
          "This service is designed for patients who have received a serious or complex diagnosis, those facing surgery or high-risk treatment, individuals with unresolved or confusing symptoms, and anyone seeking reassurance about their care plan. It is also ideal for international patients who want access to U.S.-based medical insight without the burden of travel or hospital systems.",
        note: "Available for U.S. and international patients.",
        image: "medical-second-opinion.png",
      }),
  },
  {
    path: "services/urgent-care/index.html",
    title: "Limited Urgent Care | DWMedLLC",
    description: "Fast, physician-led virtual care for common concerns.",
    active: "/services/",
    render: () =>
      renderServiceDetail({
        breadcrumb: "Limited Urgent Care",
        title: "Limited Urgent Care",
        kicker: "Fast, physician-led virtual care for common concerns.",
        description: "Available for select, straightforward conditions such as:",
        offers: [
          "Upper respiratory infections",
          "Sinusitis",
          "Urinary tract infections",
          "Mild asthma exacerbations",
          "Bronchitis",
        ],
        why:
          "Quick access to a physician can prevent unnecessary urgent care or emergency room visits. This service offers convenience without compromising medical standards—ensuring patients receive thoughtful, appropriate care for issues that can safely be managed virtually.",
        who:
          "This service is ideal for individuals seeking prompt medical attention for common, non-emergency concerns who value physician-led care, clear communication, and efficiency—without the burden of travel or long waiting rooms.",
        note:
          "Not provided: pain management, ADHD care, or controlled substances. Availability: appointments typically available within 24–48 hours. Visit fee: $59 flat rate.",
        image: "urgent-care.png",
      }),
  },
];

for (const page of pages) {
  const directory = page.path.includes("/") ? page.path.slice(0, page.path.lastIndexOf("/")) : ".";
  mkdirSync(directory, { recursive: true });
  writeFileSync(page.path, renderDocument(page), "utf8");
}

function renderDocument(page) {
  const depth = page.path === "index.html" ? 0 : page.path.split("/").length - 2;
  const assetPrefix = depth === 0 ? "" : "../".repeat(depth);
  const body = page.render(assetPrefix);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="icon" href="${assetPrefix}assets/site/logo.png">
  <link rel="stylesheet" href="${assetPrefix}styles.css">
</head>
<body>
  <div class="site-shell">
    ${renderHeader(assetPrefix, page.active)}
    <main>${body}</main>
    ${renderFooter(assetPrefix)}
  </div>
  <script src="${assetPrefix}script.js" defer></script>
</body>
</html>`;
}

function renderHeader(assetPrefix, active) {
  const links = navigation
    .map(
      (item) =>
        `<a href="${toRelative(assetPrefix, item.href)}" class="${active === item.href ? "is-active" : ""}">${item.label}</a>`
    )
    .join("");

  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${toRelative(assetPrefix, "/")}"><img src="${assetPrefix}assets/site/logo.png" alt="Paradigm by DW Medical"></a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span></button>
      <nav class="site-nav" data-nav>${links}</nav>
      <div class="header-cta"><a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Book a Discovery Call</a></div>
    </div>
  </header>`;
}

function renderFooter(assetPrefix) {
  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-panel footer-brand">
          <img src="${assetPrefix}assets/site/logo.png" alt="Paradigm by DW Medical">
          <p>Paradigm by DW Medical is a physician-led, direct-pay telemedicine practice. Insurance is not billed. Care is provided via secure platforms in accordance with applicable licensure and telemedicine regulations.</p>
          <p><a class="btn btn-secondary" href="${bookingUrl}" target="_blank" rel="noopener">Schedule a Discovery Call</a></p>
        </div>
        <div class="footer-panel">
          <h3>Navigate</h3>
          <ul class="footer-links">
            <li><a href="${toRelative(assetPrefix, "/")}">Home</a></li>
            <li><a href="${toRelative(assetPrefix, "/services/")}">Services</a></li>
            <li><a href="${toRelative(assetPrefix, "/about/")}">Our Philosophy</a></li>
            <li><a href="${toRelative(assetPrefix, "/dr-wallis/")}">Doctors</a></li>
            <li><a href="${toRelative(assetPrefix, "/services/")}">Fees/Insurance</a></li>
          </ul>
        </div>
        <div class="footer-panel">
          <h3>Contact Us</h3>
          <ul class="contact-list">
            <li><a href="mailto:admin@paradigmbydw.com">admin@paradigmbydw.com</a></li>
            <li><a href="tel:+15715825870">+1 (571) 582-5870</a></li>
            <li>7918 Jones Branch Dr, 4th Floor #274, Mclean VA 22102</li>
            <li>Visits are conducted virtually by appointment. This is not a physical location.</li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="${tebraPolicyUrl}" target="_blank" rel="noopener">Tebra Privacy Policy</a></li>
            <li><a href="${hipaaUrl}" target="_blank" rel="noopener">Notice of Privacy Practices for Protected Health Information</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <small>©2025 LW Medical. All rights reserved. Paradigm by DW Medical is a service of DW Medical, LLC</small>
      </div>
    </div>
  </footer>`;
}

function renderHome(assetPrefix) {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy reveal">
          <span class="eyebrow">Welcome to</span>
          <h1 aria-label="Welcome to Paradigm by DW Medical"><span>Paradigm</span><br>by DW Medical</h1>
          <p class="lead">Physician Led Weight Management, Preventive Care and Women’s Health.</p>
          <p class="lead">Thoughtful, patient medicine for women who want clarity, continuity, and expertise; serving Maryland, Virginia, and DC.</p>
          <p class="lead">Concierge telemedicine led by Dr. Denise D. Wallis, MD, FAAFP, a board-certified family physician with over 25 years of experience.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Schedule a Discovery Call</a>
            <a class="btn btn-ghost" href="#approach">Explore My Approach</a>
          </div>
          <div class="metrics">
            <div class="metric"><strong>98%</strong><span>Patient Satisfaction Rate</span></div>
            <div class="metric"><strong>4.6/5</strong><span>Average Rating Given by Our Clients</span></div>
            <div class="metric"><strong>95%</strong><span>Satisfaction with Telemedicine Services</span></div>
          </div>
        </div>
        <div class="hero-visual reveal">
          <img src="${assetPrefix}assets/site/doctor.jpeg" alt="Dr. Denise D. Wallis">
        </div>
      </div>
    </section>

    <section class="section" id="approach">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Personalized. Evidence-Based. Physician-Led.</span>
          <h2>What Makes This Practice Different</h2>
        </div>
        <div class="feature-grid">
          ${[
            "Physician-led care – You work directly with an experienced MD.",
            "Time and continuity – Longer visits and thoughtful follow-up.",
            "Evidence-based medicine – No trends, no algorithms, no rushed decisions.",
            "Whole-person perspective – Symptoms are evaluated in context, not isolation.",
            "Internationally informed – Care for U.S. and globally mobile patients.",
          ]
            .map((item) => `<article class="feature-card reveal"><h3>${item.split(" – ")[0]}</h3><p>${item}</p></article>`)
            .join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Core Areas of Care.</span>
          <h2>Get the Support You Need, When You Need It</h2>
          <p>Paradigm by DW Medical is a direct-pay practice. Insurance is not billed, allowing care decisions to remain focused on medical appropriateness.</p>
        </div>
        <div class="service-grid">
          ${serviceCards
            .map(
              (card) => `<article class="service-card reveal">
                <img src="${assetPrefix}assets/site/${card.image}" alt="${card.title}">
                <div>
                  <h3>${card.title}</h3>
                  <p>${card.text}</p>
                  <p style="margin-top:1rem"><a class="text-link" href="${toRelative(assetPrefix, card.href)}">View Services</a></p>
                </div>
              </article>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">The Process</span>
          <h2>How It Works</h2>
        </div>
        <div class="process-grid">
          ${[
            "Complimentary discovery call to ensure alignment",
            "Comprehensive virtual consultation with record review",
            "Personalized care plan with follow-up as appropriate",
          ]
            .map(
              (step, index) => `<article class="process-card reveal"><strong>${index + 1}</strong><h3>${step}</h3><p>Each stage is designed to create clarity, continuity, and physician-led follow-through.</p></article>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split-grid">
        <div class="panel-image reveal">
          <img src="${assetPrefix}assets/site/about-telemedicine.png" alt="Telemedicine care">
        </div>
        <div class="reveal">
          <div class="section-head">
            <span class="eyebrow">Meet Dr. Wallis</span>
            <h2>Dr. Denise D. Wallis, MD</h2>
            <p>Board-Certified in Family Medicine | 25+ Years of Experience</p>
          </div>
          <p class="lead">Dr. Wallis brings a broad, culturally informed perspective to modern medical care. She is known for her exceptional listening skills and her ability to synthesize complex medical information into clear, actionable guidance.</p>
          <p class="lead">Through Paradigm by DW Medical, Dr. Wallis provides physician-led concierge telemedicine focused on menopause and women’s health, longevity and preventive care, weight and metabolic health, and medical second opinions for patients in the U.S. and internationally.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${toRelative(assetPrefix, "/dr-wallis/")}">Doctors</a>
            <a class="btn btn-secondary" href="${bookingUrl}" target="_blank" rel="noopener">Book with Tebra</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAbout(assetPrefix) {
  return `
    <section class="page-hero">
      <div class="container split-grid">
        <div class="reveal page-copy">
          <div class="breadcrumbs"><a href="${toRelative(assetPrefix, "/")}">Home</a><span>/</span><span>About us</span></div>
          <h1>Quality healthcare should be accessible, personal, and convenient.</h1>
          <p class="lead">We are committed to building long-term, trusting relationships with every patient.</p>
          <p>As a bilingual, telemedicine-focused practice serving Washington D.C., Virginia, and Maryland, we provide patient-centered care that meets people where they are — literally. Our virtual model removes barriers like travel, insurance restrictions, and long wait times, allowing patients to receive compassionate, comprehensive medical attention from the comfort of their home.</p>
        </div>
        <div class="panel-image reveal">
          <img src="${assetPrefix}assets/site/about-virtual.png" alt="Virtual patient-centered care">
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container detail-grid">
        <article class="detail-card reveal">
          <h3>Who we are</h3>
          <p>By operating as a direct-pay practice, we prioritize transparency and dedicated time with each individual, free from the limitations of traditional insurance-based systems.</p>
        </article>
        <article class="detail-card reveal">
          <h3>Contact us</h3>
          <p>Questions before scheduling? Start with a discovery call and we will help determine whether this model is the right fit.</p>
          <p style="margin-top:1rem"><a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Book with Tebra</a></p>
        </article>
      </div>
    </section>
  `;
}

function renderDoctor(assetPrefix) {
  return `
    <section class="page-hero">
      <div class="container doctor-layout">
        <div class="doctor-portrait reveal">
          <img src="${assetPrefix}assets/site/doctor.jpeg" alt="Dr. Denise D. Wallis">
        </div>
        <div class="doctor-copy reveal">
          <h1>Dr. Denise D. Wallis, MD</h1>
          <p class="lead">Board-Certified in Family Medicine | 25+ Years of Experience</p>
          <p>Hi, I’m Dr. Denise Wallis—a board-certified Family Medicine physician with over 25 years of clinical experience. I’ve spent my career helping people feel better, think more clearly, and live more fully—with care that’s grounded in science and built around real relationships.</p>
          <p>I have a particular passion for treating obesity, women’s health, and longevity medicine. In fact, I’ve been integrating longevity and preventive strategies into my practice long before they became buzzwords. To me, it’s not just about adding years to life—but helping you feel energized, clear-headed, and empowered along the way.</p>
          <p>What sets me apart isn’t just experience—it’s how I use it. I'm known for being a deep listener—someone who takes the time to really hear what you're saying, and what might be going unsaid. This is not a one-size-fits-all model. I partner with you, taking your preferences, history, and goals into account—while staying firmly rooted in evidence-based medicine.</p>
          <p>My strength lies in diagnostic thinking—especially when things don’t fit into neat boxes. I’m particularly adept at pulling together clues from across specialties and organ systems to uncover the bigger picture. Many health problems are complex and interconnected—and I’ve built a career around finding clarity in that complexity.</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container detail-grid">
        <article class="detail-card reveal">
          <h3>What to Expect:</h3>
          <ul class="pill-list">
            <li>Time to actually talk through what’s going on</li>
            <li>A thoughtful plan tailored to your unique biology and goals</li>
            <li>Clear guidance based on science—not hype</li>
            <li>Virtual, concierge-style care—no insurance hassles, no rushed visits</li>
          </ul>
        </article>
        <article class="detail-card reveal">
          <h3>Content</h3>
          <p>I founded this practice to offer something better. Whether you’re navigating hormonal shifts, trying to lose weight sustainably, or optimizing your long-term health, I’m here to partner with you every step of the way.</p>
          <p style="margin-top:1rem"><a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Schedule a Discovery Call</a></p>
        </article>
      </div>
    </section>
  `;
}

function renderServices(assetPrefix) {
  return `
    <section class="page-hero">
      <div class="container split-grid">
        <div class="reveal">
          <div class="breadcrumbs"><a href="${toRelative(assetPrefix, "/")}">Home</a><span>/</span><span>Our Services</span></div>
          <h1>Healthcare Services Tailored to You</h1>
          <p class="lead">Paradigm by DW Medical provides physician-led concierge telemedicine for adults seeking thoughtful, comprehensive medical care. Services are intentionally focused to ensure depth, continuity, and clinical integrity.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Book with Tebra</a>
          </div>
        </div>
        <div class="panel-image reveal">
          <img src="${assetPrefix}assets/site/services-overview.png" alt="Healthcare services overview">
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container service-grid">
        ${serviceCards
          .map(
            (card) => `<article class="service-card reveal">
              <img src="${assetPrefix}assets/site/${card.image}" alt="${card.title}">
              <div>
                <h3>${card.title}</h3>
                <p>${card.text}</p>
                <p style="margin-top:1rem"><a class="text-link" href="${toRelative(assetPrefix, card.href)}">Learn More</a></p>
              </div>
            </article>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderServiceDetail(service) {
  return (assetPrefix) => `
    <section class="page-hero">
      <div class="container split-grid">
        <div class="reveal">
          <div class="breadcrumbs"><a href="${toRelative(assetPrefix, "/services/")}">Services</a><span>/</span><span>${service.breadcrumb}</span></div>
          <h2>${service.title}</h2>
          <p class="lead">${service.kicker}</p>
          <p>${service.description}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Schedule Call</a>
          </div>
        </div>
        <div class="service-hero-card reveal">
          <img src="${assetPrefix}assets/site/${service.image}" alt="${service.title}">
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container detail-grid">
        <article class="detail-card reveal">
          <h3>What We Offer</h3>
          <ul class="pill-list">${service.offers.map((item) => `<li>${item}</li>`).join("")}</ul>
          <p style="margin-top:1rem">${service.note}</p>
        </article>
        <article class="detail-card reveal">
          <h3>Why It Matters</h3>
          <p>${service.why}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="container detail-grid">
        <article class="detail-card reveal">
          <h3>Who It’s For</h3>
          <p>${service.who}</p>
        </article>
        <article class="detail-card reveal">
          <h3>Schedule a Discovery Call</h3>
          <p>A discovery call is a brief, complimentary conversation designed to ensure alignment before scheduling a medical visit.</p>
          <ul class="bullet-list" style="margin-top:1rem">
            <li>Clarify your goals and concerns</li>
            <li>Review whether your needs fall within the scope of this practice</li>
            <li>Determine whether this approach to care is the right fit</li>
          </ul>
          <p style="margin-top:1rem">This is not a medical visit and no diagnoses or prescriptions are provided during this call.</p>
          <p style="margin-top:1rem"><a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener">Schedule a Discovery Call</a></p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="banner reveal">
          <h3>More services</h3>
          <div class="service-grid">
            ${serviceCards
              .filter((card) => card.title !== service.title && !card.title.startsWith(service.title))
              .slice(0, 4)
              .map(
                (card) => `<article class="service-card">
                  <img src="${assetPrefix}assets/site/${card.image}" alt="${card.title}">
                  <div>
                    <h3>${card.title}</h3>
                    <p>${card.text}</p>
                    <p style="margin-top:1rem"><a class="text-link" href="${toRelative(assetPrefix, card.href)}">View Services</a></p>
                  </div>
                </article>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function toRelative(assetPrefix, href) {
  if (href.startsWith("http")) return href;
  const normalized = href === "/" ? "index.html" : `${href.replace(/^\//, "")}index.html`;
  return `${assetPrefix}${normalized}`;
}
