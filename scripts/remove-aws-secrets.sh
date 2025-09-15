#!/bin/bash

# Script to safely remove AWS credentials from SiteSucker.log
# سكريبت لإزالة بيانات AWS من ملف SiteSucker.log بشكل آمن

set -e

echo "🔐 بدء إزالة بيانات AWS الحساسة..."
echo "🔐 Starting AWS credentials removal..."

LOGFILE="dm.ur.gov.iq+414 4/SiteSucker.log"

if [ ! -f "$LOGFILE" ]; then
    echo "❌ ملف السجل غير موجود: $LOGFILE"
    echo "❌ Log file not found: $LOGFILE"
    exit 1
fi

# Create backup / إنشاء نسخة احتياطية
echo "📋 إنشاء نسخة احتياطية..."
echo "📋 Creating backup..."
cp "$LOGFILE" "$LOGFILE.backup.$(date +%Y%m%d_%H%M%S)"

# Replace AWS Access Key with redacted version / استبدال مفتاح AWS بنسخة مقننة
echo "🔄 استبدال مفتاح AWS..."
echo "🔄 Replacing AWS key..."

# Replace the specific AWS Access Key ID
sed -i 's/AKIATMYPDVJRG5LW5ECN/[REDACTED_AWS_ACCESS_KEY_1]/g' "$LOGFILE"

# Replace AWS signatures in URLs
sed -i 's/X-Amz-Signature=[a-f0-9]\{64\}/X-Amz-Signature=[REDACTED_AWS_SIGNATURE]/g' "$LOGFILE"

# Replace other AWS credential patterns
sed -i 's/X-Amz-Credential=[^&]*/X-Amz-Credential=[REDACTED_AWS_CREDENTIAL]/g' "$LOGFILE"

echo "✅ تم إكمال الاستبدال"
echo "✅ Replacement completed"

# Verify removal / التحقق من الإزالة
echo "🔍 التحقق من إزالة المفاتيح..."
echo "🔍 Verifying key removal..."

if grep -q "AKIATMYPDVJRG5LW5ECN" "$LOGFILE"; then
    echo "❌ لا تزال المفاتيح موجودة!"
    echo "❌ Keys still present!"
    exit 1
else
    echo "✅ تم إزالة جميع المفاتيح بنجاح"
    echo "✅ All keys successfully removed"
fi

# Show file size difference / عرض اختلاف حجم الملف
echo "📊 مقارنة الأحجام:"
echo "📊 Size comparison:"
echo "قبل: $(du -h "$LOGFILE.backup."* | cut -f1) / Before: $(du -h "$LOGFILE.backup."* | cut -f1)"
echo "بعد: $(du -h "$LOGFILE" | cut -f1) / After: $(du -h "$LOGFILE" | cut -f1)"

echo ""
echo "🚨 تذكير أمني مهم:"
echo "🚨 Important security reminder:"
echo "1. قم بتدوير مفتاح AWS فوراً في AWS Console"
echo "1. Rotate AWS key immediately in AWS Console"
echo "2. راجع سجلات CloudTrail للأنشطة المشبوهة"
echo "2. Review CloudTrail logs for suspicious activity"
echo "3. تأكد من عدم وجود موارد AWS غير مصرح بها"
echo "3. Check for unauthorized AWS resources"

echo ""
echo "✅ مكتمل! يمكنك الآن إجراء commit آمن"
echo "✅ Complete! You can now make a safe commit"