#!/bin/bash

# Repository Cleanup Script
# أسكريبت تنظيف شامل للمستودع

set -e

REPO_DIR="/home/runner/work/data/data"
DATA_DIR="$REPO_DIR/dm.ur.gov.iq+414 4"
OUTPUT_DIR="$REPO_DIR/analysis"

echo "بدء التحليل الشامل للمستودع..."
echo "Starting comprehensive repository analysis..."

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to scan for large files
scan_large_files() {
    echo "فحص الملفات الكبيرة..."
    echo "Scanning for large files..."
    
    find "$DATA_DIR" -type f -size +5M -exec ls -lh {} \; | sort -k5 -hr > "$OUTPUT_DIR/large_files.txt"
    
    echo "Top 50 largest files:" > "$OUTPUT_DIR/top_50_largest.txt"
    find "$DATA_DIR" -type f -exec ls -l {} \; | sort -k5 -nr | head -50 | while read -r line; do
        echo "$line" >> "$OUTPUT_DIR/top_50_largest.txt"
    done
}

# Function to scan for unsafe file names
scan_unsafe_paths() {
    echo "فحص أسماء الملفات والمسارات غير الآمنة..."
    echo "Scanning for unsafe file paths..."
    
    # Find files with spaces, special characters, or long paths
    find "$DATA_DIR" -type f | grep -E '[ +&=?#%]' > "$OUTPUT_DIR/unsafe_paths.txt" || true
    find "$DATA_DIR" -type f | while read -r file; do
        if [ ${#file} -gt 260 ]; then
            echo "$file" >> "$OUTPUT_DIR/long_paths.txt"
        fi
    done
}

# Function to scan for secrets
scan_secrets() {
    echo "فحص الأسرار والمفاتيح..."
    echo "Scanning for secrets and keys..."
    
    # Create patterns file for secret detection
    cat > "$OUTPUT_DIR/secret_patterns.txt" << 'EOF'
-----BEGIN.*PRIVATE KEY-----
-----BEGIN.*RSA PRIVATE KEY-----
AKIA[0-9A-Z]{16}
AIza[0-9A-Za-z_-]{35}
ghp_[A-Za-z0-9]{36}
github_pat_[A-Za-z0-9_]{82}
sk-[A-Za-z0-9]{48}
xoxb-[0-9]{11}-[0-9]{11}-[A-Za-z0-9]{24}
xoxp-[0-9]{11}-[0-9]{11}-[A-Za-z0-9]{24}
[Pp]assword\s*[=:]\s*[^\s'"]+
[Aa]pi[_-]?[Kk]ey\s*[=:]\s*[^\s'"]+
[Ss]ecret\s*[=:]\s*[^\s'"]+
[Tt]oken\s*[=:]\s*[^\s'"]+
basic://[^@]+@
https://[^:]+:[^@]+@
postgresql://[^:]+:[^@]+@
mysql://[^:]+:[^@]+@
EOF

    # Scan for secrets in text files
    grep -r -f "$OUTPUT_DIR/secret_patterns.txt" "$DATA_DIR" --include="*.js" --include="*.html" --include="*.env" --include="*.config" --include="*.json" --include="*.xml" --include="*.txt" > "$OUTPUT_DIR/potential_secrets.txt" 2>/dev/null || true
}

# Function to analyze media files
scan_media_files() {
    echo "فحص ملفات الوسائط..."
    echo "Scanning media files..."
    
    find "$DATA_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.mp4" -o -name "*.avi" -o -name "*.pdf" \) -exec ls -lh {} \; | sort -k5 -hr > "$OUTPUT_DIR/media_files.txt"
}

# Function to check workflows
check_workflows() {
    echo "فحص GitHub workflows..."
    echo "Checking GitHub workflows..."
    
    if [ -d "$REPO_DIR/.github/workflows" ]; then
        cp -r "$REPO_DIR/.github/workflows" "$OUTPUT_DIR/"
        ls -la "$REPO_DIR/.github/workflows" > "$OUTPUT_DIR/workflows_list.txt"
    fi
}

# Run all scans
scan_large_files
scan_unsafe_paths
scan_secrets
scan_media_files
check_workflows

echo "التحليل مكتمل. النتائج محفوظة في: $OUTPUT_DIR"
echo "Analysis completed. Results saved in: $OUTPUT_DIR"