#!/bin/bash

# Path Length Checker for Pre-commit Hook
# فحص طول المسارات لـ pre-commit hook

set -e

echo "📏 فحص أطوال المسارات..."
echo "📏 Checking path lengths..."

exit_code=0
max_path_length=260  # Windows limit

for file in "$@"; do
    path_length=${#file}
    
    if [ $path_length -gt $max_path_length ]; then
        echo "❌ مسار طويل جداً ($path_length رمز): $file"
        echo "❌ Path too long ($path_length chars): $file"
        exit_code=1
    elif [ $path_length -gt 200 ]; then
        echo "⚠️ مسار طويل ($path_length رمز): $file"
        echo "⚠️ Long path ($path_length chars): $file"
    fi
done

if [ $exit_code -eq 0 ]; then
    echo "✅ جميع المسارات ضمن الحد المسموح"
    echo "✅ All paths are within acceptable length"
else
    echo ""
    echo "💡 نصائح لتقصير المسارات:"
    echo "💡 Tips for shortening paths:"
    echo "  - اختصر أسماء المجلدات"
    echo "  - Shorten directory names"
    echo "  - استخدم اختصارات معقولة"
    echo "  - Use reasonable abbreviations"
    echo "  - أعد تنظيم بنية المجلدات"
    echo "  - Reorganize directory structure"
fi

exit $exit_code