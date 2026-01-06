#!/bin/bash

# Quick download script for ADD 2.0 IDE configs
# Usage: curl -sSL https://raw.githubusercontent.com/agentdriven/add/main/src/rules/ide/download.sh | bash

set -e

IDE="$1"

if [ -z "$IDE" ]; then
    echo "Usage: $0 <ide>"
    echo ""
    echo "Available IDEs:"
    echo "  cursor       - Cursor IDE"
    echo "  claude       - Claude Code"
    echo "  windsurf     - Windsurf"
    echo "  copilot      - GitHub Copilot"
    echo "  aider        - Aider"
    echo "  continue     - Continue"
    echo ""
    echo "Example: $0 cursor"
    exit 1
fi

BASE_URL="https://agenticdriven.dev/rules/ide"

case "$IDE" in
    cursor)
        echo "📥 Downloading .cursorrules..."
        curl -sSL "$BASE_URL/.cursorrules" -o .cursorrules
        echo "✅ Created .cursorrules"
        ;;
    claude)
        echo "📥 Downloading .clauderc..."
        curl -sSL "$BASE_URL/.clauderc" -o .clauderc
        echo "✅ Created .clauderc"
        ;;
    windsurf)
        echo "📥 Downloading .windsurfrules..."
        curl -sSL "$BASE_URL/.windsurfrules" -o .windsurfrules
        echo "✅ Created .windsurfrules"
        ;;
    copilot)
        echo "📥 Downloading copilot-instructions.md..."
        mkdir -p .github
        curl -sSL "$BASE_URL/.github/copilot-instructions.md" -o .github/copilot-instructions.md
        echo "✅ Created .github/copilot-instructions.md"
        ;;
    aider)
        echo "📥 Downloading Aider config..."
        curl -sSL "$BASE_URL/.aider.conf.yml" -o .aider.conf.yml
        curl -sSL "$BASE_URL/.aider-rules.md" -o .aider-rules.md
        echo "✅ Created .aider.conf.yml and .aider-rules.md"
        ;;
    continue)
        echo "📥 Downloading Continue config..."
        curl -sSL "$BASE_URL/.continuerc.json" -o .continuerc.json
        curl -sSL "$BASE_URL/.continue-rules.md" -o .continue-rules.md
        echo "✅ Created .continuerc.json and .continue-rules.md"
        ;;
    *)
        echo "❌ Unknown IDE: $IDE"
        exit 1
        ;;
esac

echo ""
echo "🎉 ADD 2.0 configuration installed!"
echo "Now your AI assistant will follow ADD methodology."
