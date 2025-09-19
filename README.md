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

هذا المستودع يقدم صفحات GitHub Pages من الفرع main والمجلد /docs. لا تقوم GitHub Actions بالنشر إلى فرع gh-pages.

1. افتح إعدادات المستودع (Settings → Pages).
2. اختر الفرع: main والمجلد: /docs ثم احفظ.
3. انتظر بضع دقائق حتى يتم النشر.

ملاحظة: إذا كنت تريد التبديل إلى نشر تلقائي عبر فرع gh-pages في المستقبل، يمكنك تعديل workflows لإضافة خطوة النشر باستخدام peaceiris/actions-gh-pages.

ملفات مضافة/محدّثة
- README.md — هذا الملف.
- docs/assets/images/favicon.svg — أيقونة موقع بسيطة بصيغة SVG.
- robots.txt — قواعد أساسية لعناكب البحث.
- _config.yml — تم تحديث title و description بقيم افتراضية قابلة للتعديل.

Contact

إذا رغبت، أستطيع إضافة ملف GitHub Actions للنشر التلقائي أو تحديث التصميم.
