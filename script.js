/* ==========================================================================
   ویرایش محتوا فقط همینجاست — بقیه فایل‌ها رو لازم نیست دست بزنی.
   برای هر لینک، یکی از آیکون‌های موجود در ICONS رو انتخاب کن یا خودت
   یه SVG جدید به ICONS اضافه کن.
   ========================================================================== */

const CONFIG = {
  name: "رسا",
  status: "ONLINE",

  // یک آواتار متنی (حرف اول اسم) به‌صورت پیش‌فرض نشون داده می‌شه.
  // اگه عکس داری، مسیرش رو اینجا بذار — مثلاً "assets/avatar.jpg"
  avatarImage: null,
  avatarInitial: "ر",

  bio: "توسعه‌دهنده فول‌استک — وب، موبایل و دسکتاپ. کار روی ابزارهای ارتباطی امن و اپلیکیشن‌های بلادرنگ.",

  links: [
    { label: "گیت‌هاب",     url: "https://github.com/username",   icon: "github"   },
    { label: "تلگرام",      url: "https://t.me/username",         icon: "telegram" },
    { label: "دارک‌هت",     url: "https://qrasa.xyz",             icon: "shield"   },
    { label: "ایمیل",       url: "mailto:you@example.com",        icon: "mail"     },
    { label: "اینستاگرام",  url: "https://instagram.com/username",icon: "instagram"},
  ],
};

/* ==========================================================================
   آیکون‌ها — SVG ساده و سبک، بدون وابستگی به کتابخانه خارجی
   ========================================================================== */

