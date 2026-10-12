/* ===== DADOS (edite os textos aqui) ===== */
const pilares = [
  {i:"⚖️", t:"Igualdade de oportunidades", r:"Todas as pessoas devem poder estudar, trabalhar e se desenvolver.", m:"Promover a igualdade de oportunidades significa que o ponto de partida de cada pessoa não deve limitar seu futuro."},
  {i:"🤝", t:"Inclusão social", r:"Participação plena na vida econômica, social e política.", m:"A inclusão social combate a discriminação e amplia o acesso a direitos básicos, como educação, saúde, trabalho e recursos financeiros."},
  {i:"📉", t:"Redução das desigualdades", r:"Dentro dos países e entre eles.", m:"Entre as metas da ODS 10 estão o crescimento da renda da população mais pobre, o combate à discriminação e políticas para uma distribuição mais justa de recursos e oportunidades."}
];
const areas = [
  {t:"Educação", d:"Diferenças de acesso e de qualidade da educação podem limitar a qualificação profissional e as oportunidades futuras de uma pessoa."},
  {t:"Saúde", d:"Quando o acesso à saúde é desigual, as condições de vida e a capacidade de trabalhar e estudar também são afetadas."},
  {t:"Trabalho", d:"A dificuldade de acessar emprego e trabalho digno mantém ciclos de baixa renda e vulnerabilidade social."},
  {t:"Crédito", d:"Diferenças de acesso a crédito afetam a capacidade de abrir um negócio, estudar ou lidar com imprevistos financeiros."},
  {t:"Renda", d:"A concentração de renda faz com que poucos concentrem grande parte dos recursos, o que exige políticas públicas e uma distribuição mais equilibrada."}
];
const contab = [
  {i:"🔍", t:"Transparência fiscal", d:"Auxilia na apuração correta dos tributos e no acompanhamento dos recursos financeiros, contribuindo para a prevenção de irregularidades e para o financiamento dos serviços públicos."},
  {i:"📊", t:"Planejamento financeiro", d:"Ajuda pessoas e organizações a controlar receitas, despesas e investimentos, favorecendo decisões financeiras mais conscientes."},
  {i:"🏪", t:"Apoio aos pequenos negócios", d:"Oferece orientação sobre custos, tributos e gestão financeira, fortalecendo micro e pequenas empresas e contribuindo para a geração de empregos."},
  {i:"👷", t:"Valorização do trabalho", d:"Auxilia as empresas no cumprimento das obrigações trabalhistas, incluindo o cálculo correto de salários, encargos e benefícios."},
  {i:"🏛️", t:"Responsabilidade social e governança", d:"Contribui para a transparência das organizações e para a divulgação de práticas financeiras éticas e socialmente responsáveis."},
  {i:"💡", t:"Educação financeira", d:"Incentiva o uso consciente do dinheiro, o planejamento de gastos e a prevenção do endividamento."}
];
const medidas = [
  {t:"Justiça fiscal", d:"A discussão sobre uma tributação mais justa envolve considerar a capacidade econômica de cada contribuinte, buscando reduzir os impactos desproporcionais dos tributos sobre as pessoas de menor renda."},
  {t:"Cashback de impostos", d:"Prevê a devolução de parte dos tributos a famílias que atendam aos critérios estabelecidos na legislação, contribuindo para diminuir o peso da tributação sobre o consumo. Use o simulador abaixo para um exemplo hipotético."},
  {t:"Cesta Básica Nacional", d:"A previsão de alíquota zero para os produtos que compõem a Cesta Básica Nacional de Alimentos busca tornar os alimentos essenciais mais acessíveis à população, conforme as regras aplicáveis."},
  {t:"Simplificação tributária", d:"A reorganização dos tributos sobre o consumo pode facilitar o cumprimento das obrigações fiscais pelas empresas e melhorar a eficiência do sistema. O combate à sonegação também é importante para garantir recursos destinados a políticas e serviços públicos."}
];
const fluxo = [
  {t:"ODS 10", d:"O ponto de partida: reduzir desigualdades e promover oportunidades, inclusão e acesso a direitos básicos. Para isso, é preciso informação confiável sobre como os recursos são usados."},
  {t:"Contabilidade responsável", d:"A Contabilidade organiza e fornece informações sobre receitas, despesas e tributos, apoiando o controle dos recursos e decisões responsáveis."},
  {t:"Gestão transparente", d:"Com informação clara, a gestão pública e privada pode prestar contas, prevenir irregularidades e usar melhor os recursos."},
  {t:"Oportunidades mais justas", d:"Recursos bem geridos podem financiar serviços públicos, fortalecer pequenos negócios e apoiar o trabalho digno, ampliando oportunidades."},
  {t:"Desenvolvimento sustentável", d:"Uma sociedade mais transparente, responsável e inclusiva favorece o desenvolvimento sustentável. A Contabilidade não resolve as desigualdades sozinha, mas contribui, junto com políticas públicas inclusivas e uma tributação mais justa."}
];

