(function () {
  "use strict";

  const I18N = {
    en: {
      "banner-title": "Wedding Digital Invitation Packs",
      "tier1-name": "Essentials",
      "tier1-regular": "regular: $350",
      "tier2-name": "Animated Invite",
      "tier2-regular": "regular: $550",
      "tier3-name": "Full Invite Experience",
      "tier3-regular": "regular: $850",
      "i-design": "Top tier visual personalized design.",
      "i-sections": "Up to 7 sections.",
      "i-links": "All needed external links.",
      "i-rsvp-email": "RSVPs with simple email notifications.",
      "i-animation": "Interactive animations (envelope opening or video background).",
      "i-rsvp-personal": "RSVPs with personalized individual invitation links.",
      "i-auto-send": "Automatic invite sending.",
      "i-portal": "RSVP management portal.",
      "lang-note": "Need it in more than one language? Add $50 to any package to include a second language.",
      "footer-note": "Quote prepared for your review — pricing valid for a limited time.",
      "btn-sms": "Text us"
    },
    es: {
      "banner-title": "Paquetes de Invitación Digital para Boda",
      "tier1-name": "Esenciales",
      "tier1-regular": "precio regular: $350",
      "tier2-name": "Invitación Animada",
      "tier2-regular": "precio regular: $550",
      "tier3-name": "Experiencia Completa de Invitación",
      "tier3-regular": "precio regular: $850",
      "i-design": "Diseño visual personalizado de primer nivel.",
      "i-sections": "Hasta 7 secciones.",
      "i-links": "Todos los enlaces externos necesarios.",
      "i-rsvp-email": "Confirmaciones de asistencia con notificaciones simples por correo.",
      "i-animation": "Animaciones interactivas (apertura de sobre o fondo en video).",
      "i-rsvp-personal": "Confirmaciones de asistencia con enlaces individuales personalizados.",
      "i-auto-send": "Envío automático de invitaciones.",
      "i-portal": "Portal de gestión de confirmaciones.",
      "lang-note": "¿Necesitas más de un idioma? Agrega $50 a cualquier paquete para incluir un segundo idioma.",
      "footer-note": "Cotización preparada para tu revisión — precios válidos por tiempo limitado.",
      "btn-sms": "Enviar SMS"
    }
  };

  const TOOLTIPS = {
    en: {
      "t-essentials": "The core invite: a page designed around your names and details for every guest, everything they need to see the event and RSVP. No animation, no automation, just a clean personal invite.",
      "t-animated": "Everything in Essentials, plus a signature opening moment: an animated envelope reveal or a full motion background, so the invite makes an impression the second it opens.",
      "t-full": "The complete system: each guest gets their own link, invites go out automatically, and you get a live portal to track RSVPs and seat counts as they come in.",
      "i-design": "Every page is designed around your names, colors, and photos, not a generic template. Each guest opens something made to feel personal to them.",
      "i-sections": "Room for everything guests need to know: welcome message, event details, schedule, venue and map, dress code, registry, and RSVP, laid out as clear sections on one page.",
      "i-links": "Direct links out to wherever you're sending people: your registry, hotel block, map directions, or a wedding website.",
      "i-rsvp-email": "The moment a guest submits their RSVP, you get an email right away, so nothing sits unseen in a form you have to remember to check.",
      "i-animation": "An opening animation, like a virtual envelope unsealing, or a subtle looping video behind the page, gives the invite a moment of delight most digital invites skip.",
      "i-rsvp-personal": "Each guest opens their own unique link with their name and their allowed number of seats already filled in, so there's no guessing or repeated data entry.",
      "i-auto-send": "Once your guest list is ready, invites go out to everyone by email or text automatically, no manual copy-pasting a link one by one.",
      "i-portal": "A private dashboard where you see every guest's RSVP status and confirmed seat counts, and can spot at a glance who still hasn't responded."
    },
    es: {
      "t-essentials": "La invitación esencial: una página diseñada con los nombres y datos de cada invitado, con todo lo necesario para ver el evento y confirmar asistencia. Sin animación, sin automatización, solo una invitación personal y limpia.",
      "t-animated": "Todo lo de Esenciales, más un momento de apertura especial: la animación de un sobre que se abre o un fondo en movimiento, para que la invitación impresione desde el primer segundo.",
      "t-full": "El sistema completo: cada invitado recibe su propio enlace, las invitaciones se envían automáticamente, y tú tienes un portal en vivo para ver confirmaciones y número de asientos conforme van llegando.",
      "i-design": "Cada página se diseña alrededor de sus nombres, colores y fotos, no una plantilla genérica. Cada invitado abre algo hecho para sentirse personal.",
      "i-sections": "Espacio para todo lo que los invitados necesitan saber: mensaje de bienvenida, detalles del evento, itinerario, sede y mapa, código de vestimenta, mesa de regalos y confirmación, todo organizado en secciones claras en una sola página.",
      "i-links": "Enlaces directos a donde necesites mandar a tus invitados: mesa de regalos, bloque de hotel, indicaciones en mapa o un sitio web de la boda.",
      "i-rsvp-email": "En cuanto un invitado confirma su asistencia, te llega un correo al instante, para que nada se quede sin ver en un formulario que tengas que revisar manualmente.",
      "i-animation": "Una animación de apertura, como un sobre virtual que se desella, o un video en bucle de fondo, le da a la invitación un momento especial que la mayoría de las invitaciones digitales no tienen.",
      "i-rsvp-personal": "Cada invitado abre su propio enlace único, ya con su nombre y su número de asientos permitido, sin necesidad de adivinar ni de capturar datos otra vez.",
      "i-auto-send": "Una vez lista tu lista de invitados, las invitaciones se envían a todos por correo o mensaje de texto de forma automática, sin copiar y pegar un enlace uno por uno.",
      "i-portal": "Un panel privado donde ves el estatus de confirmación y los asientos confirmados de cada invitado, y detectas de un vistazo quién todavía no ha respondido."
    }
  };

  let currentLang = "en";

  function initApp() {
    const langSwitch = document.getElementById("langSwitch");

    function applyLanguage(lang) {
      if (!I18N[lang]) return;
      currentLang = lang;
      document.documentElement.lang = lang;

      // Update toggle attribute to slide the switch position
      if (langSwitch) {
        langSwitch.setAttribute("data-lang", lang);
      }

      // Update all translatable elements on the page
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        if (I18N[lang][key]) el.textContent = I18N[lang][key];
      });

      try { localStorage.setItem("quoteLang", lang); } catch (e) {}
      closeTooltip();
    }

    if (langSwitch) {
      langSwitch.addEventListener("click", function () {
        var nextLang = currentLang === "en" ? "es" : "en";
        applyLanguage(nextLang);
      });
    }

    // --- Tooltip logic ---
    var tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.hidden = true;
    document.body.appendChild(tooltip);

    var activeTrigger = null;

    function closeTooltip() {
      tooltip.hidden = true;
      if (activeTrigger) {
        activeTrigger.setAttribute("aria-expanded", "false");
        activeTrigger = null;
      }
    }

    function openTooltip(trigger) {
      var key = trigger.getAttribute("data-tip");
      var text = TOOLTIPS[currentLang][key];
      if (!text) return;

      tooltip.textContent = text;
      tooltip.hidden = false;

      var rect = trigger.getBoundingClientRect();
      var margin = 12;
      var maxWidth = Math.min(320, window.innerWidth - margin * 2);
      tooltip.style.maxWidth = maxWidth + "px";

      var tipRect = tooltip.getBoundingClientRect();
      var left = rect.left;
      if (left + tipRect.width > window.innerWidth - margin) {
        left = window.innerWidth - tipRect.width - margin;
      }
      if (left < margin) left = margin;

      var top = rect.bottom + 8;
      var placeAbove = false;
      if (top + tipRect.height > window.innerHeight - margin) {
        top = rect.top - tipRect.height - 8;
        placeAbove = true;
      }

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
      tooltip.classList.toggle("tooltip--above", placeAbove);

      trigger.setAttribute("aria-expanded", "true");
      activeTrigger = trigger;
    }

    function toggleTooltip(trigger) {
      if (activeTrigger === trigger) {
        closeTooltip();
        return;
      }
      if (activeTrigger) {
        activeTrigger.setAttribute("aria-expanded", "false");
      }
      openTooltip(trigger);
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest("#langSwitch")) return;
      var trigger = e.target.closest("[data-tip]");
      if (trigger) {
        toggleTooltip(trigger);
        return;
      }
      if (!e.target.closest(".tooltip")) {
        closeTooltip();
      }
    });

    document.addEventListener("keydown", function (e) {
      var trigger = e.target.closest("[data-tip]");
      if (trigger && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        toggleTooltip(trigger);
      }
      if (e.key === "Escape") {
        closeTooltip();
      }
    });

    window.addEventListener("scroll", closeTooltip, { passive: true });
    window.addEventListener("resize", closeTooltip);

    // Load saved language preference if any
    var savedLang = null;
    try { savedLang = localStorage.getItem("quoteLang"); } catch (e) {}
    if (savedLang && I18N[savedLang]) {
      applyLanguage(savedLang);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();