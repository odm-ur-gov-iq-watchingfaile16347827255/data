#!/usr/bin/env bash
# سكربت آمن لتحويل روابط CDN الخاطئة (../cdn... أو ../ajax... الخ) إلى https absolute.
# تشغيل: chmod +x scripts/fix-cdn-urls.sh && ./scripts/fix-cdn-urls.sh
set -euo pipefail
echo "Running CDN URL fix (dry-run mode)."
# 1) عرض الملفات التي تحتوي الأنماط المعروفة (dry-run)
grep -RIl --exclude-dir=".git" "\.\./cdn.jsdelivr.net" || true
grep -RIl --exclude-dir=".git" "\.\./ajax.googleapis.com" || true
grep -RIl --exclude-dir=".git" "\.\./fonts.googleapis.com" || true
grep -RIl --exclude-dir=".git" "\.\./cdnjs.cloudflare.com" || true

read -p "Proceed to replace these patterns in all .html/.htm files? (y/N) " yn
if [[ "$yn" != "y" && "$yn" != "Y" ]]; then
echo "Aborting. No changes made."
  exit 0
fi

# 2) Perform replacements (in-place)
find . -type f \( -iname "*.html" -o -iname "*.htm" \) -print0 | while IFS= read -r -d '' file; do
  perl -0777 -pe '\n    s{\.\./cdn.jsdelivr.net}{https://cdn.jsdelivr.net}g;
    s{\.\./ajax.googleapis.com}{https://ajax.googleapis.com}g;
    s{\.\./fonts.googleapis.com}{https://fonts.googleapis.com}g;
    s{\.\./cdnjs.cloudflare.com}{https://cdnjs.cloudflare.com}g;
  ' -i "$file"
done

echo "Replacements done. Please review changes and test locally."
echo "Suggested next steps:"
echo "  git add -A && git commit -m \"Fix CDN/Google URLs to absolute https://\""