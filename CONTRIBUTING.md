# دليل المساهمة في مستودع البيانات
# Contributing to Data Repository

## 🎯 نظرة عامة / Overview

هذا المستودع يحتوي على بيانات حكومية عراقية مع تطبيق معايير أمنية صارمة وإدارة ملفات كبيرة باستخدام Git LFS.

This repository contains Iraqi government data with strict security standards and large file management using Git LFS.

## 🚀 إعداد البيئة المحلية / Local Environment Setup

### المتطلبات / Requirements

```bash
# Git with LFS support
git --version  # >= 2.30
git lfs version  # >= 2.13

# Pre-commit (اختياري / optional)
pip install pre-commit
```

### الإعداد الأولي / Initial Setup

```bash
# 1. استنساخ المستودع / Clone repository
git clone https://github.com/odm-ur-gov-iq-watchingfaile16347827255/data.git
cd data

# 2. إعداد Git LFS / Setup Git LFS
git lfs install
git lfs pull

# 3. إعداد pre-commit hooks (اختياري / optional)
pre-commit install

# 4. التحقق من الإعداد / Verify setup
git lfs ls-files  # Should show LFS tracked files
```

## 📁 إدارة الملفات الكبيرة / Large File Management

### ملفات Git LFS / Git LFS Files

الملفات التالية تُدار تلقائياً بواسطة Git LFS:

The following files are automatically managed by Git LFS:

- **المستندات / Documents:** `*.pdf`
- **الصور / Images:** `*.png`, `*.jpg`, `*.jpeg`, `*.gif`
- **الفيديو / Video:** `*.mp4`, `*.avi`, `*.mov`
- **الصوت / Audio:** `*.mp3`, `*.wav`, `*.ogg`
- **الأرشيف / Archives:** `*.zip`, `*.rar`, `*.7z`
- **الخطوط / Fonts:** `*.woff`, `*.woff2`, `*.ttf`

### إضافة ملفات كبيرة / Adding Large Files

```bash
# إضافة ملف كبير جديد / Add new large file
git add large-file.pdf
git commit -m "إضافة ملف PDF جديد / Add new PDF file"

# التحقق من تتبع LFS / Verify LFS tracking
git lfs ls-files | grep large-file.pdf
```

### حل مشاكل Git LFS / Troubleshooting Git LFS

```bash
# تنزيل جميع ملفات LFS / Download all LFS files
git lfs pull

# إعادة تعيين ملفات LFS / Reset LFS files
git lfs checkout

# فحص سلامة ملفات LFS / Check LFS file integrity
git lfs fsck

# عرض حالة LFS / Show LFS status
git lfs status
```

## 🛡️ معايير الأمان / Security Standards

### 🚫 محظورات أمنية / Security Prohibitions

**لا تقم بإضافة:**
- مفاتيح AWS (Access Keys, Secret Keys)
- رموز GitHub الشخصية
- كلمات مرور
- مفاتيح خاصة (Private Keys)
- ملفات `.env` مع بيانات حساسة

**Do not add:**
- AWS keys (Access Keys, Secret Keys)
- GitHub personal tokens
- Passwords
- Private keys
- `.env` files with sensitive data

### ✅ فحص ما قبل الإرسال / Pre-commit Checks

سيتم فحص:
- الأسرار والمفاتيح الحساسة
- أحجام الملفات (>5MB يجب أن تكون في LFS)
- أمان أسماء الملفات
- طول المسارات

The following will be checked:
- Secrets and sensitive keys
- File sizes (>5MB must be in LFS)
- Filename safety
- Path lengths

### 🔍 فحص يدوي / Manual Check

```bash
# فحص الأسرار / Check for secrets
grep -r "AKIA" . --exclude-dir=.git || echo "آمن / Safe"

# فحص الملفات الكبيرة / Check large files
find . -size +5M -not -path "./.git/*"

# فحص أسماء الملفات / Check filenames
./scripts/check-filename-safety.sh file1 file2
```

## 📝 إرشادات أسماء الملفات / Filename Guidelines

### ✅ أسماء آمنة / Safe Names

