#!/usr/bin/env bash
# =============================================================
# Valida o repositorio local contra http://localhost:8000
# - Sobe server.py em background se necessario
# - Roda audit_urls.sh + audit_layout.py
# - Mata o servidor no final (se foi iniciado aqui)
# =============================================================

set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SERVER_PID=""

cleanup() {
    if [ -n "$SERVER_PID" ]; then
        echo
        echo "[cleanup] parando servidor (pid=$SERVER_PID)"
        kill "$SERVER_PID" 2>/dev/null || true
    fi
}
trap cleanup EXIT

# Verifica se ja existe servidor em localhost:8000
if curl -s -o /dev/null --max-time 2 "http://localhost:8000/"; then
    echo "[validate] servidor ja esta rodando em localhost:8000"
else
    echo "[validate] subindo server.py em background..."
    python3 scripts/server.py > /tmp/validate-server.log 2>&1 &
    SERVER_PID=$!
    sleep 2
    if ! curl -s -o /dev/null --max-time 3 "http://localhost:8000/"; then
        echo "[validate] ERRO: servidor nao respondeu. Veja /tmp/validate-server.log"
        exit 1
    fi
    echo "[validate] servidor pronto (pid=$SERVER_PID)"
fi

echo
echo "[validate] rodando audit_urls.sh"
echo "=================================================="
bash scripts/audit_urls.sh
RC_URLS=$?

echo
echo "[validate] rodando audit_layout.py"
echo "=================================================="
python3 scripts/audit_layout.py
RC_LAYOUT=$?

echo
echo "=================================================="
if [ "$RC_URLS" -eq 0 ] && [ "$RC_LAYOUT" -eq 0 ]; then
    echo "RESULT: PASS"
    exit 0
else
    echo "RESULT: FAIL (urls=$RC_URLS layout=$RC_LAYOUT)"
    exit 1
fi
