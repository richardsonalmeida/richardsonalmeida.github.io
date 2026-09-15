#!/usr/bin/env bash
# =============================================================
# Audit visual/estrutural das URLs servidas em localhost:8000
# Roda em paralelo com o server.py em outro terminal.
# =============================================================

BASE="http://localhost:8000"

# Cores (se terminal suportar)
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# URLs de HTML para auditar (path + idioma)
URLS=(
  "/|en"
  "/pt-br/|pt"
  "/es/|es"
  "/articles/|en"
  "/pt-br/articles/|pt"
  "/es/articles/|es"
  "/articles/vikon-architecture/|en"
  "/pt-br/articles/vikon-architecture/|pt"
  "/es/articles/vikon-architecture/|es"
  "/projects/vikon.html|en"
  "/pt-br/projects/vikon.html|pt"
  "/es/projects/vikon.html|es"
  "/projects/digital-presence.html|en"
  "/pt-br/projects/digital-presence.html|pt"
  "/es/projects/digital-presence.html|es"
)

# Assets para verificar disponibilidade
ASSETS=(
  "/assets/css/base.css"
  "/assets/css/home.css"
  "/assets/css/project.css"
  "/assets/css/article.css"
  "/favicon.png"
  "/Richardson%20Almeida%20-%20Resume.pdf"
)

# --- 1. Servidor no ar? ---
echo -e "${CYAN}=====================================================${NC}"
echo -e "${CYAN} AUDITORIA DE URLs — localhost:8000${NC}"
echo -e "${CYAN}=====================================================${NC}"
echo

if ! curl -s -o /dev/null --max-time 3 "$BASE/"; then
  echo -e "${RED}ERRO: servidor em $BASE nao responde.${NC}"
  echo "Suba o servidor com: python3 server.py"
  exit 1
fi
echo -e "${GREEN}servidor no ar${NC}"
echo

# --- 2. Assets ---
echo -e "${CYAN}----- 2. Assets (status HTTP) -----${NC}"
for a in "${ASSETS[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE$a")
  if [ "$code" = "200" ]; then
    printf "  ${GREEN}%s${NC}  %s\n" "$code" "$a"
  else
    printf "  ${RED}%s${NC}  %s\n" "$code" "$a"
  fi
done
echo

# --- 3. HTMLs: estrutura ---
echo -e "${CYAN}----- 3. HTMLs (status + estrutura) -----${NC}"

# Cabecalho da tabela
printf "%-45s %-6s %-7s %-6s %-7s %-7s %-7s %-6s\n" \
  "URL" "HTTP" "aside" "main" "header" "closeH" "footer" "HTML"

fail_count=0
for entry in "${URLS[@]}"; do
  path="${entry%|*}"
  lang="${entry#*|}"

  body=$(curl -s --max-time 5 "$BASE$path" 2>/dev/null || echo "")
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE$path")

  # Contagens (grep -o ... | wc -l evita problemas com multiplas ocorrencias)
  n_aside=$(printf '%s' "$body" | grep -o '<aside class="sidebar"' | wc -l)
  n_main=$(printf '%s' "$body"  | grep -o '<main>' | wc -l)
  n_header=$(printf '%s' "$body" | grep -o '<header class="site-header">' | wc -l)
  n_close_h=$(printf '%s' "$body" | grep -o '</header>' | wc -l)
  n_footer=$(printf '%s' "$body" | grep -o '<footer' | wc -l)
  n_html=$(printf '%s' "$body" | grep -o '</html>' | wc -l)

  # Cor por expectativa
  color_aside=$GREEN;  [ "$n_aside" -lt 1 ] && color_aside=$RED
  color_main=$GREEN;   [ "$n_main" -lt 1 ] && color_main=$RED
  color_header=$GREEN; [ "$n_header" -lt 1 ] && color_header=$RED
  color_closeh=$GREEN; [ "$n_close_h" -lt 1 ] && color_closeh=$RED
  # footer: articles PT/ES nao tem footer, entao 0 eh OK para eles
  color_footer=$GREEN
  if [[ "$path" == *"/articles/" || "$path" == *"articles/index"* ]] && [ "$lang" != "en" ]; then
    [ "$n_footer" -ge 1 ] && color_footer=$YELLOW  # nao esperado mas tolerado
  else
    [ "$n_footer" -lt 1 ] && color_footer=$RED
  fi
  color_html=$GREEN; [ "$n_html" -lt 1 ] && color_html=$RED

  printf "%-45s %-6s ${color_aside}%-7s${NC} ${color_main}%-6s${NC} ${color_header}%-7s${NC} ${color_closeh}%-7s${NC} ${color_footer}%-7s${NC} ${color_html}%-6s\n" \
    "$path" "$code" "$n_aside" "$n_main" "$n_header" "$n_close_h" "$n_footer" "$n_html"

  # Conta falhas
  [ "$code" != "200" ] && fail_count=$((fail_count+1))
  [ "$n_aside" -lt 1 ] && fail_count=$((fail_count+1))
  [ "$n_main" -lt 1 ] && fail_count=$((fail_count+1))
  [ "$n_html" -lt 1 ] && fail_count=$((fail_count+1))
done

echo

# --- 4. Resumo ---
echo -e "${CYAN}=====================================================${NC}"
if [ "$fail_count" -eq 0 ]; then
  echo -e "${GREEN} TUDO OK — 0 falhas detectadas.${NC}"
else
  echo -e "${RED} $fail_count falha(s) detectada(s). Revisar.${NC}"
fi
echo -e "${CYAN}=====================================================${NC}"
