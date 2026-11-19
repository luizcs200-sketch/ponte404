const loginDialog = document.querySelector('#login-dialog');
const cadastroDialog = document.querySelector('#cadastro-dialog');
const loginForm = document.querySelector('#login-form');
const cadastroForm = document.querySelector('#cadastro-form');
const perfilSelect = document.querySelector('#perfil-select');
const camposEspecificos = document.querySelector('#campos-especificos');
const toast = document.querySelector('.toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3000);
}

function abrirLogin() {
  loginDialog.showModal();
}

function atualizarCamposPerfil(perfil) {
  if (perfil === 'aluno') {
    camposEspecificos.innerHTML = `
      <label>Série / ano escolar
        <select name="serie" required>
          <option value="">Selecione</option>
          <option>1º ano do Fundamental</option><option>2º ano do Fundamental</option>
          <option>3º ano do Fundamental</option><option>4º ano do Fundamental</option>
          <option>5º ano do Fundamental</option><option>6º ano do Fundamental</option>
          <option>7º ano do Fundamental</option><option>8º ano do Fundamental</option>
          <option>9º ano do Fundamental</option><option>1ª série do Ensino Médio</option>
          <option>2ª série do Ensino Médio</option><option>3ª série do Ensino Médio</option>
        </select>
      </label>
      <label>Instituição de ensino<input name="instituicao" type="text" required placeholder="Nome da escola"></label>
      <label>Disciplina(s) que precisa<input name="disciplinas" type="text" required placeholder="Ex.: Matemática e Física"></label>
      <label>Responsável legal<input name="responsavel" type="text" placeholder="Se menor de idade"></label>`;
  } else if (perfil === 'professor') {
    camposEspecificos.innerHTML = `
      <label>Tipo de formação
        <select name="tipoFormacao" required>
          <option value="">Selecione</option>
          <option value="Ensino superior">Ensino superior</option>
          <option value="Curso">Curso</option>
        </select>
      </label>
      <label>Nome da formação ou curso<input name="formacao" type="text" required placeholder="Ex.: Licenciatura em Matemática ou Curso de Ciências"></label>
      <label>Área de atuação<input name="atuacao" type="text" required placeholder="Ex.: Matemática"></label>
      <label class="file-label">Certificado ou diploma<input name="certificado" type="file" accept=".pdf,.jpg,.jpeg,.png" required></label>
      <label>Disponibilidade<input name="disponibilidade" type="text" required placeholder="Ex.: Segundas e quartas à noite"></label>`;
  } else {
    camposEspecificos.innerHTML = `
      <label>Tipo de escolaridade
        <select name="tipoFormacao" required>
          <option value="">Selecione</option>
          <option value="Ensino superior">Ensino superior</option>
          <option value="Curso">Curso</option>
        </select>
      </label>
      <label>Escolaridade atual ou concluída / curso<input name="escolaridade" type="text" required placeholder="Ex.: Graduação em ADS ou Curso de Informática"></label>
      <label>Área de conhecimento<input name="atuacao" type="text" required placeholder="Ex.: Português"></label>
      <label>Comprovante de escolaridade ou certificado<input name="comprovante" type="file" accept=".pdf,.jpg,.jpeg,.png" required></label>
      <label>Disponibilidade<input name="disponibilidade" type="text" required placeholder="Ex.: Finais de semana"></label>`;
  }
}

function abrirCadastro(perfil) {
  if (perfil) perfilSelect.value = perfil;
  atualizarCamposPerfil(perfilSelect.value);
  cadastroDialog.showModal();
}

