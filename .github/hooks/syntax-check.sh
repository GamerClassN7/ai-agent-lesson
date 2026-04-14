#!/usr/bin/env bash
# Syntax check po každé změně souboru (PostToolUse hook)
# Kontroluje JS (node --check), HTML (tidy) a CSS (základní validace)

set -uo pipefail

INPUT=$(cat)

# Získej název nástroje z JSON vstupu
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null)

# Zpracuj pouze nástroje editující soubory
FILES=()
case "$TOOL" in
  replace_string_in_file|create_file)
    FILE=$(echo "$INPUT" | jq -r '.tool_input.filePath // empty' 2>/dev/null)
    [[ -n "$FILE" ]] && FILES+=("$FILE")
    ;;
  multi_replace_string_in_file)
    # Více souborů v poli replacements
    mapfile -t FILES < <(echo "$INPUT" | jq -r '.tool_input.replacements[].filePath // empty' 2>/dev/null | sort -u)
    ;;
  *)
    exit 0
    ;;
esac

ERRORS=()

for FILE in "${FILES[@]}"; do
  [[ -z "$FILE" ]] && continue
  [[ ! -f "$FILE" ]] && continue

  EXT="${FILE##*.}"

  case "$EXT" in
    js)
      ERROR=$(node --check "$FILE" 2>&1) || ERRORS+=("JS syntax error v $(basename "$FILE"): $ERROR")
      ;;
    html)
      if command -v tidy &>/dev/null; then
        ERROR=$(tidy -errors -quiet -utf8 "$FILE" 2>&1) || true
        # tidy vrací exit 1 i pro varování, chyby jsou na řádcích s "Error:"
        if echo "$ERROR" | grep -q "^line.*Error:"; then
          ERRORS+=("HTML syntax error v $(basename "$FILE"): $(echo "$ERROR" | grep "Error:" | head -3)")
        fi
      fi
      ;;
    css)
      # Rychlá kontrola nevyvážených závorek {}
      OPEN=$(grep -o '{' "$FILE" | wc -l)
      CLOSE=$(grep -o '}' "$FILE" | wc -l)
      if [[ "$OPEN" -ne "$CLOSE" ]]; then
        ERRORS+=("CSS syntax error v $(basename "$FILE"): nevyvážené závorky { } (otevřeno: $OPEN, uzavřeno: $CLOSE)")
      fi
      ;;
  esac
done

if [[ ${#ERRORS[@]} -gt 0 ]]; then
  MSG=$(printf '%s\n' "${ERRORS[@]}")
  # Předej chybu agentovi jako system message – agent ji uvidí a opraví
  printf '{"systemMessage": "⚠️ SYNTAX CHECK SELHAL:\n%s\n\nOprav chybu před pokračováním."}' "$MSG"
  exit 2
fi

exit 0
