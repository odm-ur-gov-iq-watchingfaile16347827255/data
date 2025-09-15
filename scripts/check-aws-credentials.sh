#!/bin/bash

# AWS Credentials Checker for Pre-commit Hook
# فحص بيانات اعتماد AWS لـ pre-commit hook

set -e

echo "🔐 فحص بيانات اعتماد AWS..."
echo "🔐 Checking AWS credentials..."

exit_code=0

# Check for AWS Access Key IDs / فحص معرفات مفاتيح AWS
if grep -r "AKIA[0-9A-Z]\{16\}" . --exclude-dir=.git --exclude="*.log" --exclude-dir=analysis 2>/dev/null; then
    echo "❌ تم اكتشاف AWS Access Key ID!"
    echo "❌ AWS Access Key ID detected!"
    exit_code=1
fi

# Check for AWS Secret Access Keys patterns / فحص أنماط مفاتيح AWS السرية
if grep -r -E "(aws_secret_access_key|AWS_SECRET_ACCESS_KEY)" . --exclude-dir=.git --exclude="*.log" --exclude-dir=analysis 2>/dev/null; then
    echo "❌ تم اكتشاف مرجع إلى AWS Secret Key!"
    echo "❌ AWS Secret Key reference detected!"
    exit_code=1
fi

# Check for AWS Session Tokens / فحص رموز جلسة AWS
if grep -r -E "(aws_session_token|AWS_SESSION_TOKEN)" . --exclude-dir=.git --exclude="*.log" --exclude-dir=analysis 2>/dev/null; then
    echo "❌ تم اكتشاف AWS Session Token!"
    echo "❌ AWS Session Token detected!"
    exit_code=1
fi

# Check for long AWS credential patterns in URLs / فحص أنماط بيانات AWS في URLs
if grep -r -E "X-Amz-Credential=[A-Z0-9]{20}" . --exclude-dir=.git --exclude="*.log" --exclude-dir=analysis 2>/dev/null; then
    echo "⚠️ تم اكتشاف بيانات AWS في URL!"
    echo "⚠️ AWS credentials in URL detected!"
    echo "💡 قد تكون هذه URLs مؤقتة، لكن يُنصح بمراجعتها"
    echo "💡 These might be temporary URLs, but please review"
fi

if [ $exit_code -eq 0 ]; then
    echo "✅ لم يتم اكتشاف بيانات اعتماد AWS"
    echo "✅ No AWS credentials detected"
else
    echo ""
    echo "🚨 إجراءات مطلوبة فوراً:"
    echo "🚨 Immediate actions required:"
    echo "  1. لا تقم بالـ commit"
    echo "  1. Do not commit"
    echo "  2. أزل بيانات الاعتماد من الملفات"
    echo "  2. Remove credentials from files"
    echo "  3. دوّر المفاتيح في AWS Console"
    echo "  3. Rotate keys in AWS Console"
    echo "  4. راجع سجلات AWS CloudTrail"
    echo "  4. Review AWS CloudTrail logs"
fi

exit $exit_code