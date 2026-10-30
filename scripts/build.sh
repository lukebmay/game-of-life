#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VERSION="0.1.0"

usage() {
  cat <<'EOF'
Usage: scripts/build.sh

Run the existing rebuild: clean, typecheck, then Vite.
Does not call npm run dev.
deploy.sh calls this unless the location is plan or --skip-build is set.
EOF
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi
if [[ "${1:-}" == "--version" || "${1:-}" == "-V" ]]; then
  echo "game-of-life build ${VERSION}"
  exit 0
fi
if [[ $# -gt 0 ]]; then
  echo "unknown argument: $1" >&2
  exit 2
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Missing npm. Install Node.js." >&2
  exit 127
fi

cd "$PROJECT_DIR"
npm run rebuild
