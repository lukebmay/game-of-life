#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VERSION="0.1.0"
PORT="5173"
EXTRA=()

RESET='\e[0m'
RED='\e[31m'
BLUE='\e[34m'
MAGENTA='\e[35m'

usage() {
  cat <<'EOF'
Usage: scripts/dev.sh [--port N | --port=N] [extra server args]

Exec Vite on 127.0.0.1 port 5173. Does not call npm run dev.
Stays in the foreground. Extra arguments after the known flags go to Vite.

From this directory:
  npm run dev
  npm run dev -- --port 9000

From the lukemay.com repo root:
  npm run game-of-life dev
  npm run game-of-life -- dev --port 9000

Npm swallows a dashed flag unless -- sits between the verb and that flag.
Positional locations (live, dry-run, plan) need no --.

--help and --version exit without starting the server.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
  --help | -h)
    usage
    exit 0
    ;;
  --version | -V)
    echo "game-of-life dev ${VERSION}"
    exit 0
    ;;
  --port)
    if [[ $# -lt 2 ]]; then
      echo -e "${RED}--port needs a number${RESET}" >&2
      exit 2
    fi
    PORT="$2"
    shift 2
    ;;
  --port=*)
    PORT="${1#--port=}"
    shift
    ;;
  --)
    shift
    if [[ $# -gt 0 ]]; then
      EXTRA+=("$@")
    fi
    break
    ;;
  *)
    EXTRA+=("$1")
    shift
    ;;
  esac
done

if [[ ! "$PORT" =~ ^[0-9]+$ ]] || ((10#$PORT < 1 || 10#$PORT > 65535)); then
  echo -e "${RED}port must be a number from 1 to 65535 (got ${PORT})${RESET}" >&2
  exit 2
fi

vite_bin="${PROJECT_DIR}/node_modules/.bin/vite"
if [[ ! -x "$vite_bin" ]]; then
  echo -e "${RED}Missing vite. From this directory run: npm install${RESET}" >&2
  exit 127
fi

cd "$PROJECT_DIR"
echo -e "${BLUE}=== Running ${MAGENTA}game-of-life${BLUE} (dev mode) ===${RESET}"
exec "$vite_bin" --host 127.0.0.1 --port "$PORT" "${EXTRA[@]}"
