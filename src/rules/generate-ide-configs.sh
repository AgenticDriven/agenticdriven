#!/bin/bash

# Generate IDE configuration files from ADD rules
# Usage: ./generate-ide-configs.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RULES_DIR="$SCRIPT_DIR"
OUTPUT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"  # Project root

echo "🚀 Generating IDE configurations from ADD rules..."
echo ""

# Function to concatenate all markdown files in order
concat_rules() {

    # Specific order for better reading
    local files=(
        "principles.md"
        "phases.md"
        "versioning.md"
        "git-commits.md"
        "git-tags.md"
        "project-structure.md"
        "project-config.md"
        "documentation.md"
        "journal.md"
        "decisions.md"
        "contracts.md"
        "ai-workflow.md"
        "exit-criteria.md"
        "troubleshooting.md"
    )

    for file in "${files[@]}"; do
        if [ -f "$RULES_DIR/$file" ]; then
            cat "$RULES_DIR/$file"
            echo ""
        fi
    done
}

# Generate .cursorrules (Cursor IDE)
echo "📝 Generating .cursorrules (Cursor)..."
concat_rules > "$OUTPUT_DIR/.cursorrules"

# Generate claude.md (Claude Code)
echo "📝 Generating claude.md (Claude Code)..."
concat_rules > "$OUTPUT_DIR/claude.md"

# Generate .windsurfrules (Windsurf)
echo "📝 Generating .windsurfrules (Windsurf)..."
concat_rules > "$OUTPUT_DIR/.windsurfrules"

# Generate copilot-instructions.md (GitHub Copilot)
echo "📝 Generating copilot-instructions.md (GitHub Copilot)..."
mkdir -p "$OUTPUT_DIR/.github"
concat_rules > "$OUTPUT_DIR/.github/copilot-instructions.md"

# Generate .aider.conf.yml (Aider)
echo "📝 Generating .aider.conf.yml (Aider)..."
cat > "$OUTPUT_DIR/.aider.conf.yml" << 'EOF'
# Aider configuration for ADD 2.0
# https://aider.chat/docs/config.html

# Model settings
model: gpt-4
edit-format: diff

# Git settings
auto-commits: false
dirty-commits: false
commit: false

# Read-only files (always include in context)
read:
  - add.yaml
  - README.md
  - docs/journal.md
  - docs/interfaces.md

# Message template
message-template: |
  Follow Agent-Driven Development (ADD) 2.0 methodology:

  1. Read add.yaml and docs/ before starting
  2. Follow current phase guidelines
  3. Use Conventional Commits format
  4. Update docs/journal.md with progress
  5. Respect contracts in docs/interfaces.md
  6. Commit frequently with clear messages
  7. Tag phase completions

  See full rules in .aider-rules.md

# Additional settings
show-diffs: true
pretty: true
stream: true

# Ignored patterns
ignore:
  - "*.log"
  - "node_modules/*"
  - "venv/*"
  - ".git/*"
  - "dist/*"
  - "build/*"
EOF

# Generate .aider-rules.md (detailed rules for Aider)
echo "📝 Generating .aider-rules.md (Aider rules)..."
concat_rules > "$OUTPUT_DIR/.aider-rules.md"