function entrarNaAreaInterna(usuario) {
  document.querySelector('#site-main').hidden = true;
  document.querySelector('.internal-page').hidden = false;
  document.querySelector('#nome-interno').textContent = usuario.nome;
  document.querySelector('#perfil-interno').textContent = usuario.perfil;
  document.querySelector('#avatar-interno').textContent = usuario.nome.charAt(0).toUpperCase();
  document.querySelector('#titulo-interno').textContent = `Bem-vindo(a), ${usuario.nome.split(' ')[0]}!`;

  const resumo = document.querySelector('#resumo-perfil');
  resumo.innerHTML = `
    <article><small>Nome completo</small><strong>${usuario.nome}</strong></article>
    <article><small>E-mail</small><strong>${usuario.email}</strong></article>
    <article><small>Perfil</small><strong>${usuario.perfil}</strong></article>
    ${usuario.serie ? `<article><small>Série escolar</small><strong>${usuario.serie}</strong></article>` : ''}
    ${usuario.instituicao ? `<article><small>Instituição</small><strong>${usuario.instituicao}</strong></article>` : ''}
    ${usuario.atuacao ? `<article><small>Área de atuação</small><strong>${usuario.atuacao}</strong></article>` : ''}
    ${usuario.tipoFormacao ? `<article><small>Tipo de formação</small><strong>${usuario.tipoFormacao}</strong></article>` : ''}
    ${usuario.formacao ? `<article><small>Formação</small><strong>${usuario.formacao}</strong></article>` : ''}
    ${usuario.disponibilidade ? `<article><small>Disponibilidade</small><strong>${usuario.disponibilidade}</strong></article>` : ''}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('#abrir-login').addEventListener('click', abrirLogin);
document.querySelector('#abrir-login-principal').addEventListener('click', abrirLogin);
document.querySelector('#abrir-cadastro').addEventListener('click', () => abrirCadastro());

document.querySelectorAll('[data-profile]').forEach((card) => {
  card.addEventListener('click', () => abrirCadastro(card.dataset.profile));
});

document.querySelector('#ir-cadastro').addEventListener('click', () => {
  loginDialog.close();
  abrirCadastro();
});

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => document.querySelector(`#${button.dataset.close}`).close());
});

document.querySelector('.theme-button').addEventListener('click', (event) => {
  document.body.classList.toggle('dark');
  event.currentTarget.textContent = document.body.classList.contains('dark') ? '☾' : '☼';
});

perfilSelect.addEventListener('change', () => atualizarCamposPerfil(perfilSelect.value));

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const usuarios = JSON.parse(localStorage.getItem('ponte404-usuarios') || '[]');
  const usuario = usuarios.find((item) => item.email === data.get('email') && item.senha === data.get('senha'));

  if (!usuario) {
    showToast('E-mail ou senha incorretos. Confira seus dados.');
    return;
  }
  loginDialog.close();
  loginForm.reset();
  entrarNaAreaInterna(usuario);
});

cadastroForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(cadastroForm);
  if (data.get('senha') !== data.get('confirmarSenha')) {
    showToast('As senhas não são iguais. Digite novamente.');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('ponte404-usuarios') || '[]');
  if (usuarios.some((item) => item.email === data.get('email'))) {
    showToast('Este e-mail já possui uma conta cadastrada.');
    return;
  }

  const perfil = perfilSelect.options[perfilSelect.selectedIndex].text;
  const usuario = {
    nome: data.get('nome'),
    email: data.get('email'),
    senha: data.get('senha'),
    perfil,
    serie: data.get('serie') || '',
    instituicao: data.get('instituicao') || '',
    disciplinas: data.get('disciplinas') || '',
    responsavel: data.get('responsavel') || '',
    formacao: data.get('formacao') || '',
    atuacao: data.get('atuacao') || '',
    escolaridade: data.get('escolaridade') || '',
    disponibilidade: data.get('disponibilidade') || '',
    certificado: data.get('certificado')?.name || data.get('comprovante')?.name || ''
  };

  usuarios.push(usuario);
  localStorage.setItem('ponte404-usuarios', JSON.stringify(usuarios));
  cadastroDialog.close();
  cadastroForm.reset();
  showToast('Cadastro criado com sucesso! Agora faça login.');
  window.setTimeout(abrirLogin, 350);
});

document.querySelectorAll('[data-panel]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-panel]').forEach((item) => item.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('active'));
    button.classList.add('active');
    document.querySelector(`#painel-${button.dataset.panel}`).classList.add('active');
  });
});

document.querySelector('#sair').addEventListener('click', () => {
  document.querySelector('.internal-page').hidden = true;
  document.querySelector('#site-main').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

atualizarCamposPerfil('aluno');