const ICONS = {
  github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4 3 11.5l6 2M21 4l-3.5 16-7.5-6M21 4 9.5 13.5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/><path d="M9.5 12l1.8 1.8L15 10"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>`,
};

/* ==========================================================================
   رندر محتوا
   ========================================================================== */

function renderProfile(){
  document.getElementById("name").textContent = CONFIG.name;
  document.getElementById("statusText").textContent = CONFIG.status;
  document.getElementById("year").textContent = new Date().getFullYear();
  // متن بیو عمداً اینجا پر نمی‌شه — playIntro با افکت تایپ پرش می‌کنه

  const avatar = document.getElementById("avatar");
  if (CONFIG.avatarImage) {
    const img = document.createElement("img");
    img.src = CONFIG.avatarImage;
    img.alt = CONFIG.name;
    avatar.appendChild(img);
  } else {
    avatar.textContent = CONFIG.avatarInitial;
  }
}

function renderLinks(){
  const wrap = document.getElementById("links");
  CONFIG.links.forEach((item) => {
    const a = document.createElement("a");
    a.className = "link-row";
    a.href = item.url;
    if (!item.url.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    const icon = document.createElement("span");
    icon.className = "link-icon";
    icon.innerHTML = ICONS[item.icon] || ICONS.link;

    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = item.label;

    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "←";

    a.append(icon, label, arrow);
    wrap.appendChild(a);
  });
}

/* ==========================================================================
   انیمیشن ورود صفحه (GSAP)
   ========================================================================== */

function playIntro(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const linkRows = document.querySelectorAll(".link-row");
  const bioEl = document.getElementById("bio");

  if (reduceMotion) {
    bioEl.textContent = CONFIG.bio;
    gsap.set([".avatar-wrap", ".name", ".status-line", ".bio", ".link-row", ".footer"], { opacity: 1, y: 0 });
    gsap.set(".signal-bars span", { scaleY: 0.6 });
    return;
  }

  // خطوط بوت قبل از نمایش پروفایل
  const bootLines = [
    "> initializing secure session...",
    "> handshake ok <span class=\"ok\">✓</span>",
  ];
  const bootEl = document.getElementById("boot");
  bootEl.innerHTML = bootLines.map(l => `<span class="line">${l}</span>`).join("");
  const lineEls = bootEl.querySelectorAll(".line");

  gsap.set([".avatar-wrap", ".name", ".status-line", ".footer"], { opacity: 0, y: 14 });
  gsap.set(".bio", { opacity: 1 });
  gsap.set(linkRows, { opacity: 0, y: 16, filter: "blur(4px)" });
  gsap.set(".avatar-ring", { rotate: 0, transformOrigin: "50% 50%" });
  gsap.set(".cursor-glow", { opacity: 0 });

  const typer = { n: 0 };

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: () => {
      startAmbientLoops();
      enableCardTilt();
      enableCursorGlow();
      enableMagneticLinks();
    },
  });

  gsap.set(".avatar-wrap", { scale: 0.6 });

  tl.to(lineEls, { opacity: 1, duration: 0.25, stagger: 0.35 })
    .to(bootEl, { opacity: 0, duration: 0.3, delay: 0.25 })
    .to(".avatar-wrap", { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)" }, "-=0.1")
    .to(".name", { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
    .to(".status-line", { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
    .to(typer, {
      n: CONFIG.bio.length,
      duration: Math.min(1.4, CONFIG.bio.length * 0.028),
      ease: "none",
      onUpdate: () => { bioEl.textContent = CONFIG.bio.slice(0, Math.round(typer.n)); },
    }, "-=0.1")
    .to(linkRows, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.08, ease: "power3.out" }, "-=0.2")
    .to(".footer", { opacity: 1, y: 0, duration: 0.4 }, "-=0.15")
    .to(".signal-bars span", { scaleY: 0.6, duration: 0.3, stagger: 0.06, ease: "power2.out" }, "-=0.2");
}

/* ==========================================================================
   انیمیشن‌های دائمی و بی‌درنگ (بعد از اتمام ورود)
   ========================================================================== */

function startAmbientLoops(){
  // چرخش دائمی حلقه رادار دور آواتار
  gsap.to(".avatar-ring", { rotate: 360, duration: 6, repeat: -1, ease: "none" });

  // نفس‌کشیدن آروم آواتار
  gsap.to(".avatar", { scale: 1.035, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

  // نوار سیگنال فوتر مثل یه میتر زنده بالا پایین می‌شه
  document.querySelectorAll(".signal-bars span").forEach((bar, i) => {
    gsap.to(bar, {
      scaleY: () => gsap.utils.random(0.35, 1),
      duration: () => gsap.utils.random(0.6, 1.3),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.15,
    });
  });

  spawnParticles();
}

function spawnParticles(){
  const wrap = document.getElementById("particles");
  const count = window.innerWidth < 480 ? 10 : 18;

  for (let i = 0; i < count; i++){
    const p = document.createElement("span");
    p.className = "particle" + (i % 3 === 0 ? " is-green" : "");
    const startX = gsap.utils.random(0, window.innerWidth);
    const startY = gsap.utils.random(0, window.innerHeight);
    gsap.set(p, { left: startX, top: startY, opacity: gsap.utils.random(0.15, 0.45) });
    wrap.appendChild(p);

    gsap.to(p, {
      x: () => gsap.utils.random(-60, 60),
      y: () => gsap.utils.random(-90, -30),
      duration: () => gsap.utils.random(6, 12),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 4),
    });
  }
}

/* لکه‌ی نور که دنبال موس روی صفحه حرکت می‌کنه */
function enableCursorGlow(){
  const glow = document.getElementById("cursorGlow");
  if (window.matchMedia("(hover: none)").matches) return;

  const moveX = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" });
  const moveY = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" });

  window.addEventListener("pointermove", (e) => {
    gsap.to(glow, { opacity: 1, duration: 0.3, overwrite: "auto" });
    moveX(e.clientX);
    moveY(e.clientY);
  });
  window.addEventListener("pointerleave", () => gsap.to(glow, { opacity: 0, duration: 0.4 }));
}

/* تیلت سه‌بعدی ملایم روی کارت، دنبال موقعیت موس */
function enableCardTilt(){
  if (window.matchMedia("(hover: none)").matches) return;
  const card = document.getElementById("card");

  const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3.out" });
  const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3.out" });

  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY(px * 6);
    rotateX(py * -6);
  });
  card.addEventListener("mouseleave", () => {
    rotateX(0);
    rotateY(0);
  });
}

/* افکت مغناطیسی: آیکون و فلش هر لینک کمی به‌سمت موس کشیده می‌شن */
function enableMagneticLinks(){
  if (window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll(".link-row").forEach((row) => {
    const icon = row.querySelector(".link-icon");
    const arrow = row.querySelector(".link-arrow");

    const moveIconX = gsap.quickTo(icon, "x", { duration: 0.35, ease: "power3.out" });
    const moveIconY = gsap.quickTo(icon, "y", { duration: 0.35, ease: "power3.out" });
    const moveArrowX = gsap.quickTo(arrow, "x", { duration: 0.35, ease: "power3.out" });

    row.addEventListener("mousemove", (e) => {
      const r = row.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      moveIconX(px * 8);
      moveIconY(py * 8);
      moveArrowX(px * 6 - 4);
    });
    row.addEventListener("mouseleave", () => {
      moveIconX(0);
      moveIconY(0);
      moveArrowX(0);
    });
    row.addEventListener("mousedown", () => gsap.to(row, { scale: 0.97, duration: 0.12 }));
    row.addEventListener("mouseup", () => gsap.to(row, { scale: 1, duration: 0.25, ease: "back.out(2)" }));
  });
}

/* ==========================================================================
   شروع
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderLinks();
  playIntro();
});
