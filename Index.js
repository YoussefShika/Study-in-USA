/* index.js — Premium multi-language + FormSubmit AJAX + CSV download */

// ----------------- CONFIG -----------------
// Put your email here (FormSubmit AJAX endpoint)
const FORM_EMAIL = "youssefwhatsapp177@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(FORM_EMAIL)}`;
// ------------------------------------------

// Simple translations (Arabic, English, French)
const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    hero_title: "✈️ ادرس في أمريكا مع أفضل الجامعات",
    hero_sub: "فرص حقيقية للدراسة بالخارج مع دعم كامل من البداية للنهاية",
    apply_now: "قدّم الآن",
    download_brochure: "تحميل نبذة",
    why_title: "🎓 لماذا الدراسة في أمريكا؟",
    card1_title: "جودة تعليم عالمية", card1_txt: "جامعات مرموقة، أبحاث متقدمة، وبيئة تطور مهاراتك.",
    card2_title: "فرص تدريب وعمل", card2_txt: "CPT/OPT وفرص للعمل بعد التخرج تعتمد على التخصص.",
    card3_title: "تعلم الإنجليزية", card3_txt: "بيئة لغوية أصلية تعزز مهاراتك وتفتح الفرص.",
    card4_title: "شبكة علاقات دولية", card4_txt: "تواصل مع طلاب ومحترفين من كل أنحاء العالم.",
    about_title: "📌 عن المبادرة", about_txt: "هذه المبادرة مقدمة لمساعدة الطلاب الطموحين... صاحب الفكرة والمسؤول عنها هو شيكا باشا.",
    form_title: "نموذج التقديم",
    label_name: "الاسم الكامل", label_email: "البريد الإلكتروني", label_phone: "رقم الهاتف",
    label_country: "الدولة الحالية", label_field: "التخصص / المجال", label_message: "رسالتك / سبب رغبتك",
    send: "إرسال الطلب", download_csv: "تحميل CSV",
    download_brochure: "تحميل نبذة",
    privacy_note: "بإرسالك، ستتلقى منا تواصلًا عبر البريد الإلكتروني حول طلبك."
  },
  en: {
    dir: "ltr",
    hero_title: "✈️ Study in the USA with top universities",
    hero_sub: "Real opportunities with full support from application to arrival",
    apply_now: "Apply Now",
    download_brochure: "Download Brochure",
    why_title: "🎓 Why study in the USA?",
    card1_title: "World-class education", card1_txt: "Top-ranked universities, advanced research, professional growth.",
    card2_title: "Internships & jobs", card2_txt: "Practical training opportunities (CPT/OPT) and career support.",
    card3_title: "Language immersion", card3_txt: "Learn English in a native environment for career gain.",
    card4_title: "Global network", card4_txt: "Connect with international students and professionals.",
    about_title: "📌 About the initiative", about_txt: "A program to help ambitious students reach top US universities. Founder: Shika Basha.",
    form_title: "Application Form",
    label_name: "Full name", label_email: "Email address", label_phone: "Phone number",
    label_country: "Current country", label_field: "Field / Major", label_message: "Your message / motivation",
    send: "Send Application", download_csv: "Download CSV", download_brochure: "Download Brochure",
    privacy_note: "By submitting you agree to be contacted by email regarding your application."
  },
  fr: {
    dir: "ltr",
    hero_title: "✈️ Étudiez aux USA avec les meilleures universités",
    hero_sub: "Opportunités réelles avec un accompagnement complet du début à la fin",
    apply_now: "Postuler",
    download_brochure: "Télécharger la brochure",
    why_title: "🎓 Pourquoi étudier aux USA ?",
    card1_title: "Éducation de classe mondiale", card1_txt: "Universités de renom, recherche avancée.",
    card2_title: "Stages & emplois", card2_txt: "Opportunités pratiques et soutien à la carrière.",
    card3_title: "Immersion linguistique", card3_txt: "Apprenez l'anglais en milieu natif.",
    card4_title: "Réseau international", card4_txt: "Connectez-vous avec des étudiants du monde entier.",
    about_title: "📌 À propos de l'initiative", about_txt: "Programme pour aider les étudiants ambitieux. Fondateur : Shika Basha.",
    form_title: "Formulaire de candidature",
    label_name: "Nom complet", label_email: "Email", label_phone: "Téléphone",
    label_country: "Pays actuel", label_field: "Spécialité / Domaine", label_message: "Votre message / motivation",
    send: "Envoyer la candidature", download_csv: "Télécharger CSV", download_brochure: "Télécharger la brochure",
    privacy_note: "En soumettant, vous acceptez d'être contacté par e-mail."
  }
};

