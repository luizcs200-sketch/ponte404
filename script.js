const dialog = document.querySelector('#cadastro-dialog');
const form = document.querySelector('#cadastro-form');
const select = document.querySelector('#perfil-select');
const toast = document.querySelector('.toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function openCadastro(profile) {
  if (profile) select.value = profile;
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

document.querySelector('[data-scroll]').addEventListener('click', (event) => {
  document.querySelector(`#${event.currentTarget.dataset.scroll}`).scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#abrir-cadastro').addEventListener('click', () => openCadastro());

document.querySelectorAll('[data-profile]').forEach((card) => {
  card.addEventListener('click', () => openCadastro(card.dataset.profile));
});

document.querySelector('.theme-button').addEventListener('click', (event) => {
  document.body.classList.toggle('dark');
  event.currentTarget.textContent = document.body.classList.contains('dark') ? '☾' : '☼';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const profile = select.options[select.selectedIndex].text;
  dialog.close();
  showToast(`Olá, ${data.get('nome')}! Seu cadastro de ${profile} foi iniciado.`);
  form.reset();
});
