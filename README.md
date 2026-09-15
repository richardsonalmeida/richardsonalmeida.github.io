# richardsonalmeida.github.io

Portfolio pessoal — site estatico, multilingue (EN / PT-BR / ES).

## Desenvolvimento

    python3 scripts/server.py     # servidor local em http://localhost:8000

## Validacao

    bash scripts/validate.sh      # roda audit_urls + audit_layout

Requer:

    pip install playwright
    playwright install chromium

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
    scripts/                       utilitarios de desenvolvimento
    docs/adr/                      Architecture Decision Records

## Dívidas conhecidas

- 2F (editorial): conteudo PT/ES truncado em projetos; article-card
  PT/ES estruturalmente divergente do EN.
- 2H (opcional): header com border-bottom nao atravessa a viewport
  completa em >=900px.
- EN com classes sem CSS: .article-card, .article-date, .article-title,
  .article-desc, .read-more (defaults do navegador).