const $ = (s, c = document) => c.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

/* ===== Entrada gradual ===== */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
const observar = () => document.querySelectorAll(".reveal,.card,.hex").forEach(n => io.observe(n));

/* ===== Seletor genérico (abas / chips / passos) ===== */
function seletor(lista, container, painel, classe, rotulo, mostrar) {
  const botoes = lista.map((x, n) => {
    const b = el("button", classe, rotulo(x));
    b.type = "button"; b.setAttribute("role", "tab");
    b.addEventListener("click", () => escolher(n));
    b.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); escolher((n + 1) % lista.length, true); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); escolher((n - 1 + lista.length) % lista.length, true); }
    });
    container.appendChild(b); return b;
  });
  let atual = 0;
  function escolher(n, foco) {
    atual = n;
    botoes.forEach((b, i) => { b.setAttribute("aria-selected", i === n); b.tabIndex = i === n ? 0 : -1; });
    painel.innerHTML = ""; painel.appendChild(mostrar(lista[n], n));
    if (foco) botoes[n].focus();
  }
  escolher(0);
  return { escolher, atual: () => atual, total: lista.length };
}

/* ===== Pilares da ODS 10 (cards expansíveis) ===== */
const pil = $("#pilares");
pilares.forEach(p => {
  const c = el("button", "card", `<span class="ico" aria-hidden="true">${p.i}</span><h3>${p.t}</h3><p>${p.r}</p><p class="more">${p.m}</p>`);
  c.type = "button"; c.setAttribute("aria-expanded", "false");
  c.addEventListener("click", () => c.setAttribute("aria-expanded", c.getAttribute("aria-expanded") !== "true"));
  pil.appendChild(c);
});

/* ===== Áreas da desigualdade ===== */
seletor(areas, $("#areaChips"), $("#areaPanel"), "chip", a => a.t, a => el("div", "", `<h3>${a.t}</h3><p>${a.d}</p>`));

/* ===== Contabilidade ===== */
seletor(contab, $("#hexGrid"), $("#focus"), "hex", c => `<span aria-hidden="true">${c.i}</span>${c.t}`,
  (c, n) => el("div", "", `<span class="num" aria-hidden="true">0${n + 1}</span><h4>${c.t}</h4><p>${c.d}</p>`));

/* ===== Reforma tributária ===== */
seletor(medidas, $("#tabs"), $("#tabpanel"), "tab", m => m.t, m => el("div", "", `<h3>${m.t}</h3><p>${m.d}</p>`));

/* ===== Fluxo ===== */
const fl = seletor(fluxo, $("#flow"), $("#flowPanel"), "step", (f) => f.t,
  (f, n) => el("div", "", `<h3>${n + 1}. ${f.t}</h3><p>${f.d}</p>${n < fluxo.length - 1 ? `<p><strong>Conecta-se a:</strong> ${fluxo[n + 1].t}</p>` : ""}`));
$("#next").addEventListener("click", () => fl.escolher((fl.atual() + 1) % fl.total));
$("#prev").addEventListener("click", () => fl.escolher((fl.atual() - 1 + fl.total) % fl.total));

/* ===== Simulador de cashback (hipotético) ===== */
const vIn = $("#valor"), pIn = $("#pct"), out = $("#result");
function simular() {
  const v = parseFloat(String(vIn.value).replace(",", ".")), p = parseFloat(String(pIn.value).replace(",", "."));
  if (!isFinite(v) || !isFinite(p) || v < 0 || p < 0 || p > 100) {
    out.textContent = "Informe valores válidos (valor ≥ 0 e percentual entre 0 e 100)."; return;
  }
  const r = v * p / 100, f = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  out.textContent = `Exemplo hipotético: ${p.toLocaleString("pt-BR")}% de ${f(v)} = ${f(r)}`;
}
vIn.addEventListener("input", simular); pIn.addEventListener("input", simular); simular();

/* ===== Navegação, progresso e menu ===== */
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", aberto);
  burger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));
document.addEventListener("keydown", e => { if (e.key === "Escape") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

const secoes = [...document.querySelectorAll("main section[id]")], links = [...menu.querySelectorAll("a")];
const topo = $("#top"), barra = $("#progress");
function aoRolar() {
  const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
  barra.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + "%";
  topo.classList.toggle("show", h.scrollTop > 600);
  let atual = "";
  secoes.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) atual = s.id; });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + atual));
}
addEventListener("scroll", aoRolar, { passive: true }); aoRolar();
topo.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ===== Profundidade no hero (mouse/toque) ===== */
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduz) {
  const hero = $(".hero"), orbs = hero.querySelectorAll(".orb");
  hero.addEventListener("pointermove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    orbs.forEach((o, i) => o.style.transform = `translate(${x * (i + 1) * 30}px,${y * (i + 1) * 30}px)`);
  });
}

observar();