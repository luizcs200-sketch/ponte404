const loginDialog = document.querySelector('#login-dialog');
const cadastroDialog = document.querySelector('#cadastro-dialog');
const loginForm = document.querySelector('#login-form');
const cadastroForm = document.querySelector('#cadastro-form');
const perfilSelect = document.querySelector('#perfil-select');
const camposEspecificos = document.querySelector('#campos-especificos');
const toast = document.querySelector('.toast');
const moderadorDialog = document.querySelector('#moderador-dialog');
const moderadorForm = document.querySelector('#moderador-form');
const MODERADOR = { email: 'zacachiro@gmail.com', senha: '123456789', nome: 'Administrador', perfil: 'Moderador' };

const cursosExemplo = [
  { materia: 'Matemática', tipo: 'Reforço escolar', nivel: 'Fundamental e Médio', responsavel: 'Prof. Ana Lima', nota: 4.9, vagas: 8 },
  { materia: 'Português', tipo: 'Redação e interpretação', nivel: 'Todas as séries', responsavel: 'Prof. Marcos Souza', nota: 4.8, vagas: 6 },
  { materia: 'Física', tipo: 'Apoio para vestibular', nivel: 'Ensino Médio', responsavel: 'Prof. Lucas Prado', nota: 4.7, vagas: 5 },
  { materia: 'Química', tipo: 'Experimentos e exercícios', nivel: 'Ensino Médio', responsavel: 'Vol. Júlia Costa', nota: 4.9, vagas: 10 },
  { materia: 'Informática', tipo: 'Curso prático', nivel: 'Escolar e superior', responsavel: 'Prof. Rafael Dias', nota: 4.6, vagas: 12 },
  { materia: 'Inglês', tipo: 'Conversação', nivel: 'Todos os níveis', responsavel: 'Vol. Beatriz Alves', nota: 4.8, vagas: 9 },
  { materia: 'História', tipo: 'Reforço e projetos', nivel: 'Fundamental e Médio', responsavel: 'Prof. Carla Mendes', nota: 4.7, vagas: 7 },
  { materia: 'Biologia', tipo: 'Preparação para provas', nivel: 'Ensino Médio', responsavel: 'Vol. Pedro Rocha', nota: 4.5, vagas: 8 }
];

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
          <option value="Ensino Fundamental - 1º ano">Ensino Fundamental - 1º ano</option>
          <option value="Ensino Fundamental - 2º ano">Ensino Fundamental - 2º ano</option>
          <option value="Ensino Fundamental - 3º ano">Ensino Fundamental - 3º ano</option>
          <option value="Ensino Fundamental - 4º ano">Ensino Fundamental - 4º ano</option>
          <option value="Ensino Fundamental - 5º ano">Ensino Fundamental - 5º ano</option>
          <option value="Ensino Fundamental - 6º ano">Ensino Fundamental - 6º ano</option>
          <option value="Ensino Fundamental - 7º ano">Ensino Fundamental - 7º ano</option>
          <option value="Ensino Fundamental - 8º ano">Ensino Fundamental - 8º ano</option>
          <option value="Ensino Fundamental - 9º ano">Ensino Fundamental - 9º ano</option>
          <option value="Ensino Médio - 1ª série">Ensino Médio - 1ª série</option>
          <option value="Ensino Médio - 2ª série">Ensino Médio - 2ª série</option>
          <option value="Ensino Médio - 3ª série">Ensino Médio - 3ª série</option>
          <option value="Ensino superior">Ensino superior</option>
          <option value="Curso técnico ou profissionalizante">Curso técnico ou profissionalizante</option>
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
          <option value="Escolar">Escolar</option>
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
          <option value="Escolar">Escolar</option>
          <option value="Ensino superior">Ensino superior</option>
          <option value="Curso">Curso</option>
        </select>
      </label>
      <label>Escolaridade atual ou concluída / curso<input name="escolaridade" type="text" required placeholder="Ex.: Graduação em ADS ou Curso de Informática"></label>
      <label>Área de conhecimento<input name="atuacao" type="text" required placeholder="Ex.: Português"></label>
      <label>Disponibilidade<input name="disponibilidade" type="text" required placeholder="Ex.: Finais de semana"></label>`;
  }
}

function abrirCadastro(perfil) {
  if (perfil) perfilSelect.value = perfil;
  atualizarCamposPerfil(perfilSelect.value);
  cadastroDialog.showModal();
}

function mostrarCursos(filtro = '') {
  const termo = filtro.trim().toLowerCase();
  const cursos = cursosExemplo.filter((curso) =>
    `${curso.materia} ${curso.tipo} ${curso.nivel} ${curso.responsavel}`.toLowerCase().includes(termo)
  );

  document.querySelector('#result-count').textContent = `${cursos.length} resultado${cursos.length === 1 ? '' : 's'}`;
  document.querySelector('#lista-cursos').innerHTML = cursos.length
    ? cursos.map((curso) => `
      <article class="course-card">
        <div class="course-icon">${curso.materia.charAt(0)}</div>
        <div class="course-info">
          <span>${curso.tipo}</span>
          <h3>${curso.materia}</h3>
          <p>${curso.nivel}</p>
          <small>${curso.responsavel} • ★ ${curso.nota}</small>
        </div>
        <div class="course-action"><b>${curso.vagas} vagas</b><button type="button" data-entrar-materia="${curso.materia}">Entrar</button></div>
      </article>`).join('')
    : '<div class="empty-state">Nenhuma matéria encontrada. Tente pesquisar por Matemática, Inglês ou Informática.</div>';

  document.querySelectorAll('[data-entrar-materia]').forEach((botao) => {
    botao.addEventListener('click', () => showToast(`Solicitação de aula de ${botao.dataset.entrarMateria} enviada para análise.`));
  });
}

function mostrarRanking() {
  const ranking = [
    ['1', 'Ana Lima', 'Matemática', '4.9', 'Excelente'],
    ['2', 'Marcos Souza', 'Português', '4.8', 'Muito bom'],
    ['3', 'Beatriz Alves', 'Inglês', '4.8', 'Muito bom'],
    ['4', 'Lucas Prado', 'Física', '4.7', 'Muito bom'],
    ['5', 'Pedro Rocha', 'Biologia', '4.5', 'Bom']
  ];

  document.querySelector('#ranking-professores').innerHTML = `
    <div class="ranking-row ranking-head"><b>Posição</b><b>Professor(a)</b><b>Matéria</b><b>Nota</b><b>Avaliação</b></div>
    ${ranking.map((linha) => `<div class="ranking-row"><span>${linha[0]}º</span><strong>${linha[1]}</strong><span>${linha[2]}</span><b>★ ${linha[3]}</b><span>${linha[4]}</span></div>`).join('')}`;
}

function mostrarModeracao() {
  const usuarios = JSON.parse(localStorage.getItem('ponte404-usuarios') || '[]');
  const pendentes = usuarios.filter((usuario) => usuario.perfil === 'Professor' && usuario.statusCertificado === 'Pendente');
  const pendentesContainer = document.querySelector('#certificados-pendentes');

  pendentesContainer.innerHTML = pendentes.length ? pendentes.map((usuario) => `
    <article class="moderation-item">
      <div><strong>${usuario.nome}</strong><small>${usuario.atuacao || 'Área não informada'} • ${usuario.certificado || 'Certificado enviado'}</small></div>
      <div class="moderation-actions">
        <button type="button" data-aprovar="${usuario.email}">Confirmar</button>
        <button type="button" class="reject" data-recusar="${usuario.email}">Recusar</button>
      </div>
    </article>`).join('') : '<div class="empty-state">Nenhum certificado aguardando validação.</div>';

  const pessoas = usuarios.filter((usuario) => usuario.perfil === 'Professor' || usuario.perfil === 'Voluntário');
  document.querySelector('#lista-pessoas').innerHTML = pessoas.length ? pessoas.map((usuario) => `
    <article class="person-item"><div class="person-avatar">${usuario.nome.charAt(0).toUpperCase()}</div>
      <div><strong>${usuario.nome}</strong><small>${usuario.perfil} • ${usuario.atuacao || 'Área não informada'}</small></div>
      <span class="status-${usuario.statusCertificado === 'Aprovado' ? 'approved' : 'pending'}">${usuario.statusCertificado || 'Ativo'}</span>
    </article>`).join('') : '<div class="empty-state">Ainda não há professores ou voluntários cadastrados.</div>';

  document.querySelectorAll('[data-aprovar]').forEach((botao) => botao.addEventListener('click', () => alterarStatusCertificado(botao.dataset.aprovar, 'Aprovado')));
  document.querySelectorAll('[data-recusar]').forEach((botao) => botao.addEventListener('click', () => alterarStatusCertificado(botao.dataset.recusar, 'Recusado')));
}

function alterarStatusCertificado(email, status) {
  const usuarios = JSON.parse(localStorage.getItem('ponte404-usuarios') || '[]');
  const usuario = usuarios.find((item) => item.email === email);
  if (usuario) {
    usuario.statusCertificado = status;
    localStorage.setItem('ponte404-usuarios', JSON.stringify(usuarios));
  }
  showToast(status === 'Aprovado' ? 'Certificado confirmado com sucesso.' : 'Certificado recusado.');
  mostrarModeracao();
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
document.querySelector('#abrir-moderador').addEventListener('click', () => moderadorDialog.showModal());

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
    certificado: data.get('certificado')?.name || data.get('comprovante')?.name || '',
    statusCertificado: 'Pendente'
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

document.querySelector('#abrir-moderador').addEventListener('click', () => moderadorDialog.showModal());

moderadorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(moderadorForm);
  if (data.get('email') !== MODERADOR.email || data.get('senha') !== MODERADOR.senha) {
    showToast('E-mail ou senha de moderador incorretos.');
    return;
  }
  moderadorDialog.close();
  moderadorForm.reset();
  entrarNaAreaInterna(MODERADOR);
  document.querySelector('#menu-moderacao').hidden = false;
  mostrarModeracao();
});

document.querySelector('#buscar-materia').addEventListener('input', (event) => {
  mostrarCursos(event.target.value);
  document.querySelectorAll('[data-panel]').forEach((item) => item.classList.remove('active'));
  document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('active'));
  document.querySelector('[data-panel="materias"]').classList.add('active');
  document.querySelector('#painel-materias').classList.add('active');
});

atualizarCamposPerfil('aluno');
mostrarCursos();
mostrarRanking();
mostrarModeracao();
