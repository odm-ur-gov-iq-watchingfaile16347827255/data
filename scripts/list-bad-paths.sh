#!/bin/bash

# List Bad Paths Script
# This script identifies files and directories with problematic names for web deployment
# It looks for spaces, plus signs, %20 sequences, and non-ASCII characters

set -e

echo "=== List Bad Paths Script ==="
echo "This script identifies files and directories with names that may cause issues"
echo "when deploying to GitHub Pages or other web servers."
echo ""

# Function to check for problematic characters
check_problematic_paths() {
    local issues_found=0
    
    echo "=== CHECKING FOR PROBLEMATIC FILE/DIRECTORY NAMES ==="
    echo ""
    
    # Check for spaces in names
    echo "1. Files/directories with spaces:"
    local space_files
    space_files=$(find . -name "* *" 2>/dev/null || true)
    if [ -n "$space_files" ]; then
        echo "$space_files" | sed 's/^/  /'
        issues_found=1
    else
        echo "  None found."
    fi
    echo ""
    
    # Check for plus signs
    echo "2. Files/directories with plus signs (+):"
    local plus_files
    plus_files=$(find . -name "*+*" 2>/dev/null || true)
    if [ -n "$plus_files" ]; then
        echo "$plus_files" | sed 's/^/  /'
        issues_found=1
    else
        echo "  None found."
    fi
    echo ""
    
    # Check for %20 sequences
    echo "3. Files/directories with %20 sequences:"
    local percent_files
    percent_files=$(find . -name "*%20*" 2>/dev/null || true)
    if [ -n "$percent_files" ]; then
        echo "$percent_files" | sed 's/^/  /'
        issues_found=1
    else
        echo "  None found."
    fi
    echo ""
    
    # Check for non-ASCII characters (more comprehensive)
    echo "4. Files/directories with non-ASCII characters:"
    local non_ascii_files
    non_ascii_files=$(find . -name "*[^[:ascii:]]*" 2>/dev/null || true)
    if [ -n "$non_ascii_files" ]; then
        echo "$non_ascii_files" | sed 's/^/  /'
        issues_found=1
    else
        echo "  None found."
    fi
    echo ""
    
    # Check for other potentially problematic characters
    echo "5. Files/directories with other special characters (&, =, ?, #, etc.):"
    local special_files
    special_files=$(find . \( -name "*&*" -o -name "*=*" -o -name "*?*" -o -name "*#*" -o -name "*;*" -o -name "*<*" -o -name "*>*" \) 2>/dev/null || true)
    if [ -n "$special_files" ]; then
        echo "$special_files" | sed 's/^/  /'
        issues_found=1
    else
        echo "  None found."
    fi
    echo ""
    
    return $issues_found
}

# Function to provide recommendations
provide_recommendations() {
    echo "=== RECOMMENDATIONS ==="
    echo ""
    echo "Files and directories with problematic names should be renamed to avoid"
    echo "issues with web servers and GitHub Pages. Here are the recommended steps:"
    echo ""
    echo "1. Use 'git mv' to rename files/directories to maintain Git history:"
    echo "   git mv \"old name with spaces.html\" \"new-name-with-hyphens.html\""
    echo ""
    echo "2. Recommended naming conventions for web deployment:"
    echo "   - Use hyphens (-) instead of spaces"
    echo "   - Use underscores (_) for separating logical parts"
    echo "   - Use lowercase letters when possible"
    echo "   - Avoid special characters (&, =, ?, #, +, %, etc.)"
    echo "   - Use ASCII characters only"
    echo ""
    echo "3. After renaming, update any references to these files in:"
    echo "   - HTML href and src attributes"
    echo "   - CSS @import and url() references"
    echo "   - JavaScript file references"
    echo "   - Configuration files"
    echo ""
    echo "4. Test thoroughly after renaming to ensure all links still work."
    echo ""
    echo "IMPORTANT: Do NOT rename files automatically as this may break internal links!"
    echo "Manual review and testing is required for each rename operation."
}

# Function to generate rename suggestions
generate_rename_suggestions() {
    echo "=== SUGGESTED RENAMES ==="
    echo ""
    echo "Here are some suggested 'git mv' commands for the most common issues:"
    echo "(Review carefully before executing!)"
    echo ""
    
    # Suggest renames for files with spaces
    local space_files
    space_files=$(find . -name "* *" -type f 2>/dev/null | head -20 || true)
    
    if [ -n "$space_files" ]; then
        echo "# Files with spaces (showing first 20):"
        while IFS= read -r file; do
            if [ -f "$file" ]; then
                local dir
                dir=$(dirname "$file")
                local basename
                basename=$(basename "$file")
                local new_name
                new_name=$(echo "$basename" | sed 's/ /-/g' | sed 's/--*/-/g')
                
                if [ "$basename" != "$new_name" ]; then
                    echo "git mv \"$file\" \"$dir/$new_name\""
                fi
            fi
        done <<< "$space_files"
        echo ""
    fi
    
    # Note about directories
    echo "# Note: Directory renames should be done carefully as they affect many files"
    echo "# Consider the impact on internal links before renaming directories"
}

# Main execution
echo "Working directory: $(pwd)"
echo ""

# Check if we're in the right directory
if [ ! -d "dm.ur.gov.iq+414 4" ]; then
    echo "Warning: Expected data directory 'dm.ur.gov.iq+414 4' not found."
    echo "Please run this script from the repository root."
    echo "Continuing with current directory..."
    echo ""
fi

# Check for problematic paths
if check_problematic_paths; then
    echo "=== ISSUES FOUND ==="
    echo "Problematic file/directory names were found."
    echo ""
    
    provide_recommendations
    
    echo ""
    read -p "Do you want to see suggested rename commands? (y/N): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        generate_rename_suggestions
    fi
    
    echo ""
    echo "Summary: Issues found. Manual review and renaming recommended."
    exit 1
else
    echo "=== ALL CLEAR ==="
    echo "No problematic file or directory names found!"
    echo "Your repository is ready for web deployment."
    exit 0
fi