// DOM refs
const els = {
  langBtns: document.querySelectorAll('.lang'),
  allI18n: document.querySelectorAll('[data-i18n]'),
  htmlEl: document.documentElement,
  openModal: document.getElementById('openModal'),
  modal: document.getElementById('applicationModal'),
  modalClose: document.querySelector('.modal-close'),
  form: document.getElementById('applyForm'),
  submitBtn: document.getElementById('submitBtn'),
  toast: document.getElementById('toast'),
  toastText: document.getElementById('toastText'),
  downloadCsv: document.getElementById('downloadCsv'),
  yearSpan: document.getElementById('year')
};

// set year
if (els.yearSpan) els.yearSpan.textContent = new Date().getFullYear();

// language switching
let currentLang = 'ar';
function setLanguage(lang){
  currentLang = lang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  // direction
  document.documentElement.lang = (lang==='ar')? 'ar' : 'en';
  document.documentElement.dir = t.dir || 'ltr';
  // translate all nodes
  document.querySelectorAll('[data-i18n]').forEach(node=>{
    const key = node.getAttribute('data-i18n');
    if (t[key]) node.textContent = t[key];
  });
  // update active button
  document.querySelectorAll('.lang').forEach(b=> b.classList.toggle('active', b.dataset.lang===lang));
}
document.querySelectorAll('.lang').forEach(b=>{
  b.addEventListener('click', ()=> setLanguage(b.dataset.lang));
});
// init lang
setLanguage('ar');

// Modal open/close
els.openModal?.addEventListener('click', ()=> {
  els.modal.classList.add('show'); els.modal.style.display='flex';
  // focus first input for accessibility
  setTimeout(()=> document.getElementById('name')?.focus(), 120);
});
els.modalClose?.addEventListener('click', ()=> { els.modal.classList.remove('show'); els.modal.style.display='none'; });
window.addEventListener('click', e=> { if(e.target === els.modal) { els.modal.classList.remove('show'); els.modal.style.display='none'; } });

// CSV download helper
function downloadCSV(obj, filename='application.csv') {
  const headers = Object.keys(obj).map(h => `"${h}"`).join(',');
  const values = Object.values(obj).map(v => `"${String(v||'').replace(/"/g,'""')}"`).join(',');
  const csv = headers + '\n' + values;
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

// form -> object
function formToObj(form){
  return Object.fromEntries(new FormData(form).entries());
}

// prevent double submissions
let submitting = false;

// handle CSV download
els.downloadCsv?.addEventListener('click', ()=>{
  const data = formToObj(els.form);
  downloadCSV(data, `application_${Date.now()}.csv`);
});

// Form submission via AJAX to FormSubmit
els.form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if (submitting) return;
  // simple validation
  if (!els.form.checkValidity()) {
    els.form.reportValidity(); return;
  }
  // honeypot
  if (els.form.querySelector('input[name="_honey"]')?.value) {
    console.warn('Spam blocked'); return;
  }

  submitting = true;
  const btn = document.getElementById('submitBtn');
  const oldText = btn.textContent;
  btn.textContent = TRANSLATIONS[currentLang].send || 'Sending...';
  btn.disabled = true;

  const fd = new FormData(els.form);
  // add source and timestamp
  fd.append('_submitted_from', window.location.hostname || 'local');
  fd.append('_submitted_at', new Date().toISOString());

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
        // show toast only now
        els.toast.hidden = false;
        els.toastText.textContent = 'تم استلام طلبك بنجاح';
        els.form.reset();
        setTimeout(()=> { els.toast.hidden = true; }, 5000);
      }
      
  } catch (err) {
    console.error(err);
    alert('فشل الاتصال. تأكد من اتصال الإنترنت أو جرّب لاحقًا.');
  } finally {
    submitting = false;
    btn.disabled = false;
    btn.textContent = oldText;
  }
});

// Accessibility: close modal with Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (els.modal && els.modal.classList.contains('show')) {
      els.modal.classList.remove('show'); els.modal.style.display='none';
    }
  }
});
