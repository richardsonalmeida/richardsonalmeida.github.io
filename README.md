# richardsonalmeida.github.io

Portfólio pessoal — site estático, multilíngue (EN / PT-BR / ES).

Princípio editorial: **evidence over claims**. O portfólio apresenta
projetos reais e decisões de engenharia, não afirmações de capacidade.

---

## Desenvolvimento

    python3 scripts/server.py     # servidor local em http://localhost:8000

## Validação

    bash scripts/validate.sh      # sobe servidor + roda audit_urls + audit_layout

Requer (para validação de layout):

    pip install playwright
    playwright install chromium

---

## Estrutura

    index.html                     homepage EN
    pt-br/index.html               homepage PT
    es/index.html                  homepage ES

    articles/                      artigos EN
    pt-br/articles/                artigos PT
    es/articles/                   artigos ES

    projects/                      projetos EN
    pt-br/projects/                projetos PT
    es/projects/                   projetos ES

    assets/css/                    base.css, home.css, article.css, project.css
    scripts/                       utilitários de desenvolvimento
    docs/adr/                      Architecture Decision Records (a preencher)

---

## Arquitetura

- **Estrutura HTML idêntica nos três idiomas.** As páginas EN, PT e ES
  compartilham a mesma casca semântica:
  `<aside class="sidebar">` + `<div class="container">` + `<header>` +
  `<main>` + `<footer>`.

- **CSS em camadas.** `base.css` contém tokens, reset, header, sidebar,
  botões, links e footer. `home.css`, `project.css` e `article.css`
  adicionam regras específicas por tipo de página.

- **Navegação sticky em ≥900px.** Header fixo no topo, sidebar fixa à
  esquerda, coluna de conteúdo alinhada à direita. Em <900px, sidebar
  oculta e navegação horizontal no header.

- **Sem JavaScript de layout.** Todo comportamento visual é CSS. JS é
  usado apenas para o language switcher (reaproveitamento de path entre
  idiomas).

---

## Scripts

    scripts/
    ├── server.py                 servidor local (Python http.server)
    ├── validate.sh               wrapper: sobe servidor + roda auditorias
    ├── audit_urls.sh             valida URLs, assets e estrutura HTML
    ├── audit_layout.py           mede layout em 3 viewports (Playwright)
    ├── inspect_container.py      mede .container em detalhe
    ├── inspect_header.py         mede header e seus filhos
    └── inspect_herotitle.py      mede .hero-title e descendentes

---

## Dívidas conhecidas

### Editorial (2F)

- Conteúdo PT/ES truncado em projetos: VIKON tem 7 seções no EN, 2 no
  PT/ES; Digital Presence tem 7 no EN, 1 no PT/ES.
- Article-card PT/ES estruturalmente divergente do EN:
  `<h3 style>` vs `<h2 class="article-title">`; sem `.article-date`;
  sem `.read-more`.

### Visual (2H, opcional)

- `border-bottom` do header não atravessa a viewport completa em ≥900px.
  Hoje a linha começa depois da sidebar, criando um gap visual entre
  sidebar e conteúdo.

### CSS

- Classes sem regra: `.article-card`, `.article-date`, `.article-title`,
  `.article-desc`, `.read-more` são usadas no HTML do EN, mas não têm
  regras em `article.css` (renderizam com defaults do navegador).

### HTML

- `index.html` (EN) tem três defeitos herdados do baseline:
  `</h3>` duplicado, `</section>` duplicado, comentário
  `<!-- Engineering Approach -->` duplicado.

---

## Deploy

GitHub Pages publica a partir da branch `main`. Alterações na `main`
entram no ar em ~1 minuto.

    git checkout main
    git merge <branch>
    git push origin main

---

## Roadmap

- **E2** — Architecture Decision Records (`docs/adr/`).
- **E3** — CI mínimo executando `scripts/validate.sh` em push/PR.
- **2F** — Paridade editorial EN ↔ PT ↔ ES.
- **2H** — Coesão visual do header em ≥900px (opcional).