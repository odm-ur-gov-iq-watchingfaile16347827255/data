# موقع جيوكتيك (Jekyll)

هذا المستودع يعد موقعًا ثابتًا مبنيًا باستخدام Jekyll داخل مجلد docs.

كيفية التشغيل محليًا

1. تثبيت الاعتماديات (إن كان المشروع يستخدم bundler):

   gem install bundler
   bundle install

2. تشغيل خادم Jekyll محليًا من جذر المشروع باستخدام مجلد المصدر docs:

   bundle exec jekyll serve --source docs --watch

ثم افتح: http://localhost:4000

النشر على GitHub Pages

هذا المستودع مُعد لنشر GitHub Pages مباشرة من الفرع الرئيسي main والمجلد /docs.

الإعداد الحالي:
- المصدر: الفرع main 
- المجلد: /docs
- لا يتطلب إعداد إضافي - يتم النشر تلقائياً عند دفع التغييرات لـ main

للتبديل إلى نشر gh-pages (إذا رغبت):
1. افتح إعدادات المستودع (Settings → Pages)
2. اختر الفرع: gh-pages والمجلد: / (root) ثم احفظ
3. قم بتفعيل GitHub Actions workflow للنشر التلقائي

ملفات مضافة/محدّثة
- README.md — هذا الملف.
- docs/assets/images/favicon.svg — أيقونة موقع بسيطة بصيغة SVG.
- robots.txt — قواعد أساسية لعناكب البحث.
- _config.yml — تم تحديث title و description بقيم افتراضية قابلة للتعديل.

Contact

إذا رغبت، أستطيع إضافة ملف GitHub Actions للنشر التلقائي أو تحديث التصميم.
