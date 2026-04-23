#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

backend_pid=""
frontend_pid=""

cleanup() {
    local exit_code=$?

    if [[ -n "$backend_pid" ]] && kill -0 "$backend_pid" 2>/dev/null; then
        kill "$backend_pid" 2>/dev/null || true
    fi

    if [[ -n "$frontend_pid" ]] && kill -0 "$frontend_pid" 2>/dev/null; then
        kill "$frontend_pid" 2>/dev/null || true
    fi

    wait "$backend_pid" "$frontend_pid" 2>/dev/null || true

    exit "$exit_code"
}

trap cleanup EXIT INT TERM

echo "Installing and setting up the backend..."
(
    cd "$BACKEND_DIR"
    composer setup
)

echo "Installing frontend dependencies..."
(
    cd "$FRONTEND_DIR"
    npm install
)

echo "Starting backend development services..."
(
    cd "$BACKEND_DIR"
    composer dev
) &
backend_pid=$!

echo "Starting frontend development server..."
(
    cd "$FRONTEND_DIR"
    npm run dev
) &
frontend_pid=$!

wait -n "$backend_pid" "$frontend_pid"
