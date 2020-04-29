#!/usr/bin/env bash

DOCS_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

rm -rf "${DOCS_DIR}"/pages/_content/* 2>/dev/null || true
rm -rf "${DOCS_DIR}"/out/* 2>/dev/null || true
rm -rf "${DOCS_DIR}"/.next/* 2>/dev/null || true
rm "${DOCS_DIR}"/exports.json 2>/dev/null || true