```
✅ government-report-2025.pdf
✅ budget-analysis.xlsx
✅ ministry-data.json
✅ تقرير-الميزانية-2025.pdf
```

### ❌ أسماء غير آمنة / Unsafe Names

```
❌ government report 2025.pdf  (مسافات / spaces)
❌ budget+analysis.xlsx        (رمز + / plus sign)
❌ ministry=data.json          (رمز = / equals sign)
❌ file?name.pdf               (رمز ? / question mark)
```

### 🔧 تصحيح الأسماء / Name Correction

```bash
# استبدال المسافات بشرطات / Replace spaces with hyphens
mv "government report.pdf" "government-report.pdf"

# استبدال رموز خاصة / Replace special characters
mv "budget+analysis.xlsx" "budget-analysis.xlsx"
```

## 🔄 سير العمل / Workflow

### 1. إنشاء فرع جديد / Create New Branch

```bash
git checkout -b feature/new-data-source
```

### 2. إضافة التغييرات / Add Changes

```bash
# إضافة ملفات صغيرة / Add small files
git add *.txt *.json *.md

# إضافة ملفات كبيرة (LFS) / Add large files (LFS)
git add *.pdf *.png *.mp4

# التحقق من الحالة / Check status
git status
git lfs status
```

### 3. إرسال التعهد / Commit Changes

```bash
git commit -m "إضافة بيانات وزارة التعليم / Add education ministry data"
```

### 4. دفع الفرع / Push Branch

```bash
git push origin feature/new-data-source
```

### 5. إنشاء Pull Request / Create Pull Request

- انتقل إلى GitHub
- أنشئ Pull Request
- انتظر المراجعة الأمنية
- Go to GitHub
- Create Pull Request  
- Wait for security review

## 🔧 حل المشاكل الشائعة / Common Issues

### مشكلة: "File too large" / Issue: "File too large"

```bash
# Solution: Add to LFS / الحل: إضافة إلى LFS
git lfs track "*.pdf"
git add .gitattributes
git add large-file.pdf
git commit -m "Add large file to LFS"
```

### مشكلة: "LFS file not found" / Issue: "LFS file not found"

```bash
# Solution: Pull LFS files / الحل: سحب ملفات LFS
git lfs pull
git lfs checkout
```

### مشكلة: "Unsafe filename" / Issue: "Unsafe filename"

```bash
# Solution: Rename file / الحل: إعادة تسمية الملف
mv "file name.txt" "file-name.txt"
git add "file-name.txt"
```

## 📊 مراقبة الحجم / Size Monitoring

### تحقق من حجم المستودع / Check Repository Size

```bash
# حجم .git المحلي / Local .git size
du -sh .git/

# قائمة أكبر الملفات / List largest files
git lfs ls-files | head -10

# استخدام LFS / LFS usage
git lfs env
```

## 🤝 المراجعة والدمج / Review and Merge

### معايير المراجعة / Review Criteria

1. **الأمان / Security:** لا أسرار مكشوفة
2. **الحجم / Size:** ملفات كبيرة في LFS
3. **التسمية / Naming:** أسماء ملفات آمنة
4. **البيانات / Data:** صحة وجودة البيانات
5. **التوثيق / Documentation:** توثيق مناسب

### عملية الدمج / Merge Process

1. مراجعة أمنية تلقائية / Automated security review
2. مراجعة بشرية / Human review
3. اختبار التكامل / Integration testing
4. دمج في الفرع الرئيسي / Merge to main branch

## 📞 الدعم والمساعدة / Support and Help

### مشاكل أمنية / Security Issues
- لا تقم بالإرسال / Do not commit
- تواصل مع فريق الأمان فوراً / Contact security team immediately

### مشاكل تقنية / Technical Issues
- راجع هذا الدليل أولاً / Check this guide first
- ابحث في Issues الموجودة / Search existing issues
- أنشئ issue جديد / Create new issue

### موارد إضافية / Additional Resources
- [Git LFS Documentation](https://git-lfs.github.io/)
- [Pre-commit Documentation](https://pre-commit.com/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

---

**شكراً لمساهمتك في تحسين البيانات الحكومية العراقية!**  
**Thank you for contributing to Iraqi government data improvement!**