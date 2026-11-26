'use strict';

const c = window.COMPANY || {};
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
};

$$('[data-field]').forEach(node => {
  node.textContent = c[node.dataset.field] ?? '';
});

const headline = $('#headline');
if (headline) {
  const phrase = c.headline || '';
  const accent = c.accent || '';
  const index = accent ? phrase.indexOf(accent) : -1;
  if (index >= 0) {
    headline.append(
      document.createTextNode(phrase.slice(0, index)),
      Object.assign(document.createElement('em'), { textContent: accent }),
      document.createTextNode(phrase.slice(index + accent.length))
    );
  } else {
    headline.textContent = phrase;
  }
}

document.title = `${c.name || 'OSINT Brain'} | Intelligence, Cybersecurity & Strategy`;
$('#year').textContent = new Date().getFullYear();

const icons = {
  scan: '<path d="M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6M3 12h18"/><circle cx="12" cy="12" r="4"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  chart: '<path d="M3 3v18h18M7 15l5-5 4 3 5-7"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
  book: '<path d="M12 7v14M3 4h5c2 0 4 1 4 3 0-2 2-3 4-3h5v15h-5c-2 0-4 1-4 2-1-1-2-2-4-2H3Z"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 5a3 3 0 0 1 0 6m2 3c3 1 4 3 4 7"/>'
};

(c.services || []).forEach((item, i) => {
  const card = el('article', 'capability-card');
  const top = el('div', 'capability-meta');
  const icon = el('span', 'capability-icon');
  icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[item.icon] || icons.scan}</svg>`;
  top.append(icon, el('span', 'card-index', String(i + 1).padStart(2, '0')));
  card.append(top, el('h3', '', item.title), el('p', '', item.text));
  $('#service-grid').append(card);
});

(c.process || []).forEach((item, i) => {
  const card = el('article', 'method-card');
  card.append(el('span', 'card-index', `Step ${String(i + 1).padStart(2, '0')}`), el('h3', '', item.title), el('p', '', item.text));
  $('#process-grid').append(card);
});

(c.values || []).forEach((item, i) => {
  const card = el('article', 'value-card');
  card.append(el('span', 'card-index', String(i + 1).padStart(2, '0')), el('h3', '', item.title), el('p', '', item.text));
  $('#value-grid').append(card);
});

let contacts = 0;
const addContact = (label, url) => {
  const a = el('a');
  a.href = url;
  a.textContent = label;
  if (/^https?:\/\//i.test(url)) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  const arrow = el('span', '', '↗');
  a.append(arrow);
  $('#contact-links').append(a);
  contacts += 1;
};
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email || '')) addContact(c.email, `mailto:${c.email}`);
if (/^\d{8,15}$/.test(c.whatsapp || '')) addContact('WhatsApp', `https://wa.me/${c.whatsapp}`);
[['LinkedIn', c.linkedin], ['Instagram', c.instagram]].forEach(([label, url]) => {
  if (/^https:\/\//i.test(url || '')) addContact(label, url);
});
$('#contact-empty').hidden = contacts > 0;

const root = document.documentElement;
const header = $('#site-header');
const nav = $('#site-nav');
const menu = $('#menu-toggle');
const toggle = $('#theme-toggle');
const logo = $('#brand-logo');
const metaTheme = $('meta[name="theme-color"]');

function syncLogo() {
  const theme = root.dataset.theme === 'light' ? 'light' : 'dark';
  logo.src = theme === 'light' ? 'assets/logo-light.png' : 'assets/logo-dark.png';
  metaTheme.content = theme === 'light' ? '#ffffff' : '#111214';
}

function applyTheme(theme, save = true) {
  root.dataset.theme = theme === 'light' ? 'light' : 'dark';
  syncLogo();
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  toggle.setAttribute('aria-label', `Switch to ${next} mode`);
  toggle.title = `Switch to ${next} mode`;
  if (save) {
    try { localStorage.setItem('ob-theme', root.dataset.theme); } catch (e) {}
  }
  window.dispatchEvent(new Event('ob-theme-change'));
}

function syncHeader() {
  const active = window.scrollY > 16;
  header.classList.toggle('scrolled', active);
  header.classList.toggle('menu-open', nav.classList.contains('open'));
}

function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  syncHeader();
}

applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);
syncHeader();

toggle.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
});

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  syncHeader();
});

$$('#site-nav a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', syncHeader, { passive: true });
window.addEventListener('pageshow', syncHeader);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
