#!/bin/bash

# Fix CDN URLs Script
# This script finds and replaces relative CDN URLs with absolute HTTPS URLs
# It works on *.html and *.htm files only and requires confirmation before making changes

set -e

echo "=== Fix CDN URLs Script ==="
echo "This script will search for relative CDN URLs and replace them with absolute HTTPS URLs."
echo ""

# Define the patterns to search for and their replacements
declare -A CDN_PATTERNS=(
    ["../cdn.jsdelivr.net"]="https://cdn.jsdelivr.net"
    ["../ajax.googleapis.com"]="https://ajax.googleapis.com"
    ["../fonts.googleapis.com"]="https://fonts.googleapis.com"
    ["../cdnjs.cloudflare.com"]="https://cdnjs.cloudflare.com"
)

# Function to find files with CDN patterns
find_files_with_patterns() {
    local files_found=0
    echo "Searching for HTML files with relative CDN URLs..."
    echo ""
    
    for pattern in "${!CDN_PATTERNS[@]}"; do
        echo "Checking for pattern: $pattern"
        local found_files=""
        local count=0
        
        # Get list of HTML files first
        local html_files
        html_files=$(find . -name "*.html" -o -name "*.htm")
        
        # Check each file for the pattern
        while IFS= read -r file; do
            if [ -f "$file" ] && fgrep -q "$pattern" "$file" 2>/dev/null; then
                if [ $count -eq 0 ]; then
                    found_files="$file"
                else
                    found_files="$found_files"$'\n'"$file"
                fi
                ((count++))
                files_found=1
            fi
        done <<< "$html_files"
        
        if [ -n "$found_files" ]; then
            echo "Files containing '$pattern' ($count files):"
            echo "$found_files" | sed 's/^/  /'
        else
            echo "  No files found with this pattern."
        fi
        echo ""
    done
    
    if [ $files_found -eq 1 ]; then
        return 0  # Success - files found
    else
        return 1  # No files found
    fi
}

# Function to show what changes will be made
preview_changes() {
    echo "=== PREVIEW OF CHANGES ==="
    echo ""
    
    for pattern in "${!CDN_PATTERNS[@]}"; do
        local replacement="${CDN_PATTERNS[$pattern]}"
        echo "Will replace: $pattern"
        echo "        with: $replacement"
        echo ""
        
        # Show actual occurrences
        local total_occurrences=0
        local html_files
        html_files=$(find . -name "*.html" -o -name "*.htm")
        
        while IFS= read -r file; do
            if [ -f "$file" ] && fgrep -q "$pattern" "$file" 2>/dev/null; then
                local file_occurrences
                file_occurrences=$(fgrep -n "$pattern" "$file" 2>/dev/null || true)
                if [ -n "$file_occurrences" ]; then
                    echo "Occurrences in $file:"
                    echo "$file_occurrences" | sed 's/^/    /'
                    local count
                    count=$(echo "$file_occurrences" | wc -l)
                    ((total_occurrences += count))
                fi
            fi
        done <<< "$html_files"
        
        if [ $total_occurrences -eq 0 ]; then
            echo "  No occurrences found."
        else
            echo "  Total occurrences: $total_occurrences"
        fi
        echo ""
    done
}

# Function to apply the changes
apply_changes() {
    echo "=== APPLYING CHANGES ==="
    echo ""
    
    local total_replacements=0
    
    for pattern in "${!CDN_PATTERNS[@]}"; do
        local replacement="${CDN_PATTERNS[$pattern]}"
        echo "Processing pattern: $pattern -> $replacement"
        
        local count=0
        local html_files
        html_files=$(find . -name "*.html" -o -name "*.htm")
        
        # Process files one by one
        while IFS= read -r file; do
            if [ -f "$file" ] && fgrep -q "$pattern" "$file" 2>/dev/null; then
                # Count occurrences before replacement
                local before_count
                before_count=$(fgrep -c "$pattern" "$file" 2>/dev/null || echo "0")
                
                # Use sed with literal replacement (escape special chars for sed)
                local escaped_pattern
                escaped_pattern=$(printf '%s\n' "$pattern" | sed 's/[[\.*^$(){}?+|]/\\&/g')
                local escaped_replacement
                escaped_replacement=$(printf '%s\n' "$replacement" | sed 's/[[\.*^$(){}?+|]/\\&/g')
                
                # Perform the replacement
                sed -i "s|$escaped_pattern|$escaped_replacement|g" "$file"
                
                echo "  Updated: $file ($before_count replacements)"
                ((count += before_count))
            fi
        done <<< "$html_files"
        
        echo "  Total replacements for this pattern: $count"
        ((total_replacements += count))
        echo ""
    done
    
    echo "=== SUMMARY ==="
    echo "Total replacements made: $total_replacements"
    echo ""
    
    if [ $total_replacements -gt 0 ]; then
        echo "Changes have been applied successfully!"
        echo "Suggested commit message: 'Fix CDN/Google URLs to absolute https'"
    else
        echo "No changes were needed."
    fi
}

# Main execution
echo "Working directory: $(pwd)"
echo ""

# Check if we're in the right directory (should contain the data directory)
if [ ! -d "dm.ur.gov.iq+414 4" ]; then
    echo "Warning: Expected data directory 'dm.ur.gov.iq+414 4' not found."
    echo "Please run this script from the repository root."
    exit 1
fi

# Find and show files that match our patterns
if ! find_files_with_patterns; then
    echo "No HTML files with relative CDN URLs found. Nothing to fix!"
    exit 0
fi

# Show preview of changes
preview_changes

# Ask for confirmation
echo "=== CONFIRMATION ==="
read -p "Do you want to proceed with these changes? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 0
fi

# Apply the changes
apply_changes

echo ""
echo "Script completed successfully!"