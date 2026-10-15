#!/usr/bin/env bash
# Build a local preview in build_local/ with the widget URL and key from .env.
# The deploy fills the same placeholders from GitHub secrets (.github/workflows/deploy.yml).
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env; set +a
: "${CHATBOT_WIDGET_URL:?set it in .env}" "${CHATBOT_WIDGET_KEY:?set it in .env}"
rm -rf build_local && mkdir build_local
cp -R index.html script.js style.css favicon.svg images cv build_local/
sed -i.bak -e "s|__CHATBOT_WIDGET_URL__|$CHATBOT_WIDGET_URL|g" \
           -e "s|__CHATBOT_WIDGET_KEY__|$CHATBOT_WIDGET_KEY|g" build_local/index.html
rm build_local/index.html.bak
echo "Preview: python3 -m http.server -d build_local 8000"
