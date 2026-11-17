// Chat widget: talks to /api/chat, falls back to data/faq.json if the AI is unavailable.
(() => {
  const API_URL = '/api/chat';
  const DAILY_LIMIT = 25; // messages per visitor per day (client side)

  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const sendBtn = form.querySelector('button');
  const chips = document.getElementById('chat-chips');

  const history = []; // {role, content}
  let faq = null;
  let busy = false;

  fetch('data/faq.json').then((r) => r.json()).then((d) => { faq = d; }).catch(() => {});

  // ---------- helpers ----------
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function linkify(s) {
    return s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>')
      .replace(/(^|\s)((?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+)/g, (m, sp, url) =>
        `${sp}<a href="${url.startsWith('http') ? url : 'https://' + url}" target="_blank" rel="noopener">${url}</a>`);
  }

  // Minimal Markdown: paragraphs + "- " bullet lists + bold + links.
  function render(text) {
    const lines = escapeHtml(text).split('\n');
    let html = '', inList = false;
    for (const raw of lines) {
      const line = raw.trim();
      const bullet = line.match(/^[-*•]\s+(.*)/);
      if (bullet) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${linkify(bullet[1])}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (line) html += `<p>${linkify(line)}</p>`;
      }
    }
    if (inList) html += '</ul>';
    return html;
  }

  function addMessage(role, text) {
    const el = document.createElement('div');
    el.className = `msg msg-${role}`;
    el.innerHTML = role === 'user' ? `<p>${escapeHtml(text)}</p>` : render(text);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'msg msg-assistant typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

  function looksFrench(text) {
    const t = ' ' + normalize(text) + ' ';
    const frWords = [' tu ', ' vous ', ' quel', ' quoi ', ' est ', ' es ', ' tes ', ' vos ', ' le ', ' la ', ' les ', ' des ', ' et ', ' ton ', ' ta ', ' comment ', ' pourquoi ', ' bonjour ', ' salut ', ' parle', ' etudes ', ' outils '];
    return /[éèêàçùôî]/i.test(text) || frWords.some((w) => t.includes(w));
  }

  function faqAnswer(question) {
    const lang = looksFrench(question) ? 'fr' : 'en';
    if (!faq) {
      return lang === 'fr'
        ? "Je suis momentanément indisponible. Écrivez-moi à ulysse.vaufrey@gmail.com !"
        : "I'm briefly unavailable. Please email me at ulysse.vaufrey@gmail.com!";
    }
    const q = ' ' + normalize(question) + ' ';
    let best = null, bestScore = 0;
    for (const e of faq.entries) {
      let score = 0;
      for (const k of e.keywords) {
        const kw = normalize(k);
        if (q.includes(' ' + kw + ' ') || (kw.length > 4 && q.includes(kw))) score += kw.includes(' ') ? 2 : 1;
      }
      if (score > bestScore) { bestScore = score; best = e; }
    }
    return best ? best[lang] : faq.fallback[lang];
  }

  function underDailyLimit() {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const saved = JSON.parse(localStorage.getItem('chat-usage') || '{}');
      const count = saved.day === today ? saved.count : 0;
      if (count >= DAILY_LIMIT) return false;
      localStorage.setItem('chat-usage', JSON.stringify({ day: today, count: count + 1 }));
    } catch { /* storage unavailable: ignore */ }
    return true;
  }

  async function askAI() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const r = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const data = await r.json();
      if (!data.reply) throw new Error('empty');
      return data.reply;
    } finally {
      clearTimeout(timer);
    }
  }

  async function send(text) {
    text = text.trim().slice(0, 500);
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    input.value = '';
    chips.classList.add('hidden');

    addMessage('user', text);
    history.push({ role: 'user', content: text });
    const typing = addTyping();

    let reply;
    if (underDailyLimit()) {
      try {
        reply = await askAI();
      } catch (e) {
        console.info('[chat] AI unavailable, using FAQ fallback:', e.message);
        reply = faqAnswer(text);
      }
    } else {
      reply = faqAnswer(text);
    }

    typing.remove();
    addMessage('assistant', reply);
    history.push({ role: 'assistant', content: reply });
    busy = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // ---------- events ----------
  form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) send(b.dataset.q || b.textContent);
  });
  document.querySelectorAll('[data-ask]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('chat').scrollIntoView({ behavior: 'smooth', block: 'center' });
      send(el.dataset.ask);
    }));

  // Expose matcher for testing
  window.__faqAnswer = faqAnswer;
})();
