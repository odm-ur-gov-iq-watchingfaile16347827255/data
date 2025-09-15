#!/bin/bash

# Filename Safety Checker for Pre-commit Hook
# فحص أمان أسماء الملفات لـ pre-commit hook

set -e

echo "🔍 فحص أمان أسماء الملفات..."
echo "🔍 Checking filename safety..."

# Check for unsafe characters in filenames
# فحص الرموز غير الآمنة في أسماء الملفات

exit_code=0

for file in "$@"; do
    # Skip directories / تخطي المجلدات
    if [ -d "$file" ]; then
        continue
    fi
    
    filename=$(basename "$file")
    
    # Check for spaces / فحص المسافات
    if [[ "$filename" =~ [[:space:]] ]]; then
        echo "❌ ملف يحتوي على مسافات: $file"
        echo "❌ File contains spaces: $file"
        exit_code=1
    fi
    
    # Check for special characters / فحص الرموز الخاصة
    if [[ "$filename" =~ [+\=\?\#\%\&] ]]; then
        echo "❌ ملف يحتوي على رموز خاصة: $file"
        echo "❌ File contains special characters: $file"
        exit_code=1
    fi
    
    # Check for very long filenames / فحص الأسماء الطويلة جداً
    if [ ${#filename} -gt 100 ]; then
        echo "⚠️ اسم ملف طويل جداً: $file"
        echo "⚠️ Very long filename: $file"
    fi
done

if [ $exit_code -eq 0 ]; then
    echo "✅ جميع أسماء الملفات آمنة"
    echo "✅ All filenames are safe"
else
    echo ""
    echo "💡 نصائح لإصلاح أسماء الملفات:"
    echo "💡 Tips for fixing filenames:"
    echo "  - استبدل المسافات بشرطات: file name.txt → file-name.txt"
    echo "  - Replace spaces with hyphens: file name.txt → file-name.txt"
    echo "  - استبدل الرموز الخاصة بشرطات: file+name.txt → file-name.txt"
    echo "  - Replace special chars with hyphens: file+name.txt → file-name.txt"
fi

exit $exit_code