# Generate .continuerc.json (Continue)
echo "📝 Generating .continuerc (Continue)..."
cat > "$OUTPUT_DIR/.continuerc.json" << 'EOF'
{
  "name": "ADD 2.0 Configuration",
  "version": "2.0.0",
  "customCommands": [
    {
      "name": "init-add",
      "description": "Initialize ADD project",
      "prompt": "Initialize a new ADD 2.0 project:\n1. Create add.yaml with domain\n2. Create README.md\n3. Create docs/journal.md\n4. Initialize git\n5. First commit"
    },
    {
      "name": "read-context",
      "description": "Read project context",
      "prompt": "Read and summarize:\n1. add.yaml\n2. Current git status\n3. Latest git tag (current phase)\n4. docs/journal.md\n5. Current phase documentation"
    },
    {
      "name": "update-journal",
      "description": "Update journal",
      "prompt": "Update docs/journal.md with today's date and current progress"
    },
    {
      "name": "check-exit-criteria",
      "description": "Check phase exit criteria",
      "prompt": "Check if current phase exit criteria are met. Review checklist and report status."
    },
    {
      "name": "validate-contracts",
      "description": "Validate contract compliance",
      "prompt": "Check if implementation matches contracts in docs/interfaces.md"
    }
  ],
  "contextProviders": [
    {
      "name": "add-config",
      "description": "ADD project configuration",
      "params": {
        "files": ["add.yaml"]
      }
    },
    {
      "name": "add-journal",
      "description": "Project journal",
      "params": {
        "files": ["docs/journal.md"]
      }
    },
    {
      "name": "add-contracts",
      "description": "Interface contracts",
      "params": {
        "files": ["docs/interfaces.md"]
      }
    }
  ],
  "slashCommands": [
    {
      "name": "add-phase",
      "description": "Show current phase info and exit criteria"
    },
    {
      "name": "add-commit",
      "description": "Create conventional commit with current changes"
    }
  ],
  "systemMessage": "You are an AI assistant following Agent-Driven Development (ADD) 2.0 methodology. Always:\n\n1. Read add.yaml and docs/ at session start\n2. Follow current phase guidelines\n3. Use Conventional Commits format\n4. Update docs/journal.md\n5. Respect contracts in docs/interfaces.md\n6. Commit frequently\n7. Tag phase completions\n\nSee .continue-rules.md for complete rules."
}
EOF

# Generate .continue-rules.md (detailed rules for Continue)
echo "📝 Generating .continue-rules.md (Continue rules)..."
concat_rules > "$OUTPUT_DIR/.continue-rules.md"

# Generate README for the ide directory
echo "📝 Generating README.md..."
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# ADD 2.0 IDE Configurations

Pre-configured IDE settings for Agent-Driven Development (ADD) 2.0.

## Available Configurations

### Cursor

```bash
cp .cursorrules /path/to/your/project/
```

### Claude Code

```bash
cp claude.md /path/to/your/project/
```

### Windsurf

```bash
cp .windsurfrules /path/to/your/project/
```

### GitHub Copilot

```bash
mkdir -p /path/to/your/project/.github
cp .github/copilot-instructions.md /path/to/your/project/.github/
```

### Aider

```bash
cp .aider.conf.yml /path/to/your/project/
cp .aider-rules.md /path/to/your/project/
```

### Continue

```bash
cp .continuerc.json /path/to/your/project/
cp .continue-rules.md /path/to/your/project/
```

## Installation

Copy the relevant configuration file(s) to your project root.

## What's Included

All configurations include:
- 6 core ADD principles
- 10 phases + exit criteria
- Git workflow (commits, tags, versioning)
- Documentation requirements
- Testing guidelines
- Project structure
- AI workflow
- Troubleshooting guide

## Customization

Feel free to adapt these configurations to your project's specific needs while maintaining the core ADD principles.

## Version

Generated: $(date +%Y-%m-%d)
ADD Version: 2.0

## Source

https://agenticdriven.dev
EOF

# Generate download script
echo "📝 Generating download.sh..."
cat > "$OUTPUT_DIR/download.sh" << 'EOF'
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
        echo "📥 Downloading claude.md..."
        curl -sSL "$BASE_URL/claude.md" -o claude.md
        echo "✅ Created claude.md"
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
EOF

chmod +x "$OUTPUT_DIR/download.sh"

echo ""
echo "✅ All IDE configurations generated in: $OUTPUT_DIR"
echo ""
echo "Generated files:"
ls -lh "$OUTPUT_DIR" | tail -n +2
echo ""
echo "📦 Total size: $(du -sh "$OUTPUT_DIR" | cut -f1)"
echo ""
echo "🎉 Done!"
