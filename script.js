const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
const themeToggle = document.querySelector('.theme-toggle');

function closeMenu() {
  navPanel.classList.remove('active');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}

menuToggle.addEventListener('click', () => {
  const open = navPanel.classList.toggle('active');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
document.querySelectorAll('.nav-panel a').forEach(link => link.addEventListener('click', closeMenu));

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
function updateThemeButton() {
  const dark = document.body.classList.contains('dark');
  themeToggle.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
}
updateThemeButton();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('show'));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = `Bonjour Henock,\n\nJe m'appelle ${data.get('nom')}.\nEmail : ${data.get('email')}\nTéléphone / WhatsApp : ${data.get('telephone') || 'Non renseigné'}\nType de projet : ${data.get('projet')}\n\nDescription du projet :\n${data.get('message')}`;
  window.open(`https://wa.me/243972010300?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
